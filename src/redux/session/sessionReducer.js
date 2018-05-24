import {
  REQUEST_SESSION_START,
  REQUEST_SESSION_SUCCESS,
  REQUEST_SESSION_FAIL,
  REQUEST_SESSION_DATA_START,
  REQUEST_SESSION_DATA_SUCCESS,
  REQUEST_SESSION_DATA_FAIL,
  REQUEST_DELETE_SESSION_START,
  REQUEST_DELETE_SESSION_SUCCESS,
  REQUEST_DELETE_SESSION_FAIL,
  SESSION_CREATED
} from "./constants";

const initialState = {
  session: {},
  isFetching: false,
  newSessionCreated: false,
  message: null
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SESSION_START:
      return { ...state, isFetching: true };
    case REQUEST_SESSION_SUCCESS:
      return {
        ...state,
        session: action.payload.presentation,
        newSessionCreated: true,
        isFetching: false,
        message: action.payload.message
      };
    case REQUEST_SESSION_FAIL:
      return {
        ...state,
        session: {},
        isFetching: false,
        message: action.payload.message
      };
    case SESSION_CREATED:
      return {
        ...state,
        newSessionCreated: false
      };
    case REQUEST_DELETE_SESSION_START:
      return { ...state, isFetching: true };
    case REQUEST_DELETE_SESSION_SUCCESS:
      return {
        ...state,
        session: action.payload.presentation,
        isFetching: false,
        message: action.payload.message
      };
    case REQUEST_DELETE_SESSION_FAIL:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    case REQUEST_SESSION_DATA_START:
      return {
        ...state,
        isFetching: true
      };
    case REQUEST_SESSION_DATA_SUCCESS:
      return {
        ...state,
        session: action.payload.presentation,
        isFetching: false,
        message: action.payload.message
      };
    case REQUEST_SESSION_DATA_FAIL:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default sessionReducer;
