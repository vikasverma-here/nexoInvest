import React from "react";
import profitableimg1 from '../../assets/profitableimg1.png';

const Profitable = () => {
  return (
    <div className="md:px-[13rem] p-6">
      <div className="bg-gradient-to-r to-[rgba(5,200,254,0.4)] from-[rgb(213,3,249,0.4)] p-[3rem] px-[5rem] rounded-[2rem] flex flex-col md:flex-row items-center justify-between text-white min-h-[20rem]">
        {/* Image Section */}
        <div className="w-[40rem] animate-floating mb-[2rem] md:mb-0">
          <img
            src={profitableimg1}
            alt="Investment Platform"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left max-w-xl">
          <p className="text-[2.2rem] font-medium">The Most Profitable</p>
          <h2 className="text-[4rem] font-bold leading-tight tracking-tighter mb-4">Investing Platform</h2>
          <p className="text-[1.6rem] text-purple-300 font-medium mb-4">Trusted by Thousands of Investors</p>
          <p className="text-[1.4rem] mb-6 text-gray-200">Join a global community of smart investors. Experience secure and transparent trading, all in one platform.</p>

          <ul className="text-[1.2rem] md:text-[1.5rem] text-gray-200 list-disc pl-6 space-y-2">
            <h2>Fast and reliable investment returns</h2>
            <h2>Low-risk, high-performance strategies</h2>
            <h2>Get started with just <span className="text-purple-300 font-semibold">$100</span></h2>
            <h2>Simple, secure, and beginner-friendly</h2>
          </ul>

          <button className="mt-[3rem] px-[2.5rem] py-4 text-[1.8rem] font-semibold bg-gradient-to-r from-[#C800FF] to-[#00C2FF] rounded-[0.5rem] hover:opacity-90 transition">
            Open Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profitable;
