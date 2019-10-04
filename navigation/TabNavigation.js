import { createAppContainer } from "react-navigation";
import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import {
  Ionicons,
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons
} from "@expo/vector-icons";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Activity from "../screens/Activity";
import Upload from "../screens/Upload";
import Profile from "../screens/Profile";

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({ focused }) => {
        if (focused) {
          return <Entypo name="home" size={35} />;
        }
        return <AntDesign name="home" size={35} />;
      }
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({ focused }) => {
        if (!focused) {
          return <Ionicons name={"ios-search"} size={35} />;
        }
        return <FontAwesome name={"search"} size={35} />;
      }
    }
  },
  Upload: {
    screen: Upload,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({ focused }) => {
        return (
          <Ionicons
            name={focused ? "ios-add-circle" : "ios-add-circle-outline"}
            size={35}
          />
        );
      }
    }
  },
  Activity: {
    screen: Activity,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({ focused }) => {
        return (
          <Ionicons
            name={focused ? "ios-heart" : "ios-heart-empty"}
            size={35}
          />
        );
      }
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: " ",
      tabBarIcon: ({ focused }) => {
        if (focused) {
          return <MaterialIcons name={"person"} size={35} />;
        }
        return <MaterialIcons name={"person-outline"} size={35} />;
      }
    }
  }
});

export default createAppContainer(TabNavigator);
