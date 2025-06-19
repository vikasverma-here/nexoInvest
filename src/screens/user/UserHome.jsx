/* eslint-disable react/no-unescaped-entities */
import "../../styles/user/UserHome.css";
import SSDataTable from "../../components/SSDataTable";
import { Button5 } from "../../components/ui/Buttons";
import { useState } from "react";
import cardImg from "../../assets/cardImg.png";
import { useNavigate } from "react-router-dom";
import { AuthenticatedRoutes } from "../../constants/Routes";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateFunctions";
import { FaRegCopy } from "react-icons/fa6";

const UserHome = () => {
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.userInfo.userInfo);
    const [copiedText1, setCopiedText1] = useState(false);

    const location = window.location.origin;
    const referCode = `${location}/register?referral=${userInfo?.user?.referralCode}`;

    const user = userInfo?.user;

    const userData = {
        username: user?.username,
        date_of_joining: formatDate(user?.createdAt) || "NA",
        date_of_activation: user?.activeDate ? formatDate(user?.activeDate) : "NA",
        renewal_status: user?.status ? "Active" : "Inactive",
    };

    const handleCopy = (text, setCopiedState) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedState(true);
            setTimeout(() => setCopiedState(false), 2000);
        }).catch((err) => {
            console.error("Failed to copy text: ", err);
        });
    };

    const IncomeCard = ({ title, value, img }) => (
        <div className="income-card ss-card">
            <div className="left">
                <h5>{title}</h5>
                <p>${value}</p>
            </div>
            <div className="right">
                <img src={img} alt={title} />
            </div>
        </div>
    );

    return (
        <div className="UserHome">
            <div className="top-wrapper martop">
                <div className="ss-card welcome-card">
                    <div className="top">
                        <h5 className="heading">
                            Welcome <span className="text-capitalize">{user?.username || "User"}</span>!
                        </h5>
                    </div>
                    <p className="para1">We're happy to have you on board.</p>
                    <div className="content">
                        <div className="c-left">
                            <span className="para1 bold">Ready to get started?</span>
                            <p className="para1">Check out your dashboard to begin!</p>
                            <div className="btn-box">
                                <Button5 onClick={() => navigate(AuthenticatedRoutes.OUR_PLANS)} name={"Buy Nexo"} />
                            </div>
                        </div>
                        <div className="c-right">
                            <img src={cardImg} alt="gift icon" className="gift-icon" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="income-wrapper mar-top">
                <IncomeCard
                    title="Total Income"
                    value={user?.totalEarnings?.toFixed(2) || "0"}
                    img="https://img.icons8.com/3d-fluency/94/cash-in-hand.png"
                />
                <IncomeCard
                    title="Wallet Balance"
                    value={user?.currentEarnings?.toFixed(2) || "0"}
                    img="https://img.icons8.com/3d-fluency/94/coin-wallet.png"
                />
                <IncomeCard
                    title="Total Investment"
                    value={user?.totalInvestment?.toFixed(2) || "0"}
                    img="https://img.icons8.com/3d-fluency/94/growing-money.png"
                />
                <IncomeCard
                    title="Referral Income"
                    value={user?.directReferalAmount?.toFixed(2) || "0"}
                    img="https://img.icons8.com/3d-fluency/94/expensive-price.png"
                />
                <IncomeCard
                    title="ROI Income"
                    value={user?.dailyRoi?.toFixed(2) || "0"}
                    img="https://img.icons8.com/3d-fluency/94/business-management.png"
                />
                <IncomeCard
                    title="Level Income"
                    value={user?.levelIncome?.toFixed(2) || "0"}
                    img="https://img.icons8.com/isometric/50/no-connection.png"
                />
                <IncomeCard
                    title="Referral Member"
                    value={user?.referedUsers?.length || "0"}
                    img="https://img.icons8.com/isometric/50/user.png"
                />
                <IncomeCard
                    title="Total Payout"
                    value={user?.totalPayouts?.toFixed(2) || "0"}
                    img="https://img.icons8.com/3d-fluency/94/money-mouth-face-1.png"
                />
            </div>

            <div className="detail-wrapper">
                <div className="left ss-card">
                    <div className="head">
                        <h5 className="cardHeading">About Me</h5>
                        <div className="detail-table">
                            <table>
                                <tbody>
                                    {Object.entries(userData).map(([key, value]) => (
                                        <tr key={`detail-${key}`}>
                                            <td>{key.replaceAll("_", " ")}</td>
                                            <td>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="ss-card copy-code-wrapper martop">
                        <p>Your Refer Code</p>
                        <div className="code">
                            <span className="codebox">{referCode}</span>
                            <button onClick={() => handleCopy(referCode, setCopiedText1)}>
                                {copiedText1 ? "Copied!" : <FaRegCopy />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ss-card mar-top">
                <div className="head">
                    <h5 className="cardHeading">Direct Referral History</h5>
                </div>
                <SSDataTable data={user?.referedUsers} />
            </div>
        </div>
    );
};

export default UserHome;
