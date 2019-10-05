import { initialize } from "../config/config";

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
      dispatch({ type: "LOGIN", payload: user });
    } catch (error) {
      alert(error);
      return;
    }
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    const {
      user: { email, password }
    } = getState();
    try {
      const { user } = await initialize
        .auth()
        .createUserWithEmailAndPassword(email, password);
      dispatch({ type: "SIGNUP", payload: user });
    } catch (error) {
      alert(error);
    }
  };
};
