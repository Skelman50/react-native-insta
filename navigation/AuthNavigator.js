import { createAppContainer, createStackNavigator } from "react-navigation";
import React from "react";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  }
});

export default createAppContainer(AuthNavigator);
