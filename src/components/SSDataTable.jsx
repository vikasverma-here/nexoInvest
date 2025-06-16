/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner";
import { maskMemberIdFourLatter } from "../utils/additionalFunc";

export default function SSDataTable({ data }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setProducts(data);
      setLoading(false);
    }, 1000);
  }, [data]);

  const statusBodyTemplate = (product) => {
    return product.status ? (
      <Tag className="text-[1.5rem]" value="Active" severity="success" />
    ) : (
      <Tag className="text-[1.5rem]" value="Inactive" severity="danger" />
    );
  };

  if (loading) {
    return (
      <ProgressSpinner
        style={{
          width: "50px",
          height: "50px",
          left: "50%",
          top: "50%",
          position: "relative",
        }}
      />
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const maskEmailTemplate = (row) => {
    return maskMemberIdFourLatter(row?.walletAddress);
  };

  return (
    <div className=" mar-top">
      <DataTable
        className="SSDataTable"
        value={products}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="username" header="Username" />
        <Column body={maskEmailTemplate} header="Wallet Address" />
        <Column header="Total Investment" body={(rowData) => rowData.totalInvestment} />
        <Column header="Status" body={statusBodyTemplate} />
      </DataTable>
    </div>
  );
}
