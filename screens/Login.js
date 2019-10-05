import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { styles } from "../styles";
import { updateEmail, updatePassword, login } from "../actions/user";
import { initialize } from "../config/config";

class Login extends Component {
  componentDidMount = () => {
    initialize.auth().onAuthStateChanged(user => {
      const {
        navigation: { navigate }
      } = this.props;
      if (user) {
        navigate("Home");
      }
    });
  };
  // login = () => {
  //   const {
  //     login,
  //     navigation: { navigate }
  //   } = this.props;
  //   login();
  //   navigate("Home");
  // };
  render() {
    const {
      email,
      password,
      updateEmail,
      login,
      updatePassword,
      navigation: { navigate }
    } = this.props;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TextInput
          value={email}
          onChangeText={input => updateEmail(input)}
          placeholder="Email"
          style={styles.border}
        />
        <TextInput
          textContentType="password"
          value={password}
          onChangeText={input => updatePassword(input)}
          placeholder="Password"
          secureTextEntry={true}
          style={styles.border}
        />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text>Login</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10 }}>OR</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate("Signup")}
        >
          <Text>SignUp</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ user: { email, password } }) => {
  return { email, password };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateEmail, updatePassword, login }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
