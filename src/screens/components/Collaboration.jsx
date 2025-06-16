import { brainwaveSymbol, check, curve } from "../assets";
import { collabApps, collabContent, collabText } from "../constants";
import Button from "./Button";
import { LeftCurve, RightCurve } from "./design/Collaboration";
import Section from "./Section";

const Collaboration = () => {
  return (
    <Section crosses>
      <div className="container lg:flex">
        {/* LEFT TEXT BLOCK */}
        <div className="max-w-[25rem]">
          <h2 className="text-3xl font-bold mb-4 md:mb-8 leading-tight text-white">
            AI Chat App for seamless{" "}
            <span className="inline-block relative font-semibold text-white">
              collaboration
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h2>

          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collabContent.map((item) => (
              <li className="mb-3 py-3" key={item.id}>
                <div className="flex items-center">
                  <img
                    src={check}
                    width={24}
                    height={24}
                    alt="check"
                    className="pointer-events-none select-none"
                  />
                  <h6 className="ml-5 text-base font-medium text-white">
                    {item.title}
                  </h6>
                </div>

                {item.text && (
                  <p className="mt-3 text-sm text-gray-400">{item.text}</p>
                )}
              </li>
            ))}
          </ul>

          <Button>Try it now</Button>
        </div>

        {/* RIGHT CIRCLE BLOCK */}
        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <p className="text-sm mb-4 text-gray-400 md:mb-16 lg:mb-32 lg:w-[32rem] lg:mx-auto">
            {collabText}
          </p>

          <div className="relative left-1/2 flex w-[22rem] aspect-square border border-neutral-600 rounded-full -translate-x-1/2 scale-75 md:scale-100">
            <div className="flex w-60 aspect-square m-auto border border-neutral-600 rounded-full">
              <div className="w-24 aspect-square m-auto p-1 bg-[conic-gradient(var(--tw-gradient-stops))] from-blue-500 via-purple-500 to-pink-500 rounded-full">
                <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                  <img
                    src={brainwaveSymbol}
                    width={48}
                    height={48}
                    alt="brainwave"
                  />
                </div>
              </div>
            </div>

            {/* APPS AROUND THE CENTER */}
            <ul>
              {collabApps.map((app, i) => (
                <li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-6 origin-bottom rotate-[${i * 45}deg]`}
                >
                  <div
                    className={`relative -top-6 flex w-12 h-12 bg-neutral-800 border border-white/15 rounded-xl -rotate-[${i * 45}deg] animate-pulse`}
                  >
                    <img
                      src={app.icon}
                      alt={app.title}
                      width={app.height}
                      height={app.height}
                      className="m-auto"
                    />
                  </div>
                </li>
              ))}
            </ul>

            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;
