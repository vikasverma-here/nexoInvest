import { ethers } from "ethers";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  sendOtp,
  sendWithdrawalresponse,
} from "../../api/payment-api";

import { Button5 } from "../../components/ui/Buttons";
import PageLoader from "../../components/ui/PageLoader";
import TextInput from "../../components/ui/TextInput";
import { SwalError } from "../../utils/custom-alert";

const Withdrawal = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(50);
  const [otp, setOtp] = useState("");
  const [qrCode, setQrCode] = useState(localStorage.getItem("qrCode") || "");
  const [secretKey, setSecretKey] = useState(localStorage.getItem("secretKey") || "");
  const [showOtpStep, setShowOtpStep] = useState(localStorage.getItem("showOtpStep") === "true");
  const [isFirstTime2FA, setIsFirstTime2FA] = useState(localStorage.getItem("isFirstTime2FA") === "true");

  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const walletAddress = userInfo?.user?.walletAddress;
  const balance = userInfo?.user?.currentEarnings || 0;

  const platformFee = (amount * 10) / 100;
  const netAmount = amount - platformFee;

  const clear2FAStorage = () => {
    localStorage.removeItem("qrCode");
    localStorage.removeItem("secretKey");
    localStorage.removeItem("showOtpStep");
    localStorage.removeItem("isFirstTime2FA");
  };

  const handleWithdrawClick = async () => {
    if (amount > balance) {
      return SwalError.fire({
        title: "Error",
        text: "Insufficient Wallet Balance",
        confirmButtonText: "OK",
        timer: 4000,
      });
    }

    try {
      setLoading(true);
      const response = await sendOtp({ walletAddress });
      const res = response?.data || response;

      if (res?.success) {
        if (res?.qrCode && res?.secret) {
          setQrCode(res.qrCode);
          setSecretKey(res.secret);
          setIsFirstTime2FA(true);

          localStorage.setItem("qrCode", res.qrCode);
          localStorage.setItem("secretKey", res.secret);
          localStorage.setItem("isFirstTime2FA", "true");
        } else {
          setIsFirstTime2FA(false);
          localStorage.setItem("isFirstTime2FA", "false");
        }

        setShowOtpStep(true);
        localStorage.setItem("showOtpStep", "true");
      } else {
        throw new Error(res?.message || "Failed to initiate 2FA");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "2FA Init Failed",
        text: error?.response?.data?.message || error.message || "Something went wrong.",
        timer: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSend = async () => {
    if (!otp) {
      return SwalError.fire({
        title: "Missing OTP",
        text: "Please enter the OTP.",
        confirmButtonText: "OK",
        timer: 4000,
      });
    }

    try {
      setLoading(true);

      if (!window.ethereum) {
        throw new Error("MetaMask or compatible wallet not found.");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      await signer.getAddress(); // Ensure wallet is connected

      const res = await sendWithdrawalresponse({
        userWalletAddress: walletAddress,
        amount,
        otp,
      });

      if (res?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Withdrawal Successful",
          text: `Transaction initiated for $${netAmount} USDT.`,
          confirmButtonText: "Ok",
        }).then(() => {
          clear2FAStorage();
          window.location.reload();
        });
      } else {
        throw new Error(res?.data?.message || "Failed to process withdrawal");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Transaction Failed",
        text: error?.response?.data?.message || error.message || "Something went wrong.",
        timer: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="Withdrawal">
        <div className="ss-card half martop">
          <div className="top">
            <h5 className="heading">
              Main Wallet: ${balance.toFixed(2)}
            </h5>
          </div>

          <div className="input-container">
            <TextInput
              placeholder="Enter Amount"
              labelName="Amount"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            />
            <div style={{ color: "white", padding: "10px" }}>
              Platform Fee (10%): ${platformFee.toFixed(2)}<br />
              Net You Receive: ${netAmount.toFixed(2)}
            </div>
          </div>

          {!showOtpStep ? (
            <div className="btns">
              <Button5 onClick={handleWithdrawClick} name="Withdraw" />
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "20px" }}>
              {isFirstTime2FA && qrCode && (
                <>
                  <img
                    src={qrCode}
                    alt="QR Code"
                    style={{ maxWidth: "300px", marginBottom: "10px" }}
                  />
                  <p style={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>
                    Scan this QR with your Authenticator app
                  </p>
                </>
              )}
              <TextInput
                placeholder="Enter OTP"
                labelName="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <div className="btns" style={{ marginTop: "15px" }}>
                <Button5 onClick={handleOtpSend} name="Confirm OTP" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
