import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./reducers";
import SwitchNavigator from "./navigation/SwitchNavigator";
import GeneralStatusBar from "./screens/GeneralStatusBar";
import { YellowBox } from "react-native";
import "./fixingTimeBug"

YellowBox.ignoreWarnings(["Setting a timer"]);
console.ignoredYellowBox = ["Setting a timer"];

const middleware = applyMiddleware(thunk);
const store = createStore(reducer, middleware);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GeneralStatusBar hidden={false} />
        <SwitchNavigator />
      </Provider>
    );
  }
}

export default App;
