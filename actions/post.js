import { initialize, db } from "../config/config";
import uuid from "uuid";

export const updateDescription = payload => {
  return {
    type: "UPDATE_DESCRIPTION",
    payload
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

export const updatePhoto = input => {
  return { type: "UPDATE_PHOTO", payload: input };
};

export const updateLocation = input => {
  return { type: "UPDATE_LOCATION", payload: input };
};

export const uploadPost = () => {
  return async (dispatch, getState) => {
    try {
      const { post, user } = getState();
      const id = uuid.v4();
      const upload = {
        id: id,
        postPhoto: post.photo,
        postDescription: post.description,
        uid: user.uid,
        photo: user.photo,
        username: user.username,
        place: post.location.name
      };
      db.collection("posts")
        .doc(id)
        .set(upload);
    } catch (e) {
      alert(e);
    }
  };
};
