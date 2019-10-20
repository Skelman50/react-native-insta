import { initialize, db } from "../config/config";
import * as Facebook from "expo-facebook";
import firebase from "firebase";
import orderBy from "lodash/orderBy";
import { allowNotifications, sendNotification } from "./notification";

export const updateEmail = payload => {
  return {
    type: "UPDATE_EMAIL",
    payload
  };
};

export const updatePassword = payload => {
  return {
    type: "UPDATE_PASSWORD",
    payload
  };
};

export const updateUsername = payload => {
  return {
    type: "UPDATE_USERNAME",
    payload
  };
};
export const updatePhoto = photo => {
  return { type: "UPDATE_USER_PHOTO", payload: photo };
};

export const updateBio = payload => {
  return {
    type: "UPDATE_BIO",
    payload
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    const {
      user: { email, password }
    } = getState();
    try {
      const { user } = await initialize
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch(getUser(user.uid));
      dispatch(allowNotifications());
    } catch (error) {
      alert(error);
      return;
    }
  };
};

export const getUser = (uid, type) => {
  return async dispatch => {
    try {
      const userResponse = await db
        .collection("users")
        .doc(uid)
        .get();
      const user = userResponse.data();
      const posts = [];
      const postsResponse = await db
        .collection("posts")
        .where("uid", "==", uid)
        .get();
      postsResponse.forEach(p => posts.push(p.data()));
      user.posts = orderBy(posts, "date", "desc");
      if (type === "LOGIN") {
        dispatch({ type: "LOGIN", payload: user });
      } else {
        dispatch({ type: "GET_PROFILE", payload: user });
      }
    } catch (error) {
      alert(error);
      return;
    }
  };
};

export const facebookLogin = () => {
  return async dispatch => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "490887478429803"
      );
      if (type === "success") {
        const credential = await firebase.auth.FacebookAuthProvider.credential(
          token
        );
        const response = await firebase.auth().signInWithCredential(credential);
        const user = await db
          .collection("users")
          .doc(response.user.uid)
          .get();
        if (!user.exists) {
          const dbUser = {
            email: response.user.email,
            username: response.user.displayName,
            bio: "",
            photo: response.user.photoURL,
            token: null,
            uid: response.user.uid
          };
          await db
            .collection("users")
            .doc(response.user.uid)
            .set(dbUser);
          dispatch(allowNotifications());
          dispatch({ type: "LOGIN", payload: dbUser });
        } else {
          dispatch(getUser(response.user.uid));
        }
      }
    } catch (error) {
      console.log(error);
      alert(error);
      return;
    }
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    const {
      user: { email, password, username, bio, photo }
    } = getState();
    try {
      const { user } = await initialize
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (user.uid) {
        const dbUser = {
          email,
          username,
          bio,
          photo,
          token: null,
          uid: user.uid
        };
        await db
          .collection("users")
          .doc(user.uid)
          .set(dbUser);
        dispatch({ type: "LOGIN", payload: dbUser });
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
};

export const updateUser = () => {
  return async (dispatch, getState) => {
    const { uid, username, bio, photo } = getState().user;
    try {
      db.collection("users")
        .doc(uid)
        .update({
          username: username,
          bio: bio,
          photo: photo
        });
    } catch (e) {
      alert(e);
    }
  };
};

export const followUser = user => {
  return async (dispatch, getState) => {
    const { uid, photo, username } = getState().user;
    console.log(user);
    console.log(getState().user);
    try {
      db.collection("users")
        .doc(user.uid)
        .update({
          followers: firebase.firestore.FieldValue.arrayUnion(uid)
        });
      db.collection("users")
        .doc(uid)
        .update({
          following: firebase.firestore.FieldValue.arrayUnion(user.uid)
        });
      db.collection("activity")
        .doc()
        .set({
          followerId: uid,
          followerPhoto: photo,
          followerName: username,
          uid: user.uid,
          photo: user.photo,
          username: user.username,
          date: new Date().getTime(),
          type: "FOLLOWER"
        });
      dispatch(sendNotification(user.uid, "Started Following You"));
      dispatch(getUser(user.uid));
    } catch (e) {
      console.error(e);
    }
  };
};

export const unfollowUser = user => {
  return async (dispatch, getState) => {
    const { uid, photo, username } = getState().user;
    try {
      db.collection("users")
        .doc(user.uid)
        .update({
          followers: firebase.firestore.FieldValue.arrayRemove(uid)
        });
      db.collection("users")
        .doc(uid)
        .update({
          following: firebase.firestore.FieldValue.arrayRemove(user.uid)
        });
      dispatch(getUser(user.uid));
    } catch (e) {
      console.error(e);
    }
  };
};
