import React, { Component, Fragment } from "react";
import "./index.css";
class MessagesHeader extends Component {
  state = {
    typingSubscribeId: null,
    typing: false
  };

  isTyping = () => {
    const { typing } = this.state;
    if (!typing) {
      this.setState({ typing: true });
      setTimeout(() => {
        this.setState({ typing: false });
      }, 2000);
    }
  };
  UNSAFE_componentWillMount() {
    const { selectedUser, user, stompClient } = this.props;
    const id = `${user.id}${selectedUser.id}${new Date().getTime()}`;
    this.setState({ typingSubscribeId: id });
    stompClient.subscribe(
      `/topic/typing/${user.id}/${selectedUser.id}`,
      () => {
        this.isTyping();
      },
      {
        id
      }
    );
  }
  componentWillUnmount() {
    const { stompClient } = this.props;
    const { typingSubscribeId } = this.state;
    stompClient.unsubscribe(typingSubscribeId);
    this.setState({
      typingSubscribeId: null
    });
  }
  render() {
    const { typing } = this.state;
    const { selectedUser } = this.props;
    return (
      <div className="home-chat-messages-header">
        <span>{selectedUser.name}</span>
        {typing && (
          <Fragment>
            <p>Typing</p>
            <p className="typing"> ...</p>
          </Fragment>
        )}
      </div>
    );
  }
}

export default MessagesHeader;
