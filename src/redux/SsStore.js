import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./slice/UserInfoSlice";
import { AdminPaymentInfo } from "./slice/AdminPaymentInfo";

const SsStore = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    AdminPaymentInfo: AdminPaymentInfo,
  },
});

export default SsStore;
