import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Text, View, FlatList, ActivityIndicator, Image } from "react-native";
import { styles } from "../styles";
import { db } from "../config/config";

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

  renderList = item => {
    switch (item.type) {
      case "LIKE":
        return (
          <View style={[styles.row, styles.space]}>
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
          </View>
        );
      case "COMMENT":
        return (
          <View style={[styles.row, styles.space]}>
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
          </View>
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

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(Activity);
