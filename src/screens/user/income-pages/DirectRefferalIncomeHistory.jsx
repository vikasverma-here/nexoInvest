import "primeicons/primeicons.css";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { useEffect, useState } from "react";
import { RefferralIncomeAPi } from "../../../api/admin-api";

const DirectRefferalIncomeHistory = () => {
  const [data, setData] = useState([]);

  const getRefferralIncomeAPi = async () => {
    try {
      const response = await RefferralIncomeAPi();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching referral income history:", error);
    }
  };

  useEffect(() => {
    getRefferralIncomeAPi();
  }, []);

  // Column templates
  const serialNumberTemplate = (_rowData, { rowIndex }) => rowIndex + 1;

  const dateTimeTemplate = (rowData) => {
    const date = rowData.creditedOn || rowData.createdAt || rowData.date;
    return date ? new Date(date).toUTCString() : "N/A";
  };

  const roiAmountTemplate = (rowData) => {
    return `${rowData.roiAmount || 0} USDT`;
  };

  const investmentAmountTemplate = (rowData) => {
    return `${rowData.investmentId?.investmentAmount || 0} USDT`;
  };

  const daysLeftTemplate = (rowData) => {
    const daysLeft = 100 - (rowData?.dayCount || 0);
    return `${daysLeft} Days`;
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
            header="From "
            sortable
            filter
            field="fromUser.username"
          />
          <Column
            header="Amount"
            sortable
            filter
            field="amount"
          />
          <Column
            header="Investment Amount"
            sortable
            filter
            field="investmentId.investmentAmount"
          />
          {/* <Column
            header="Days Left"
            sortable
            filter
            body={daysLeftTemplate}
          /> */}
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

export default DirectRefferalIncomeHistory;
