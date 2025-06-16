/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { getTotalIncomeInfo, getUsers } from "../../api/admin-api";
import { maskMemberIdFourLatter } from "../../utils/additionalFunc";

const IncomeCard = ({ title, value, iconSrc }) => (
  <div className="income-card ss-card">
    <div className="left">
      <h5>{title}</h5>
      <p>{value}</p>
    </div>
    <div className="right">
      <img src={iconSrc} alt={title} />
    </div>
  </div>
);

const AdminDashboard = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo?.data);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);


  const getIncomeReport = async () => {
    try {
      const response = await getTotalIncomeInfo();
      setData(response?.data || {});
    } catch (error) {
      console.error("Error fetching income report:", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await getUsers();
      setTotalUsers(response?.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getIncomeReport();
    fetchAllUsers();
  }, []);

  const incomeCardData = [
    {
      title: "Total Users",
      value: data?.totalUsers || 0,
      iconSrc: "https://img.icons8.com/3d-fluency/94/guest-male--v1.png",
      noMoneyIcon: true,
    },
    {
      title: "Today Investment",
      value: data?.todayInvestment?.toFixed(2) || 0,
      iconSrc: "https://img.icons8.com/3d-fluency/94/money-bag-euro.png",
    },
    {
      title: "Total Investment",
      value: data?.totalInvestment?.toFixed(2) || 0,
      iconSrc: "https://img.icons8.com/3d-fluency/94/money-bag-euro.png",
    },
    {
      title: "Today Withdrawal",
      value: data?.todayWithdrawal?.toFixed(2) || 0,
      iconSrc: "https://img.icons8.com/3d-fluency/94/atm.png",
    },
    {
      title: "Total Withdrawal",
      value: data?.totalWithdrawals?.toFixed(2) || 0,
      iconSrc: "https://img.icons8.com/3d-fluency/94/atm.png",
    },
    {
      title: "Today Direct Referral Income",
      value: data?.todayDirectReferral?.toFixed(2) || 0,
      iconSrc: "https://img.icons8.com/3d-fluency/94/conference-call--v1.png",
    },
    {
      title: "Total Direct Referral Income",
      value: data?.totalDirectReferral?.toFixed(2) || 0,
      iconSrc: "https://img.icons8.com/3d-fluency/94/conference-call--v1.png",
    },
    {
      title: "Today Level Income",
      value: data?.todayLevelIncome?.toFixed(2) || 0,
      iconSrc: "https://img.icons8.com/3d-fluency/94/total-sales.png",
    },
    {
      title: "Total Level Income",
      value: data?.totalLevelIncome?.toFixed(2) || 0,
      iconSrc: "https://img.icons8.com/3d-fluency/94/total-sales.png",
    },
    {
      title: "Today Roi Income",
      value: data?.todayRoi?.toFixed(2) || 0,
      iconSrc: "https://img.icons8.com/3d-fluency/94/split-transaction.png",
    },
    {
      title: "Total Roi Income",
      value: data?.totalRoi?.toFixed(2) || 0,
      iconSrc: "https://img.icons8.com/3d-fluency/94/banknotes-and-coins.png",
    },
  ];

  const serialNumberTemplate = (rowData, { rowIndex }) => rowIndex + 1;

  return (
    <>
      {loading && <PageLoader />}

      <div className="UserHome AdminDashboard">
        <div className="income-wrapper mar-top">
          {incomeCardData?.map((income, index) => (
            <IncomeCard
              key={index}
              title={income.title}
              value={`${income.noMoneyIcon ? "" : "$"}${income.value}`}
              iconSrc={income.iconSrc}
            />
          ))}
        </div>

        <div className="ss-card mar-top">
          <div className="head">
            <h5 className="cardHeading">Total Users</h5>
          </div>

          <div className="dataTable">
            <DataTable
              value={totalUsers}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
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
              <Column field="username" header="Username" filter sortable />
              <Column
                field="walletAddress"
                header="Wallet Address"
                body={(rowData) => maskMemberIdFourLatter(rowData?.walletAddress)}
                filter
                sortable
              />
              <Column
                field="totalIncome"
                header="Total Earnings (USDT)"
                body={(rowData) => `${rowData.totalEarnings?.toFixed(2)} USDT`}
                filter
                sortable
              />
              <Column
                field="currentIncome"
                header="Current Earnings (USDT)"
                body={(rowData) => `${rowData.currentEarnings?.toFixed(2)} USDT`}
                filter
                sortable
              />
              <Column
                // field="investment"
                header="Investment (USDT)"
                body={(rowData) => `${rowData.totalInvestment?.toFixed(2)} USDT`}
                filter
                sortable
              />

            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
