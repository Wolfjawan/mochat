import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Massages from "../Components/Messages";
import Sidebar from "../Components/Sidebar";
import SidebarHeader from "../Components/SidebarHeader";
import MessagesHeader from "../Components/MessagesHeader";
import {
  getUser,
  getUsers,
  onSelectUser,
  sendMessage,
  webSocketConnection,
  setSendedMessage
} from "../Redux/Actions";
import { loggedIn, getTokenData } from "../Services/Auth";
import "./HomChat.css";

class HomChat extends Component {
  UNSAFE_componentWillMount() {
    if (!loggedIn()) {
      window.location.replace("/login");
    }
    const id = getTokenData().jti;
    this.props.getUser(id);
    this.props.getUsers();
    this.props.webSocketConnection();
  }

  render() {
    return (
      <div className="chat-container">
        <div className="home-chat-container">
          <div className="home-chat-header">
            <SidebarHeader {...this.props} />
            {this.props.users.map(user => {
              if (user.id === this.props.selectedUser.id) {
                return <MessagesHeader key={user.id} {...this.props} />;
              } else return null;
            })}
          </div>
          <div className="home-chat-warper">
            <Sidebar {...this.props} />
            {this.props.selectedUser.id ? (
              <Fragment>
                {this.props.users.map(user => {
                  if (user.id === this.props.selectedUser.id) {
                    return <Massages key={user.id} {...this.props} />;
                  } else return null;
                })}
              </Fragment>
            ) : (
              <div className="messages-warper">
                <p className="message-select-user">
                  Please select a chat to start messaging
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export function mapStateToProps(store) {
  const { user, users } = store;
  return {
    user: user.user,
    users: users.users,
    selectedUser: users.selectedUser,
    stompClient: user.stompClient
  };
}
export default connect(mapStateToProps, {
  getUsers,
  getUser,
  onSelectUser,
  sendMessage,
  webSocketConnection,
  setSendedMessage
})(HomChat);
