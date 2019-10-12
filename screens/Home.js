import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { styles } from "../styles";
import { getPosts } from "../actions/post";
import { Ionicons, Feather, SimpleLineIcons } from "@expo/vector-icons";

class Home extends Component {
  componentDidMount = () => {
    const { getPosts } = this.props;
    getPosts();
  };

  navigateMap = item => {
    this.props.navigation.navigate("Map", { location: item.location });
  };

  render() {
    const {
      post: { feed }
    } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={feed}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <View style={[styles.row, styles.center]}>
                <Image source={{ uri: item.photo }} style={styles.roundImage} />
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
              <Image
                style={styles.postPhoto}
                source={{ uri: item.postPhoto }}
              />
              <View style={styles.row}>
                <Ionicons
                  name="ios-heart-empty"
                  size={25}
                  style={{ marginLeft: 10, marginRight: 10 }}
                />
                <SimpleLineIcons
                  name="bubble"
                  size={25}
                  style={{ marginRight: 10 }}
                />
                <Feather name="send" size={25} style={{ marginRight: 10 }} />
              </View>
              <Text style={{ marginLeft: 10 }}>{item.postDescription}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ post }) => {
  return { post };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getPosts }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
