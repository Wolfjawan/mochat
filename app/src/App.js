import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./Redux/Reducers";
import Routes from "./Routes";
import { createStore, applyMiddleware, compose } from "redux";

import "./App.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(ReduxThunk))
);



class App extends Component {
  render() {
    return (
      <div>
        <div id="errors" />
        <Provider store={store}>
          <Router>
            <Routes/>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
