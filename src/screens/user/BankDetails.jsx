// src/components/BankDetails.js

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button5 } from "../../components/ui/Buttons";
import TextInput from "../../components/ui/TextInput";
import {
  accountHolderNameValidator,
  accountNumberValidator,
  ifscCodeValidator,
  branchValidator,
  bankNameValidator,
  upiHolderNameValidator,
  upiAddressValidator,
  upiQrCodeValidator,
} from "../../utils/inputValidator";
import "../../styles/ProfilePage.css";
import PageLoader from "../../components/ui/PageLoader";
import { bankDetailSetup, upiDetailSetup } from "../../api/account-api";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";

const BankDetails = () => {
  const [loading, setLoading] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    holderName: "",
    accountNumber: "",
    ifscCode: "",
    branch: "",
    bankName: "",
  });

  const [upiDetails, setUpiDetails] = useState({
    upiHolderName: "",
    upiAddress: "",
    upiQrCode: null,
  });

  const [bankErrors, setBankErrors] = useState({});
  const [upiErrors, setUpiErrors] = useState({});

  const handleBankSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    newErrors.holderName = accountHolderNameValidator(bankDetails.holderName);
    newErrors.accountNumber = accountNumberValidator(bankDetails.accountNumber);
    newErrors.ifscCode = ifscCodeValidator(bankDetails.ifscCode);
    newErrors.branch = branchValidator(bankDetails.branch);
    newErrors.bankName = bankNameValidator(bankDetails.bankName);

    if (Object.values(newErrors).some((error) => error !== "")) {
      setBankErrors(newErrors);
    } else {
      bankDetailHandler();
      console.log("Bank Details submitted successfully!");

      setBankDetails({
        holderName: "",
        accountNumber: "",
        ifscCode: "",
        branch: "",
        bankName: "",
      });
      setBankErrors({});
    }
  };

  const bankDetailHandler = async () => {
    try {
      setLoading(true);
      const response = await bankDetailSetup(bankDetails);
      console.log(response);
      SwalSuccess.fire({
        title: "Success",
        text: response?.message,
        confirmButtonText: "OK",
        timer: 10000,
      });
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
  };

  const upiDetailHandler = async () => {
    try {
      setLoading(true);
      console.log(upiDetails);
      const formUpiData = new FormData();
      formUpiData.append('upiHolderName', upiDetails.upiHolderName);
      formUpiData.append('upiAddress', upiDetails.upiAddress);
      formUpiData.append('upiQrCode', upiDetails.upiQrCode);

      const response = await upiDetailSetup(formUpiData);
      console.log(response);
      SwalSuccess.fire({
        title: "Success",
        text: response?.message,
        confirmButtonText: "OK",
        timer: 10000,
      });
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
  };

  const handleUpiSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    newErrors.upiHolderName = upiHolderNameValidator(upiDetails.upiHolderName);
    newErrors.upiAddress = upiAddressValidator(upiDetails.upiAddress);
    newErrors.upiQrCode = upiQrCodeValidator(upiDetails.upiQrCode);

    if (Object.values(newErrors).some((error) => error !== "")) {
      setUpiErrors(newErrors);
    } else {
      upiDetailHandler();
      console.log("UPI Details submitted successfully!");

      setUpiDetails({
        upiHolderName: "",
        upiAddress: "",
        upiQrCode: null,
      });
      setUpiErrors({});
    }
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;

    if (section === "bank") {
      setBankDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (section === "upi") {
      setUpiDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="BankDetails ProfilePage martop">
        <div className="inner ss-card">
          <form onSubmit={handleBankSubmit}>
            <div className="head">
              <h5 className="heading">Bank Details</h5>
            </div>
            <div className="input-container mar-top">
              <TextInput
                name="holderName"
                placeholder={"Account Holder Name"}
                labelName="Account Holder Name"
                value={bankDetails.holderName}
                onChange={(e) => handleInputChange(e, "bank")}
                error={bankErrors.holderName}
              />

              <TextInput
                name="accountNumber"
                placeholder={"Account Number"}
                labelName="Account Number"
                value={bankDetails.accountNumber}
                onChange={(e) => handleInputChange(e, "bank")}
                error={bankErrors.accountNumber}
              />

              <TextInput
                name="ifscCode"
                placeholder={"IFSC Code"}
                labelName="IFSC Code"
                value={bankDetails.ifscCode}
                onChange={(e) => handleInputChange(e, "bank")}
                error={bankErrors.ifscCode}
              />

              <TextInput
                name="branch"
                placeholder={"Branch"}
                labelName="Branch"
                value={bankDetails.branch}
                onChange={(e) => handleInputChange(e, "bank")}
                error={bankErrors.branch}
              />

              <TextInput
                name="bankName"
                placeholder={"Bank Name"}
                labelName="Bank Name"
                value={bankDetails.bankName}
                onChange={(e) => handleInputChange(e, "bank")}
                error={bankErrors.bankName}
              />
            </div>

            <div className="btns">
              <Button5 type="submit" name={"Submit Bank Details"} />
            </div>
          </form>
        </div>

        <div className="inner ss-card mar-top">
          <form onSubmit={handleUpiSubmit}>
            <div className="head">
              <h5 className="heading">UPI Payment Details</h5>
            </div>
            <div className="input-container mar-top">
              <TextInput
                name="upiHolderName"
                placeholder={"UPI Holder Name"}
                labelName="UPI Holder Name"
                value={upiDetails.upiHolderName}
                onChange={(e) => handleInputChange(e, "upi")}
                error={upiErrors.upiHolderName}
              />

              <TextInput
                name="upiAddress"
                placeholder={"UPI Address"}
                labelName="UPI Address"
                value={upiDetails.upiAddress}
                onChange={(e) => handleInputChange(e, "upi")}
                error={upiErrors.upiAddress}
              />

              <div className="inputFieldBox">
                <Form.Group controlId="formFile" className="mb-3 image-input">
                  <Form.Label className="inputLabel mb-3">
                    Upload UPI QR Code
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    size="lg"
                    onChange={(e) => {
                      setUpiDetails((prev) => ({
                        ...prev,
                        upiQrCode: e.target.files[0],
                      }));
                    }}
                  />
                </Form.Group>
                {upiErrors.upiQrCode && (
                  <div className="error">{upiErrors.upiQrCode}</div>
                )}
              </div>
            </div>

            <div className="btns">
              <Button5 type="submit" name={"Submit UPI Details"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BankDetails;
