import { connect } from "react-redux";
import {
  setState,
} from "./Actions";

import MAIN_COMPONENT_NAME from "./MAIN_COMPONENT_NAME";

const mapStateToProps = function mapStateToProps(state) {
  return {
    message: state.firstProp,
    storeMessage: state.storeMessage,
  };
};

const mapDispatchToProps = {
  setState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MAIN_COMPONENT_NAME);
