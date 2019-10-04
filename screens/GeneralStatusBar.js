import React from "react";
import { StatusBar } from "react-native";

const GeneralStatusBar = () => {
  return (
    <StatusBar
      barStyle="dark-content"
      hidden={false}
      backgroundColor="blue"
      translucent={false}
      networkActivityIndicatorVisible={true}
    />
  );
};

export default GeneralStatusBar;
