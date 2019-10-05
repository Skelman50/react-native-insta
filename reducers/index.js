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
    case "SIGNUP":
      return payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  counter,
  user
});

export default rootReducer;
