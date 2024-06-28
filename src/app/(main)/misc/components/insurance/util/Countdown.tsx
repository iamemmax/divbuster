// components/Countdown.js
"use client";
// components/Countdown.js
import { useState, useEffect } from "react";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(4 * 60 + 51);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes} :${secs.toString().padStart(1, "1")}`;
  };

  return (
    <div>
      <div>{formatTime(timeLeft)}</div>
      {timeLeft === 0 && <p>Account has expired!</p>}
    </div>
  );
};

export default Countdown;
