// `/* eslint-disable no-unused-vars */
// /* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { Button2, Button5 } from "../ui/Buttons";
import { useRef, useState } from "react";
import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
import PageLoader from "../ui/PageLoader";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import { loginWithUserIDApi, loginWithWallet } from "../../api/auth-api";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import WalletOptionModal from "../ui/WalletOptionModal";
import {
    emailValidator,
    fieldValidator,
    passwordValidator,
} from "../../utils/inputValidator";
import TextInputPassword from "../ui/TextInputPassword";
import TextInput from "../ui/TextInput";

const AuthLoginForm = () => {
    const [loginPayload, setLoginPayload] = useState({
        userId: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [showOptionModal, setShowOptionModal] = useState(false);
    const [walletDetails, setWalletDetails] = useState({});
    const [errors, setErrors] = useState({});
    const walletAddRef = useRef(null);
    const navigate = useNavigate();

    const validate = () => {
        let formErrors = {};
        let isValid = true;

        const userIdError = fieldValidator(loginPayload.userId);
        if (userIdError) {
            formErrors.userId = userIdError;
            isValid = false;
        }

        const passwordError = passwordValidator(loginPayload.password);
        if (passwordError) {
            formErrors.password = passwordError;
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleLoginSubmit = async () => {
        if (!validate()) return;
        if (loading) return;
        setLoading(true);

        try {
            const response = await loginWithUserIDApi({
                userId: loginPayload.userId,
                password: loginPayload.password,
            });

            SwalSuccess.fire({
                icon: "success",
                title: "Login Success",
                text: "You have logged in successfully",
            });
            localStorage.setItem("token", response.token);
            localStorage.setItem("role", "User");

            setTimeout(() => {
                handleNavigate();
            }, 2000);
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

    const handleNavigate = () => {
        navigate(AuthenticatedRoutes.USER_DASHBOARD);
        window.location.reload();
    };

    const handleWalletLogin = async (walletAddress, type) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await loginWithWallet({
                walletAddress,
                type,
            });

            localStorage.setItem("token", response.token);
            localStorage.setItem("role", "User");

            Swal.fire({
                icon: "success",
                title: "Login Success",
                text: "You have logged in successfully",
                timer: 2000,
            }).then(() => {
                handleNavigate();
            });
        } catch (error) {
            console.log("Wallet login error:", error);
            SwalError.fire({
                icon: "error",
                title: "Login Failed",
                text: error?.response?.data.message || error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const connectWallet = async (type) => {
        setShowOptionModal(false);

        if (!window.ethereum) {
            SwalError.fire({
                icon: "error",
                title: "Wallet Not Found",
                text: "MetaMask, SafePal, or Trust Wallet is not installed!",
                timer: 3000,
            });
            return;
        }

        try {
            setLoading(true);

            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x38" }],
            });


            if (type === "safepal") {
                const isSafePal =
                    window.ethereum.isSafePal ||
                    navigator.userAgent.toLowerCase().includes("safepal");
                if (!isSafePal) throw new Error("Please use SafePal wallet.");
            }

            if (type === "trustwallet") {
                const isTrustWallet =
                    window.ethereum.isTrust ||
                    window.ethereum.isTrustWallet ||
                    navigator.userAgent.toLowerCase().includes("trust");

                if (!isTrustWallet) {
                    throw new Error("Please use Trust Wallet or open the site in Trust Wallet's browser.");
                }
            }

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();
            walletAddRef.current = walletAddress;

            const ethBalanceInWei = await provider.getBalance(walletAddress);
            const ethBalance = ethers.formatUnits(ethBalanceInWei, "ether");

            const bscProvider = new ethers.JsonRpcProvider(
                "https://bsc-dataseed.binance.org/"
            );
            const bnbBalanceInWei = await bscProvider.getBalance(walletAddress);
            const bnbBalance = ethers.formatUnits(bnbBalanceInWei, "ether");

            setWalletDetails({
                address: walletAddress,
                ethBalance,
                bnbBalance,
            });

            await handleWalletLogin(walletAddress, type);
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            SwalError.fire({
                icon: "error",
                title: "Wallet Connection Failed",
                text: error.message || "Could not connect wallet.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <PageLoader />}
            {showOptionModal && (
                <WalletOptionModal
                    connectWallet={connectWallet}
                    hide={() => setShowOptionModal(false)}
                />
            )}
            <div className="AuthLoginForm content">
                <h5 className="main-heading" data-aos="fade-up">
                    Welcome Back
                </h5>
                <p data-aos="fade-up">
                    Today is a new day. It's your day. You shape it. Sign in to start managing your projects.
                </p>
                {/* <div data-aos="fade-up" className="input-container">
                    <TextInput
                        onChange={(e) =>
                            setLoginPayload({
                                ...loginPayload,
                                userId: e.target.value,
                            })
                        }
                        value={loginPayload.userId}
                        placeholder={"UserId"}
                        labelName="UserId"
                        error={errors.userId}
                    />
                    <TextInputPassword
                        value={loginPayload.password}
                        onChange={(e) =>
                            setLoginPayload({
                                ...loginPayload,
                                password: e.target.value,
                            })
                        }
                        placeholder={"Enter Password"}
                        labelName="Password"
                        error={errors.password}
                    />
                    <Button2
                        onClick={handleLoginSubmit}
                        name={"Sign In"}
                        disabled={loading}
                    />
                </div> */}
                {/* <p data-aos="fade-up" className="text-center">Or</p> */}
                <div data-aos="fade-up" className="btns">
                    <Button5
                        onClick={() => setShowOptionModal(true)}
                        name={"Login With Wallet"}
                        disabled={loading}
                        className="w-full"
                    />
                </div>
                <span data-aos="fade-up" className="accontTggle text-base text-gray-400">
                    Don’t have an account?
                    <Link
                        to={AuthRoutes.REGISTER}
                        className="ml-2 text-[1.4rem] font-bold text-white underline hover:text-blue-400 transition"
                    >
                        Sign up
                    </Link>
                </span>

            </div>
        </>
    );
};

export default AuthLoginForm;
