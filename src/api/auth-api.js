import axios from "axios";
import { backendConfig } from "../constants/content/MainContent";

const loginApiBaseAUrl = backendConfig.base + "/users";

console.log(loginApiBaseAUrl);
const token = localStorage.getItem("token");

export async function loginWithUserIDApi(payload) {
  console.log("Payload for /login:", payload); // 👈
  const response = await axios.post(`${loginApiBaseAUrl}/login`, payload, {
    withCredentials: true,
  });
  return response?.data;
}
export async function loginWithWallet(payload) {
  // console.log(payload);
  const response = await axios.post(`${loginApiBaseAUrl}/login`, payload, {
    withCredentials: true,
  });
  return response?.data;
}

export async function registerWithWallet(payload) {
  const finalPayload = {
    ...payload,
    referredBy: payload.referredBy || "NEXA8766",
  };

  const response = await axios.post(
    `${loginApiBaseAUrl}/register`,
    finalPayload,
    {
      withCredentials: true,
    }
  );

  return response?.data;
}

export async function verifyRegisterOtp(payload) {
  const response = await axios.post(
    `${loginApiBaseAUrl}/account/verify-otp`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function loginWithEmailAdminApi(payload) {
  const response = await axios.post(
    `${loginApiBaseAUrl}/admin/login`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response?.data;
}
export async function registerWithEmailApi(payload, ref) {
  const response = await axios.post(
    `${loginApiBaseAUrl}/register?referral=${ref}`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response?.data;
}
export async function getUserInfo() {
  const response = await axios.get(`${loginApiBaseAUrl}/get-Profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getAdminInfo() {
  const response = await axios.get(`${loginApiBaseAUrl}/admin/getProfile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function loginWithEmailAdmin(payload) {
  const response = await axios.post(
    `${loginApiBaseAUrl}/admin/login`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response?.data;
}

const userURL = backendConfig.base;

export async function createLevel() {
  const response = await axios.get(`${userURL}/levels/create`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
