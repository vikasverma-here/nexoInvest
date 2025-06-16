import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import PageLoader from "../../../components/ui/PageLoader";
import { getDirectReferralIncome } from "../../../api/admin-api";
import { maskMemberIdFourLatter } from "../../../utils/additionalFunc";

const AdminDirectReferralIncomeReports = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchIncomeHandler = async () => {
    try {
      setLoading(true);
      const response = await getDirectReferralIncome();
      setData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchIncomeHandler();
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
      <div className="Reports AdminDirectReferralIncomeReports martop">
        <div className="dataTable ss-card martop">
        <DataTable
                    value={data}
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    filterDisplay="row"
                  >
                    <Column
                      style={{ width: "10%" }}
                      body={serialNumberTemplate}
                      header="S.No"
                      filter
                      sortable
                    />
                    <Column field="clientId._id" header="User ID" body={(rowData) => maskMemberIdFourLatter(rowData.clientId._id)} filter sortable />
                    <Column field="clientId.username" header="Username" filter sortable />
                    <Column field="amount" header="Amount" body={(rowData) => rowData.amount.toFixed(2)} filter sortable />
                    <Column
                      field="createdAt"
                      body={dateTimeTemplate}
                      header="Income Date"
                      filter
                      sortable
                    />
                  </DataTable>
        </div>
      </div>
    </>
  );
};

export default AdminDirectReferralIncomeReports;
