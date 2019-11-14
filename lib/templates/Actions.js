export const SET_STATE = "set_state";

export function setState({ param, value }) {
  return {
    type: SET_STATE,
    param,
    value,
  };
}
