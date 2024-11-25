
import PropTypes from 'prop-types';
import './Dice.css';

const Dice = ({ number, rolling }) => {
  return (
    <div className={`dice ${rolling ? 'rolling' : ''}`}>
      {rolling || number === null ? '🎲' : number}
    </div>
  );
};

Dice.propTypes = {
  number: PropTypes.number,
  rolling: PropTypes.bool.isRequired,
};

export default Dice;
