import React, { Component } from "react";
import "./index.css";
class Sidebar extends Component {
  componentDidMount() {
    setTimeout(() => {
      const { users, user, stompClient } = this.props;
      let id = null;
      users.forEach(singleUser => {
        if (user.id !== singleUser.id) {
          id = `${user.id}${singleUser.id}${new Date().getTime()}`;
          stompClient.subscribe(
            `/topic/chat/${user.id}/${singleUser.id}`,
            e => {
              if (this.props.selectedUser.id !== user.id) {
                this.props.setSendedMessage(JSON.parse(e.body));
              }
            },
            {
              id
            }
          );
        }
      });
    }, 1000);
  }

  render() {
    const { users, selectedUser, user } = this.props;

    if (!users && users.length === 0) {
      return <div className="home-chat-sidebar-warper"></div>;
    }
    return (
      <div className="home-chat-sidebar-warper">
        {users.map(singleUser => {
          if (user.id === singleUser.id) {
            return (
              <div
                className={`home-chat-sidebar-user ${
                  selectedUser.id === singleUser.id
                    ? "home-chat-sidebar-user-active"
                    : null
                }`}
                key={singleUser.id}
                onMouseDown={() => this.props.onSelectUser(user.id, singleUser)}
              >
                Saved Messages
              </div>
            );
          } else {
            return (
              <div
                className={`home-chat-sidebar-user ${
                  selectedUser.id === singleUser.id
                    ? "home-chat-sidebar-user-active"
                    : null
                }`}
                key={singleUser.id}
                onMouseDown={() => this.props.onSelectUser(user.id, singleUser)}
              >
                {singleUser.name}
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default Sidebar;
