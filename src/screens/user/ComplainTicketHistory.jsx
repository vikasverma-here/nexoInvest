import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import ViewTicketDetail from "../../components/ui/ViewPaymentDetailModal";
import { getComplainHistory } from "../../api/user-api";

const ComplainTicketHistory = () => {
  // eslint-disable-next-line no-unused-vars
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [History, setHistory] = useState([]);
  const [viewDetail, setViewDetail] = useState();
  const getRaiseTicketHistory = async () => {
    try {
      setLoading(true);
      const response = await getComplainHistory();
      setHistory(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getRaiseTicketHistory();
  }, []);
  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const showTicketPopup = (rowData) => {
    // approveUserHandler(rowData._id);
    setShowDetail(true);
    setViewDetail(rowData)
  };
  const actionTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          label="View"
          className="p-mr-2"
          onClick={() => showTicketPopup(rowData)}
          style={{ color: "#dadada", fontWeight: "600", marginRight: "10px", border: "1px solid #dadada", backgroundColor: "#2b2b2b", padding: "5px 10px", borderRadius: "5px" }}
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
        <ViewTicketDetail
          data={viewDetail}
          show={showDetail}
          onHide={() => setShowDetail(false)}
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
              body={serialNumberTemplate}
              header="S.No"
              filter
              sortable
            />
            {/* <Column field="_id" header="ID" filter sortable /> */}
            <Column field="subject" header="Subject" filter sortable />
            <Column field="message" header="Message" filter sortable />
            <Column field="status" header="Status" filter sortable />
            <Column field="createdAt" body={dateTimeTemplate} header="Date" filter sortable />
            <Column body={actionTemplate} header="Actions" />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default ComplainTicketHistory;
