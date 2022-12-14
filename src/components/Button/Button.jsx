import PropTypes from 'prop-types';
import css from './Button.module.css';
const Button = ({ onLoad }) => {
  return (
    <button onClick={onLoad} className={css.Button} type="button">
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onLoad: PropTypes.func.isRequired,
};
