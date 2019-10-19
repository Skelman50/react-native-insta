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
import {
  updateEmail,
  updatePassword,
  login,
  getUser,
  facebookLogin
} from "../actions/user";
import { initialize } from "../config/config";

class Login extends Component {
  componentDidMount = () => {
    initialize.auth().onAuthStateChanged(user => {
      const {
        navigation: { navigate },
        getUser
      } = this.props;
      if (user) {
        getUser(user.uid, "LOGIN");
        if (this.props.user) {
          navigate("Home");
        }
      }
    });
  };
  render() {
    const {
      user: { email, password },
      updateEmail,
      login,
      updatePassword,
      navigation: { navigate },
      facebookLogin
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
        <TouchableOpacity style={styles.facebookButton} onPress={facebookLogin}>
          <Text>Login with facebook</Text>
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

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, getUser, facebookLogin },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
