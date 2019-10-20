import { db } from "../config/config";
import { orderBy } from "lodash";
import { sendNotification } from "./notification";

export const addMessage = (id, text) => {
  return async (dispatch, getState) => {
    const { uid, photo, username } = getState().user;
    try {
      const message = {
        members: [id, uid].sort(),
        message: text,
        photo: photo,
        username: username,
        uid: uid,
        date: new Date().getTime()
      };
      await db
        .collection("messages")
        .doc()
        .set(message);
      dispatch(getMessages());
      dispatch(sendNotification(id, text));
    } catch (e) {
      console.error(e);
    }
  };
};

export const getMessages = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().user;
    let messages = [];
    try {
      const query = await db
        .collection("messages")
        .where("members", "array-contains", uid)
        .get();
      query.forEach(response => {
        let message = response.data();
        messages.push(message);
      });
      dispatch({
        type: "GET_MESSAGES",
        payload: orderBy(messages, "date", "desc")
      });
    } catch (e) {
      console.error(e);
    }
  };
};
