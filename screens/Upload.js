import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles";
import { updateDescription, uploadPost } from "../actions/post";

class Upload extends Component {
  render() {
    const {
      post: { description },
      updateDescription,
      uploadPost,
      user: { photo }
    } = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={styles.postPhoto}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/instaclone-8046d.appspot.com/o/angular.jpeg?alt=media&token=17daf32a-850b-4e62-a315-044c7981996b"
          }}
        />
        <TextInput
          value={description}
          onChangeText={input => updateDescription(input)}
          placeholder="Description"
          style={styles.border}
        />
        <TouchableOpacity style={styles.button} onPress={uploadPost}>
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ post, user }) => {
  return { post, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateDescription, uploadPost }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
