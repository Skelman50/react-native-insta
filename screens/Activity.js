import React, { Component } from "react";
import { connect } from "react-redux";
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
    let activity = [];
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
  render() {
    if (this.state.isloading) {
      return <ActivityIndicator style={styles.container} />;
    }

    const content = () => {
      if (this.state.activity.length) {
        return (
          <FlatList
            data={this.state.activity}
            keyExtractor={item => JSON.stringify(item.date)}
            renderItem={({ item }) => (
              <View style={[styles.row, styles.center]}>
                <Image
                  style={styles.roundImage}
                  source={{ uri: item.likerPhoto }}
                />
                <View>
                  <Text>{item.likerName}</Text>
                  <Text>Liked Your Photo</Text>
                  <Text>{item.date}</Text>
                </View>
                <Image
                  style={styles.roundImage}
                  source={{ uri: item.postPhoto }}
                />
              </View>
            )}
          />
        );
      }
      return <Text>No activity</Text>;
    };
    return (
      <View style={this.state.activity.length ? { flex: 1 } : styles.container}>
        {content()}
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(Activity);
