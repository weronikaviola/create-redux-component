import React from "react";
import PropTypes from "prop-types";

import { DESCRIPTION } from "./Constants";

const MAIN_COMPONENT_NAME = (props) => {
  const {
    message,
    setState,
    storeMessage,
  } = props;

  const onClick = () => {
    setState({
      param: "storeMessage",
      value: "🎊  🎊 You have successfully connected to Redux store! 🎊  🎊",
    });
  };

  return (
    <div style={{
      background: "#fff",
      border: "1px solid gray",
      borderRadius: "4px",
    }}>
      <h1>{message}</h1>
      <h5>{DESCRIPTION}</h5>
      <div>
        <b>Redux Store Connection:&nbsp;</b>
        {storeMessage}
      </div>
      <button
        type="button"
        onClick={onClick}
        style={{
          background: "#12cc7c",
          border: "none",
        }}
      >
        TEST CONNECTION!
      </button>
    </div>
  );
};

MAIN_COMPONENT_NAME.propTypes = {
  message: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  storeMessage: PropTypes.string.isRequired,
};

export default MAIN_COMPONENT_NAME;
