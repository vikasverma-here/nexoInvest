/* eslint-disable react/prop-types */
import { FaCircle } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import "../../styles/Achievement.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Achievement = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [levelData, setLevelData] = useState([]);

  useEffect(() => {
    setLevelData(userInfo?.levelArray);
  }, [userInfo]);

  return (
    <div className="Achievement martop">
      <div className="square1"></div>
      <div className="inner-box">
        {levelData?.map((level) => (
          <div className="box1" key={`${level?.levelType}-${level?.level}`}>
            <div className="icon">
              {level?.status === "Done" ? <GiCheckMark /> : <FaCircle />}
            </div>
            <div className="txt text-center">
              {level?.levelType}
              <br />
              <br />
              Total - {level?.totalUsers}
              <br />
              <br />
              Total left - {level?.userLeft}
              <br />
              <br />
              Direct left - {level?.directUser}
            </div>
          </div>
        ))}
      </div>
      <div className="square1"></div>
    </div>
  );
};

export default Achievement;
