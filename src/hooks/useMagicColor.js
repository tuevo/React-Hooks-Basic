import { useEffect, useState, useRef } from 'react';

function randomColor(currentColor) {
  const colors = ["deeppink", "#4bb543", "#40a5ec", "orange", "crimson"];
  const currentIndex = colors.indexOf(currentColor);

  let randomIndex = currentIndex;
  while (currentIndex === randomIndex) {
    randomIndex = Math.trunc(Math.random() * 5); // random a decimal in [0,1) * 5 <=> [0,5) and get its integral part
  }

  return colors[randomIndex];
}

function useMagicColor(props) {
  const [color, setColor] = useState('transparent');
  const colorRef = useRef('transparent');

  // Change color every 1 seconds
  useEffect(() => {
    const colorInterval = setInterval(() => {
      const newColor = randomColor(colorRef.current);
      colorRef.current = newColor;  // hold the current color for the next random color
      setColor(newColor);
    }, 650);

    return () => {
      clearInterval(colorInterval);
    }
  }, [])

  return color;
}

export default useMagicColor;