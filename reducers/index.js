import { combineReducers } from "redux";

const counter = (state = 0, { payload, type }) => {
  switch (type) {
    case "INCREMENT":
      return !payload ? state + 1 : state - 1;
    default:
      return state;
  }
};

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

const post = (state = { feed: [] }, { payload, type }) => {
  switch (type) {
    case "UPDATE_DESCRIPTION":
      return { ...state, description: payload };
    case "GET_POSTS":
      return { ...state, feed: payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  counter,
  user,
  post
});

export default rootReducer;
