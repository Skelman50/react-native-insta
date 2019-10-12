import { createAppContainer, createStackNavigator } from "react-navigation";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      title: "Signup"
    }
  }
});

export default createAppContainer(AuthNavigator);
