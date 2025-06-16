/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { WithdrawalReportContent } from "../../constants/content/dummy/WithdrawalReportContent";
import PageLoader from "../../components/ui/PageLoader";
import { getWithdrawalHistory } from "../../api/payment-api";

const WithdrawalReport = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // getWithdrawalHistory

  const fetchWithdrawalHistory = async () => {
    try {
      setLoading(true);
      const response = await getWithdrawalHistory();
      console.log(response.data, "response.data);")
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
  const withdwalStatus = (rowData) => {
    return (
      <span
        className={`px-5 py-1 text-[2rem] rounded-full text-white  font-medium ${rowData.status === "success"
            ? "bg-green-500"
            : rowData.status === "pending"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
      >
        {rowData.status === "success" ? "Paid" : rowData.status}
      </span>

    );
  }

  return (
    <>
      {loading && <PageLoader />}
      <div className="WithdrawalReport martop">
        {/* <div className="top-wrapper">
          <div className="ss-card">
            <div className="txt">
              <h5 className="heading">Total Withdrawal</h5>
              <p className="para1">$ {data?.totalAmount?.toFixed(2) || 0}</p>
            </div>
            <div className="icon">
              <img
                src="https://img.icons8.com/3d-fluency/94/money-bag.png"
                alt=""
              />
            </div>
          </div>
          <div className="ss-card">
            <div className="txt">
              <h5 className="heading">Paid Withdrawal</h5>
              <p className="para1">$ {data?.completedAmount?.toFixed(2) || 0}</p>
            </div>
            <div className="icon">
              <img
                src="https://img.icons8.com/3d-fluency/94/approval.png"
                alt=""
              />
            </div>
          </div>
          <div className="ss-card">
            <div className="txt">
              <h5 className="heading">Reject Withdrawal</h5>
              <p className="para1">$ {data?.totalRejectedAmount?.toFixed(2) || 0}</p>
            </div>
            <div className="icon">
              <img
                src="https://img.icons8.com/3d-fluency/94/cancel.png"
                alt=""
              />
            </div>
          </div>
        </div> */}
        {/* 
        <div className="global-filter-container">
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Global Search"
            className="p-inputtext-sm"
          />
        </div> */}

        <div className="dataTable ss-card  martop">
          <DataTable
            value={data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column body={serialNumberTemplate} header="S.No" filter sortable />
            <Column field="amount" header="Amount" filter sortable />
            <Column body={dateTimeTemplate} field="createdAt" header="Date" filter sortable />
            <Column body={withdwalStatus} header="Status" filter sortable />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default WithdrawalReport;
