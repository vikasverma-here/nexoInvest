import { useEffect, useState, useRef } from "react";
import "../../styles/coinSpinner.css";
import { MainContent } from "../../constants/content/MainContent";
const CoinSpinner = () => {
  const totalFrames = 260;
  const fps = 100;

  const coinCanvas = useRef(null);
  const [images, setImages] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [interval, setIntervalState] = useState(null);

  useEffect(() => {
    const preloadImages = () => {
      const loadedImages = [];
      for (let i = 0; i <= totalFrames; i++) {
        const img = new Image();
        img.src = `https://www.cerpow.com/coin/${i
          .toString()
          .padStart(4, "0")}.png`;
        loadedImages.push(img);
        if (i === totalFrames) {
          img.onload = () => setImages(loadedImages);
        }
      }
    };
    preloadImages();
  }, []);

  useEffect(() => {
    if (coinCanvas.current && images.length > 0) {
      const ctx = coinCanvas.current.getContext("2d");
      const startTime = Date.now();

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        if (elapsed > 1000 / fps) {
          ctx.clearRect(
            0,
            0,
            coinCanvas.current.width,
            coinCanvas.current.height
          );
          ctx.drawImage(
            images[currentFrame],
            coinCanvas.current.width * 0.5 - 210,
            0,
            coinCanvas.current.width - 200,
            coinCanvas.current.height - 200
          );
        }
        requestAnimationFrame(animate);
      };

      animate();
    }
  }, [currentFrame, images]);

  useEffect(() => {
    setIntervalState(
      setInterval(() => {
        setCurrentFrame((prevFrame) => resetWithinBounds(prevFrame + 1));
      }, 1000 / fps)
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  const resetWithinBounds = (frame) => {
    const value = frame % totalFrames;
    return value < 0 ? Math.floor(totalFrames + value) : Math.floor(value);
  };

  return (
    <section className="CoinSpinner">
      <section id="widget" className="img-drop-shadow ">
        <header>
          <canvas id="coin" width="600" height="600" ref={coinCanvas}></canvas>
          <h1 className="title" title="COIN">
            COIN
          </h1>
          <h2>
            <span>·</span>{MainContent?.appName}<span>·</span>
          </h2>
        </header>
      </section>
      <div className="loader">
        <span></span>
      </div>
    </section>
  );
};

export default CoinSpinner;
