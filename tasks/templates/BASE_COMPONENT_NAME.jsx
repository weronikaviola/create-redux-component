import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  applyMiddleware,
  compose,
  createStore,
} from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import { recordReducer } from "../../record-redux/Reducer";

import MainContainerName from "./MAIN_CONTAINER_NAME";

class BASE_COMPONENT_NAME extends Component {
  constructor(props) {
    super(props);

    const {
      firstProp,
    } = props;

    const initialState = {
      firstProp,
      storeMessage: "",
    };

    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /* eslint-enable */

    const store = createStore(
      recordReducer,
      initialState,
      composeEnhancers(
        applyMiddleware(thunkMiddleware),
      ),
    );

    this.state = { store };
  }

  render() {
    const { store } = this.state;
    return (
      <Provider store={store}>
        <MainContainerName />
      </Provider>
    );
  }
}

BASE_COMPONENT_NAME.propTypes = {
  firstProp: PropTypes.string,
};

BASE_COMPONENT_NAME.defaultProps = {
  firstProp: "Welcome to Create Redux Component :)",
};

export default BASE_COMPONENT_NAME;
