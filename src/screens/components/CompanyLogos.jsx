import { companyLogos } from "../constants";

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50 text-2xl">
        Trusted by Blockchain Innovators and Crypto Enthusiasts Worldwide
      </h5>
      <ul className="flex flex-wrap justify-center gap-6 md:gap-12">
        {companyLogos.map((logo, i) => (
          <li
            key={i}
            className="flex items-center justify-center h-[5rem] w-[10rem]"
          >
            <img
              src={logo}
              width={134}
              height={28}
              alt={`Logo-${i}`}
              className="object-contain max-h-[6rem] mt-5"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
