import React, { useState, useRef } from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0');
}

export default function App() {
  const [title, setTitle] = useState('let the countdown begin!! ');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  const startTimer = () => {
    setIsRunning(true);
    setTitle('You are great');

    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) {
          return timeLeft - 1;
        }
        resetTimer();
        return 0;
      });
    }, 1000);
  };
  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTitle('keep it up');
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTitle('Ready to go another round?');
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };
  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        {Number(seconds) !== 0 && <button onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
}
