import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { StatusBar } from "react-native";

class GeneralStatusBar extends Component {
  render() {
    const { hidden } = this.props;
    return (
      <StatusBar
        barStyle="dark-content"
        hidden={hidden}
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
    );
  }
}

const mapStateToProps = ({ statusBar }) => {
  return { statusBar };
};

export default connect(mapStateToProps)(GeneralStatusBar);
