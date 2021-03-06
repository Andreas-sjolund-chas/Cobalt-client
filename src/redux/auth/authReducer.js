import {
  REQUEST_AUTH_START,
  REQUEST_AUTH_SUCCESS,
  REQUEST_AUTH_FAIL,
  REQUEST_LOGOUT_START,
  REQUEST_LOGOUT_SUCCESS,
  REQUEST_LOGOUT_FAIL
} from "./constants";

const initialState = {
  isAuthenticated: false,
  user: {},
  isFetching: false,
  message: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTH_START:
      return { ...state, isFetching: true };
    case REQUEST_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isFetching: false,
        message: action.payload.message
      };
    case REQUEST_AUTH_FAIL:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isFetching: false,
        message: action.payload.message
      };
    case REQUEST_LOGOUT_START:
      return { ...state, isFetching: true };
    case REQUEST_LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isFetching: false,
        message: action.payload.message
      };
    case REQUEST_LOGOUT_FAIL:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        message: action.payload.message
      };

    default:
      return state;
  }
};

export default authReducer;
