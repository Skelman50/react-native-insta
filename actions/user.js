import { initialize, db } from "../config/config";
import * as Facebook from "expo-facebook";
import firebase from "firebase";

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
    } catch (error) {
      alert(error);
      return;
    }
  };
};

export const getUser = uid => {
  return async dispatch => {
    try {
      const user = await db
        .collection("users")
        .doc(uid)
        .get();
      dispatch({ type: "LOGIN", payload: user.data() });
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
        console.log(user.exists);
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
