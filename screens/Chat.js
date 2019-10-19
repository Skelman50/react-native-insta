import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import { addMessage, getMessages } from "../actions/messages";
import { styles } from "../styles";
import KeyboardSpacer from "react-native-keyboard-spacer";

class Chat extends React.Component {
  state = {
    message: ""
  };

  componentDidMount = () => {
    this.props.getMessages();
  };

  sendMessage = () => {
    const { params } = this.props.navigation.state;
    this.props.addMessage(params, this.state.message);
    this.setState({ message: "" });
  };

  render() {
    const { params } = this.props.navigation.state;
    const { uid } = this.props.user;
    if (!this.props.messages) {
      console.log("ololo");
      return <ActivityIndicator style={styles.container} />;
    }

    return (
      <View style={styles.containerComments}>
        <FlatList
          inverted
          keyExtractor={item => JSON.stringify(item.date)}
          data={this.props.messages.filter(
            message =>
              message.members.indexOf(params) >= 0 &&
              message.members.indexOf(this.props.user.uid) >= 0
          )}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={[styles.row, styles.space]}>
                {item.uid !== uid ? (
                  <Image
                    style={styles.roundImage}
                    source={{ uri: item.photo }}
                  />
                ) : null}
                <View
                  style={[
                    styles.containerComments,
                    item.uid === uid ? styles.right : styles.left
                  ]}
                >
                  <Text style={styles.bold}>{item.username}</Text>
                  <Text style={styles.gray}>{item.message}</Text>
                  <Text style={[styles.gray, styles.small]}>
                    {moment(item.date).format("ll")}
                  </Text>
                </View>
                {item.uid === uid ? (
                  <Image
                    style={styles.roundImage}
                    source={{ uri: item.photo }}
                  />
                ) : null}
              </TouchableOpacity>
            );
          }}
        />
        <TextInput
          style={styles.input}
          onChangeText={message => this.setState({ message })}
          value={this.state.message}
          returnKeyType="send"
          placeholder="Send Message"
          onSubmitEditing={this.sendMessage}
        />
        <KeyboardSpacer />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addMessage, getMessages }, dispatch);
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
)(Chat);
