/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { getCompleteWithdrawal } from "../../api/payment-api";
import { maskMemberIdFourLatter } from "../../utils/additionalFunc";
import { Tag } from "primereact/tag";

const CompleteWithdrawalRequest = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchWithdrawalHistory = async () => {
    try {
      setLoading(true);
      const response = await getCompleteWithdrawal();
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
  const statusTemplate = (rowData) => {
    return rowData.status === "success" ? (
      <Tag
        severity="success"
        value="Completed"
        style={{ fontSize: "1.2rem", padding: ".2rem .5rem" }}
      />
    ) : (
      <Tag
      severity="info"
      value="Pending"
      style={{ fontSize: "1.2rem", padding: ".2rem .5rem" }}
    />
    );
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="WithdrawalReport CompleteWithdrawalRequest martop">
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
            <Column field="userId.username" header="Username" filter sortable />
            {/* <Column
              field="_id"
              header="Request ID"
              body={(rowData) => maskMemberIdFourLatter(rowData._id)}
              filter
              sortable
            /> */}
            {/* <Column
              field="userId._id"
              header="Username"
              body={(rowData) => maskMemberIdFourLatter(rowData.userId._id)}
              filter
              sortable
            /> */}
            <Column
              field="userId._id"
              header="Receiver Address"
              body={(rowData) => maskMemberIdFourLatter(rowData.userWalletAddress)}
              filter
              sortable
            />
            <Column
              field="amount"
              header="Amount"
              body={(rowData) => rowData.amount.toFixed(2)}
              filter
              sortable
            />
            <Column
              field="createdAt"
              body={dateTimeTemplate}
              header="Date"
              filter
              sortable
            />
            <Column
              field="status"
              header="Status"
              body={statusTemplate}
              filter
              sortable
            />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default CompleteWithdrawalRequest;
