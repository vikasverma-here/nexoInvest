/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import {
  approveFundRequest,
  getPendingFunds,
  rejectFundRequest,
} from "../../api/payment-api";
import ViewPaymentDetailModal from "../../components/ui/ViewPaymentDetailModal";
import { Button2 } from "../../components/ui/Buttons";

const FundAproval = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [UserList, setUserList] = useState([]);
  const [viewDetail, setViewDetail] = useState([]);

  const rejectUserHandler = async (id) => {
    try {
      setLoading(true);
      await rejectFundRequest(id);
      SwalSuccess.fire({
        icon: "success",
        title: "Rejected",
        text: "Fund Transfer Rejected Successfully",
      });
      setInterval(() => {
        window.location.reload();
      }, 2000);
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
  const approveUserHandler = async (id) => {
    try {
      setLoading(true);
      await approveFundRequest(id);
      SwalSuccess.fire({
        icon: "success",
        title: "Approved",
        text: "Fund Transfer Approved Successfully",
      });
      setInterval(() => {
        window.location.reload();
      }, 2000);
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
  const getPendingUser = async () => {
    try {
      setLoading(true);
      const response = await getPendingFunds();
      setUserList(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPendingUser();
  }, []);
  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const handleApprove = (rowData) => {
    approveUserHandler(rowData._id);
  };

  const handleReject = (rowData) => {
    rejectUserHandler(rowData._id);
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          label="Approve"
          icon="pi pi-check"
          className="p-button-success p-mr-2"
          onClick={() => handleApprove(rowData)}
          style={{ color: "green", marginRight: "10px" }}
        />
        <Button
          label="Reject"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={() => handleReject(rowData)}
          style={{ color: "red" }}
        />
      </div>
    );
  };
  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toUTCString();
  };


 

  return (
    <>
      {loading && <PageLoader />}

      {showDetail && (
        <ViewPaymentDetailModal
          data={viewDetail}
          show={showDetail}
          onHide={() => setShowDetail(false)}
        />
      )}

      <div className="WithdrawalReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={UserList}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}

          >
            <Column
              style={{ width: "10%" }}
              body={serialNumberTemplate}
              header="S.No"
              filter
              sortable
            />
            <Column field="_id" header="Request ID" filter sortable />
            <Column field="fundTransferClientId._id" header="Sender User ID" filter sortable />
            <Column field="fundTransferClientId.username" header="Sender Username" filter sortable />
            <Column field="fundReceiverClientId._id" header="Receiver User ID" filter sortable />
            <Column field="fundReceiverClientId.username" header="Receiver Username" filter sortable />
            <Column field="amount" header="Amount" filter sortable />
            <Column field="createdAt" body={dateTimeTemplate} header="Date" filter sortable />
            <Column body={actionTemplate} header="Actions" />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default FundAproval;
