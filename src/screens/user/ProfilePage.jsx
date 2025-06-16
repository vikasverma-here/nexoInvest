import { useSelector } from "react-redux";
import { Button5 } from "../../components/ui/Buttons";
import TextInput from "../../components/ui/TextInput";
import "../../styles/ProfilePage.css";
const ProfilePage = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  console.log(userInfo)
  return (
    <>
      <div className="ProfilePage martop">
        <div className="inner ss-card">
          {/* <div className="profileImg">
            <img src="" alt="" />
          </div> */}
          <div className="input-container">
            <TextInput disabled={"disabled"} placeholder={"Name"} defaultValue={userInfo?.user?.username} labelName="Name" />
            <TextInput disabled={"disabled"} placeholder={"Mobile"} defaultValue={userInfo?.user?.mobile} labelName="Mobile" />
            <TextInput disabled={"disabled"} placeholder={"Email"} defaultValue={userInfo?.user?.email} labelName="Email" />
            <TextInput disabled={"disabled"} placeholder={"Joining Date"} defaultValue={userInfo?.user?.createdAt} labelName="Joining Date" />
            <TextInput disabled={"disabled"} placeholder={"Status"} defaultValue={userInfo?.user?.isActive ? "Active" : "Inactive"} labelName="Status" />
          </div>
          {/* <div className="btns">
            <Button5 name={"Edit"} />
          </div> */}
        </div>
        
      </div>
    </>
  );
};

export default ProfilePage;
