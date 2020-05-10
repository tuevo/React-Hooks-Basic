import React, { useState, useEffect } from 'react';
import './Clock.style.scss';

function formatDate(date) {
  if (!date) return "";
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);
  return `${hours}:${minutes}:${seconds}`;
}

function Clock(props) {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = new Date();
      const newTimeString = formatDate(now);
      setTimeString(newTimeString);
    }, 1000);

    return () => {
      // Clean up
      console.log('Clock clean-up');
      clearInterval(clockInterval);
    }
  }, [])

  return (
    <p className="clock">{timeString}</p>
  );
}

export default Clock;