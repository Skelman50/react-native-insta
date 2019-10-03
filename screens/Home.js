import React, { Component } from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

class Home extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    );
  }
}

export default Home;
