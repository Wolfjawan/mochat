import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../Services/Auth";
import "./index.css";
class SidebarHeader extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="home-chat-sidebar-header">
        <span>{user.name}</span>
        <Link to="/jokes" style={{ color: "green" }}>
          Jokes
        </Link>
        <span onMouseDown={logout} style={{ color: "red" }}>
          Logout
        </span>
      </div>
    );
  }
}

export default SidebarHeader;
