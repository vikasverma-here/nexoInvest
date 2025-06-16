import { useNavigate } from "react-router-dom";
import { MainContent } from "../../constants/content/MainContent";
import { Button1 } from "../ui/Buttons";
import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";
import { TfiMenu } from "react-icons/tfi";
import logo from '../../assets/website/nexoLogo.png'


const Header = () => {
  const headerData = [
    {
      id: "home",
      name: "Home",
    },
    {
      id: "about",
      name: "About",
    },
    {
      id: "services",
      name: "Services",
    },
    {
      id: "plans",
      name: "Plans",
    },
    {
      id: "contact",
      name: "Contact",
    },
  ];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (localStorage.getItem("token")) {
      navigate(AuthenticatedRoutes.USER_DASHBOARD);
    } else {
      navigate(AuthRoutes.LOGIN);
    }
  };

  return (
    <>
      <div className="Header">
        <div className="Header-inner section-inner">
          <button onClick={() => setOpen(true)} className="navToggle">
            <TfiMenu />
          </button>
          <div data-aos="fade-right" className="logo box-wrapper">
            <img src={logo} alt=""  />
          </div>
          <div
            data-aos={window.innerWidth < 768 ? "" : "fade-right"}
            className={`links-box box-wrapper ${open ? "active" : ""}`}
          >
            <button onClick={() => setOpen(false)} className="closeBtn">
              <FaXmark />
            </button>
            {headerData.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="link">
                {item.name}
              </a>
            ))}
          </div>
          <Button1
            onClick={() => {
              handleNavigate();
            }}
            dataAos={"fade-right"}
            className="login"
            name="Login"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
