import React from "react";
import PropTypes from "prop-types";

const MAIN_COMPONENT_NAME = (props) => {
  const {
    message,
    setState,
    storeMessage,
  } = props;

  const onClick = () => {
    setState({
      storeMessage: "🎊  🎊 You have successfully connected to Redux store! 🎊  🎊",
    });
  };

  return (
    <div className="card">
      <div className="card__header">
        {message}
      </div>
      <div className="row">
        <span className="bold">Redux Store Connection:&nbsp;</span>
        {storeMessage}
      </div>
      <button
        type="button"
        onClick={onClick}
        className="btn btn--green"
      >
        TEST CONNECTION!
      </button>
    </div>
  );
};

MAIN_COMPONENT_NAME.propTypes = {
  message: PropTypes.string,
  setState: PropTypes.func.isRequired,
  storeMessage: PropTypes.string.isRequired,
};

MAIN_COMPONENT_NAME.defaultProps = {
  message: "Hello!",
};

export default MAIN_COMPONENT_NAME;
