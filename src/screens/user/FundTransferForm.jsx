import { useSelector } from "react-redux";
import { Button5 } from "../../components/ui/Buttons";
import SelectInput from "../../components/ui/SelectInput";
import TextInput from "../../components/ui/TextInput";
import "../../styles/ProfilePage.css";
import { useEffect, useState } from "react";
import { transferFund } from "../../api/payment-api";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";

const FundTransferForm = () => {
  const UserInfo = useSelector((state) => state.userInfo.userInfo);
  const userList = UserInfo?.user?.partners;
  const [loading, setLoading] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
  const [formData, setFormData] = useState({
    selectedUser: "",
    userId: "",
    amount: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userList) {
      const options = userList.map((user) => ({
        value: user._id,
        label: user.username,
      }));
      setUserOptions(options);
    }
  }, [userList]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "selectedUser") {
      const selectedUser = userList.find((user) => user._id === value);
      setFormData((prev) => ({
        ...prev,
        selectedUser: value,
        userId: selectedUser ? selectedUser._id : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.selectedUser) newErrors.selectedUser = "User is required.";
    if (!formData.userId) newErrors.userId = "User ID is required.";
    if (!formData.amount || isNaN(formData.amount))
      newErrors.amount = "Amount must be a valid number.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // console.log("Form submitted successfully with data:", formData);
      fundTransferHandler();

      setFormData({
        selectedUser: "",
        userId: "",
        amount: "",
      });
      setErrors({});
    }
  };

  const fundTransferHandler = async () => {
    try {
      setLoading(true);
      const response = await transferFund(formData);
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

  return (
    <>
      {" "}
      {loading && <PageLoader />}
      <div className="ProfilePage FundTransferForm martop">
        <div className="inner ss-card">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <SelectInput
                labelName="User Name"
                options={userOptions}
                value={formData.selectedUser}
                onChange={handleChange}
                name="selectedUser"
                error={errors.selectedUser}
              />

              <TextInput
                name="userId"
                placeholder="User Id"
                labelName="User Id"
                value={formData.userId}
                onChange={handleChange}
                error={errors.userId}
                disabled={!formData.selectedUser}
              />

              <TextInput
                name="amount"
                placeholder="Amount"
                labelName="Amount"
                value={formData.amount}
                onChange={handleChange}
                error={errors.amount}
              />
            </div>
            <div className="btns">
              <Button5 type="submit" name="Submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FundTransferForm;
