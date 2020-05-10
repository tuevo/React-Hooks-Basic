import React from 'react';
import useMagicColor from '../../hooks/useMagicColor';
import './BetterMagicBox.style.scss';

function BetterMagicBox(props) {
  const color = useMagicColor();
  return (
    <div className="better-magic-box animated tada" style={{ backgroundColor: color }}>
      Tada !!!
    </div>
  );
}

export default BetterMagicBox;