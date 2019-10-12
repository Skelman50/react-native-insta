import React, { Component } from "react";
import MapView from "react-native-maps";
import { styles } from "../styles";

class Map extends Component {
  render() {
    const { location } = this.props.navigation.state.params;
    return (
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: 49.3,
          longitude: 34.3,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: 49.5,
            longitude: 34.5
          }}
          title={location}
        />
      </MapView>
    );
  }
}

export default Map;
