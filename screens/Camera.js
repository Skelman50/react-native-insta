import React, { Component } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { styles } from "../styles";
import GeneralStatusBar from "./GeneralStatusBar";
import * as ImageManipulator from "expo-image-manipulator";
import { uploadPhoto } from "../actions/upload";
import { updatePhoto } from "../actions/post";

class CameraScreen extends Component {
  state = {
    isBack: true,
    hidden: true
  };
  snapPhoto = async () => {
    const permission = await Permissions.askAsync(Permissions.CAMERA);
    if (permission.status === "granted") {
      const image = await this.camera.takePictureAsync();
      if (!image.canceled) {
        const resize = await ImageManipulator.manipulateAsync(image.uri, [], {
          format: ImageManipulator.SaveFormat.JPEG,
          compress: 0.1
        });
        const url = await this.props.uploadPhoto(resize);
        this.props.updatePhoto(url);
        url && this.props.navigation.goBack();
        url && this.props.navigation.navigate("Upload");
        this.setState({ hidden: false });
        this.props.navigation.goBack();
      }
    }
  };

  reverseCamera = () => {
    this.setState({
      isBack: !this.state.isBack
    });
  };

  render() {
    const { isBack, hidden } = this.state;
    return (
      <React.Fragment>
        <GeneralStatusBar hidden={hidden} />
        <Camera
          style={{ flex: 1 }}
          ref={ref => {
            this.camera = ref;
          }}
          type={
            isBack ? Camera.Constants.Type.back : Camera.Constants.Type.front
          }
        >
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{ paddingLeft: 30 }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Ionicons color={"white"} name={"ios-arrow-back"} size={50} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingRight: 30 }}
              onPress={this.reverseCamera}
            >
              <MaterialCommunityIcons
                color={"white"}
                name={"rotate-3d"}
                size={50}
              />
            </TouchableOpacity>
          </SafeAreaView>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => this.snapPhoto()}
          />
        </Camera>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ uploadPhoto, updatePhoto }, dispatch);
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraScreen);
