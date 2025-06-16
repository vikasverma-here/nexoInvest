/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import "../../styles/ModalStyle.css";
import TextInput from "./TextInput";
import { Button2 } from "./Buttons";
import { useState, useEffect } from "react";
import { emailValidator, otpValidator, passwordValidator } from "../../utils/inputValidator";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import PageLoader from "./PageLoader";
import TextInputPassword from "./TextInputPassword";

const ForgotPassword = ({ show, handleClose, apiFuncOtp, apiFuncReset }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [payload, setPayload] = useState({
    email: "",
    otp: "",
    newPassword: "", 
    confirmPassword: "",
  });
  const [otpSend, setOtpSend] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const validateEmail = () => {
    const error = emailValidator(email);
    if (error) {
      SwalError.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      return false;
    }
    return true;
  };

  const validateResetForm = () => {
    const emailError = emailValidator(payload.email);
    const otpError = otpValidator(payload.otp);
    const newPasswordError = passwordValidator(payload.newPassword);
    const confirmPasswordError = passwordValidator(payload.confirmPassword);

    if (emailError || otpError || newPasswordError || confirmPasswordError) {
      SwalError.fire({
        icon: "error",
        title: "Oops...",
        text: emailError || otpError || newPasswordError || confirmPasswordError,
      });
      return false;
    }

    if (payload.newPassword !== payload.confirmPassword) {
      SwalError.fire({
        icon: "error", 
        title: "Oops...",
        text: "Passwords do not match",
      });
      return false;
    }

    return true;
  };

  const handleSendOtpSubmit = async () => {
      if (!validateEmail()) return;

      try {
        setLoading(true);
        const response = await apiFuncOtp({ email });
          SwalSuccess.fire({
            icon: "success",
            title: "OTP Sent",
            text: response?.message,
          });
          setPayload(prev => ({...prev, email}));
          setOtpSend(true);
          setTimer(60);
      } catch (error) {
        SwalError.fire({
          icon: "error",
          title: "Oops...", 
          text: error?.response?.data?.message || "Something went wrong",
        });
      }finally{
        setLoading(false);
      }
  };
  const handleChangePasswordSubmit = async () => {
    if (!validateResetForm()) return;
    try {
      setLoading(true);
      const response = await apiFuncReset(payload);
        SwalSuccess.fire({
          icon: "success",
          title: "Password Reset Successfully",
          text: response?.message,
        });
        setPayload(prev => ({...prev, email}));
        setOtpSend(false);
        setEmail("");
        setPayload({
          email: "",
          otp: "",
          newPassword: "", 
          confirmPassword: "",
        });
        handleClose();
    } catch (error) {
      SwalError.fire({
        icon: "error",
        title: "Oops...", 
        text: error?.response?.data?.message || "Something went wrong",
      });
    }finally{
      setLoading(false);
    }
  }

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
      className=" ForgotPassword-modal"
      size="md"
    >
      {loading && <PageLoader/>}
      <Modal.Body>
        <div className="inner_box">
          <h5 className="main-heading" data-aos="fade-up">Forgot Password</h5>
          {otpSend ? (
            <>
              <div className="input_container">
                <TextInput
                  value={payload?.otp}
                  onChange={(e) => setPayload({ ...payload, otp: e.target.value })}
                  placeholder="OTP"
                  labelName={"Enter OTP"}
                  type="tel"
                  error={!otpValidator(payload?.otp)}
                  max={6}
                  min={6}
                />
                <TextInputPassword
                  value={payload?.newPassword}
                  onChange={(e) => setPayload({ ...payload, newPassword: e.target.value })}
                  placeholder="New Password"
                  error={!passwordValidator(payload?.newPassword)}
                  type="password"
                  labelName={"Enter New Password"}
                />
                <TextInput
                  value={payload?.confirmPassword}
                  onChange={(e) => setPayload({ ...payload, confirmPassword: e.target.value })}
                  placeholder="Confirm Password"
                  error={!passwordValidator(payload?.confirmPassword)}
                  type="password"
                  labelName={"Enter Confirm Password"}
                />
              </div>
              <div className="btns">
                <button 
                  type="button" 
                  style={{
                    fontSize: "1.6rem", 
                    color: timer > 0 ? "#999" : "var(--text-secondary)",
                    cursor: timer > 0 ? "not-allowed" : "pointer"
                  }} 
                  onClick={handleSendOtpSubmit} 
                  className="resend-btn"
                  disabled={timer > 0}
                >
                  {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                </button>
                <Button2 onClick={handleChangePasswordSubmit} name={"Submit"}/>
              </div>
            </>
          ) : (
            <>
              <div className="input_container">
                <TextInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  labelName={"Enter your email"}
                  error={!emailValidator(email)}
                />
              </div>
              <div className="btns">
                <Button2 onClick={handleSendOtpSubmit} name={"Send OTP"}/>
                <Button2 className="cancel-btn" onClick={handleClose} name={"Cancel"}/>
              </div>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPassword;
