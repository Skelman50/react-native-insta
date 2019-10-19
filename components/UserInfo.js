import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import moment from "moment";
import { styles } from "../styles";

class UserInfo extends Component {
  state = {
    isLoadingRedirect: false
  };
  goToProfile = (item, isComment, isSearch) => async () => {
    this.setState({ isLoadingRedirect: true });
    if (isSearch) {
      await this.props.getUser(item.uid);
    }
    if (isComment) {
      await this.props.getUser(item.commenterId);
    }
    this.setState({ isLoadingRedirect: false });
    this.props.navigation.navigate("Profile");
  };
  render() {
    const { item, isSearch = false, isComment = false } = this.props;
    return (
      <React.Fragment>
        <FlatList
          data={item}
          keyExtractor={item => {
            if (isSearch) {
              return JSON.stringify(item.uid);
            }
            if (isComment) {
              return JSON.stringify(item.date);
            }
          }}
          renderItem={({ item }) => {
            let photo;
            let name;
            if (isSearch) {
              photo = item.photo;
              name = item.username;
            }
            if (isComment) {
              photo = item.commenterPhoto
                ? item.commenterPhoto
                : "https://wingslax.com/wp-content/uploads/2017/12/no-image-available.png";
              name = item.commenterName;
            }
            return (
              <TouchableOpacity
                style={[styles.row, styles.space]}
                onPress={this.goToProfile(item, isComment, isSearch)}
              >
                <Image style={styles.roundImage} source={{ uri: photo }} />
                <View style={[styles.containerComments, styles.left]}>
                  <Text style={styles.bold}>{name}</Text>
                  {isSearch && <Text style={styles.gray}>{item.bio}</Text>}
                  {isComment && (
                    <React.Fragment>
                      <Text style={styles.gray}>{item.comment}</Text>
                      <Text style={[styles.gray, styles.small]}>
                        {moment(item.date).format("ll")}
                      </Text>
                    </React.Fragment>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {this.state.isLoadingRedirect && (
          <ActivityIndicator style={styles.center} />
        )}
      </React.Fragment>
    );
  }
}

export default UserInfo;
