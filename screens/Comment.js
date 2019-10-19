import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { View, TextInput } from "react-native";
import { addComment, getComments } from "../actions/post";
import { styles } from "../styles";
import UserInfo from "../components/UserInfo";
import { getUser } from "../actions/user";

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
        <UserInfo
          isComment={true}
          item={this.props.post.comments}
          {...this.props}
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
  return bindActionCreators({ addComment, getComments, getUser }, dispatch);
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
