import { FETCH_USER } from "../actions/types";

const initialState = "";
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || state;
    default:
      return state;
  }
};

export default userReducer;