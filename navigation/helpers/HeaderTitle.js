import React from "react";
import { View, Text } from "react-native";
import { styles } from "../../styles";

const HeaderTitleText = ({ text }) => {
  return (
    <View style={styles.containerTitle}>
      <Text>{text}</Text>
    </View>
  );
};

export default HeaderTitleText;
