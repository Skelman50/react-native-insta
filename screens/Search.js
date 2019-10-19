import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TextInput, SafeAreaView, ActivityIndicator } from "react-native";
import { styles } from "../styles";
import { db } from "../config/config";
import { getUser } from "../actions/user";
import UserInfo from "../components/UserInfo";

class Search extends Component {
  state = {
    search: "",
    isloading: false,
    searchList: []
  };

  handleSearch = async () => {
    const searchList = [];
    this.setState({ isloading: true });
    const query = await db
      .collection("users")
      .where("username", ">=", this.state.search)
      .get();
    query.forEach(response => {
      searchList.push(response.data());
    });
    this.setState({ searchList, isloading: false });
  };

  render() {
    return (
      <SafeAreaView style={[styles.containerComments, { marginTop: 20 }]}>
        <TextInput
          style={styles.input}
          onChangeText={search => this.setState({ search })}
          value={this.state.search}
          returnKeyType="send"
          placeholder="Search users"
          onSubmitEditing={this.handleSearch}
        />
        {this.state.isloading ? (
          <ActivityIndicator style={styles.container} />
        ) : (
          <UserInfo
            item={this.state.searchList}
            isSearch={true}
            {...this.props}
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUser }, dispatch);
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
