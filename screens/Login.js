import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "../styles";

class Login extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput
          value=""
          onChangeText={input => console.log(input)}
          placeholder="Email"
        />
        <TextInput
          value=""
          onChangeText={input => console.log(input)}
          placeholder="Password"
        />
      </View>
    );
  }
}

export default Login;
