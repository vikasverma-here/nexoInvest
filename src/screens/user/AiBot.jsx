import React from "react";
import aibotimg1 from '../../assets/aibotimg1.png';

const AiBot = () => {
  return (
    <div className="flex flex-col md:flex-row items-center sm:px-[10rem] justify-between text-white p-[4rem] min-h-[40rem]">
      {/* Text Section */}
      <div className=" mb-[2rem] md:mb-0">
        <h1 className="text-[3.4rem] font-bold leading-tight text-center sm:text-start">
          Before investing in NexoCoin
        </h1>

        <p className="mt-[2rem] text-[1.3rem] text-gray-300 leading-[2.2rem]">
          It's imperative to conduct thorough research and consider the following:
        </p>

        <ul className="mt-[1.5rem] text-[1.3rem] text-gray-300 list-disc pl-6 leading-[2.2rem]">
          <li><span className="text-white font-medium">Transparency:</span> Investigate the team behind NexoCoin and the NexoInvest platform. Look for transparency regarding their operations, financial backing, and stability mechanism.</li>
          <li><span className="text-white font-medium">Security:</span> Evaluate the security measures in place to protect NexoCoin from theft or hacking.</li>
          <li><span className="text-white font-medium">Regulation:</span> Understand the regulatory landscape surrounding NexoCoin and NexoInvest. Cryptocurrency regulations can vary significantly by jurisdiction.</li>
          <li><span className="text-white font-medium">Risk:</span> All investments carry risk, and cryptocurrencies are particularly volatile. Only invest what you can afford to lose.</li>
        </ul>

        <p className="mt-[2rem] text-[1.2rem] text-purple-300 italic">
          Disclaimer: This article is for informational purposes only and does not constitute financial advice. Always conduct your own research and consult with a qualified financial advisor before making any investment decisions.
        </p>
      </div>

      {/* Image Section */}
      <div className="w-[50rem] flex justify-center items-center">
        <img
          src={aibotimg1}
          alt="Investment Illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default AiBot;
