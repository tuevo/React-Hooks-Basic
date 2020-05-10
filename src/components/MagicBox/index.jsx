import React, { useState, useEffect } from 'react';
import './MagicBox.style.scss'

MagicBox.propTypes = {};

function useMagicColor() {
  const [color, setColor] = useState('transparent');

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const newColor = randomColor();
      setColor(newColor);
    }, 650);

    return () => {
      clearInterval(intervalRef);
    }
  }, [])

  return color;
}

function randomColor() {
  const colors = ["deeppink", "green", "yellow", "orange", "blue"];
  const randomIndex = Math.trunc(Math.random() * 5); // random a decimal in [0,1) * 5 <=> [0,5) and get its integral part
  return colors[randomIndex];
}

function MagicBox(props) {
  const color = useMagicColor();
  return (
    <div className="magic-box" style={{ backgroundColor: color }}></div>
  );
}

export default MagicBox;