import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Activity from "../screens/Activity";
import Upload from "../screens/Upload";
import Profile from "../screens/Profile";

const TabNavigator = createBottomTabNavigator({
  Home,
  Search,
  Upload,
  Activity,
  Profile
});

export default createAppContainer(TabNavigator);
