import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { bindActionCreators } from "redux";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Text, View, TextInput, FlatList, Image } from "react-native";
import { addComment, getComments } from "../actions/post";
import { styles } from "../styles";

class Comment extends React.Component {
  state = {
    comment: ""
  };

  componentDidMount = () => {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      const { params } = this.props.navigation.state;
      this.props.getComments(params);
    });
  };

  componentWillUnmount = () => {
    this._navListener.remove();
  };

  postComment = () => {
    const { params } = this.props.navigation.state;
    this.props.addComment(this.state.comment, params);
    this.setState({ comment: "" });
  };

  render() {
    return (
      <View style={styles.containerComments}>
        <FlatList
          keyExtractor={item => JSON.stringify(item.date)}
          data={this.props.post.comments}
          renderItem={({ item }) => {
            return (
              <View style={[styles.row, styles.space]}>
                <Image
                  style={styles.roundImage}
                  source={{
                    uri: item.commenterPhoto
                      ? item.commenterPhoto
                      : "https://wingslax.com/wp-content/uploads/2017/12/no-image-available.png"
                  }}
                />
                <View style={[styles.containerComments, styles.left]}>
                  <Text style={styles.bold}>{item.commenterName}</Text>
                  <Text style={styles.gray}>{item.comment}</Text>
                  <Text style={[styles.gray, styles.small]}>
                    {moment(item.date).format("ll")}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <TextInput
          style={styles.input}
          onChangeText={comment => this.setState({ comment })}
          value={this.state.comment}
          returnKeyType="send"
          placeholder="Add Comment"
          onSubmitEditing={this.postComment}
        />
        <KeyboardSpacer />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addComment, getComments }, dispatch);
};

const mapStateToProps = state => {
  return {
    user: state.user,
    post: state.post
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
