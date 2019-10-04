import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { reducer } from "./reducers";
import SwitchNavigator from "./navigation/SwitchNavigator";
import GeneralStatusBar from "./screens/GeneralStatusBar";

const store = createStore(reducer);
const middleware = applyMiddleware(thunk, middleware);

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
