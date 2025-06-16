import React from "react";
import mtimg1 from "../../assets/mtimg1.png";
import mtimg2 from "../../assets/mtimg2.png";
import mtimg3 from "../../assets/mtimg3.png";
import mtimg4 from "../../assets/mtimg4.png";
import mtimg5 from "../../assets/mtimg5.png";
import mtimg6 from "../../assets/mtimg6.png";
import countrybgimg1 from "../../assets/countrybgimg1.png";

const cards = [
  {
    title: "Daily ROI",
    text: "Get 2% return every day for 100 days — total 200% return on your investment.",
    icon: mtimg1,
  },
  {
    title: "Referral Bonus",
    text: "Refer and earn 10% instant bonus when your friend makes a deposit.",
    icon: mtimg2,
  },
  {
    title: "5 Level Income",
    text: "Earn up to 30% income from your team across 5 levels — passive earning boost.",
    icon: mtimg3,
  },
  {
    title: "Minimum Investment",
    text: "Start investing with just 100 USDT — accessible and easy entry point.",
    icon: mtimg4,
  },
  {
    title: "Minimum Withdrawal Limit",
    text: "Withdraw your earnings anytime, minimum withdrawal limit is 50 USDT.",
    icon: mtimg5,
  },
  {
    title: "High Risk",
    text: "Crypto investments are subject to market risks. Invest wisely.",
    icon: mtimg6,
  },
];

const MT = () => {
  return (
    <section className="text-white  px-6 md:px-[13rem] relative z-20">
      <div className="mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10">
          Why <span className="text-purple-400">Nexo Market</span> is your best choice<span className="text-purple-400">?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6 relative z-50">
          {cards.map((card, index) => (
            <div
              key={index}
              className="rounded-xl p-6 sm:text-left h-72 text-center hover-gradient transition-all duration-500"
            >
              <div className="mb-4 flex gap-6 items-center justify-center sm:justify-start">
                <img className="w-20" src={card.icon} alt="" />
                <h3 className="text-[1.8rem] font-semibold mb-2">{card.title}</h3>
              </div>
              <p className="text-[1.1rem] font-light text-gray-300">{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Background Image */}
      <img src={countrybgimg1} className="absolute top-0 left-0 z-10 w-[70rem]" alt="" />
    </section>
  );
};

export default MT;
