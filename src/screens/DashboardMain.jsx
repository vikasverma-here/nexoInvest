/* eslint-disable react/prop-types */
import bgVideo from '../assets/website/bgVideo.mp4';
import DashboardHeader from "../components/ui/DashboardHeader";
import Sidebar from "../components/ui/Sidebar";
import "../styles/DashboardMain.css";
const DashboardMain = ({ inner, name }) => {
  return (
    <>
      <div className="AuthMain1 bgColor">
        {/* <video autoPlay loop muted playsInline>
                  <source src={bgVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video> */}
        <div className="DashboardMain">
          <Sidebar />

          <div className="right-wrapper">
            <DashboardHeader name={name} />
            {inner}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMain;
