import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SwalSuccess, SwalError } from "../../utils/custom-alert";
import {
  updateMinMaxLimit,
  getAdminInfo,
} from "../../api/admin-api"; // ✅ getMinMaxLimit removed

const MinMaxLimit = () => {
  const [minInvestment, setMinInvestment] = useState("");
  const [maxInvestment, setMaxInvestment] = useState("");
  const [currentLimits, setCurrentLimits] = useState(null);

  const handleSubmit = async () => {
    if (!minInvestment || !maxInvestment || isNaN(minInvestment) || isNaN(maxInvestment)) {
      SwalError.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter valid numeric values.",
      });
      return;
    }

    try {
      const payload = {
        minInvestment: Number(minInvestment),
        maxInvestment: Number(maxInvestment),
      };
      const res = await updateMinMaxLimit(payload);

      SwalSuccess.fire({
        icon: "success",
        title: "Limits Updated",
        text: res?.data?.message || "Investment limits updated successfully.",
      });

      setMinInvestment("");
      setMaxInvestment("");
      fetchLimits(); // Refresh
    } catch (error) {
      console.error(error);
      SwalError.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.response?.data?.message || "Failed to update limits.",
      });
    }
  };

  const fetchLimits = async () => {
    try {
        const res = await getAdminInfo(); // ✅ change here
        console.log(res)
      setCurrentLimits(res?.withdrawalLimit);
    } catch (err) {
      console.error("Error fetching admin info:", err);
    }
  };

  useEffect(() => {
    fetchLimits();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-20 space-y-10">
      {/* Form Card */}
      <div
        className="glass-card p-8"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
          color: "#fff",
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Set Min & Max Withdrawal
        </h2>

        <div className="p-inputgroup mb-4">
          <InputText
            type="number"
            placeholder="Minimum Investment"
            value={minInvestment}
            onChange={(e) => setMinInvestment(e.target.value)}
            style={{
              padding: "1.5rem",
              fontSize: "1.2rem",
              borderRadius: "10px",
              width: "100%",
              color: "#333",
              MozAppearance: "textfield",
            }}
            onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
          />
        </div>

        <div className="p-inputgroup mb-6">
          <InputText
            type="number"
            placeholder="Maximum Investment"
            value={maxInvestment}
            onChange={(e) => setMaxInvestment(e.target.value)}
            style={{
              padding: "1.5rem",
              fontSize: "1.2rem",
              borderRadius: "10px",
              width: "100%",
              color: "#333",
              MozAppearance: "textfield",
            }}
            onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
          />
        </div>

        <Button
          label="Submit"
          icon="pi pi-check"
          onClick={handleSubmit}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            borderRadius: "10px",
            backgroundColor: "#00C9A7",
            borderColor: "#00C9A7",
            color: "#fff",
            fontWeight: "600",
            width: "100%",
          }}
        />
      </div>

      {/* Display Card */}
      <div
        className="glass-card p-6 text-center"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          color: "#fff",
        }}
      >
        <h3 className="text-xl font-semibold mb-2">Current Limits</h3>
        {currentLimits ? (
          <div className="text-lg">
            <p>
              <strong>Min:</strong> {currentLimits.minWithdraw} USDT
            </p>
            <p>
              <strong>Max:</strong> {currentLimits.maxWithdraw} USDT
            </p>
          </div>
        ) : (
          <p className="text-gray-300">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MinMaxLimit;
