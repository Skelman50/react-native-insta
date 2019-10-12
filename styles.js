import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 500
  },
  containerTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  border: {
    width: "85%",
    margin: 10,
    padding: 10,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center"
  },
  facebookButton: {
    backgroundColor: "#3b5998",
    marginTop: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderColor: "#3b5998",
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  postPhoto: {
    width,
    height: 250
  },
  roundImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5
  },
  row: {
    flexDirection: "row"
  },
  center: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  cameraButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "#fff",
    marginBottom: 50
  }
});
