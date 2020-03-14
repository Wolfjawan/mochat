import React, { Component } from "react";
import Send_M from "../../images/send-m.png";
import "./index.css";

class Messages extends Component {
  state = {
    message: "",
    isSubscribed: false,
    subscribeId: null
  };

  onChange = e => {
    const { isSubscribed } = this.state;
    const { selectedUser, user, stompClient } = this.props;
    const id = `${user.id}${selectedUser.id}${new Date().getTime()}`;
    if (!isSubscribed) {
      stompClient.subscribe(
        `/topic/chat/${selectedUser.id}/${user.id}`,
        e => {
          this.props.setSendedMessage(JSON.parse(e.body));
          this.setState({ message: "" });
        },
        {
          id
        }
      );
      this.setState({ isSubscribed: true, subscribeId: id });
    }
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handelSubmitMessage = async e => {
    e.preventDefault();
    const { selectedUser, user, stompClient } = this.props;
    const { message } = this.state;
    stompClient.send(
      `/app/chat/${user.id}/${selectedUser.id}`,
      {},
      JSON.stringify({ message, fromId: user.id, toId: selectedUser.id })
    );
  };


  componentWillUnmount() {
    const { stompClient } = this.props;
    const { subscribeId, isSubscribed } = this.state;
    if (isSubscribed) {
      stompClient.unsubscribe(subscribeId);
    }
    this.setState({
      isSubscribed: false,
      subscribeId: null
    });
  }

  onTyping = () => {
    const { selectedUser, user, stompClient } = this.props;
    stompClient.send(
      `/app/typing/${user.id}/${selectedUser.id}`,
      {},
      JSON.stringify("typing")
    );
  };
  render() {
    const { message } = this.state;
    const { selectedUser } = this.props;
    return (
      <div className="messages-warper">
        <div className="messages-list-messages">
          {selectedUser.messages.map(singleMessage => {
            return (
              <div
                key={singleMessage.id}
                className={`messages-single-message-warper ${
                  singleMessage.toId === selectedUser.id
                    ? "align-right"
                    : "align-left"
                }`}
              >
                <div
                  className={`messages-single-message ${
                    singleMessage.toId === selectedUser.id
                      ? "to-message"
                      : "from-message"
                  }`}
                >
                  {singleMessage.message}
                </div>
              </div>
            );
          })}
        </div>
        <form className="messages-form" onSubmit={this.handelSubmitMessage}>
          <div className="messages-form-input-warper">
            <textarea
              placeholder="Write a message..."
              className="messages-form-input-textarea"
              onChange={this.onChange}
              value={message}
              name="message"
              onKeyUp={e => {
                e.keyCode !== 13 && this.onTyping();
              }}
            />
          </div>
          <button type="submit" className="messages-form-input-button">
            <img alt="send message" width="100%" height="100%" src={Send_M} />
          </button>
        </form>
      </div>
    );
  }
}

export default Messages;
