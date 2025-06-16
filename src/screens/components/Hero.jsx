import { useRef } from "react";
import { ScrollParallax } from "react-just-parallax";
import Typewriter from "typewriter-effect";

import { curve, heroBackground, robot } from "../assets";
import { heroIcons } from "../constants";
import Button from "./Button";
import CompanyLogos from "./CompanyLogos";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import Generating from "./Generating";
import Notification from "./Notification";
import Section from "./Section";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div ref={parallaxRef} className="container">
        {/* Headline 1 */}
        <div className="relative z-1 mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem]">
      <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-6">
  A Stable Cryptocurrency Option?
  <br />
  <Typewriter
    options={{
      strings: [
        "Fast Transactions",
        "Low Volatility",
        "Blockchain Security",
        "Decentralized Trust",
        "Future Investment",
      ],
      autoStart: true,
      loop: true,
    }}
  />
</h1>


        <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
  <span className="inline-block relative font-semibold">
    Nexo Invest
    <img
      src={curve}
      className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
      width={624}
      height={28}
      alt="Curve"
    />
  </span>{" "}
  is a rare, naturally occurring digital element discovered deep within the
  virtual fabric of blockchain systems — much like precious metals in
  asteroids. Experts believe it originated from the earliest algorithms of
  the decentralized cosmos, making it one of the most stable and unique
  cryptocurrency options available today.
</p>

        </div>

        {/* Headline 2 */}
     <div className="relative z-1 mx-auto text-center mb-[3rem] md:mb-[5rem] lg:mb-[6rem]">
  {/* <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-5">
    NexoCoin: A Stable Cryptocurrency Option?
  </h1>
  <p className="text-base md:text-xl max-w-3xl mx-auto text-n-2 px-4">
    <span className="inline-block relative font-semibold">
      Nexo Coin
      <img
        src={curve}
        className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
        width={624}
        height={28}
        alt="Curve"
      />
    </span>{" "}
    is a rare digital asset formed during the early rise of blockchain
    technology. Originating from the depths of crypto innovation, it stands out
    as a resilient and reliable choice in a volatile market.
  </p> */}

  <div className="mt-8 flex justify-center">
    <Button href="#pricing" className="pt-4 text-lg md:text-xl" white>
      Get Started
    </Button>
  </div>
</div>


        {/* AI Visual Box */}
        {/* <div className="mx-auto xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={robot}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%] pointer-events-none select-none"
                  width={1024}
                  height={490}
                  alt="AI"
                />

                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <img src={icon} width={24} height={25} alt={`icon-${index}`} />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>

                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                    title="Code generation "
                  />
                </ScrollParallax>
              </div>
            </div>

            <Gradient />
          </div>

          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full pointer-events-none select-none"
              width={1440}
              height={1800}
              alt="Hero"
            />
          </div>

          <BackgroundCircles />
        </div> */}

<div className="mx-auto xl:mb-24">
  <div className="relative z-1 p-0.5  rounded-2xl bg-conic-gradient">
    <div className="relative bg-n-8 rounded-[1rem]">
      <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

      <div className="aspect-[33/35] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/420] lg:aspect-[1024/460]">
        <img
          src={robot}
          className="w-full scale-[1.5] translate-y-[8%] md:scale-[1.1] md:-translate-y-[10%] lg:-translate-y-[23%] pointer-events-none select-none"
          width={1024}
          height={460}
          alt="AI"
        />

        <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[35rem] md:-translate-x-1/2" />

        <ScrollParallax isAbsolutelyPositioned>
          <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
            {heroIcons.map((icon, index) => (
              <li className="p-5" key={index}>
                <img src={icon} width={24} height={25} alt={`icon-${index}`} />
              </li>
            ))}
          </ul>
        </ScrollParallax>

        <ScrollParallax isAbsolutelyPositioned>
          <Notification
            className="hidden absolute -right-[6rem] bottom-[10rem] w-[22rem] xl:flex"
            title="Code generation"
          />
        </ScrollParallax>
      </div>
    </div>

    <Gradient />
  </div>

  <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
    <img
      src={heroBackground}
      className="w-full pointer-events-none select-none"
      width={1440}
      height={1800}
      alt="Hero"
    />
  </div>

  <BackgroundCircles />
</div>



        <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;
