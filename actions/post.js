import { initialize, db } from "../config/config";
import firebase from "firebase";

export const updateDescription = payload => {
  return {
    type: "UPDATE_DESCRIPTION",
    payload
  };
};

export const uploadPost = uid => {
  return async (dispatch, getState) => {
    try {
      const {
        post: { description },
        user: { uid, photo, username }
      } = getState();
      const upload = {
        postPhoto:
          "https://firebasestorage.googleapis.com/v0/b/instaclone-8046d.appspot.com/o/angular.jpeg?alt=media&token=17daf32a-850b-4e62-a315-044c7981996b",
        postDescription: description,
        uid,
        photo,
        username
      };
      const ref = await db.collection("posts").doc();
      upload.id = ref.id;
      ref.set(upload);
      //   dispatch({ type: "LOGIN", payload: user.data() });
    } catch (error) {
      alert(error);
      return;
    }
  };
};

export const getPosts = () => {
  return async dispatch => {
    try {
      const data = [];
      const posts = await db.collection("posts").get();
      posts.forEach(post => data.push(post.data()));
      dispatch({ type: "GET_POSTS", payload: data });
    } catch (error) {
      alert(error);
      return;
    }
  };
};
