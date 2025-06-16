/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import "../../styles/ModalStyle.css";
import { useEffect, useRef, useState } from "react";

const OTPPopup_v1 = ({
  show,
  contactValue,
  verifiedOtp,
  loader,
  // handleClose,
  otpPopupError,
  resendOtp,
}) => {
  const otpInputsRef = useRef([]);
  const formRef = useRef(null);
  const [resendTimer, setResendTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [fieldErrors, setFieldError] = useState("");

  useEffect(() => {
    setFieldError("");
  }, [show]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleResendOtp = () => {
    if (isResendDisabled) return;
    resendOtp();
    setResendTimer(60);
    setIsResendDisabled(true);
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.length === 1) {
      // Move to the next input
      if (index < otpInputsRef.current.length - 1) {
        otpInputsRef.current[index + 1].focus();
      }
    } else if (value.length === 0) {
      // Move to the previous input
      if (index > 0) {
        otpInputsRef.current[index - 1].focus();
      }
    }
  };

  const setInputsOtp = () => {
    let otp = "";
    const otpInputs = otpInputsRef.current;
    for (let i = 0; i < otpInputs.length; i++) {
      otp += otpInputs[i].value;
    }

    if (otp.length !== 6) {
      setFieldError("Please enter a valid OTP");
      return;
    } else {
      verifiedOtp(otp);
      loader(true);
    }
  };

  // Handle Enter key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setInputsOtp();
      }
    };

    const formElement = formRef.current;
    if (formElement) {
      formElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [setInputsOtp]);

  // Mask email
  const maskEmail = (email) => {
    if (typeof email !== "string" || !email.includes("@")) {
      return email;
    }

    const [localPart, domain] = email.split("@");
    if (!domain) {
      return email; // Return the original email if the format is incorrect
    }

    const maskedLocalPart =
      localPart.slice(0, 2) + "****" + localPart.slice(-2);
    const [domainName, domainExtension] = domain.split(".");
    if (!domainExtension) {
      return email; // Return the original email if the domain format is incorrect
    }

    const maskedDomainName =
      domainName.slice(0, 2) + "****" + domainName.slice(-2);
    return `${maskedLocalPart}@${maskedDomainName}.${domainExtension}`;
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      // onHide={handleClose}
      className="OTPPopup_v1"
      size="md"
    >
      <Modal.Body>
        <div className="inner_box" ref={formRef}>
          <div className="input_container">
            <div className="AuthVerifyOtpForm_v1">
              <div className="innerBody">
                <h3 className="heading">Verify OTP</h3>
                <p className="valueNumber">
                  Enter the verification code we sent to { maskEmail(contactValue)}
                </p>
                <div className="input_container_inner">
                  <p className="headingName">Enter 6 digit code</p>
                  <div className="fourInput">
                    {Array.from({ length: 6 }, (_, index) => (
                      <input
                        key={index}
                        autoFocus={index === 0}
                        minLength={1}
                        maxLength={1}
                        className={`auth-mobile-otp ${
                          otpPopupError || fieldErrors ? "error" : ""
                        }`}
                        type="text"
                        ref={(el) => (otpInputsRef.current[index] = el)}
                        onChange={(e) => handleChange(e, index)}
                      />
                    ))}
                  </div>
                  {otpPopupError ? (
                    <span className="errorMsg">{otpPopupError}</span>
                  ) : (
                    fieldErrors && (
                      <span className="errorMsg">{fieldErrors}</span>
                    )
                  )}
                  <button onClick={setInputsOtp} className="verify">
                    Verify
                  </button>
                  {/* <span className="resend">
                    Not received your code?
                    <button
                      onClick={handleResendOtp}
                      disabled={isResendDisabled}
                    >
                      Resend {resendTimer > 0 ? `(${resendTimer}s)` : ""}
                    </button>
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OTPPopup_v1;
