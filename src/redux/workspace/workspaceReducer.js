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
      return {};
    case FETCH_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.payload.members
      };
    case ADD_MEMBER_START:
      return { ...state, isFetching: true };
    case ADD_MEMBER_ERROR:
      return {};
    case ADD_MEMBER_SUCCESS:
      return {};
    case REMOVE_MEMBER_START:
      return { ...state, isFetching: true };
    case REMOVE_MEMBER_ERROR:
      debugger;
      return {};
    case REMOVE_MEMBER_SUCCESS:
      const index = state.workspaces.findIndex(
        i => i._id == action.payload.workspace._id
      );
      debugger;
      return {
        ...state,
        workspaces: { [index]: action.payload.workspace }
      };

    default:
      return state;
  }
};

export default workspaceReducer;
