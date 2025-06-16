/* eslint-disable react/prop-types */
import sideImg from "../../assets/auth/sideImg.png";
import bgVideo from "../../assets/website/bgVideo.mp4";
import bgImg from "../../assets/authh.png"
import "../../styles/auth/AuthMain.css";

/* eslint-disable react/no-unescaped-entities */
const AuthMain = ({ inner }) => {
  return (
    <div className="AuthMain1 bgColor md:px-10">
      {/* <video autoPlay loop muted playsInline>
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <div
        data-aos="fade-right"
        className="AuthMain"
      // style={{ backgroundImage: `url(${bgImageLogin}) ` }}
      >
        <div className="auth-inner ">
          <div className="  hidden md:block  items-center justify-center">
            <img src={bgImg} className="md:w-[80%]" alt="" />

          </div>
          <div className="container-box">
            {inner}
            <div data-aos="fade-left" className="side-img">

              {/* <img src={sideImg} alt="" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthMain;
