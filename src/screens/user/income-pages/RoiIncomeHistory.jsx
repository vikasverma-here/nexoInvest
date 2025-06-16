import "primeicons/primeicons.css";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { useEffect, useState } from "react";
import { RoiIncomeAPi } from "../../../api/user-api";

const RoiIncomeHistory = () => {
  const [data, setData] = useState([]);

  const getRoiHistory = async () => {
    try {
      const response = await RoiIncomeAPi();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching ROI income history:", error);
    }
  };

  useEffect(() => {
    getRoiHistory();
  }, []);

  // Column templates
  const serialNumberTemplate = (_rowData, { rowIndex }) => rowIndex + 1;

  const dateTimeTemplate = (rowData) => {
    const date = rowData.creditedOn || rowData.createdAt || rowData.date;
    return new Date(date).toLocaleString("en-IN", {
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


  const roiAmountTemplate = (rowData) => {
    return `${rowData.roiAmount || 0} USDT`;
  };

  const investmentAmountTemplate = (rowData) => {
    return `${rowData.investmentId?.investmentAmount || 0} USDT`;
  };

  return (
    <div className="Reports ReferralIncomeReports martop">
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
          />
          <Column
            field="userId.username"
            header="Username"
            filter
            sortable
            body={(rowData) => rowData.userId?.username || "N/A"}
          />
          <Column
            header="ROI Amount"
            sortable
            filter
            body={roiAmountTemplate}
          />
          <Column
            header="Investment Amount"
            sortable
            filter
            body={investmentAmountTemplate}
          />
          <Column
            header="Days Left"
            sortable
            filter
            body={(rowData) => {
              const daysLeft = 100 - rowData?.dayCount || 0;
              return `${daysLeft} Days`;
            }}
          />
          <Column
            header="Credited On"
            sortable
            filter
            body={dateTimeTemplate}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default RoiIncomeHistory;
