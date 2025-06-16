/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { WithdrawalReportContent } from "../../constants/content/dummy/WithdrawalReportContent";

const FundRequestReport = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.Date).toUTCString();
  };
  return (
    <>
      <div className="WithdrawalReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={WithdrawalReportContent}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column field="S_No" header="S.No" filter sortable />
            <Column field="Amount" header="Amount ($)" filter sortable />
            <Column field="Admin_charges" header="Admin Charges" filter sortable />
            <Column field="Payable_Amount" header="Payable Amount" filter sortable />
            <Column field="Status" header="Status" filter sortable />
            <Column field="Reason" header="Reason" filter sortable />
            <Column field="Date" body={dateTimeTemplate} header="Date" filter sortable />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default FundRequestReport;
