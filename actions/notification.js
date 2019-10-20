import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import firebase from "firebase";
import { db } from "../config/config";
const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";

export const allowNotifications = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().user;
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (permission.status === "granted") {
        const token = await Notifications.getExpoPushTokenAsync();
        dispatch({ type: "GET_TOKEN", payload: token });
        db.collection("users")
          .doc(uid)
          .update({ token: token });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const sendNotification = (uid, text) => {
  console.log(uid);
  return async (dispatch, getState) => {
    const { username } = getState().user;
    try {
      const user = await db
        .collection("users")
        .doc(uid)
        .get();
      if (user.data().token) {
        fetch(PUSH_ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            to: user.data().token,
            title: username,
            body: text
          })
        })
          .then(res => res.json())
          .then(res => console.log(res));
      }
    } catch (e) {
      console.error(e);
    }
  };
};
