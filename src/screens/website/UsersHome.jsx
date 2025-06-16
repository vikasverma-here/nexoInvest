import React from "react";
import Navbar from "../user/Navbar";
import Hero from "../user/Hero";
import About from "../user/About";
import MT from "../user/MT";
import FAQ from "../user/FAQ";
import Footer from "../user/Footer";
import "../../styles/website/UserHome.css";
import AiBot from "../user/AiBot";
import Country from "../user/Country";
import Trades from "../user/Trades";
import Profitable from "../user/Profitable";

const UsersHome = () => {
  return (
    <div className="w-screen">
      <Navbar />
      <Hero />
      <div id="about"><About /></div>
      <AiBot />
      <Country />
      <MT />
      <Trades />
      <Profitable />
      <div id="faq"><FAQ /></div>
      <div id="contact"><Footer /></div>
    </div>
  );
};

export default UsersHome;
