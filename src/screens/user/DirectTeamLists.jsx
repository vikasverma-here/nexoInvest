/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { WithdrawalReportContent } from "../../constants/content/dummy/WithdrawalReportContent";
import { useSelector } from "react-redux";
import { Tag } from "primereact/tag";
import {
  maskEmail,
  maskMemberIdFourLatter,
  maskPhoneNumber,
} from "../../utils/additionalFunc";

const DirectTeamLists = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const statusBodyTemplate = (product) => {
    return product.status ? (
      <Tag
        value="Active"
        style={{ fontSize: "1.2rem", padding: ".2rem .5rem" }}
        severity="success"
      />
    ) : (
      <Tag
        value="Inactive"
        style={{ fontSize: "1.2rem", padding: ".2rem .5rem" }}
        severity="danger"
      />
    );
  };
  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };
  const maskEmailTemplate = (row) => {
    return maskMemberIdFourLatter(row?.walletAddress);
  };

  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toUTCString();
  };

  return (
    <>
      <div className="WithdrawalReport DirectTeamLists martop">
        <div className="dataTable ss-card martop">
          <DataTable
            className="SSDataTable"
            value={userInfo?.user?.referedUsers}
            tableStyle={{ minWidth: "60rem" }}
          >
            <Column field="username" header="Username" />
            <Column
              body={maskEmailTemplate}
              // field="walletAddress"
              header="Wallet Address"
            />
            <Column
              field="investment"
              header="Total Investment"
              body={(rowData) => rowData.totalInvestment.toFixed(2)}
            />
            <Column
              field="totalIncome"
              header="Total Income"
              body={(rowData) => rowData.totalEarnings.toFixed(2)}
            />
            <Column header="Status" body={statusBodyTemplate} />
            <Column
              field="createdAt"
              body={dateTimeTemplate}
              header="Join Date"
              filter
              sortable
            />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default DirectTeamLists;
