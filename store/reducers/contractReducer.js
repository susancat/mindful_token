import { FETCH_CONTRACT } from "../actions/types";

const initialState = "";
const contractReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTRACT:
      return action.payload || state;
    default:
      return state;
  }
};

export default contractReducer;