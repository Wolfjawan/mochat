import { SET_USERS, SELECT_USER, SET_MESSAGE } from "../Actions/types";
export const INITIAL_STATE = {
  users: [],
  selectedUser: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USERS:
      if (action.users && action.users.length > 0) {
        return {
          ...state,
          users: action.users
        };
      }
      return {
        ...state
      };
    case SELECT_USER:
      return {
        ...state,
        selectedUser: action.user
      };
    case SET_MESSAGE:
      const newUsers = state.users.map(singleUser => {
        if (singleUser.id === action.message.to_id) {
          return {
            ...singleUser,
            messages: singleUser.messages
              ? [action.message, ...singleUser.messages]
              : [action.message]
          };
        }
        return singleUser;
      });
      return {
        ...state,
        users: newUsers,
        selectedUser: {
          ...state.selectedUser,
          messages: state.selectedUser.messages
            ? [action.message, ...state.selectedUser.messages]
            : [action.message]
        }
      };
    default:
      return state;
  }
};
