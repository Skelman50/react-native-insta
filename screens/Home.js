import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { styles } from "../styles";
import { getPosts, unlikePost, likePost } from "../actions/post";
import { Ionicons, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { getUser } from "../actions/user";

class Home extends Component {
  state = {
    isLoading: false
  };
  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      const { getPosts } = this.props;
      getPosts(this.isloading);
    });
  };

  isloading = loading => {
    this.setState({
      isloading: loading
    });
  };

  componentWillUnmount = () => {
    this._navListener.remove();
  };

  navigateMap = item => {
    this.props.navigation.navigate("Map", { location: item.location });
  };

  likePost = post => {
    const { uid } = this.props.user;
    if (post.likes.includes(uid)) {
      this.props.unlikePost(post);
    } else {
      this.props.likePost(post);
    }
  };

  goToProfile = item => async () => {
    await this.props.getUser(item.uid);
    this.props.navigation.navigate("Profile");
  };

  render() {
    const {
      post: { feed },
      user: { uid }
    } = this.props;
    if (this.state.isloading) {
      return <ActivityIndicator style={styles.container} />;
    }
    return (
      <View style={styles.containerComments}>
        <FlatList
          data={feed}
          refreshing={false}
          onRefresh={() => this.props.getPosts()}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const liked = item.likes.includes(uid);
            return (
              <View>
                <View style={[styles.row, styles.space]}>
                  <View style={[styles.row, styles.center]}>
                    <TouchableOpacity onPress={this.goToProfile(item)}>
                      <Image
                        style={styles.roundImage}
                        source={{ uri: item.photo }}
                      />
                    </TouchableOpacity>
                    <View style={[styles.containerComments, styles.left]}>
                      <Text style={styles.bold}>{item.username}</Text>
                      <Text style={[styles.gray, styles.small]}>
                        {moment(item.date).format("ll")}
                      </Text>
                      <TouchableOpacity onPress={() => this.navigateMap(item)}>
                        <Text>{item.place && item.place}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Ionicons style={{ margin: 5 }} name="ios-flag" size={25} />
                </View>
                <TouchableOpacity onPress={() => this.likePost(item)}>
                  <Image
                    style={styles.postPhoto}
                    source={{ uri: item.postPhoto }}
                  />
                </TouchableOpacity>
                <View style={styles.row}>
                  <Ionicons
                    style={{ margin: 5 }}
                    color={liked ? "#db565b" : "#000"}
                    name={liked ? "ios-heart" : "ios-heart-empty"}
                    size={25}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Comment", item)
                    }
                  >
                    <SimpleLineIcons
                      style={{ margin: 5 }}
                      name="bubbles"
                      size={25}
                    />
                  </TouchableOpacity>
                  <Feather style={{ margin: 5 }} name="send" size={25} />
                </View>
                <Text>{item.postDescription}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ post, user }) => {
  return { post, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getPosts, unlikePost, likePost, getUser },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
