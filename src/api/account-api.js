import axios from "axios";
import { backendConfig } from "../constants/content/MainContent";

const apiURL = backendConfig.base;
const token = localStorage.getItem("token");

export async function bankDetailSetup(payload) {
  const response = await axios.post(
    `${apiURL}/user/account/payment/details`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}
export async function upiDetailSetup(payload) {
  const response = await axios.post(
    `${apiURL}/user/upi/payment/details`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getAllUsers() {
  const response = await axios.get(`${apiURL}/admin/all-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
