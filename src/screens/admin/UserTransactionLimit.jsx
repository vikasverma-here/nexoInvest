import React, { useState } from "react";
import { setUserTransactionLimit } from "../../api/admin-api"; // Adjust path as needed
import Swal from "sweetalert2";

const UserTransactionLimit = () => {
  const [formData, setFormData] = useState({
    username: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: formData.username,
      amount: Number(formData.amount),
    };

    try {
      const res = await setUserTransactionLimit(payload);
      Swal.fire("Success", res?.message || "Limit updated", "success");
    } catch (error) {
      Swal.fire("Error", error?.message || "Something went wrong", "error");
    }
  };

  return (
    <div className=" flex items-center justify-center  ">
      <form
        onSubmit={handleSubmit}
        className="w-full gap-4  backdrop-blur-md p-10 rounded-xl shadow-xl border border-white/20 text-white "
      >
        <h2 className="text-2xl font-bold text-center mb-6">Set Transaction Limit</h2>

        <div className="mb-4 ">
          <label className="block mb-1 text-sm">Username or User ID</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username or ID"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm">Amount Limit</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserTransactionLimit;
