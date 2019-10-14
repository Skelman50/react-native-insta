import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { styles } from "../styles";
import { initialize } from "../config/config";

class Profile extends Component {
  logout = () => {
    initialize.auth().signOut();
    this.props.navigation.navigate("Auth");
  };
  render() {
    let user = {};
    user = this.props.user;
    const { email, username, bio, photo, posts } = user;
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <Image
          style={styles.roundImage}
          source={{
            uri: photo
          }}
        />
        <Text>{email}</Text>
        <Text>{username}</Text>
        <Text>{bio}</Text>
        <View>
          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={() => this.props.navigation.navigate("Edit")}
          >
            <Text style={styles.bold}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSmall} onPress={this.logout}>
            <Text style={styles.bold}>Logout</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal={false}
          numColumns={3}
          data={posts}
          keyExtractor={item => JSON.stringify(item.date)}
          renderItem={({ item }) => (
            <Image
              style={styles.squareLarge}
              source={{ uri: item.postPhoto }}
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ user, profile }) => {
  return { user, profile };
};

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     { updateEmail, updatePassword, login, getUser },
//     dispatch
//   );
// };

export default connect(mapStateToProps)(Profile);
