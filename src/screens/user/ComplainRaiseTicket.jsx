import { useState } from "react";
import { Button5 } from "../../components/ui/Buttons";
import TextInput from "../../components/ui/TextInput";
import PageLoader from "../../components/ui/PageLoader";
import TextareaField from "../../components/ui/TextareaField";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import { raiseSupportRequest } from "../../api/user-api";

const ComplainRaiseTicket = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!payload.subject.trim()) {
      SwalError.fire({
        title: "Error",
        text: "Subject is required.",
        confirmButtonText: "OK",
        timer: 2000,
      });
      return false;
    }
    if (!payload.message.trim()) {
      SwalError.fire({
        title: "Error",
        text: "Message is required.",
        confirmButtonText: "OK",
        timer: 2000,
      });
      return false;
    }
    return true;
  };

  const submitSupport = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await raiseSupportRequest(payload);
      SwalSuccess.fire({
        title: "Success",
        text: "Request raised successfully",
        confirmButtonText: "OK",
        timer: 2000,
      });
      setPayload({ subject: "", message: "" });
    } catch (err) {
      console.log(err);
      SwalError.fire({
        title: "Error",
        text: err?.response?.data?.message || "Something went wrong, please try again",
        confirmButtonText: "OK",
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="Withdrawal ComplainRaiseTicket">
        <div className="ss-card half martop">
          <div className="input-container">
            <TextInput
              onChange={handleInputChange}
              placeholder="Enter Subject"
              labelName="Subject"
              value={payload.subject}
              name="subject"
            />
            <TextareaField
              onChange={handleInputChange}
              placeholder="Enter Message"
              labelName="Message"
              value={payload.message}
              name="message"
            />
          </div>
          <div className="btns">
            <Button5 onClick={submitSupport} name="Submit" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplainRaiseTicket;
