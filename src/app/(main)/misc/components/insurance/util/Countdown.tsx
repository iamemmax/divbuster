// components/Countdown.js

interface prop {
  onTimeUp: () => void;
  reset: boolean;
}
import { useState, useEffect } from "react";

const Countdown = ({ onTimeUp, reset }: prop) => {
  const [timeLeft, setTimeLeft] = useState(5 * 60 + 51);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalId);
          onTimeUp();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onTimeUp]);
  useEffect(() => {
    if (reset) {
      setTimeLeft(5 * 60);
    }
  }, [reset]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes} :${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {timeLeft !== 0 && <div>{formatTime(timeLeft)}</div>}
      {/* {timeLeft === 0 && <p>Account has expired!</p>} */}
    </div>
  );
};

export default Countdown;
