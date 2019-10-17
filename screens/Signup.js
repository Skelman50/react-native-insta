import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import KeyboardSpacer from "react-native-keyboard-spacer";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  View
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { styles } from "../styles";
import {
  updateEmail,
  updatePassword,
  updateBio,
  updateUsername,
  signup,
  updateUser
} from "../actions/user";
import { uploadPhoto } from "../actions/upload";
import { updatePhoto } from "../actions/user";

class Signup extends Component {
  onPress = () => {
    const { routeName } = this.props.navigation.state;
    if (routeName === "Signup") {
      this.props.signup();
      this.props.navigation.navigate("Login");
    } else {
      this.props.updateUser();
      this.props.navigation.goBack();
    }
  };

  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const image = await ImagePicker.launchImageLibraryAsync();
      if (!image.cancelled) {
        const url = await this.props.uploadPhoto(image);
        this.props.updatePhoto(url);
      }
    }
  };

  render() {
    const {
      email,
      password,
      bio,
      photo,
      username,
      updateEmail,
      updatePassword,
      updateBio,
      updateUsername
    } = this.props;
    const { routeName } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity style={styles.center} onPress={this.openLibrary}>
            <Image style={styles.roundImage} source={{ uri: photo }} />
            <Text>Upload Photo</Text>
          </TouchableOpacity>
          <TextInput
            value={email}
            onChangeText={input => updateEmail(input)}
            placeholder="Email"
            style={styles.border}
            editable={routeName === "Signup" ? true : false}
          />
          <TextInput
            textContentType="password"
            value={password}
            onChangeText={input => updatePassword(input)}
            placeholder="Password"
            style={styles.border}
            secureTextEntry={true}
            editable={routeName === "Signup" ? true : false}
          />
          <TextInput
            value={username}
            onChangeText={input => updateUsername(input)}
            placeholder="Username"
            style={styles.border}
            editable={routeName === "Signup" ? true : false}
          />
          <TextInput
            value={bio}
            onChangeText={input => updateBio(input)}
            placeholder="Bio"
            style={styles.border}
            editable={routeName === "Signup" ? true : false}
          />
          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text>Done</Text>
          </TouchableOpacity>
        </ScrollView>
        <KeyboardSpacer />
      </View>
    );
  }
}
const mapStateToProps = ({
  user: { email, password, username, bio, photo }
}) => {
  return { email, password, username, bio, photo };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateEmail,
      updatePassword,
      updateBio,
      updateUsername,
      signup,
      uploadPhoto,
      updatePhoto,
      updateUser
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
