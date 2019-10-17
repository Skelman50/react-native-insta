import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { styles } from "../styles";
import { db } from "../config/config";

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

  goToProfile = item => () => {
    console.log(item.uid);
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
          <FlatList
            data={this.state.searchList}
            keyExtractor={item => JSON.stringify(item.uid)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.row, styles.space]}
                onPress={this.goToProfile(item)}
              >
                <Image style={styles.roundImage} source={{ uri: item.photo }} />
                <View style={[styles.containerComments, styles.left]}>
                  <Text style={styles.bold}>{item.username}</Text>
                  <Text style={styles.gray}>{item.bio}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </SafeAreaView>
    );
  }
}

export default Search;
