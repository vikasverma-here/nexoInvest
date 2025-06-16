/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import {
  approveFundMultipleRequest,
  approveUserPayment,
  getPendingUsers,
  rejectFundMultipleRequest,
  rejectUserPayment,
} from "../../api/payment-api";
import { FaEye } from "react-icons/fa";
import ViewPaymentDetailModal from "../../components/ui/ViewPaymentDetailModal";
import { Button2 } from "../../components/ui/Buttons";

const PaymentAproval = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [UserList, setUserList] = useState([]);
  const [viewDetail, setViewDetail] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const rejectUserHandler = async (id) => {
    try {
      setLoading(true);
      await rejectUserPayment(id);
      SwalSuccess.fire({
        icon: "success",
        title: "Rejected",
        text: "User Rejected Successfully",
      });
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const approveUserHandler = async (id) => {
    try {
      setLoading(true);
      await approveUserPayment(id);
      SwalSuccess.fire({
        icon: "success",
        title: "Approved",
        text: "User Approved Successfully",
      });
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const getPendingUser = async () => {
    try {
      setLoading(true);
      const response = await getPendingUsers();
      setUserList(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPendingUser();
  }, []);
  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const handleApprove = (rowData) => {
    approveUserHandler(rowData._id);
  };

  const handleReject = (rowData) => {
    rejectUserHandler(rowData._id);
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          label="Approve"
          icon="pi pi-check"
          className="p-button-success p-mr-2"
          onClick={() => handleApprove(rowData)}
          style={{ color: "green", marginRight: "10px" }}
        />
        <Button
          label="Reject"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={() => handleReject(rowData)}
          style={{ color: "red" }}
        />
        {/* <Button
          icon={<FaEye />}
          onClick={() => {
            setShowDetail(true);
            setViewDetail(rowData);
          }}
          style={{ color: "blue" }}
        /> */}
      </div>
    );
  };

  const rejectMultipleUserHandler = async () => {
    const userIds = [];
    selectedUsers.forEach((user) => {
      userIds.push(user._id);
    });
    if (userIds.length === 0) {
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: "Please select at least one user",
      });
      return;
    }

    try {
      setLoading(true);
      await rejectFundMultipleRequest({
        ids: userIds,
        status: "Failed",
      });
      SwalSuccess.fire({
        icon: "success",
        title: "Rejected",
        text: "Payment Rejected Successfully",
      });
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const approveMultipleUserHandler = async () => {
    const userIds = [];
    selectedUsers.forEach((user) => {
      userIds.push(user._id);
    });
    if (userIds.length === 0) {
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: "Please select at least one user",
      });
      return;
    }
    try {
      setLoading(true);
      await approveFundMultipleRequest({
        ids: userIds,
        status: "Completed",
      });
      SwalSuccess.fire({
        icon: "success",
        title: "Approved",
        text: "Payment Approved Successfully",
      });
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const onSelectionChange = (e) => {
    setSelectedUsers(e.value);
  };
  // console.log(selectedUsers);
  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toUTCString();
  };

  return (
    <>
      {loading && <PageLoader />}

      {showDetail && (
        <ViewPaymentDetailModal
          data={viewDetail}
          show={showDetail}
          onHide={() => setShowDetail(false)}
        />
      )}

      <div className="WithdrawalReport martop">
        {selectedUsers.length > 0 && (
          <div className="multiple-action-buttons">
            <Button2
              name="Approve"
              className="ss-success"
              onClick={() => approveMultipleUserHandler()}
            />
            <Button2
              className="ss-danger"
              name="Reject"
              onClick={() => rejectMultipleUserHandler()}
            />
          </div>
        )}
        <div className="dataTable ss-card martop">
          <DataTable
            value={UserList}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 500, 1000]}
            filterDisplay="row"
            globalFilter={globalFilter}
            selection={selectedUsers}
            onSelectionChange={onSelectionChange}
            selectionMode="multiple"
          >
            <Column
              header="Select"
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column
              style={{ width: "10%" }}
              body={serialNumberTemplate}
              header="S.No"
              filter
              sortable
            />
            <Column field="_id" header="Request ID" filter sortable />
            <Column field="clientId._id" header="User ID" filter sortable />
            <Column
              field="clientId.username"
              header="Username"
              filter
              sortable
            />
            <Column field="amount" header="Amount" filter sortable />
            <Column field="createdAt" body={dateTimeTemplate} header="Date" filter sortable />
            <Column body={actionTemplate} header="Actions" />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default PaymentAproval;
