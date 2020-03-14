import { SET_USER } from "./types";
import axios from "axios";
import { path } from "../../domain";
import { errorPopup, serverDown } from "../../Errors";

export const fetchUser = async id => {
  try {
    const user = await axios.get(`${path}/user/${id}`);
    if (user.status === 200) {
      return user.data;
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

const setUser = user => {
  return {
    type: SET_USER,
    user
  };
};

export const getUser = id => {
  return async dispatch => {
    let user = await fetchUser(id);
    dispatch(setUser(user));
  };
};


