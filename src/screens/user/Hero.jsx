import heroImg1 from "../../assets/heroimg1.png"; // adjust path as needed
import "../../styles/website/UserHome.css";
const Hero = () => {
  return (
    <section className="bg-[#050e2b] md:min-h-screen w-screen relative text-white overflow-hidden pt-[16px] px-[6px] md:pt-[16px] md:px-[12px]">
      {/* Social Icons - Right Fixed */}
      {/* <div className="hidden md:flex flex-col gap-[20px] text-sm font-medium text-white items-center absolute top-1/2 right-[6px] transform -translate-y-1/2 z-10">
        <a
          href="#"
          className="hover:text-blue-500 rotate-90 transform hover:scale-110 transition"
        >
          <i className="fab fa-facebook"></i> Facebook
        </a>
        <a
          href="#"
          className="hover:text-pink-500 rotate-90 transform hover:scale-110 transition"
        >
          <i className="fab fa-instagram"></i> Instagram
        </a>
        <a
          href="#"
          className="hover:text-blue-400 rotate-90 transform hover:scale-110 transition"
        >
          <i className="fab fa-twitter"></i> Twitter
        </a>
      </div> */}

      {/* Content */}
      <div className="mx-auto flex flex-col-reverse lg:flex-row items-center justify-between relative z-10">
        {/* Left Text Section */}
        <div className="w-full lg:w-full lg:pl-11 space-y-6 py-14 sm:py-0 text-center lg:text-left relative z-10 lg:z-0">
          <h1 className="text-[36px] sm:text-[5rem] font-extrabold leading-tight">
            <span className="text-white">          NexoInvest: A Stable Cryptocurrency Option? <br />
            </span>
          </h1>
          <p className="text-[1.5rem]  text-gray-300 max-w-[480px] mx-auto lg:mx-0">
            Nexo Invest is a rare, naturally occurring element discovered deep
            within asteroids. Scientists believe it originated during the
            formation of the cosmos itself.
          </p>

          {/* Buttons */}
          {/* <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
            <button className="px-[24px] py-[8px] rounded-md bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition duration-300">
              Log in
            </button>
          </div> */}
        </div>

        {/* Right Image */}
        <div className="w-full md:absolute top-0 lg:static lg:h-auto z-2 lg:z-50">
          <img
            src={heroImg1}
            alt="Nexo Invest"
            className="w-full  lg:w-[55rem] h-auto object-contain mx-auto lg:ml-auto lg:mr-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
