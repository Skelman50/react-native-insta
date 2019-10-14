import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { styles } from "../styles";
import { getPosts, unlikePost, likePost } from "../actions/post";
import { Ionicons, Feather, SimpleLineIcons } from "@expo/vector-icons";

class Home extends Component {
  componentDidMount = () => {
    const { getPosts } = this.props;
    getPosts();
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

  render() {
    const {
      post: { feed },
      user: { uid }
    } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={feed}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const licked = item.likes.includes(uid);
            return (
              <View>
                <View style={[styles.row, styles.center]}>
                  <Image
                    source={{ uri: item.photo }}
                    style={styles.roundImage}
                  />
                  <Text>{item.username}</Text>
                  <TouchableOpacity onPress={() => this.navigateMap(item)}>
                    <Text>{item.place ? item.place : null}</Text>
                  </TouchableOpacity>
                  <Ionicons
                    name="ios-flag"
                    size={25}
                    style={{ marginRight: 10 }}
                  />
                </View>
                <TouchableOpacity onPress={() => this.likePost(item)}>
                  <Image
                    style={styles.postPhoto}
                    source={{ uri: item.postPhoto }}
                  />
                </TouchableOpacity>
                <View style={styles.row}>
                  <Ionicons
                    color={licked ? "red" : "#000"}
                    name={licked ? "ios-heart" : "ios-heart-empty"}
                    size={25}
                    style={{ marginLeft: 10, marginRight: 10 }}
                  />
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Comment", item)}
                  >
                    <SimpleLineIcons
                      name="bubble"
                      size={25}
                      style={{ marginRight: 10 }}
                    />
                  </TouchableOpacity>
                  <Feather name="send" size={25} style={{ marginRight: 10 }} />
                </View>
                <Text style={{ marginLeft: 10 }}>{item.postDescription}</Text>
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
  return bindActionCreators({ getPosts, unlikePost, likePost }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
