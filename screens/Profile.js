import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import { styles } from "../styles";
import { initialize } from "../config/config";
import { getUser } from "../actions/user";

class Profile extends Component {
  state = {
    isLoading: false
  };
  logout = () => {
    initialize.auth().signOut();
    this.props.navigation.navigate("Auth");
  };
  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      this.getUser();
    });
  };
  getUser = async () => {
    const {
      navigation: {
        state: { routeName }
      },
      getUser,
      user: { uid }
    } = this.props;
    if (routeName === "MyProfile") {
      this.setState({ isLoading: true });
      await getUser(uid, "LOGIN");
      this.setState({ isLoading: false });
    }
  };
  componentWillUnmount = () => {
    this._navListener.remove();
  };
  render() {
    let user = {};
    let idx = 0;
    const {
      user: userProp,
      profile,
      navigation: {
        navigate,
        state: { routeName }
      }
    } = this.props;
    if (routeName === "Profile") {
      user = profile;
    } else {
      user = userProp;
    }
    user.followers = user.followers ? user.followers : [];
    user.following = user.following ? user.following : [];
    if (this.state.isLoading) {
      return <ActivityIndicator style={styles.container} />;
    }
    return (
      <View style={styles.containerComments}>
        <View style={[styles.row, styles.space, { paddingHorizontal: 40 }]}>
          <View style={styles.center}>
            <Image style={styles.roundImage} source={{ uri: user.photo }} />
            <Text>{user.username}</Text>
            <Text>{user.bio}</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.bold}>{user.posts.length}</Text>
            <Text>posts</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.bold}>{user.followers.length}</Text>
            <Text>followers</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.bold}>{user.following.length}</Text>
            <Text>following</Text>
          </View>
        </View>
        <View style={styles.center}>
          {routeName === "MyProfile" ? (
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.buttonSmall}
                onPress={() => this.props.navigation.navigate("Edit")}
              >
                <Text style={styles.bold}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSmall}
                onPress={() => firebase.auth().signOut()}
              >
                <Text style={styles.bold}>Logout</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.buttonSmall}
                onPress={() => this.follow(user)}
              >
                <Text style={styles.bold}>
                  {user.followers.indexOf(this.props.user.uid) >= 0
                    ? "UnFollow User"
                    : "Follow User"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSmall}
                onPress={() => this.props.navigation.navigate("Chat", user.uid)}
              >
                <Text style={styles.bold}>Message</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <FlatList
          style={{ paddingTop: 25 }}
          horizontal={false}
          numColumns={3}
          data={user.posts}
          keyExtractor={() => {
            idx += 1;
            return JSON.stringify(idx);
          }}
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
