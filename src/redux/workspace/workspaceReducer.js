import {
  ADD_MEMBER_START,
  ADD_MEMBER_ERROR,
  ADD_MEMBER_SUCCESS,
  REMOVE_MEMBER_START,
  REMOVE_MEMBER_ERROR,
  REMOVE_MEMBER_SUCCESS
} from "./constants";

const initialState = {
  session: {},
  isFetching: false,
  newUserAdded: false,
  message: null
};

const workspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMBER_START:
      return { ...state, isFetching: true };
    case ADD_MEMBER_ERROR:
      return {};
    case ADD_MEMBER_SUCCESS:
      return {};
    case REMOVE_MEMBER_START:
      return { ...state, isFetching: true };
    case REMOVE_MEMBER_ERROR:
      return {};
    case REMOVE_MEMBER_SUCCESS:
      return {};

    default:
      return state;
  }
};

export default workspaceReducer;
