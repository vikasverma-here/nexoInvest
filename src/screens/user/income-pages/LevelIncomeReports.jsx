import "primeicons/primeicons.css";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { LevelIncomeApi } from "../../../api/user-api";

const LevelIncomeReports = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);

  // const userInfo = useSelector((state) => state.userInfo.userInfo);


  const levelIncomeHistory = async () => {
    const response = await LevelIncomeApi();
    setData(response.data);
    // console.log(response);
  }

  useEffect(() => {
    levelIncomeHistory();
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
    <div className="Reports LevelIncomeReports martop">
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
          <Column field="level" header="Level" filter sortable />
          <Column field="amount" header="Amount" filter sortable />
          <Column field="fromUserId.username" header="From User" filter sortable />
          <Column field="investmentId.investmentAmount" header="Investment" filter sortable />
          <Column header="Days Left" filter sortable body={(rowData) => {
            const daysLeft = 100 - rowData?.dayCount || 0;
            return `${daysLeft} Days`;
          }} />
          <Column field="createdAt" body={dateTimeTemplate} header="Income Date" filter sortable />
        </DataTable>
      </div>
    </div>
  );
};

export default LevelIncomeReports;
