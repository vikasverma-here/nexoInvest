/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { Button2 } from "../ui/Buttons";
import TextInput from "../ui/TextInput";
import { useState } from "react";
import { AuthenticatedRoutes } from "../../constants/Routes";
import PageLoader from "../ui/PageLoader";
import { emailValidator, passwordValidator } from "../../utils/inputValidator";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import { loginWithEmailAdminApi} from "../../api/admin-api";
import TextInputPassword from "../ui/TextInputPassword";
import Swal from "sweetalert2";
const AuthAdminLoginForm = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    let formErrors = {};
    let isValid = true;

    const emailError = emailValidator(payload.email);
    if (emailError) {
      formErrors.email = emailError;
      isValid = false;
    }

    const passwordError = passwordValidator(payload.password);
    if (passwordError) {
      formErrors.password = passwordError;
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleAdminLogin = async () => {
    if (!validate()) return;

    if (loading) return;
    setLoading(true);

    try {
      const response = await loginWithEmailAdminApi({
        email: payload.email,
        password: payload.password,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", "Admin");
      Swal.fire({
        icon: "success",
        title: "Login Success",
        text: "You have logged in successfully",
      }).then(() => {
        navigate(AuthenticatedRoutes.ADMIN_DASHBOARD);
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.response?.data.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="AuthLoginForm AuthAdminLoginForm content">
        <h5 className="main-heading" data-aos="fade-up">
          Welcome Back Admin<span className="hii">👋</span>
        </h5>
        <p data-aos="fade-up">
          Today is a new day. It's your day. You shape it. Sign in to start
          managing your projects.
        </p>
        <div data-aos="fade-up" className="input-container">
          <TextInput
            onChange={(e) => setPayload({ ...payload, email: e.target.value })}
            value={payload?.email}
            placeholder={"Example@gmail.com"}
            labelName="Email"
            error={errors.email}
          />
          <TextInputPassword
            type={"password"}
            value={payload?.password}
            onChange={(e) =>
              setPayload({ ...payload, password: e.target.value })
            }
            placeholder={"Enter Password"}
            labelName="Password"
            error={errors.password}
          />
        </div>

        <div data-aos="fade-up" className="btns">
          <Button2
            onClick={handleAdminLogin}
            name={"Sign In"}
            disabled={loading}
          />
        </div>
      </div>
    </>
  );
};

export default AuthAdminLoginForm;
