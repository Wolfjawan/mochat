import { SET_USER, SET_SOCKET_CONNECTION } from "../Actions/types";
const INITIAL_STATE = {
  user: {},
  stompClient: null
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      if (action.user) {
        return {
          ...state,
          user: action.user
        };
      }
      return {
        ...state
      };
    case SET_SOCKET_CONNECTION:
      return {
        ...state,
        stompClient: action.stompClient
      };
    default:
      return state;
  }
};
