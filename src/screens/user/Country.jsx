import React from "react";
import countryimg1 from "../../assets/countryimg1.webp";
import countryimg2 from "../../assets/countryimg2.png";
import countrybgimg1 from "../../assets/countrybgimg1.png";
import countrybgimg2 from "../../assets/countrybgimg2.png";

const stats = [
  {
    number: "65+",
    label: "Countries",
    description: "Effortlessly find the most favorable rates by instantly comparing quotes",
  },
  {
    number: "750,000+",
    label: "Users",
    description: "Effortlessly find the most favorable rates by instantly comparing quotes",
  },
  {
    number: "10000+",
    label: "Leaders",
    description: "Effortlessly find the most favorable rates by instantly comparing quotes",
  },
  {
    number: "",
    label: "MT5 Platform",
    icon: countryimg2,
  },
];

const Country = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:px-[10rem] px-[2rem] relative justify-between text-white py-[4rem] min-h-[40rem] overflow-hidden">
      {/* Left Image */}
      <div className="w-full md:w-[50rem] mb-[2rem] relative md:mb-0 flex justify-center">
        <img
          src={countryimg1}
          alt="Art Element"
          className="w-full max-w-[40rem] md:max-w-full h-auto object-contain z-10"
        />
        <img
          src={countrybgimg1}
          className="absolute top-0 -left-[30%] w-[80rem] opacity-20 md:opacity-100"
          alt=""
        />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.5rem] relative z-20 max-w-[50rem] w-full">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#232544] p-[2rem] rounded-[1rem] text-center sm:text-left">
            {stat.icon ? (
              <div className="flex flex-col items-center sm:items-start w-full">
                <img src={stat.icon} alt="icon" className="w-[6rem] mb-[1.5rem]" />
                <h3 className="text-[2rem] font-semibold">{stat.label}</h3>
              </div>
            ) : (
              <div className="space-y-[1rem]">
                <h2 className="text-[2.5rem] font-bold bg-gradient-to-r from-[rgba(185,3,226,0.9)] via-[rgba(6,199,254,0.9)] text-transparent bg-clip-text">
                  {stat.number}
                </h2>
                <h3 className="text-[1.8rem] font-semibold">{stat.label}</h3>
                <p className="text-[1.2rem] text-gray-300 leading-[1.6rem]">
                  {stat.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right BG Image */}
      <img
        src={countrybgimg2}
        className="absolute bottom-0 right-0 z-0 w-[50rem] opacity-20 md:opacity-100"
        alt=""
      />
    </div>
  );
};

export default Country;
