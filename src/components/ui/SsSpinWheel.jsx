import { useState, useEffect, useRef } from "react";
import "../../styles/SsSpinWheel.css";
import { getSpinCountHistory, sendSpinData } from "../../api/payment-api";
import PageLoader from "./PageLoader";
import { formatValueWithCurrency } from "../../utils/additionalFunc";
import { useSelector } from "react-redux";

function SsSpinWheel() {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [prizes] = useState(["Next Time", 25, 3, "Bad Luck", 12, 6]);
  const [activeBtn, setActiveBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deg, setDeg] = useState(0);
  const [spinHistory, setSpinHistory] = useState([]);
  const [spinResults, setSpinResults] = useState([]);
  const [currentSpin, setCurrentSpin] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const [message, setMessage] = useState("");

  const counterRef = useRef({
    "Next Time": 0,
    25: 0,
    3: 0,
    "Bad Luck": 0,
    12: 0,
    6: 0,
  });

  const highlightedSliceRef = useRef(null);

  // Function to check eligibility for spinning
  const canSpin = () => {
    if (!userInfo?.user?.lastSpinIncomeCalculation) {
      return userInfo?.user?.levelType >= 3;
    }
    const lastSpinTime = new Date(userInfo.user.lastSpinIncomeCalculation);
    const now = new Date();
    return now - lastSpinTime >= 24 * 60 * 60 * 1000 && userInfo?.user?.levelType >= 3;
  };
  useEffect(() => {
    setActiveBtn(!canSpin());
  }, [spinHistory, userInfo]);

  const generateResults = () => {
    const results = [];
    results.push(1); // 1 time 25 prize
    results.push(4); // 1 time 12 prize
    for (let i = 0; i < 12; i++) results.push(2); // 12 times 3 prize
    for (let i = 0; i < 4; i++) results.push(5); // 4 times 6 prize
    for (let i = 0; i < 6; i++) results.push(0); // Next Time
    for (let i = 0; i < 6; i++) results.push(3); // Bad Luck

    results.sort(() => Math.random() - 0.5);
    setSpinResults(results);
  };

  const spin = () => {
    if (spinResults.length === 0) {
      generateResults();
    }

    setActiveBtn(true);
    highlightedSliceRef.current = null;

    const prizeIndex = spinResults[currentSpin];
    const prize = prizes[prizeIndex];

    counterRef.current[prize] = (counterRef.current[prize] || 0) + 1;
    setWonPrize(prize);

    const spins = Math.floor(Math.random() * 7) + 9;
    const wheelAngle = Math.floor(Math.random() * 6) * 60;
    const sectorAngle = Math.floor(Math.random() * 14) + 1;
    const rotation = 360 * spins + wheelAngle + sectorAngle;

    setDeg((prevDeg) => {
      const newDeg = prevDeg + rotation;
      document.querySelector(".inner").style.transition =
        "transform 4.5s ease-out";
      document.querySelector(".inner").style.transform = `rotate(${newDeg}deg)`;
      return newDeg;
    });

    setTimeout(() => {
      const prizeIndexToHighlight = prizes.indexOf(prize);
      highlightedSliceRef.current = prizeIndexToHighlight;
      setCurrentSpin((prev) => (prev + 1) % spinResults.length);
    }, 4500);
  };

  useEffect(() => {
    if (spinResults.length === 0) generateResults();
  }, [spinResults]);

  useEffect(() => {
    if (wonPrize) {
      const intervalId = setInterval(() => {
        setMessage(`You won: ${wonPrize}`);
      }, 4500);

      spinDataSendHandler();
      return () => clearInterval(intervalId);
    }
  }, [wonPrize]);

  const spinDataSendHandler = async () => {
    try {
      const response = await sendSpinData({
        prize: wonPrize,
        rewardCount: counterRef.current,
        createdAt: new Date(),
        spinResults: spinResults,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getSpinCount = async () => {
    try {
      setLoading(true);
      const response = await getSpinCountHistory();
      setSpinHistory(response);
      // console.log(response)
      if (response?.user?.spinIncomes?.length > 0) {
        setSpinResults(response?.user?.spinResults);
        setCurrentSpin(response?.user?.spinIncomes?.length);
        // alert(response?.user?.spinIncomes?.length)
        counterRef.current =
          response?.user?.spinIncomes?.[
            response?.user?.spinIncomes?.length - 1
          ];
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?.user?.levelType >= 3) {
      getSpinCount();
    }
  }, []);
  return (
    <>
      {loading && <PageLoader />}
      <div id="SsSpinWheel" className="SsSpinWheel">
        <div className="wheel">
          <div className="inner">
            {prizes.map((prize, index) => (
              <div
                className={`slice ${
                  highlightedSliceRef.current === index ? "highlighted" : ""
                }`}
                key={index}
                style={{ transform: `rotate(${index * -60}deg)` }}
              >
                <span className="prize">{formatValueWithCurrency(prize)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="wheel-outer"></div>
        <svg id="svg-dotted" viewBox="0 0 100 100">
          <circle id="circle-dotted" cx="50" cy="50" r="40" />
        </svg>
        <svg id="svg-arrow" xmlns="http://www.w3.org/2000/svg">
          <path
            style={{
              fill: "#ff2e52",
              stroke: "#012e52",
              strokeWidth: 4,
              strokeLinejoin: "round",
            }}
            d="M 81.540414,49.378716 H 121.51935 L 101.4866,69.420346 Z"
          />
        </svg>
        <button className="spinBTN" onClick={spin} disabled={activeBtn}>
          SPIN
        </button>
      </div>
      <div className="text-val">
        {wonPrize ? (
          <p>{message}</p>
        ) : spinHistory?.todaySpin ? (
          <p>Today Spin done</p>
        ) : userInfo?.user?.levelType < 3 ? (
          <p>Spin Available in level 3</p>
        ) : (
          <p>Click the spin button to start</p>
        )}
      </div>
    </>
  );
}

export default SsSpinWheel;
