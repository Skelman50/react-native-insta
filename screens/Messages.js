import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import moment from "moment";
import { groupBy, values } from "lodash";
import { styles } from "../styles";
import { getMessages } from "../actions/messages";

class Messages extends React.Component {
  componentDidMount = () => {
    this.props.getMessages();
  };

  goToChat = members => {
    const uid = members.filter(id => id !== this.props.user.uid);
    this.props.navigation.navigate("Chat", uid[0]);
  };

  render() {
    return (
      <View style={styles.containerComments}>
        <FlatList
          keyExtractor={item => JSON.stringify(item[0].date)}
          data={values(groupBy(this.props.messages, "members"))}
          renderItem={({ item, index }) => {
              const messager = item.find(m => m.uid !== this.props.user.uid)
            return (
              <TouchableOpacity
                onPress={() => this.goToChat(messager.members)}
                style={[styles.row, styles.space]}
              >
                <Image
                  style={styles.roundImage}
                  source={{ uri: messager.photo }}
                />
                <View style={[styles.containerComments, styles.left]}>
                  <Text style={styles.bold}>{messager.username}</Text>
                  <Text style={styles.gray}>{messager.message}</Text>
                  <Text style={[styles.gray, styles.small]}>
                    {moment(messager.date).format("ll")}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getMessages }, dispatch);
};

const mapStateToProps = state => {
  return {
    user: state.user,
    messages: state.messages
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
