import React, { Component } from "react";
import axios from "axios";
import { path } from "../domain";
import { errorPopup, serverDown } from "../Errors";
import "./jokes.css";
import { Link } from "react-router-dom";

class Jokes extends Component {
  state = {
    jokes: [],
    term: "",
    page: 1,
    total_pages: 0,
    next_page: 1,
    previous_page: 1,
    limit: 5
  };
  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onGetJokes = async () => {
    const { term, page, jokes, limit } = this.state;
    try {
      const resJokes = await axios.get(`${path}/jokes`, {
        params: { term, page, limit }
      });
      if (resJokes.status === 200 && resJokes.data.results) {
        this.setState({
          jokes:
            resJokes.data.results.length > 0
              ? [...jokes, ...resJokes.data.results]
              : [
                  { id: 1, joke: `Sorry, there is no jokes for ${term}.!!! 😪` }
                ],
          total_pages: resJokes.data.total_pages,
          next_page: resJokes.data.next_page,
          previous_page: resJokes.data.previous_page
        });
      } else {
        throw Error(serverDown);
      }
    } catch (err) {
      console.log({ ...err });
      if (err.response && err.response.data && err.response.data.message) {
        if (err.response.status === 404) {
          return errorPopup("Page not found.");
        }
        return errorPopup(err.response.data.message);
      } else {
        return errorPopup(serverDown);
      }
    }
  };
  onLoadMoreJokes = () => {
    let { next_page } = this.state;
    this.setState({ page: next_page }, () => {
      this.onGetJokes();
    });
  };
  onSearchJokes = e => {
    e.preventDefault();
    this.setState(
      {
        jokes: [],
        page: 1,
        total_pages: 0,
        next_page: 1,
        previous_page: 1,
        limit: 5
      },
      () => {
        this.onGetJokes();
      }
    );
  };
  componentDidMount() {
    this.onGetJokes();
  }

  render() {
    const { jokes, term, total_pages, page, limit } = this.state;
    return (
      <div className="jokes-warper">
        <div className="jokes">
          <div className="jokes-header">
            <span>Jokes</span>
            <Link to="/">Home</Link>
          </div>
          <div className="jokes-list">
            {jokes.map(joke => {
              return (
                <div className="joke" key={joke.id}>
                  {joke.joke}
                </div>
              );
            })}
            {page !== total_pages && total_pages > 1 && (
              <span className="jokes-load-more">
                {limit > 30 ? (
                  <span style={{ color: "red" }}>Max number is 30</span>
                ) : (
                  <span
                    className="jokes-load-more-btn"
                    onMouseDown={this.onLoadMoreJokes}
                  >
                    Load
                  </span>
                )}{" "}
                <input
                  type="number"
                  name="limit"
                  value={limit}
                  onChange={this.onChange}
                  max="30"
                  min="1"
                />{" "}
                more jokes...
              </span>
            )}
            <form className="jokes-form" onSubmit={this.onSearchJokes}>
              <input
                type="term"
                name="term"
                placeholder="Type something..."
                value={term}
                onChange={this.onChange}
                required
              />
              <button type="submit" disabled={!term}>
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Jokes;
