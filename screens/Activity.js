import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from "react-native";
import { styles } from "../styles";
import { db } from "../config/config";
import { getUser } from "../actions/user";

class Activity extends Component {
  state = {
    activity: [],
    isloading: false
  };

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      this.getActivity();
    });
  };

  componentWillUnmount = () => {
    this._navListener.remove();
  };

  getActivity = async () => {
    const activity = [];
    this.setState({ isloading: true });
    const query = await db
      .collection("activity")
      .where("uid", "==", this.props.user.uid)
      .get();
    query.forEach(response => {
      activity.push(response.data());
    });
    this.setState({ activity, isloading: false });
  };

  goToProfile = ({ item, isComment = false, isLike = false }) => async () => {
    if (isLike) {
      await this.props.getUser(item.likerId);
    }
    if (isComment) {
      await this.props.getUser(item.commenterId);
    }
    this.props.navigation.navigate("Profile");
  };

  renderList = item => {
    switch (item.type) {
      case "LIKE":
        return (
          <TouchableOpacity
            style={[styles.row, styles.space]}
            onPress={this.goToProfile({ item, isLike: true })}
          >
            <Image
              style={styles.roundImage}
              source={{ uri: item.likerPhoto }}
            />
            <View style={[styles.containerComments, styles.left]}>
              <Text style={styles.bold}>{item.likerName}</Text>
              <Text style={styles.gray}>Liked Your Photo</Text>
              <Text style={[styles.gray, styles.small]}>
                {moment(item.date).format("ll")}
              </Text>
            </View>
            <Image style={styles.roundImage} source={{ uri: item.postPhoto }} />
          </TouchableOpacity>
        );
      case "COMMENT":
        return (
          <TouchableOpacity
            style={[styles.row, styles.space]}
            onPress={this.goToProfile({ item, isComment: true })}
          >
            <Image
              style={styles.roundImage}
              source={{ uri: item.commenterPhoto }}
            />
            <View style={[styles.containerComments, styles.left]}>
              <Text style={styles.bold}>{item.commenterName}</Text>
              <Text style={styles.gray}>{item.comment}</Text>
              <Text style={[styles.gray, styles.small]}>
                {moment(item.date).format("ll")}
              </Text>
            </View>
            <Image style={styles.roundImage} source={{ uri: item.postPhoto }} />
          </TouchableOpacity>
        );
      default:
        null;
    }
  };

  render() {
    if (this.state.isloading) {
      return <ActivityIndicator style={styles.container} />;
    }
    return (
      <View style={styles.containerComments}>
        <FlatList
          onRefresh={() => this.getActivity()}
          refreshing={false}
          data={this.state.activity}
          keyExtractor={item => JSON.stringify(item.date)}
          renderItem={({ item }) => this.renderList(item)}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUser }, dispatch);
};

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
