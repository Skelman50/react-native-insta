import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, Image } from "react-native";
import { styles } from "../styles";
import { getPosts } from "../actions/post";

class Home extends Component {
  componentDidMount = () => {
    const { getPosts, post } = this.props;
    getPosts();
  };
  render() {
    const {
      post: { feed }
    } = this.props;
    console.log("ololo", feed);
    return (
      <View style={styles.container}>
        {feed.map((f, i) => (
          <Image
            key={i}
            style={styles.postPhoto}
            source={{ uri: f.postPhoto }}
          />
        ))}
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
