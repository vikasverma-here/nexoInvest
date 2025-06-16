import "../../styles/website/ProcessSteps.css"; // Ensure this file contains the necessary styles

const ProcessSteps = () => {
    return (
        <div className="ProcessSteps">
            <div className="process-steps">
                <div className="container">
                    <div className="step-wrapper move-line">
                        <article
                            className="linestep linestep1"
                            style={{ left: "56%", top: "-2%" }}
                        >
                            <span className="num">1</span>
                            <div className="ss-card bottom">
                                <h1>START</h1>
                                <p>Register as a Staker of Cryptocurrency.</p>
                            </div>
                        </article>

                        <article
                            className="linestep linestep2"
                            style={{ right: "9.5%", top: "44%" }}
                        >
                            <span className="num">2</span>
                            <div className="ss-card left">
                                <h1>CHOOSE PAIR COIN</h1>
                                <p>
                                    Choose between Ethereum and BNB you wish to
                                    Pair your BBN Token with.
                                </p>
                            </div>
                        </article>

                        <article
                            className="linestep linestep3"
                            style={{ left: "51%", top: "44%" }}
                        >
                            <span className="num">3</span>
                            <div className="ss-card bottom">
                                <h1>CHOOSE PLAN</h1>
                                <p>Choose a PLAN to stake.</p>
                            </div>
                        </article>

                        <article
                            className="linestep linestep4"
                            style={{ left: "-2%", top: "70.5%" }}
                        >
                            <span className="num">4</span>
                            <div className="ss-card top to-right">
                                <h1>PLATFORM PERFORMS STAKING.</h1>
                                <p>
                                    Let the Platform perform the task of
                                    Staking.
                                </p>
                            </div>
                        </article>

                        <article
                            className="linestep linestep5"
                            style={{ left: "40%", top: "93%" }}
                        >
                            <span className="num">5</span>
                            <div className="ss-card right">
                                <h1>WITHDRAW PROFIT</h1>
                                <p>Withdraw your profit.</p>
                            </div>
                        </article>

                        <article
                            className="linestep linestep6"
                            style={{ left: "78%", top: "93%" }}
                        >
                            <span className="num">6</span>
                            <div className="ss-card bottom">
                                <h1>REPEAT PROCESS TO EARN AGAIN</h1>
                                <p>
                                    Repeat the process to keep earning Profits.
                                </p>
                            </div>
                        </article>

                        {/* <article
              className="linestep linestep7"
              style={{ left: "53%", top: "93%" }}
            >
              <span className="num">7</span>
              <div className="ss-card top">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aspernatur non voluptatem quia.
                </p>
              </div>
            </article>

            <article
              className="linestep linestep8"
              style={{ left: "86%", top: "93%" }}
            >
              <span className="num">8</span>
              <div className="ss-card bottom">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aspernatur non voluptatem quia.
                </p>
              </div>
            </article> */}

                        <svg
                            width="100%"
                            viewBox="0 0 1156 608"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                className="path"
                                d="m560.30957,10.588011c0,0 438.0947,1.90476 439.04708,1.90476c0.95238,0 144.57857,-1.02912 143.80934,137.14269c-0.76923,138.17181 -116.81095,142.30859 -131.61967,143.8923c-14.80873,1.58372 -840.41472,-0.71429 -860.5941,0.71429c-20.17938,1.42858 -148.4991,6.80903 -146.83244,147.05973c1.66666,140.2507 129.52365,152.14266 129.33243,151.27321c0.19122,0.86945 815.268425,2.687632 951.42748,0"
                                opacity="0.5"
                                strokeWidth="7"
                                stroke="#ffeb9c"
                                fill="none"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessSteps;
