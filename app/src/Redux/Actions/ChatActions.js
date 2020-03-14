import { SET_MESSAGE, SET_MESSAGES, SET_SOCKET_CONNECTION } from "./types";
import axios from "axios";
import { path } from "../../domain";
import { errorPopup, serverDown } from "../../Errors";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
const socket = new SockJS(`${path}/websocket`);

export const _sendMessage = async message => {
  try {
    const resMessage = await axios.post(`${path}/chat/message`, message);
    if (resMessage.status === 201) {
      return resMessage.data;
    } else {
      throw Error(serverDown);
    }
  } catch (err) {
    return errorPopup(serverDown);
  }
};
const setSendMessage = message => {
  return {
    type: SET_MESSAGE,
    message
  };
};

export const sendMessage = message => {
  return async dispatch => {
    const resMessage = await _sendMessage(message);
    if (resMessage) {
      dispatch(setSendMessage(resMessage));
    }
  };
};

export const _GetConversation = async params => {
  try {
    const resConversation = await axios.post(`${path}/chat/conversation`, {
      params
    });
    if (resConversation.status === 201) {
      return resConversation.data;
    } else {
      throw Error(serverDown);
    }
  } catch (err) {
    return errorPopup(serverDown);
  }
};
const setConversation = messages => {
  return {
    type: SET_MESSAGES,
    messages
  };
};

export const GetConversation = query => {
  return async dispatch => {
    const resConversation = await _GetConversation(query);
    if (resConversation) {
      dispatch(setConversation(resConversation));
    }
  };
};

export const webSocketConnection = () => {
  const stompClient = Stomp.over(socket);
  stompClient.debug = function() {};
  stompClient.connect();
  return async dispatch => {
    dispatch({
      type: SET_SOCKET_CONNECTION,
      stompClient
    });
  };
};

export const setSendedMessage = message => {
  return async dispatch => {
    if (message) {
      dispatch({
        type: SET_MESSAGE,
        message
      });
    }
  };
};
