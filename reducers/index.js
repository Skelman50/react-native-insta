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
    case "UPDATE_USER_PHOTO":
      return { ...state, photo: payload };
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
    case "GET_COMMENTS":
      return { ...state, comments: payload };
    default:
      return state;
  }
};

const profile = (state = {}, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user,
  post,
  profile
});

export default rootReducer;
