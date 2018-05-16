import {
  FETCH_MEMBERS_START,
  FETCH_MEMBERS_ERROR,
  FETCH_MEMBERS_SUCCESS,
  ADD_MEMBER_START,
  ADD_MEMBER_ERROR,
  ADD_MEMBER_SUCCESS,
  REMOVE_MEMBER_START,
  REMOVE_MEMBER_ERROR,
  REMOVE_MEMBER_SUCCESS,
  ADD_WORKSPACES
} from "./constants";

const initialState = {
  workspaces: {},
  isFetching: false,
  message: null
};

const workspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORKSPACES:
      return { ...state, isFetching: false, workspaces: action.payload };
    case FETCH_MEMBERS_START:
      return { ...state, isFetching: true };
    case FETCH_MEMBERS_ERROR:
      return { ...state, isFetching: false };
    case FETCH_MEMBERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        workspaces: state.workspaces.map(w => {
          if (w._id === action.payload.workspaceId) {
            w.members = action.payload.members;
          }
          return w;
        })
      };
    case ADD_MEMBER_START:
      return { ...state, isFetching: true };
    case ADD_MEMBER_ERROR:
      return { ...state, isFetching: false };
    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        workspaces: state.workspaces.map(w => {
          if (w._id === action.payload.workspace._id) {
            w.members = action.payload.workspace.members;
          }

          return w;
        })
      };
    case REMOVE_MEMBER_START:
      return { ...state, isFetching: true };
    case REMOVE_MEMBER_ERROR:
      return { ...state, isFetching: false };
    case REMOVE_MEMBER_SUCCESS:
      return {
        ...state,
        workspaces: state.workspaces.map(w => {
          if (w._id === action.payload.workspace._id) {
            w.members = action.payload.workspace.members;
          }

          return w;
        })
      };

    default:
      return state;
  }
};

export default workspaceReducer;
