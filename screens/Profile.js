import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { styles } from "../styles";
import { initialize } from "../config/config";

class Profile extends Component {
  render() {
    const {
      user: { email, username, bio, photo }
    } = this.props;
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: photo
          }}
        />
        <Text>{email}</Text>
        <Text>{username}</Text>
        <Text>{bio}</Text>
        <Button
          type="clear"
          title="Logout"
          onPress={() => initialize.auth().signOut()}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     { updateEmail, updatePassword, login, getUser },
//     dispatch
//   );
// };

export default connect(mapStateToProps)(Profile);
