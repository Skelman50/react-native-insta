import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 500
  },
  containerComments: {
    flex: 1,
    backgroundColor: "#fff"
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
    height: 300
  },
  roundImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10
  },
  row: {
    flexDirection: "row"
  },
  input: {
    width: width * 0.9,
    margin: 15,
    padding: 15,
    alignSelf: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 50,
    fontSize: 16
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  cameraButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "#fff",
    marginBottom: 50
  },
  left: {
    alignItems: "flex-start"
  },
  buttonSmall: {
    margin: 10,
    marginBottom: 0,
    padding: 5,
    alignItems: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    width: 125
  },
  space: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  bold: {
    fontWeight: "bold"
  },
  white: {
    color: "#fff"
  },
  gray: {
    color: "#adadad"
  },
  small: {
    fontSize: 10
  },
  squareLarge: {
    width: width * 0.33,
    height: 125,
    margin: 1,
    backgroundColor: "#d3d3d3"
  },
  right: {
    alignItems: "flex-end"
  }
});
