import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { styles } from "../styles";
import { add } from "../actions";
import { initialize } from "../config/config";

class Home extends Component {
  render() {
    const { counter, add } = this.props;
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Text>Count: {counter}</Text>
        <Button type="clear" title="ADD" onPress={() => add(false)} />
        <Button type="clear" title="SUB" onPress={() => add(true)} />
      </View>
    );
  }
}

const mapStateToProps = ({ counter }) => {
  return { counter };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ add }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
