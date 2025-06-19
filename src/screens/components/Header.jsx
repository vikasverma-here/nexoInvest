import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

// import { brainwave } from "../assets";
import nexoLogo1 from "../../screens/assets/brandsLogo/nexoLogo2.png"
import MenuSvg from "../assets/svg/MenuSvg";
import { navigation } from "../constants";
import Button from "./Button";
import { HambugerMenu } from "./design/Header";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const navigate = useNavigate()
  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    // if (!openNavigation) return;

    // enablePageScroll();
    // setOpenNavigation(false);

    navigate("/login")
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 !bg-transparent  lg:bg-n-8/90 lg:bg-blur-xl ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
        }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 ">
        <a className="block w-[8rem] xl:mr-8 p-2" href="#hero">
          <img
            src={nexoLogo1}

            alt="Brainwave"
            className="pointer-events-none scale-y-150 scale-x-150 border-none select-none"
          />
        </a>

        <nav
          className={`${openNavigation ? "flex" : "hidden"
            } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          {/* <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              
              <a
                key={item.id}
                href={item.url}
                target={item.external ? "_blank" : "_self"}
                rel={item.external && "noreferrer noopener"}
                onClick={handleClick}
                className={`block relative font-code text-4xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile && "lg:hidden"
                } px-6 py-10 md:py-12 lg:mr-0.25 lg:text-lg lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-7 lg:hover:text-n-1 xl:px-14`}
              >
                {item.title}
              </a>
            ))}
          </div> */}

          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}

                rel={item.external && "noreferrer noopener"}
                onClick={(e) => {
                  handleClick();
                  if (item.title === "login") {

                  }
                }}
                className={`block relative font-code text-4xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile && "lg:hidden"
                  } px-6 py-10 md:py-12 lg:mr-0.25 lg:text-lg lg:font-semibold ${item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                  } lg:leading-7 lg:hover:text-n-1 xl:px-14`}
              >
                {item.title}
              </a>
            ))}
          </div>


          <HambugerMenu />
        </nav>

        <Button className="hidden lg:flex  !pt-7 !text-lg" onClick={() => navigate("/login")} external>
          Login
        </Button>

        <Button
          onClick={toggleNavigation}
          className="ml-auto lg:hidden w-20 h-10"
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
