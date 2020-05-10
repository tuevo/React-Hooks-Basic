import React, { useState } from "react";
import "./ColorBox.style.scss";

ColorBox.propTypes = {};

function randomColor() {
  const colors = ["deeppink", "green", "purple", "black", "blue"];
  const randomIndex = Math.trunc(Math.random() * 5); // random a decimal in [0,1) * 5 <=> [0,5) and get its integral part
  return colors[randomIndex];
}

function ColorBox() {
  const [color, setColor] = useState(() => {
    // Processing at the first rendering ONLY
    const initColor = localStorage.getItem("box_color") || "deeppink";
    return initColor;
  });

  function handleBoxClick() {
    const newColor = randomColor();
    setColor(newColor);

    localStorage.setItem("box_color", newColor);
  }

  return (
    <div
      className="color-box animated jackInTheBox"
      style={{ backgroundColor: color, animationDelay: '0.5s' }}
      onClick={handleBoxClick}
    >
      Click me !!!
    </div>
  );
}

export default ColorBox;
