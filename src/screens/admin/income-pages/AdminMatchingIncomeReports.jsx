import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import PageLoader from "../../../components/ui/PageLoader";
import { getMatchingIncomeHistory, getROiHistory } from "../../../api/admin-api";
import { maskMemberIdFourLatter } from "../../../utils/additionalFunc";

const AdminMatchingIncomeReports = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchIncomeHandler = async () => {
    try {
      setLoading(true);
      const response = await getROiHistory();
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
    return new Date(rowData.creditedOn).toLocaleString("en-IN", {
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
      <div className="Reports AdminMatchingIncomeReports martop">
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
            <Column field="investmentId.investmentAmount" body={(rowData) => rowData?.investmentId.investmentAmount?.toFixed(3) + " USDT"} header="Investment" filter sortable />
            <Column field="roiAmount" body={(rowData) => rowData?.roiAmount + " USDT"} header="Daily ROI" filter sortable />
            <Column field="userId.totalRoi" body={(rowData) => rowData?.userId?.totalRoi?.toFixed(3) + " USDT"} header="Total ROI" filter sortable />
            {/* <Column field="commition" header="Amount" body={(rowData) => rowData.commition.toFixed(2)} filter sortable /> */}
            <Column
              field="creditedOn"
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

export default AdminMatchingIncomeReports;
