import {
  REQUEST_USER_START,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_FAIL,
  REQUEST_AVATAR_UPDATE_START,
  REQUEST_AVATAR_UPDATE_SUCCESS,
  REQUEST_AVATAR_UPDATE_FAIL
} from "./constants";

const initialState = {
  isAuthenticated: false,
  user: {},
  isFetching: false,
  message: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USER_START:
      console.log("FETCHING...");
      return { ...state, isFetching: true };
    case REQUEST_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isFetching: false,
        message: action.payload.message
      };
    case REQUEST_USER_FAIL:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isFetching: false,
        message: action.payload.message
      };
    case REQUEST_AVATAR_UPDATE_START:
      return { ...state, isFetching: true };
    case REQUEST_AVATAR_UPDATE_SUCCESS:
      debugger;
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isFetching: false,
        message: action.payload.message
      };
    case REQUEST_AVATAR_UPDATE_FAIL:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isFetching: false,
        message: action.payload.message
      };

    default:
      return state;
  }
};

export default userReducer;
