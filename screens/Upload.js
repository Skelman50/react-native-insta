import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageEditor
} from "react-native";
import * as Permissions from "expo-permissions";
import { NavigationEvents } from "react-navigation";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { styles } from "../styles";
import {
  updateDescription,
  uploadPost,
  updateLocation,
  getPosts,
  updatePhoto
} from "../actions/post";
import ModalLocation from "./helpers/ModalLocation";
import { uploadPhoto } from "../actions/upload";
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
  post = async () => {
    const url = await this.props.uploadPhoto({ uri: this.props.post.photo });
    this.props.updatePhoto(url);
    this.props.uploadPost();
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

  onWillFocus = () => {
    if (!this.props.post.photo) {
      this.openLibrary();
    }
  };

  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });
      if (!image.cancelled) {
        let resizedUri = await new Promise((resolve, reject) => {
          ImageEditor.cropImage(
            image.uri,
            {
              offset: { x: 0, y: 0 },
              size: {
                width: image.width,
                height: image.height
              },
              displaySize: { width: styles.postPhoto.width, height: 300 },
              resizeMode: "contain"
            },
            uri => resolve(uri),
            () => reject()
          );
        });
        this.props.updatePhoto(resizedUri);
      }
    }
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
        <NavigationEvents onWillFocus={this.onWillFocus} />
        <ModalLocation
          showModal={showModal}
          locations={locations}
          setLocation={this.setLocation}
        />
        <TouchableOpacity onPress={this.openLibrary}>
          <Image
            style={styles.postPhoto}
            resizeMode={"contain"}
            source={{
              uri: photo
            }}
          />
        </TouchableOpacity>

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
    {
      updateDescription,
      uploadPost,
      updateLocation,
      getPosts,
      uploadPhoto,
      updatePhoto
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
