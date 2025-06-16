/* eslint-disable react/prop-types */
import { Form, Modal } from "react-bootstrap";
import TextInput from "./TextInput";
import { Button2 } from "./Buttons";
import { IoMdCloseCircle } from "react-icons/io";
import { backendConfig } from "../../constants/content/MainContent";
import { useEffect, useState } from "react";
import PageLoader from "./PageLoader";
import { getAdminPaymentInfo, submitPaymentInfo } from "../../api/payment-api";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";

const PaymentAcceptModal = ({ show, onHide, paymentPayload, setPaymentPayload }) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(false);
 

  const [errors, setErrors] = useState({
    utrId: false,
    remark: false,
    screenshot: false,
  });

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        setLoading(true);
        const info = await getAdminPaymentInfo();
        setPaymentInfo(info);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentInfo();
  }, []);

//   useEffect(() => {
    

//     if (paymentInfo) {
//       setPaymentPayload({
//         amount: paymentInfo?.amount,
//         remark: "",
//         packageId: paymentInfo?.packageId,
//         recieverId: paymentInfo?.recieverId,
//         utrId: "",
//         screenshot: "",
//       });
//     }
//   }, [paymentInfo]);

  const validateForm = () => {
    const newErrors = {
      utrId: !paymentPayload.utrId,
      remark: !paymentPayload.remark,
      screenshot: !paymentPayload.screenshot,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async () => {
    console.log(paymentPayload)
    if (validateForm()) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("packageId", paymentPayload?.packageId);
        formData.append("recieverId", paymentPayload?.recieverId);
        formData.append("utrId", paymentPayload.utrId);
        formData.append("remark", paymentPayload.remark);
        formData.append("amount", paymentPayload.amount);
        formData.append("screenshot", paymentPayload.screenshot);
        
        const response = await submitPaymentInfo(formData);
        console.log(response);
        SwalSuccess.fire({
          title: "Success",
          text: response?.message,
          confirmButtonText: "OK",
          timer: 10000,
        })
        onHide();
      } catch (error) {
        console.error("Error submitting payment info:", error);
        SwalError.fire({
          title: "Error",
          text: error?.response?.data?.message || "Error submitting payment info",
          confirmButtonText: "OK",
        });
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Validation failed, please check the fields.");
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="PaymentAcceptModal">
        <Modal
          show={show}
          onHide={onHide}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          scrollable
          className="PaymentAcceptModal-modal"
        >
          <Modal.Body>
            <div className="inner">
              <button className="closeBtn" onClick={onHide}>
                <IoMdCloseCircle />
              </button>
              <div className="top-container">
                <span className="title">Scan QR Code</span>
                <p>Scan the QR code to make payment</p>
              </div>
              <div className="qr-img">
                <img
                  src={backendConfig?.origin + paymentInfo?.screenshotUrl}
                  alt="QR Code"
                />
              </div>
              <div className="btm-container">
                <span className="title">Upload Payment Proof</span>
                <div className="input-container">
                  <TextInput
                    placeholder={"Enter UTR ID"}
                    labelName="UTR ID *"
                    onChange={(e) =>
                      setPaymentPayload({
                        ...paymentPayload,
                        utrId: e.target.value,
                      })
                    }
                    error={errors.utrId && "UTR ID is required"}
                  />
                  <TextInput
                    placeholder={"Enter Remarks"}
                    labelName="Remarks *"
                    onChange={(e) =>
                      setPaymentPayload({
                        ...paymentPayload,
                        remark: e.target.value,
                      })
                    }
                    error={errors.remark && "Remarks are required"}
                  />
                  <Form.Group controlId="formFile" className="mb-3 image-input">
                    <Form.Label>Upload Transaction Screenshot *</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      size="lg"
                      onChange={(e) =>
                        setPaymentPayload({
                          ...paymentPayload,
                          screenshot: e.target.files[0],
                        })
                      }
                    />
                    {errors.screenshot && (
                      <div className="error-text">Screenshot is required</div>
                    )}
                  </Form.Group>
                </div>
                <Button2 name={"Submit"} onClick={handleSubmit} />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default PaymentAcceptModal;
