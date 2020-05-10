import React from 'react';
import './BetterClock.style.scss';
import useClock from '../../hooks/useClock';

BetterClock.propTypes = {};

function BetterClock(props) {
  const { timeString } = useClock();  // using custom hook
  const timeParts = timeString.split(':');

  return (
    <div className="better-clock">
      <div className="better-clock__part">
        <span>{timeParts[0]}</span>
        <span className="better-clock__part__label">h</span>
      </div>
      <div className="better-clock__part">
        <span>{timeParts[1]}</span>
        <span className="better-clock__part__label">m</span>
      </div>
      <div className="better-clock__part">
        <span>{timeParts[2]}</span>
        <span className="better-clock__part__label">s</span>
      </div>
    </div>
  );
}

export default BetterClock;