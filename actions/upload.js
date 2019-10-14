import uuid from "uuid";
import { initialize } from "../config/config";

export const uploadPhoto = image => {
  return async dispatch => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.responseType = "blob";
        xhr.open("GET", image.uri, true);
        xhr.send(null);
      });
      const uploadTask = await initialize
        .storage()
        .ref()
        .child(uuid.v4())
        .put(blob);
      const downloadURL = await uploadTask.ref.getDownloadURL();
      return downloadURL;
    } catch (e) {
      console.error(e);
    }
  };
};
