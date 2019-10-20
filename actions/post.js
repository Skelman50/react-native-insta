import { initialize, db } from "../config/config";
import firebase from "firebase";
import uuid from "uuid";
import orderBy from "lodash/orderBy";
import { sendNotification } from "./notification";

export const updateDescription = payload => {
  return {
    type: "UPDATE_DESCRIPTION",
    payload
  };
};

export const getPosts = (isLoading = null) => {
  return async dispatch => {
    try {
      isLoading && isLoading(true);
      const data = [];
      const posts = await db.collection("posts").get();
      posts.forEach(post => data.push(post.data()));
      dispatch({ type: "GET_POSTS", payload: data });
      isLoading && isLoading(false);
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
        place: post.location.name,
        likes: [],
        comments: []
      };
      db.collection("posts")
        .doc(id)
        .set(upload);
      dispatch(getPosts());
    } catch (e) {
      alert(e);
    }
  };
};

export const likePost = post => {
  return (dispatch, getState) => {
    const { uid, photo, username } = getState().user;
    try {
      db.collection("posts")
        .doc(post.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(uid)
        });
      db.collection("activity")
        .doc()
        .set({
          postId: post.id,
          postPhoto: post.postPhoto,
          likerId: uid,
          likerPhoto: photo,
          likerName: username,
          uid: post.uid,
          date: new Date().getTime(),
          type: "LIKE"
        });
      dispatch(sendNotification(post.uid, "Liked Your Photo"));
      dispatch(getPosts());
    } catch (e) {
      console.error(e);
    }
  };
};

export const unlikePost = post => {
  return async (dispatch, getState) => {
    const { uid } = getState().user;
    try {
      db.collection("posts")
        .doc(post.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(uid)
        });
      const query = await db
        .collection("activity")
        .where("postId", "==", post.id)
        .where("likerId", "==", uid)
        .get();
      query.forEach(response => {
        response.ref.delete();
      });
      dispatch(getPosts());
    } catch (e) {
      console.error(e);
    }
  };
};

export const getComments = post => {
  return dispatch => {
    dispatch({
      type: "GET_COMMENTS",
      payload: orderBy(post.comments, "date", "desc")
    });
  };
};

export const addComment = (text, post) => {
  return (dispatch, getState) => {
    const { uid, photo, username } = getState().user;
    let comments = [...getState().post.comments].reverse();
    try {
      const comment = {
        comment: text,
        commenterId: uid,
        commenterPhoto: photo || null,
        commenterName: username,
        date: new Date().getTime()
      };
      db.collection("posts")
        .doc(post.id)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion(comment)
        });
      comment.postId = post.id;
      comment.postPhoto = post.postPhoto;
      comment.uid = post.uid;
      comment.type = "COMMENT";
      comments.push(comment);
      dispatch({ type: "GET_COMMENTS", payload: comments.reverse() });
      dispatch(sendNotification(post.uid, text));
      db.collection("activity")
        .doc()
        .set(comment);
    } catch (e) {
      console.error(e);
    }
  };
};
