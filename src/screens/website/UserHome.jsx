import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import trainGif from "../../assets/gif/trainGif.gif";
import trainGif2 from "../../assets/gif/trainGif3.gif";
import about2 from "../../assets/website/3dImg3.png";
import about1 from "../../assets/website/3dImg4.png";
import { Button1 } from "../../components/ui/Buttons";
import { Heading1, SubHeading1 } from "../../components/ui/Headings";
import Footer from "../../components/website/Footer";
import { MainContent } from "../../constants/content/MainContent";
import { UserWebsiteContent } from "../../constants/content/UserWebsiteContent";
import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
import meetGif from "../../assets/gif/meetGif.gif";
import PageLoader from "../../components/ui/PageLoader";

const UserHome = () => {
    const navigate = useNavigate();
    const [faqTab, setFaqTab] = useState(1);
    const [loading, setLoading] = useState(false);
    const handleNavigate = () => {
        if (localStorage.getItem("token")) {
            navigate(AuthenticatedRoutes.USER_DASHBOARD);
        } else {
            navigate(AuthRoutes.LOGIN);
        }
    };

    const faqData = {
        general: [
            {
                id: 1,
                question: "What is ?",
                answer: " is a decentralized platform that allows users to trade cryptocurrencies with ease and security.",
            },
            {
                id: 2,
                question: "How to use ?",
                answer: "To use , users need to create an account, deposit funds, and choose a trading pair. They can then place orders to buy, sell, or trade cryptocurrencies.",
            },
            {
                id: 3,
                question: "Is  safe?",
                answer: "Yes,  is a safe and secure platform that uses advanced security measures to protect users' funds and data.",
            },
            {
                id: 4,
                question: "What are the fees on ?",
                answer: " charges a small transaction fee for each trade, which is typically around 0.1% of the trade value.",
            },
        ],

        preSale: [
            {
                id: 1,
                question: "What is  BBN Token BEP20?",
                answer: " BBN Token BEP20 is a DEFI coin designed and developed to provide the Crypto community a utility coin that can pair well with major coins and stake exceptionally well.",
            },
            {
                id: 2,
                question:
                    "Which are the recommended Crypto that can pair well with BBN Token while staking?",
                answer: "ETH ERC20 and BNB BEP20.",
            },
            {
                id: 3,
                question: "What is the best Plan?",
                answer: "All Plans can usually generate 2 times the profit in a reasonable time.",
            },
            {
                id: 4,
                question:
                    "What is the Min. and Max. amount that I can withdraw?",
                answer: "Min amount allowed is 10$ and Max amount allowed is 100٪ of your trade profit.",
            },
            {
                id: 5,
                question: "Can I reinvest or repeat Stake?",
                answer: "Your available profit amount is shown in your User Panel. You can choose to withdraw or reinvest to any available PLAN as a Registered User.",
            },
            {
                id: 6,
                question: "Are there any charges?",
                answer: "We are glad to support you in your efforts to be a Crypto enthusiast. Kindly share the project with others.",
            },
            {
                id: 7,
                question: "Are there Taxes to pay on my Profit?",
                answer: "Kindly check your countries tax norms and pay your taxes promptly and remain a good citizen.",
            },
        ],
    };

    return (
        <div className="hp1-user" >
            {loading && <PageLoader />}
            <div className="UserHome" id="home">
                {/* ======= hero section start ======= */}
                <div
                    className="hero-section"
                    // style={{ backgroundImage: `url(${bgImg})` }}
                >
                    <div className="inner">
                        <div className="left">
                            <h1
                                data-aos="fade-right"
                                className="title textBg"
                                // style={{ backgroundImage: `url(${trainGif2})` }}
                            >
                                {UserWebsiteContent?.heroSection?.title}
                            </h1>
                            
                            <h1
                                data-aos="fade-right"
                                className="title textBg"
                                // style={{ backgroundImage: `url(${trainGif})` }}
                            >
                                {UserWebsiteContent?.heroSection?.subTitle}
                            </h1>
                            {/* <p data-aos="fade-right" className="para">
                {UserWebsiteContent?.heroSection?.desc}
              </p> */}
                            <div className="btns">
                                <Button1
                                    onClick={handleNavigate}
                                    dataAos={"fade-right"}
                                    name="Login"
                                    className={"login"}
                                />
                            </div>
                        </div>
                        {/* <div className="right">
              <div className="bg-img">
                <img src={heroBg} alt="" />
              </div>
            </div> */}
                    </div>
                </div>
                {/* ======= hero section end ======= */}
                {/* ======= about section start ======= */}
                <div className="about-section" id="about">
                    <div className="section-inner">
                        <div className="left">
                            <div data-aos="fade-down" className="img-box">
                                <img
                                    className="img-drop-shadow "
                                    src={about1}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="right">
                            <div className="content">
                                <SubHeading1
                                    name={
                                        UserWebsiteContent?.aboutSection
                                            ?.subTitle
                                    }
                                />
                                <Heading1
                                    name={
                                        UserWebsiteContent?.aboutSection?.title
                                    }
                                />
                                <p className="para" data-aos="fade-up">
                                    {UserWebsiteContent?.aboutSection?.desc}
                                </p>
                            </div>
                            <div data-aos="fade-up" className="img-box">
                                <img
                                    className="img-drop-shadow "
                                    src={about2}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* ======= about section end ======= */}

                {/* ======= revenue cards section start ======= */}
                <div className="revenue-section">
                    <div className="section-inner">
                        <Heading1
                            name={
                                "Digitize the value and revenues of any real estate property."
                            }
                        />

                        <div className="card-lists">
                            <div className="card-box">
                                <div className="img-box">
                                    <img src={meetGif} alt="" />
                                </div>
                                <div className="content">
                                    <span className="tag">
                                        Reliable Transcription ✨{" "}
                                    </span>
                                    <h2 className="title">
                                        Smart Contracts Real-Estate is Getting
                                        Real
                                    </h2>
                                    <p className="para1">
                                        When most people think of NFTs, they
                                        imagine a funky avatar or a colourful
                                        piece of digital art. But non-fungible
                                        tokens are much more than a whacked-out
                                        profile picture. Today, NFTs are being
                                        used to trade real-world assets. Take
                                        your home, for example. Yes, smart
                                        contracts real estate is becoming a
                                        thing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ======= revenue cards section end ======= */}
                {/* ======= faq section start ======= */}
                <div className="faq-section">
                    <div className="section-inner">
                        <Heading1 name={"Have Any Questions?"} />
                        <p className="para top" data-aos="fade-up">
                            Here we tried to clear all your doubts regarding{" "}
                            {MainContent.appName} pre sale, tokenomics, buying,
                            selling and what is our future plan.
                        </p>

                        <div className="faq-tab">
                            <div className="section-inner">
                                <div className="tab-content">
                                    <Accordion>
                                        {faqTab === 1
                                            ? faqData?.general?.map(
                                                  (item, i) => (
                                                      <Accordion.Item
                                                          key={`general-${i}`}
                                                          eventKey={`general-${i}`}
                                                      >
                                                          <Accordion.Header>
                                                              {item?.question}
                                                          </Accordion.Header>
                                                          <Accordion.Body>
                                                              {item?.answer}
                                                          </Accordion.Body>
                                                      </Accordion.Item>
                                                  )
                                              )
                                            : faqData?.preSale?.map(
                                                  (item, i) => (
                                                      <Accordion.Item
                                                          key={`preSale-${i}`}
                                                          eventKey={`preSale-${i}`}
                                                      >
                                                          <Accordion.Header>
                                                              {item?.question}
                                                          </Accordion.Header>
                                                          <Accordion.Body>
                                                              {item?.answer}
                                                          </Accordion.Body>
                                                      </Accordion.Item>
                                                  )
                                              )}
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ======= footer section start ======= */}
                <Footer />
                {/* ======= footer section end ======= */}
            </div>
        </div>
    );
};

export default UserHome;
