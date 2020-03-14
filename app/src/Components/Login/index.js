import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loggedIn, login } from "../../Services/Auth";
import "./index.css";

class Login extends Component {
  state = { email: "", password: "", err: "" };

  UNSAFE_componentWillMount() {
    if (loggedIn()) {
      window.location.replace("/");
    }
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value, err: "" });
  };

  handelLogin = async e => {
    e.preventDefault();
    this.setState({ err: "" });
    const { email, password } = this.state;
    login(email, password);
  };

  render() {
    const { email, password, err } = this.state;
    return (
      <div className="login-warper">
        <div>
          <h4>Login into your account</h4>
          <form className="login-form" onSubmit={this.handelLogin}>
            {err ? <p style={{ color: "red" }}>{err}</p> : null}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.onChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.onChange}
              required
            />
            <button
              type="submit"
              disabled={!email || !password || password.length < 6}
            >
              Login
            </button>
          </form>
          <div style={{ paddingTop: "10px" }}>
            Don't have account ->? <Link to="/signup">Signup</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
