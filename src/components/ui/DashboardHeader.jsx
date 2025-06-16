import { useEffect, useState } from "react";
import { getUserInfo } from "../../api/auth-api";
import { getAdminInfo } from "../../api/admin-api";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/slice/UserInfoSlice";
import { AuthenticatedRoutes } from "../../constants/Routes";
import { useNavigate } from "react-router-dom";
import PageLoader from "./PageLoader";
import { AiOutlineLogout } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import Swal from "sweetalert2";
import './Dashboard.css'

// ✅ Import your API functions
import { getBannerListUser, clearBannerNotification } from "../../api/user-api";

/* eslint-disable react/prop-types */
const DashboardHeader = ({ name }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.userInfo?.userInfo);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bannerNotification, setBannerNotification] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");

    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        if (role === "Admin") {
          const user = await getAdminInfo();
          dispatch(setUserInfo(user));
        } else {
          const user = await getUserInfo();
          dispatch(setUserInfo(user));
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || "Error fetching user info",
          confirmButtonText: "OK",
          timer: 3000,
        }).then(() => {
          localStorage.clear();
          // navigate("/news-and-notif")
        });
      } finally {
        setLoading(false);
       
      }
    };

    const fetchNotification = async () => {
      try {
        const res = await getBannerListUser();
        console.log(res?.data[0]?.uploadBanner);
        setBannerNotification(res?.data[0]?.uploadBanner);
      } catch (error) {
        console.error("Failed to fetch banner notification:", error);
      }
    };

    fetchUserInfo();
    fetchNotification();
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    navigate(AuthenticatedRoutes.USER_HOME);
    window.location.reload();
  };

  const handleNotificationClick = async () => {
    try {
      await clearBannerNotification(); // ✅ API call to clear flag
      setBannerNotification(false);
      navigate(AuthenticatedRoutes.NEWS_AND_NOTIF); // ✅ Update route if different
    } catch (error) {
      console.error("Failed to clear notification:", error);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="DashboardHeader ss-card">
        <div className="pageName">{name}</div>
        <div className="right">

          {/* 🔔 Notification Icon */}
          <button
            onClick={handleNotificationClick}
            className={`notificationBTN ${bannerNotification ? "blink" : ""}`}
            title="Banner Notification"
          >
            <BsBell size={22} />
          </button>

          {/* 👤 User Info */}
          <div
            onClick={() => navigate(AuthenticatedRoutes.USER_PROFILE)}
            className="user-login"
            style={{ cursor: "pointer" }}
          >
            <div className="img-card ss-card">
              <img
                src="https://img.icons8.com/3d-fluency/94/guest-male--v2.png"
                alt="user"
              />
            </div>
            <h5 className="name">
              Hii, {
                userInfo?.user?.role === "user"
                  ? userInfo?.user?.username || "User"
                  : userInfo?.user?.role === "admin"
                    ? "Admin"
                    : ""
              }
            </h5>
          </div>

          {/* 🚪 Logout */}
          <button onClick={logoutHandler} className="logoutBTN">
            <AiOutlineLogout />
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
