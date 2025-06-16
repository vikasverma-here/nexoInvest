import Nexocoin from "../../assets/NEXOCOIN.png";
import countrybgimg2 from "../../assets/countrybgimg2.png";

const Trades = () => {
  return (
    <div className="flex flex-col md:h-[60vh] h-[80vh] mt-20 mb-20 relative md:flex-row items-center sm:px-[13rem] justify-between text-white p-[4rem] ">
      {/* Text Section */}
      <div className="max-w-[50rem] mb-[2rem] md:mb-0 sm:text-start text-center z-20">

        <p className="text-[1.7rem] text-gray-300 mt-[1.5rem] leading-[2.2rem]">
          In the ever-evolving world of cryptocurrencies, stability is often a sought-after quality.
          NexoCoin aims to offer a stable trading currency, exclusively available on the{" "}
          <a href="https://www.nexoinvest.org" className="text-purple-400 underline">NexoInvest website</a>.
        </p>

        <h2 className="text-[1.5rem] font-semibold mt-[2rem] text-purple-300">The Promise of Stability</h2>
        <ul className="text-[1.4rem] text-gray-400 mt-[1rem] list-none pl-6 leading-[2rem]">
          <li>Hedge against volatility during market uncertainty.</li>
          <li>Faster and cheaper transactions for global transfers.</li>
          <li>Crucial for DeFi platforms – lending, borrowing & more.</li>
        </ul>


      </div>

      {/* Image Section */}
      <div className="flex justify-center items-center z-20 mt-[2rem] md:mt-0">
      <img
  src={Nexocoin}
  alt="NexoCoin Illustration"
  className="md:w-[50vw] rotate w-full h-auto object-cover"
/>

      </div>

      {/* Background */}
      <img
        src={countrybgimg2}
        className="absolute bottom-0 right-0 z-10 w-[70rem] opacity-60"
        alt=""
      />
    </div>
  );
};

export default Trades;
