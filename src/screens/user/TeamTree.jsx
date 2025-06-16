import { useEffect, useState } from "react";
import { getUserTreeData, getLevelUsersDetails } from "../../api/user-api";
import PageLoader from "../../components/ui/PageLoader";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "../../styles/TeamTree.css";

const TeamTree = () => {
  const [loading, setLoading] = useState(false);
  // const [treeData, setTreeData] = useState([]);
  const [downlineCount, setDownlineCount] = useState(0);
  const [levelData, setLevelData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLevelUsers, setSelectedLevelUsers] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const fetchTreeData = async () => {
    try {
      setLoading(true);
      const info = await getUserTreeData();
      console.log(info);

      const root = info?.tree;

      // Recursive function to count all nodes
      const countDownlines = (node) => {
        if (!node) return 0;
        return 1 + countDownlines(node.left) + countDownlines(node.right);
      };

      const totalDownlines = countDownlines(root) - 1; // exclude root node
      console.log(totalDownlines)
      setDownlineCount(totalDownlines);
    } catch (error) {
      console.error("Error fetching tree data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const getUserTree = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await getUserTreeData();
  //     setTreeData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching tree data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getUserLevels = async () => {
    try {
      const response = await getLevelUsersDetails();
      setLevelData(response.data);
    } catch (error) {
      console.error("Error fetching level data:", error);
    }
  };

  useEffect(() => {
    fetchTreeData();
    // getUserTree();
    getUserLevels();
  }, []);

  const serialNumberTemplate = (_rowData, { rowIndex }) => rowIndex + 1;

  const viewButtonTemplate = (rowData) => (
    <button
      
      className="px-6 py-3 rounded-md"
      onClick={() => {
        setSelectedLevel(rowData.level);
        setSelectedLevelUsers(rowData.users);
        setShowPopup(true);
      }}
    >
      View
    </button>
  );

  return (
    <>
      {loading && <PageLoader />}
      <div className="TeamTree p-4">
        {/* Downline Count */}
        <div className="ss-card fs-4 fw-bold mb-3" style={{ width: "fit-content" }}>
          Downline Count : {downlineCount}
        </div>

        {/* Level-wise Summary Table */}
        <div className="dataTable ss-card">
          <DataTable
            value={levelData}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            responsiveLayout="scroll"
          >
            {/* <Column body={serialNumberTemplate} header="S.No" /> */}
            <Column field="level" header="Level" />
            <Column field="count" header="User Count" />
            <Column body={viewButtonTemplate} header="Actions" />
          </DataTable>
        </div>
      </div>

      {/* Popup for Level Users */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <div className="popup-header">
              <h5 className="text-[2rem] text-orange-400 font-bold ">Users in Level {selectedLevel}</h5>
              <button className="close-btn" onClick={() => setShowPopup(false)}>✖</button>
            </div>
            <div className="popup-body">
              <DataTable
                value={selectedLevelUsers}
                paginator
                rows={5}
                responsiveLayout="scroll"
              > 
                {/* <Column body={serialNumberTemplate} header="S.No" /> */}
                <Column field="username" header="Username" />
                {/* <Column field="walletAddress" header="Wallet Address" /> */}
                <Column field="referralCode" header="Referral Code" />
                <Column field="totalInvestment" header="Total Investment" />
              </DataTable>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamTree;
