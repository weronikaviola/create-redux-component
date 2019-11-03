import {
  SET_STATE,
} from "./Actions";

function BASE_COMPONENT_NAMEReducer(state = {}, action) {
  switch (action.type) {
    case SET_STATE:
      return Object.assign({}, state, {
        [action.param]: action.value,
      });
    default:
      return state;
  }
}
