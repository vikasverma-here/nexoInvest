import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import ViewTicketDetail from "../../components/ui/ViewPaymentDetailModal";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import {
  approveComplainRequest,
  getPendingComplainHistory,
  rejectComplainRequest,
} from "../../api/admin-api";
import ApproveMessageModal from "../../components/ui/ApproveMessageModal.jsx";
import RejectMessageModal from "../../components/ui/RejectMessageModal.jsx"; // New Reject Modal

const ComplainTicketList = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [History, setHistory] = useState([]);
  const [viewDetail, setViewDetail] = useState();

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false); // New state for Reject Modal
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [rejectingTicket, setRejectingTicket] = useState(null); // New state for selected ticket for rejection

  const getRaiseTicketHistory = async () => {
    try {
      setLoading(true);
      const response = await getPendingComplainHistory();
      setHistory(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const rejectUserHandler = (rowData) => {
    setRejectingTicket(rowData); // Set the selected ticket for rejection
    setShowRejectModal(true); // Show the reject modal
  };

  const handleApprove = (rowData) => {
    setSelectedTicket(rowData);
    setShowApproveModal(true);
  };

  const submitApprovalWithMessage = async (message) => {
    try {
      setLoading(true);
      await approveComplainRequest(selectedTicket._id, { message });
      SwalSuccess.fire({
        icon: "success",
        title: "Approved",
        text: "Complain Approved Successfully",
      });
      setShowApproveModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitRejectionWithMessage = async (message) => {
    try {
      setLoading(true);
      await rejectComplainRequest(rejectingTicket._id, { message });
      SwalSuccess.fire({
        icon: "success",
        title: "Rejected",
        text: "Complain Rejected Successfully",
      });
      setHistory((prev) =>
        prev.filter((ticket) => ticket._id !== rejectingTicket._id)
      );
      setShowRejectModal(false); // Close the reject modal
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const showTicketPopup = (rowData) => {
    setShowDetail(true);
    setViewDetail(rowData);
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          label="View"
          className="p-mr-2 pi pi-eye"
          onClick={() => showTicketPopup(rowData)}
          style={{
            color: "#dadada",
            fontWeight: "600",
            marginRight: "10px",
            border: "1px solid #dadada",
            backgroundColor: "#2b2b2b",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        />
        <Button
          label="Approve"
          icon="pi pi-check"
          className="p-button-success p-mr-2"
          onClick={() => handleApprove(rowData)}
          style={{
            color: "green",
            marginRight: "10px",
            marginTop: "5px",
            border: "1px solid #dadada",
            backgroundColor: "#abebc6",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        />
        <Button
          label="Reject"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={() => rejectUserHandler(rowData)}
          style={{
            color: "red",
            marginTop: "5px",
            border: "1px solid #dadada",
            backgroundColor: "#f5b7b1",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        />
      </div>
    );
  };

  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toUTCString();
  };

  useEffect(() => {
    getRaiseTicketHistory();
  }, []);

  return (
    <>
      {loading && <PageLoader />}

      {showDetail && (
        <ViewTicketDetail
          data={viewDetail}
          show={showDetail}
          onHide={() => setShowDetail(false)}
        />
      )}

      {showApproveModal && (
        <ApproveMessageModal
          visible={showApproveModal}
          onHide={() => setShowApproveModal(false)}
          onSubmit={submitApprovalWithMessage}
        />
      )}

      {showRejectModal && ( // Reject Modal
        <RejectMessageModal
          visible={showRejectModal}
          onHide={() => setShowRejectModal(false)}
          onSubmit={submitRejectionWithMessage}
        />
      )}

      <div className="WithdrawalReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={History}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column
              style={{ width: "10%" }}
              body={(rowData, { rowIndex }) => rowIndex + 1}
              header="S.No"
              filter
              sortable
            />
            <Column field="_id" header="ID" filter sortable />
            <Column field="subject" header="Subject" filter sortable />
            <Column field="message" header="Message" filter sortable />
            <Column field="status" header="Status" filter sortable />
            <Column
              field="createdAt"
              body={dateTimeTemplate}
              header="Date"
              filter
              sortable
            />
            <Column body={actionTemplate} header="Actions" />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default ComplainTicketList;
