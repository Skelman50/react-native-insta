import { createAppContainer, createStackNavigator } from "react-navigation";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View, StatusBar, Text } from "react-native";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Upload from "../screens/Upload";
import Activity from "../screens/Activity";
import Profile from "../screens/Profile";
import { styles } from "../styles";
import Camera from "../screens/Camera";
import Map from "../screens/Map";
import Signup from "../screens/Signup";
import Comment from "../screens/Comment";
import HeaderTitleText from "./helpers/HeaderTitle";
import HeaderLeftBack from "./helpers/HraderLeftBack";
import { headerTitleStyle } from "./helpers/headerTitleStyle";
import Chat from "../screens/Chat";
import Messages from "../screens/Messages";

const ProfileNav = {
  screen: Profile,
  navigationOptions: ({ navigation }) => ({
    headerTitle: <HeaderTitleText text={"Profile"} />,
    headerLeft: <HeaderLeftBack navigation={navigation} />,
    headerRight: <View />
  })
};

const headerTitle = (
  <View style={styles.containerTitle}>
    <Image
      style={{
        width: 120,
        height: 35
      }}
      source={require("../assets/instalogo.png")}
    />
  </View>
);

const headerLeft = navigation => (
  <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
    <Ionicons style={{ marginLeft: 10 }} name="ios-camera" size={30} />
  </TouchableOpacity>
);

const headerRight = navigation => (
  <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
    <Ionicons style={{ marginRight: 10 }} name="ios-send" size={30} />
  </TouchableOpacity>
);

const navigationOptions = navigation => ({
  headerTitle,
  headerLeft: headerLeft(navigation),
  headerRight: headerRight(navigation)
});

export const HomeNavigator = createAppContainer(
  createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => navigationOptions(navigation)
    },
    Camera: {
      screen: Camera,
      navigationOptions: {
        header: null
      }
    },
    Map: {
      screen: Map,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderTitleText text={"Map View"} />,
        headerLeft: <HeaderLeftBack navigation={navigation} />,
        headerRight: <View />
      })
    },
    Chat: {
      screen: Chat,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderTitleText text={"Chat"} />,
        headerLeft: <HeaderLeftBack navigation={navigation} />,
        headerRight: <View />
      })
    },
    Messages: {
      screen: Messages,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderTitleText text={"Messages"} />,
        headerLeft: <HeaderLeftBack navigation={navigation} />,
        headerRight: <View />
      })
    },
    Profile: ProfileNav,
    Comment: {
      screen: Comment,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderTitleText text={"Comments"} />,
        headerLeft: <HeaderLeftBack navigation={navigation} />,
        headerRight: <View />
      })
    }
  })
);

HomeNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.routes.some(route => route.routeName === "Camera")) {
    tabBarVisible = false;
  }
  if (navigation.state.routes.some(route => route.routeName === "Comment")) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

export const SearchNavigator = createAppContainer(
  createStackNavigator({
    Search: {
      screen: Search,
      navigationOptions: {
        header: null
      }
    },
    Profile: ProfileNav
  })
);

export const UploadNavigator = createAppContainer(
  createStackNavigator({
    Upload: {
      screen: Upload,
      navigationOptions: {
        title: "Upload",
        headerTitleStyle
      }
    }
  })
);

export const ActivityNavigator = createAppContainer(
  createStackNavigator({
    Activity: {
      screen: Activity,
      navigationOptions: {
        title: "Activity",
        headerTitleStyle
      }
    },
    Profile: ProfileNav
  })
);

export const ProfileNavigator = createAppContainer(
  createStackNavigator({
    MyProfile: {
      screen: Profile,
      navigationOptions: {
        title: "My Profile",
        headerTitleStyle
      }
    },
    Edit: {
      screen: Signup,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <HeaderTitleText text={"Edit"} />,
        headerLeft: <HeaderLeftBack navigation={navigation} />,
        headerRight: <View />
      })
    }
  })
);
