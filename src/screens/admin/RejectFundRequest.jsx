/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { getRejectFunds } from "../../api/payment-api";

const RejectFundRequest = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchWithdrawalHistory = async () => {
    try {
      setLoading(true);
      const response = await getRejectFunds();
      setData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWithdrawalHistory();
  }, []);
  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };
  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toUTCString();
  };


  return (
    <>
      {loading && <PageLoader />}
      <div className="WithdrawalReport RejectFundRequest martop">

        <div className="dataTable ss-card martop">
          <DataTable
            value={data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column body={serialNumberTemplate} header="S.No" filter sortable />
            <Column field="_id" header="Request ID" filter sortable />
            <Column field="fundTransferClientId._id" header="Sender User ID" filter sortable />
            <Column field="fundTransferClientId.username" header="Sender Username" filter sortable />
            <Column field="fundReceiverClientId._id" header="Receiver User ID" filter sortable />
            <Column field="fundReceiverClientId.username" header="Receiver Username" filter sortable />
            <Column field="amount" header="Amount" filter sortable />
            <Column field="createdAt" body={dateTimeTemplate} header="Date" filter sortable />
            <Column field="status" header="Status" filter sortable />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default RejectFundRequest;
