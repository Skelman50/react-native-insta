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

const headerRight = (
  <TouchableOpacity>
    <Ionicons style={{ marginRight: 10 }} name="ios-send" size={30} />
  </TouchableOpacity>
);

const navigationOptions = navigation => ({
  headerTitle,
  headerLeft: headerLeft(navigation),
  headerRight
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
        headerTitle: (
          <View style={styles.containerTitle}>
            <Text>Map View</Text>
          </View>
        ),
        headerTitleStyle: {
          alignSelf: "center",
          textAlign: "center",
          justifyContent: "center",
          flex: 1
        },
        headerLeft: (
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name={"ios-arrow-back"} size={30} />
          </TouchableOpacity>
        ),
        headerRight: <View></View>
      })
    }
  })
);

HomeNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.routes.some(route => route.routeName === "Camera")) {
    tabBarVisible = false;
    StatusBar.setHidden = false;
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
        title: "Search",
        headerTitleStyle: {
          alignSelf: "center",
          textAlign: "center",
          justifyContent: "center",
          flex: 1
        }
      }
    }
  })
);

export const UploadNavigator = createAppContainer(
  createStackNavigator({
    Search: {
      screen: Upload,
      navigationOptions: {
        title: "Upload",
        headerTitleStyle: {
          alignSelf: "center",
          textAlign: "center",
          justifyContent: "center",
          flex: 1
        }
      }
    }
  })
);

export const ActivityNavigator = createAppContainer(
  createStackNavigator({
    Search: {
      screen: Activity,
      navigationOptions: {
        title: "Activity",
        headerTitleStyle: {
          alignSelf: "center",
          textAlign: "center",
          justifyContent: "center",
          flex: 1
        }
      }
    }
  })
);

export const ProfileNavigator = createAppContainer(
  createStackNavigator({
    Search: {
      screen: Profile,
      navigationOptions: {
        title: "Profile",
        headerTitleStyle: {
          alignSelf: "center",
          textAlign: "center",
          justifyContent: "center",
          flex: 1
        }
      }
    }
  })
);
