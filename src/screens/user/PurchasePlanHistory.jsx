/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { getPurchasePlanHistory } from "../../api/payment-api";
import { Tag } from "primereact/tag";

const PurchasePlanHistory = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchPurchaseHistory = async () => {
    try {
      setLoading(true);
      const response = await getPurchasePlanHistory();
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPurchaseHistory();
  }, []);
  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };
  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.investmentDate).toUTCString();
  };
  console.log(data)

  return (
    <>
      {loading && <PageLoader />}
      <div className="WithdrawalReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={data?.data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column body={serialNumberTemplate} header="S.No" filter sortable />
            <Column field="investmentAmount" header="Package Amount" filter sortable />
            <Column
              body={dateTimeTemplate}
              field="createdAt"
              header="Date"
              filter
              sortable
            />
            <Column field="status" body={(rowData) => rowData.status == "Pending" ? <Tag severity="warning" style={{ fontSize: "1.2rem", padding: ".2rem .5rem" }}>Pending</Tag> : <Tag severity="success" style={{ fontSize: "1.2rem", padding: ".2rem .5rem" }}>Success</Tag>} header="Status" filter sortable />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default PurchasePlanHistory;
