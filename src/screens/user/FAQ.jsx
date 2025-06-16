import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import countrybgimg2 from "../../assets/countrybgimg2.png";

const faqs = [
  {
    question: "What is NexoCoin?",
    answer:
      "NexoCoin is a stable cryptocurrency designed for trading and is exclusively available on the NexoInvest platform (www.nexoinvest.org). It aims to offer stability in a volatile crypto market.",
  },
  {
    question: "How is NexoCoin different from other cryptocurrencies like Bitcoin?",
    answer:
      "Unlike volatile assets like Bitcoin or Ethereum, NexoCoin is a stablecoin — designed to maintain a consistent value, offering a reliable option for trading, hedging, and DeFi use cases.",
  },
  {
    question: "What makes NexoCoin stable?",
    answer:
      "Details about its stability mechanism are crucial — whether it is pegged to fiat currencies or backed by assets. Always research to understand how NexoCoin maintains its consistent value.",
  },
  {
    question: "Where can I buy or trade NexoCoin?",
    answer:
      "Currently, NexoCoin is exclusively available for trading on the official NexoInvest platform: www.nexoinvest.org.",
  },
  {
    question: "Is NexoCoin safe and regulated?",
    answer:
      "Before investing, it's important to check for transparency, the team's credibility, platform security, and the regulatory status of NexoCoin in your region.",
  },
  {
    question: "Is investing in NexoCoin risk-free?",
    answer:
      "No investment is completely risk-free. While stablecoins offer reduced volatility, always invest what you can afford to lose and consult a financial advisor.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="sm:min-h-screen py-14 sm:py-0 flex items-center justify-center px-4  relative">
      <div className="w-full max-w-6xl">
        <h2 className="text-white text-[4rem] font-bold text-center mb-8">
          FAQ
        </h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 relative z-50">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full bg-[#232544] hover:bg-purple-700 text-white text-left p-4 rounded-lg flex text-[1.5rem] justify-between items-center transition duration-300"
            >
              <span>{faq.question}</span>
              <FaChevronDown
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="bg-purple-700 text-white text-[1.2rem] p-4 rounded-b-lg transition-all duration-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
        <img
          src={countrybgimg2}
          className="absolute bottom-0 right-0 z-10 w-[70rem]"
          alt=""
        />
      </div>
    </div>
  );
}
