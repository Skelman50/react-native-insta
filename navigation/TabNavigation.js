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
import {
  HomeNavigator,
  SearchNavigator,
  UploadNavigator,
  ProfileNavigator,
  ActivityNavigator
} from "../navigation/StackNavigator";
const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeNavigator,
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
    screen: SearchNavigator,
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
    screen: UploadNavigator,
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
    screen: ActivityNavigator,
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
    screen: ProfileNavigator,
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
