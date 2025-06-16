import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { updateMinPackageAmount, getAdminInfo } from "../../api/admin-api";

const MinPackageAmount = () => {
  const [amount, setAmount] = useState("");
    const [adminData, setAdminData] = useState(null);
    const fetchProfile = async () => {
        try {
            const res = await getAdminInfo();
          //   console.log(res?.packageAmount)
          setAdminData(res?.packageAmount);
        } catch (error) {
          Swal.fire("Error", "Failed to fetch admin profile", "error");
        }
      };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//           const res = await getAdminInfo();
//         //   console.log(res?.packageAmount)
//         setAdminData(res?.packageAmount);
//       } catch (error) {
//         Swal.fire("Error", "Failed to fetch admin profile", "error");
//       }
//     };
//     fetchProfile();
//   }, []);

  const handleSubmit = async () => {
    if (!amount || isNaN(amount)) {
      Swal.fire("Validation Error", "Please enter a valid amount", "warning");
      return;
    }

    try {
      const res = await updateMinPackageAmount({ amount: Number(amount) });
      Swal.fire("Success", res?.message || "Amount updated successfully", "success");
        setAmount("");
        fetchProfile();
    } catch (error) {
      Swal.fire("Error", error?.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-10">
      {/* Input Form Card */}
      <div className="bg-white/20 backdrop-blur-md p-6 shadow-xl rounded-2xl border border-white/30 space-y-6">
        <h2 className="text-3xl font-extrabold text-white text-center mb-4">
          Set Minimum Package Amount
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-200 bg-white/30 text-lg text-white placeholder:text-white/80 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-lg text-white font-semibold py-3 px-5 rounded-lg shadow-md"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Admin Profile Display */}
      <div className="bg-white/20 backdrop-blur-md p-6 shadow-xl rounded-2xl border border-white/30 text-white">
        <h3 className="text-2xl font-semibold mb-3">Admin Profile</h3>
        {adminData ? (
          <div className="space-y-2 text-lg">
            <p><strong>Current Package Amount:</strong> {adminData} USDT</p>
          </div>
        ) : (
          <p className="text-white/70">Loading admin profile...</p>
        )}
      </div>
    </div>
  );
};

export default MinPackageAmount;
