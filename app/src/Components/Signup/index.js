import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loggedIn, signup } from "../../Services/Auth";
import "./index.css";

class Signup extends Component {
  state = { email: "", password: "", err: "", name: "" };

  UNSAFE_componentWillMount() {
    if (loggedIn()) {
      window.location.replace("/");
    }
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value, err: "" });
  };

  handelSignup = async e => {
    e.preventDefault();
    this.setState({ err: "" });
    const { name, email, password } = this.state;
    signup(name, email, password);
  };

  render() {
    const { email, password, name, err } = this.state;
    return (
      <div className="sign-up-warper">
        <div>
          <h4>Signup form</h4>
          <form className="sign-up-form" onSubmit={this.handelSignup}>
            {err ? <p style={{ color: "red" }}>{err}</p> : null}
            <input
              type="name"
              name="name"
              placeholder="name"
              value={name}
              onChange={this.onChange}
              required
            />
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
              disabled={!name || !email || !password || password.length < 6}
            >
              Submit
            </button>
          </form>
          <div style={{ paddingTop: "10px" }}>
            Already have an account ->? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
