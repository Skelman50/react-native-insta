import React from "react";
import {
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList
} from "react-native";
import { styles } from "../../styles";

const ModalLocation = ({ showModal, locations, setLocation }) => {
  return (
    <Modal animationType="slide" transparent={false} visible={showModal}>
      <SafeAreaView style={[styles.container, styles.center]}>
        <FlatList
          keyExtractor={item => item.id}
          data={locations}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.border}
              onPress={() => setLocation(item)}
            >
              <Text style={styles.gray}>{item.name}</Text>
              <Text style={styles.gray}>{item.vicinity}</Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default ModalLocation;
