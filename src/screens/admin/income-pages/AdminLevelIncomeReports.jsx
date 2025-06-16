import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import PageLoader from "../../../components/ui/PageLoader";
import { getLevelIncomeHistory } from "../../../api/admin-api";
import { maskMemberIdFourLatter } from "../../../utils/additionalFunc";

const AdminLevelIncomeReports = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchIncomeHandler = async () => {
    try {
      setLoading(true);
      const response = await getLevelIncomeHistory();
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
    return new Date(rowData.createdAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };


  return (
    <>
      {loading && <PageLoader />}
      <div className="Reports AdminLevelIncomeReports martop">
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
            <Column field="userId.username" header="Username" filter sortable />
            <Column
              field="fromUserId.username"
              header="From User"
              filter
              sortable
            />
            <Column
              field="amount"
              header="Level Income"
              body={(rowData) => `${rowData.amount.toFixed(2)} USDT`}
              filter
              sortable
            />
            <Column
              field="fromUserId.levelIncome"
              header="Total Level Income"
              body={(rowData) => `${rowData.amount.toFixed(2)} USDT`}
              filter
              sortable
            />
            <Column
              field="fromUserId.levelIncome"
              header=" Level "
              body={(rowData) => `Level ${rowData.level}`}
              filter
              sortable
            />
            <Column
              field="percent"
              header="Percent(%)"
              body={(rowData) => `${rowData.percent?.toFixed(2)}%`}
              filter
              sortable
            />

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

export default AdminLevelIncomeReports;
