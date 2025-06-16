import { check } from "../assets";
import { plans } from "../constants";
import Button from "./Button";

const PricingList = () => {
  return (
    <div className="flex gap-[6rem] max-lg:flex-wrap justify-center">
      {plans.map((plan, i) => (
        <div
          key={plan.id}
          className="w-[32rem] max-lg:w-full h-full px-8 py-12 bg-n-8 border border-n-6 rounded-[2rem] text-center flex flex-col items-center"
        >
          <h4 className="text-4xl font-bold mb-4">{plan.title}</h4>
          <p className="text-xl font-medium min-h-[4rem] mb-5 text-n-1/60">
            {plan.description}
          </p>

          <Button
            className="mb-10 text-xl py-4 w-[80%]"
            href={"#"}
            white={!plan.premium}
          >
            Explore Features
          </Button>

          <ul className="text-left w-full">
            {plan.features.map((feature, j) => (
              <li
                key={`plan-${i}-feature-${j}`}
                className="flex items-start py-4 border-t border-n-6"
              >
                <img
                  src={check}
                  alt="Check"
                  className="pointer-events-none w-6 mt-1 select-none"
                />
                <p className="text-lg font-medium ml-4 leading-relaxed">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
