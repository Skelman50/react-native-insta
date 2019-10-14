import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Image
} from "react-native";
import { addComment, getComments } from "../actions/post";
import { styles } from "../styles";

class Comment extends React.Component {
  state = {
    comment: ""
  };

  componentDidMount = () => {
    const { params } = this.props.navigation.state;
    this.props.getComments(params);
  };

  postComment = () => {
    const { params } = this.props.navigation.state;
    this.props.addComment(this.state.comment, params);
    this.setState({ comment: "" });
  };

  render() {
    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        keyboardVerticalOffset={125}
        style={styles.containerComments}
      >
        <FlatList
          keyExtractor={item => JSON.stringify(item.date)}
          data={this.props.post.comments}
          renderItem={({ item }) => {
            return (
              <View style={[styles.row, styles.space]}>
                <Image
                  style={styles.roundImage}
                  source={{ uri: item.commenterPhoto }}
                />
                <View style={[styles.containerComments, styles.left]}>
                  <Text>{item.commenterName}</Text>
                  <Text>{item.comment}</Text>
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
      </KeyboardAvoidingView>
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