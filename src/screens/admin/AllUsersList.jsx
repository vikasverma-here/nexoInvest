import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import {
  deleteUserAdminEnd,
  // getAllUserList,
  getUsers,
  userStatusToggle,
  
} from "../../api/admin-api";
import Swal from "sweetalert2";
import { LEVEL_NAME_ENUM } from "../../utils/allEnums";
import { Tag } from "primereact/tag";
import { maskMemberIdFourLatter } from "../../utils/additionalFunc";

const AllUsersList = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [UserList, setUserList] = useState([]);


  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      console.log(response)
      setUserList(response?.data);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error fetching users",
        text: error?.response?.data?.message || "Failed to fetch user list",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleStatusToggle = async (rowData) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: `You want to ${rowData.loginBlocked ? "unblock" : "block"} this user?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, do it!",
      });
  
      if (!confirm.isConfirmed) return;
  
      const res = await userStatusToggle({
        userId: rowData._id,
        block: !rowData.loginBlocked, // Flip the current value
      });
      console.log( res );
  
      SwalSuccess.fire({
        icon: "success",
        title: "Status Updated",
        text: res?.message || "User status updated successfully.",
      });
  
      // Refresh user list
      fetchAllUsers();
    } catch (error) {
      console.error(error);
      SwalError.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.response?.data?.message || "Failed to update status.",
      });
    }
  };
  
  

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const totalIncomeTemplate = (rowData) => {
    return <span className="p-2">{rowData?.totalEarnings?.toFixed(2)}</span>;
  };

  const currentIncomeTemplate = (rowData) => {
    return <span className="p-2">{rowData?.currentIncome?.toFixed(2)}</span>;
  };


  const referralIncomeTemplate = (rowData) => {
    return (
      <span className="p-2">
        {rowData?.levelIncome?.toFixed(2)} USDT
      </span>

    );
  };

  const totalInvestmentIncomeTemplate = (rowData) => {
    return <span className="p-2">{rowData?.totalInvestment?.toFixed(2)}</span>;
  };


  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toUTCString();
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="WithdrawalReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={UserList}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 500, 1000]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column
              style={{ width: "10%" }}
              body={serialNumberTemplate}
              header="S.No"
              filter
              sortable
            />
            {/* <Column field="_id" header="ID" filter sortable /> */}
            <Column field="username" header="Username" filter sortable />
            <Column
              field="WalletAddresst"
              header="Wallet Address"
              body={(rowData) => maskMemberIdFourLatter(rowData?.walletAddress)}
              filter
              sortable
            />


            <Column
              body={totalInvestmentIncomeTemplate}
              header="Total Investment"
              filter
              sortable
            />
            <Column
              body={totalIncomeTemplate}
              header="Total Income"
              filter
              sortable
            
            />

            {/* <Column
              body={currentIncomeTemplate}
              header="currentIncome"
              filter
              sortable
              field="currentIncome"
            /> */}
            <Column
              // body={levelIncomeTemplate}
              header="Level Income"
              body={(rowData) => (
                <span className="p-2">
                  {rowData?.levelIncome?.toFixed(6)} USDT
                </span>
              )}
              filter
              sortable
            />
            
          
            <Column
              body={referralIncomeTemplate}
              header="Direct Referral Income"
              filter
              sortable
              field="directRefIncome"
            />
            <Column
              body={(rowData) => (
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "999px",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "13px",
                    backgroundColor: rowData?.status ? "#28a745" : "#dc3545",
                    display: "inline-block",
                    minWidth: "80px",
                    textAlign: "center",
                  }}
                >
                  {rowData?.status ? "Active" : "Inactive"}
                </span>
              )}
              header="Status"
              // filter
              sortable
            />
            <Column
              filter
              field="createdAt"
              body={dateTimeTemplate}
              header="Join Date"
            />
<Column
  header="Block/Unblock"
  body={(rowData) => (
    <Button
      label={rowData.loginBlocked ? "Unblock" : "Block"}
      icon={rowData.loginBlocked ? "pi pi-lock-open" : "pi pi-lock"}
      tooltip={rowData.loginBlocked ? "Click to unblock this user" : "Click to block this user"}
      tooltipOptions={{ position: "top" }}
      className={`p-button-sm p-button-rounded ${
        rowData.loginBlocked ? "p-button-success" : "p-button-danger"
      }`}
      style={{
        padding: "0.5rem 1.2rem",
        fontWeight: "600",
        fontSize: "14px",
        borderRadius: "999px",
        backgroundColor: rowData.loginBlocked ? "#28a745" : "#dc3545",
        borderColor: rowData.loginBlocked ? "#28a745" : "#dc3545",
        color: "#fff",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease-in-out",
        minWidth: "100px",
      }}
      onClick={() => handleStatusToggle(rowData)}
    />
  )}
/>




          </DataTable>
        </div>
      </div>
    </>
  );
};

export default AllUsersList;
