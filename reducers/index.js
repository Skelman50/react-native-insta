const initialState = 0;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return !action.payload ? state + 1 : state - 1;
    default:
      return state;
  }
};
