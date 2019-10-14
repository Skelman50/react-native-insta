import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HeaderLeftBack = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{ marginLeft: 10 }}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name={"ios-arrow-back"} size={30} />
    </TouchableOpacity>
  );
};

export default HeaderLeftBack;
