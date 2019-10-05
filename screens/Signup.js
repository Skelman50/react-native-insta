import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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
  updateBio,
  updateUsername,
  signup
} from "../actions/user";

class Signup extends Component {
  signup = () => {
    const {
      signup,
      navigation: { navigate }
    } = this.props;
    signup();
    navigate("Home");
  };
  render() {
    const {
      email,
      password,
      bio,
      username,
      updateEmail,
      updatePassword,
      updateBio,
      updateUsername
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
          style={styles.border}
          secureTextEntry={true}
        />
        <TextInput
          value={username}
          onChangeText={input => updateUsername(input)}
          placeholder="Username"
          style={styles.border}
        />
        <TextInput
          value={bio}
          onChangeText={input => updateBio(input)}
          placeholder="Bio"
          style={styles.border}
        />
        <TouchableOpacity style={styles.button} onPress={this.signup}>
          <Text>SignUp</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = ({ user: { email, password, username, bio } }) => {
  return { email, password, username, bio };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateEmail, updatePassword, updateBio, updateUsername, signup },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
