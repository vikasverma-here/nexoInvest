import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useSelector } from "react-redux";

const MatchingIncomeReports = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);

  const userInfo = useSelector((state) => state.userInfo.userInfo);

  useEffect(() => {
    if (userInfo) {
      const filteredData = userInfo?.user?.matchingPairs || [];
      setData(filteredData);
    }
  }, [userInfo]);

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };
  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toUTCString();
  };

  return (
    <div className="Reports MatchingIncomeReports martop">
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
          <Column field="left.username" header="Left User" filter sortable />
          <Column field="right.username" header="Right User" filter sortable />
          <Column field="commition" header="Income" filter sortable />
          <Column field="createdAt" body={dateTimeTemplate} header="Income Date" filter sortable />
        </DataTable>
      </div>
    </div>
  );
};

export default MatchingIncomeReports;
