import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SwalSuccess, SwalError } from "../../utils/custom-alert";
import {
  updateTransactionLimit,
 getAdminInfo, // ✅ Create this in your API file
} from "../../api/admin-api";

const TransactionLimit = () => {
  const [limit, setLimit] = useState("");
  const [currentLimit, setCurrentLimit] = useState(null);

  const handleSubmit = async () => {
    if (!limit || isNaN(limit)) {
      SwalError.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a valid numeric limit.",
      });
      return;
    }

    try {
      const payload = { limit: Number(limit) };
      const res = await updateTransactionLimit(payload);

      SwalSuccess.fire({
        icon: "success",
        title: "Transaction Limit Updated",
        text: res?.data?.message || "Limit updated successfully.",
      });

      setLimit("");
      fetchCurrentLimit(); // Refresh current limit after update
    } catch (error) {
      console.error(error);
      SwalError.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.response?.data?.message || "Failed to update limit.",
      });
    }
  };

  const fetchCurrentLimit = async () => {
    try {
      const res = await getAdminInfo();
      setCurrentLimit(res?.limit);
    } catch (error) {
      console.error("Error fetching current limit", error);
    }
  };

  useEffect(() => {
    fetchCurrentLimit();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-20 space-y-10">
      {/* 🔷 Input + Submit Card */}
      <div
        className="glassy-box p-8 shadow-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          color: "#fff",
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Set Transaction Limit</h2>
        <div className="p-inputgroup mb-4 flex items-center justify-center">
        <InputText
  placeholder="Enter limit (e.g. 1000)"
  value={limit}
  type="number"
  onChange={(e) => setLimit(e.target.value)}
  style={{
    padding: "1.7rem",
    fontSize: "1.6rem",
    borderRadius: "10px 0 0 10px",
    width: "100%",
    color: "#333",
    MozAppearance: "textfield",
  }}
  onKeyDown={(e) => {
    // Disallow 'e', '+', '-' etc.
    if (
      ["e", "E", "+", "-"].includes(e.key) ||
      (e.ctrlKey && e.key === "v") // Optional: block paste if needed
    ) {
      e.preventDefault();
    }
  }}
  inputMode="numeric"
/>

                  <Button
                      className="flex items-center justify-center px-6 "
            label="Change Limit"
            // icon="pi pi-check"
            onClick={handleSubmit}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              borderRadius: "0 10px 10px 0",
              backgroundColor: "#00C9A7",
              borderColor: "#00C9A7",
              color: "#fff",
              fontWeight: "600",
            }}
          />
        </div>
      </div>

      {/* 🔷 Display Card */}
      <div
        className="glassy-box p-6 shadow-lg text-center"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          color: "#fff",
        }}
      >
        <h3 className="text-2xl font-semibold mb-2">Current Transaction Limit</h3>
        <p className="text-3xl font-bold text-green-300">
          {currentLimit !== null ? `${currentLimit} Transactions Per Day` : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default TransactionLimit;
