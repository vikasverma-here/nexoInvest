import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

export const AdminPaymentInfo = createSlice({
  name: "AdminPaymentInfo",
  initialState,
  reducers: {
    setAdminPaymentInfo: (state, action) => {
      console.log(action.payload);
      state.userInfo = action.payload;
    },
  },
});

export const { setAdminPaymentInfo } = AdminPaymentInfo.actions;
export default AdminPaymentInfo.reducer;
