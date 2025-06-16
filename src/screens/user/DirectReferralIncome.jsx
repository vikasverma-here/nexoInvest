/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Tag } from "primereact/tag";
import { maskEmail, maskPhoneNumber } from "../../utils/additionalFunc";

const DirectReferralIncome = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const statusBodyTemplate = (product) => {
    return product.isActive ? (
      <Tag value="Active" style={{fontSize:"1.2rem", padding:".2rem .5rem"}} severity="success" />
    ) : (
      <Tag value="Inactive" style={{fontSize:"1.2rem", padding:".2rem .5rem"}} severity="danger" />
    );
  };
  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };
   const maskEmailTemplate = (row) => {
      return maskEmail(row?.email);
    };
  
    const maskMobileTemplate = (row) => {
      return maskPhoneNumber(row?.mobile);
    };

  return (
    <>
      <div className="WithdrawalReport DirectReferralIncome martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={userInfo?.user?.directLevelIncomes}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column style={{ width: "10%" }} body={serialNumberTemplate} header="S.No"  filter sortable/>
            <Column field="amount" header="Amount"  filter sortable />
            <Column field="investment" header="Investment"  filter sortable />
            <Column field="usersLength" header="No. of Users"  filter sortable />
            <Column field="commition" header="Income Percent (%)"  filter sortable />
            <Column field="type" header="Level Name"  filter sortable />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default DirectReferralIncome;
