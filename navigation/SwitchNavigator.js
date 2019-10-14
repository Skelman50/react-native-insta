import { createAppContainer, createSwitchNavigator } from "react-navigation";
import TabNavigation from "./TabNavigation";
import AuthNavigator from "./AuthNavigator";

const SwitchNavigator = createSwitchNavigator(
  {
    Home: {
      screen: TabNavigation
    },
    Auth: {
      screen: AuthNavigator
    }
  },
  { initialRouteName: "Auth" }
);

export default createAppContainer(SwitchNavigator);
