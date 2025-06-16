import Header from "../../components/website/Header";
import "../../styles/website/UserMain.css";
import UserHome from "./UserHome";
import videoBg from "../../assets/website/bgVideo.mp4"; // Make sure your video is inside src/assets
import UsersHome from "./UsersHome";
import App2 from "../App2";

const UserMain = () => {
  return (
    <>
      <div className="UserMain">
        {/* <video autoPlay loop muted playsInline>
          <source src={videoBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        {/* <Header /> */}
        {/* <UserHome /> */}
        {/* <UsersHome /> */}

        <App2/>
      </div>
    </>
  );
};

export default UserMain;
