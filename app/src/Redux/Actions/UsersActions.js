import { SET_USERS, SELECT_USER } from "./types";
import axios from "axios";
import { path } from "../../domain";
import { errorPopup, serverDown } from "../../Errors";

export const fetchUsers = async () => {
  try {
    const users = await axios.get(`${path}/users`);
    if (users.status === 200) {
      return users.data;
    } else {
      throw Error(serverDown);
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      return errorPopup(err.response.data.message);
    } else {
      return errorPopup(serverDown);
    }
  }
};
const setUsers = users => {
  return {
    type: SET_USERS,
    users
  };
};

export const getUsers = () => {
  return async dispatch => {
    const users = await fetchUsers();
    dispatch(setUsers(users));
  };
};

const _getConversation = async params => {
  try {
    const resConversation = await axios.get(`${path}/chat/conversation`, {
      params
    });
    if (resConversation.status === 200) {
      return resConversation.data;
    } else {
      throw Error(serverDown);
    }
  } catch (err) {
    return errorPopup(serverDown);
  }
};

const setSelectedUser = user => {
  return {
    type: SELECT_USER,
    user
  };
};
export const onSelectUser = (fromId, user) => {
  const params = {
    fromId,
    toId: user.id
  };
  return async dispatch => {
    const messages = await _getConversation(params);
    dispatch(setSelectedUser({ ...user, messages }));
  };
};
