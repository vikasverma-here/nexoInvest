import React from "react";
import aboutimg1 from "../../assets/aboutimg1.png";
import aboutimg3 from "../../assets/aboutimg3.png";
import aboutimg2 from "../../assets/aboutimg2.png";
import aboutimg4 from "../../assets/aboutimg4.png";
import aboutimg5 from "../../assets/aboutimg5.png";
import aboutimg6 from "../../assets/aboutimg6.png";
import aboutbg1 from "../../assets/aboutbg1.png";

const About = () => {
  return (
    <section className="relative bg-[#050e2b] text-white py-16 px-6 md:px-[13rem] overflow-hidden">
      <div className="mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Image with animation */}
        <div className="w-full lg:w-1/2 flex justify-center relative z-10">
          <img
            src={aboutimg1}
            alt="Stablecoin Illustration"
            className="w-[300px] sm:w-[400px] lg:w-[450px] animate-slideX"
          />
        </div>

        {/* Right Text and Features */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left z-10">
          <h2 className="text-[2.5rem] sm:text-[3rem] lg:text-[4rem] font-bold">
            NexoCoin: Key Points
          </h2>
          <p className="text-gray-300 text-[1.2rem] sm:text-[1.3rem]">
            Stablecoins like NexoCoin offer significant benefits in the crypto world, especially when it comes to maintaining value and enabling decentralized finance.
          </p>

          {/* Feature Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 relative z-10">
            {[
              {
                icon: aboutimg2,
                title: "Hedge Against Volatility",
                desc: "Use stablecoins as a safe haven during market uncertainty while staying in the crypto ecosystem.",
              },
              {
                icon: aboutimg4,
                title: "Efficient Transactions",
                desc: "Facilitate faster and more cost-effective global transactions compared to traditional banking.",
              },
              {
                icon: aboutimg5,
                title: "DeFi Applications",
                desc: "Enable lending, borrowing, and more in decentralized finance with a stable unit of value.",
              },
              {
                icon: aboutimg6,
                title: "NexoCoin Potential",
                desc: "A powerful tool for preserving capital and engaging in seamless, borderless finance.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition relative z-20"
              >
                <div className="rounded-md p-6 bg-gradient-to-r from-purple-500 to-blue-500 transition duration-300 mb-10">
                  <img src={feature.icon} alt="" />
                </div>
                <h3 className="font-semibold text-[2rem] mb-6">{feature.title}</h3>
                <p className="text-[1.1rem] text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
            {/* Rotating Background Element */}
            <img
              src={aboutbg1}
              className="absolute rotate-slow bottom-0 w-full max-w-[500px] z-0 pointer-events-none opacity-30"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Top floating background image - hidden on small screens */}
      <img
        src={aboutimg3}
        className="absolute top-0 left-0 hidden md:block w-[70rem] max-w-none z-0 pointer-events-none"
        alt=""
      />
    </section>
  );
};

export default About;
