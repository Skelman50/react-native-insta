import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import reducer from "./reducers";
import SwitchNavigator from "./navigation/SwitchNavigator";
import GeneralStatusBar from "./screens/GeneralStatusBar";

const middleware = applyMiddleware(thunk);
const store = createStore(reducer, middleware);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GeneralStatusBar />
        <SwitchNavigator />
      </Provider>
    );
  }
}
