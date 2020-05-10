import React from 'react';
import PropTypes from 'prop-types';
import './Hero.style.scss';

Hero.propTypes = {
  name: PropTypes.string,
};

Hero.defaultProps = {
  name: ''
}

function Hero(props) {
  const { name } = props;
  console.log('Hero render: ', name);

  return (
    <p className="hero">
      {name}
    </p>
  );
}

export default React.memo(Hero);