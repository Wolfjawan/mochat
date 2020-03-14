import decode from "jwt-decode";

import axios from "axios";
import { path } from "../domain";
import { errorPopup, serverDown } from "../Errors";
export const login = async (email, password) => {
  const headers = {
    email,
    password
  };
  try {
    const user = await axios.get(`${path}/login`, { headers });
    if (user.status === 200) {
      setToken(user.data);
      return "";
    } else {
      return errorPopup(serverDown);
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      errorPopup(err.response.data.message);
    } else {
      errorPopup(serverDown);
    }
  }
};

export const signup = async (name, email, password) => {
  try {
    const user = await axios.post(`${path}/register`, {
      name,
      email,
      password
    });
    if (user.status === 201) {
      window.location.replace("/login");
    } else {
      return errorPopup(serverDown);
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      errorPopup(err.response.data.message);
    } else {
      errorPopup(serverDown);
    }
  }
};

export const setToken = idToken => {
  localStorage.setItem("id_token", idToken);
  window.location.replace("/");
};
export const getToken = () => {
  const token = localStorage.getItem("id_token");
  return token;
};
export const logout = () => {
  localStorage.removeItem("id_token");
  localStorage.clear();
  window.location.reload(true);
};
export const isTokenExpired = token => {
  try {
    const decoded = decode(token);
    if (decoded && decoded.exp && decoded.exp < Date.now() / 1000) {
      logout();
      return true;
    }
    return false;
  } catch (err) {
    logout();
    return true;
  }
};
export const loggedIn = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

export const getTokenData = () => {
  const token = getToken();
  if (token) return decode(token);
};
