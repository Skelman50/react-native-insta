import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { styles } from "../styles";
import {
  updateDescription,
  uploadPost,
  updateLocation,
  getPosts
} from "../actions/post";
import ModalLocation from "./helpers/ModalLocation";
const GOOGLE_API =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

class Upload extends Component {
  state = {
    showModal: false,
    locations: [
      { id: "1", name: "Poltava", vicinity: "Poltavska" },
      { id: "2", name: "Zmiiv", vicinity: "Kharkivska" }
    ]
  };
  post = () => {
    this.props.uploadPost();
    this.props.getPosts();
    this.props.navigation.navigate("Home");
  };
  setLocation = location => {
    const place = {
      name: location.name
      // coords: {
      //   lat: location.geometry.location.lat,
      //   lng: location.geometry.location.lng
      // }
    };
    this.setState({ showModal: false });
    this.props.updateLocation(place);
  };

  // getLocations = async () => {
  //   this.setState({ showModal: true });
  //   const permission = await Permissions.askAsync(Permissions.LOCATION);
  //   if (permission.status === "granted") {
  //     console.log(permission);
  //     const location = await Location.getCurrentPositionAsync();
  //     console.log(location);
  //     const url = `${GOOGLE_API}?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&key=${ENV.googleApiKey}`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     this.setState({ locations: data.results });
  //     console.log(data);
  //   }
  // };

  render() {
    const {
      post: { description, photo },
      updateDescription
    } = this.props;
    const { showModal, locations } = this.state;
    return (
      <View style={styles.container}>
        <ModalLocation
          showModal={showModal}
          locations={locations}
          setLocation={this.setLocation}
        />
        <Image
          style={styles.postPhoto}
          source={{
            uri: photo
          }}
        />
        <TextInput
          value={description}
          onChangeText={input => updateDescription(input)}
          placeholder="Description"
          style={styles.border}
        />
        <TouchableOpacity
          style={styles.border}
          onPress={() => this.setState({ showModal: true })}
        >
          <Text style={styles.gray}>
            {this.props.post.location
              ? this.props.post.location.name
              : "Add a Location"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.post}>
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
  return bindActionCreators(
    { updateDescription, uploadPost, updateLocation, getPosts },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
