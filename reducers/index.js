import { combineReducers } from "redux";

const user = (state = {}, { payload, type }) => {
  switch (type) {
    case "UPDATE_EMAIL":
      return { ...state, email: payload };
    case "UPDATE_PASSWORD":
      return { ...state, password: payload };
    case "UPDATE_USERNAME":
      return { ...state, username: payload };
    case "UPDATE_BIO":
      return { ...state, bio: payload };
    case "LOGIN":
      return payload;
    default:
      return state;
  }
};

const post = (state = { feed: [], description: "" }, { payload, type }) => {
  switch (type) {
    case "UPDATE_DESCRIPTION":
      return { ...state, description: payload };
    case "GET_POSTS":
      return { ...state, feed: payload };
    case "UPDATE_PHOTO":
      return { ...state, photo: payload };
    case "UPDATE_LOCATION":
      return { ...state, location: payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user,
  post
});

export default rootReducer;
