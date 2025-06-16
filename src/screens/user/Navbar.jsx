import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/website/nexoLogo1.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="bg-[#030b27] text-white px-4 py-4 shadow-md relative z-50">
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="AI World Logo" className="w-32" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-pink-500 text-[1.5rem] font-semibold">
            Home
          </a>
          <a href="#about" className="hover:text-pink-400 text-[1.5rem] font-semibold">
            About Us
          </a>
          <a href="#faq" className="hover:text-pink-400 text-[1.5rem] font-semibold">
            FAQ
          </a>
          <a href="#contact" className="hover:text-pink-400 text-[1.5rem] font-semibold">
            Contact
          </a>

          <button
            onClick={() => navigate(`${token ? "/dashboard" : "/login"}`)}
            className="ml-4 px-6 py-3 font-semibold rounded-xl text-[1.5rem] transition-all duration-300 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 hover:bg-gradient-to-l"
          >
            {token ? "Dashboard" : "Log in"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-2/4 max-w-[300px] bg-[#030b27] text-white z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 flex flex-col items-center ease-in-out md:hidden px-5 py-12 space-y-12 text-left text-[1.8rem]`}
      >
        <img src={logo} className="w-[80%]" alt="" />
        <a href="#" className="block text-pink-500 font-semibold" onClick={() => setIsOpen(false)}>
          Home
        </a>
        <a href="#about" className="block hover:text-pink-400 font-semibold" onClick={() => setIsOpen(false)}>
          About Us
        </a>
        <a href="#faq" className="block hover:text-pink-400 font-semibold" onClick={() => setIsOpen(false)}>
          FAQ
        </a>
        <a href="#contact" className="block hover:text-pink-400 font-semibold" onClick={() => setIsOpen(false)}>
          Contact
        </a>

        <button
          onClick={() =>
            handleNavigate(token ? "/dashboard" : "/login")
          }
          className="mt-4 w-full py-4 font-semibold rounded-xl transition-all duration-300 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-cyan-400 hover:bg-gradient-to-l"
        >
          {token ? "Dashboard" : "Log in"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
