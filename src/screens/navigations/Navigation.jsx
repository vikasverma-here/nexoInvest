/* eslint-disable no-constant-condition */
import { BrowserRouter } from "react-router-dom";
import Auth from "./Auth";
import Authenticate from "./Authenticate";

const Navigation = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        {token === null || token === "" || token === undefined ? (
          <Auth />
        ) : (
          <Authenticate />
        )}
      </BrowserRouter>
    </>
  );
};

export default Navigation;
