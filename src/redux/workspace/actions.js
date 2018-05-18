import {
  FETCH_MEMBERS_START,
  FETCH_MEMBERS_SUCCESS,
  FETCH_MEMBERS_ERROR,
  ADD_MEMBER_START,
  ADD_MEMBER_ERROR,
  ADD_MEMBER_SUCCESS,
  REMOVE_MEMBER_START,
  REMOVE_MEMBER_ERROR,
  REMOVE_MEMBER_SUCCESS,
  ADD_WORKSPACE_START,
  ADD_WORKSPACE_SUCCESS,
  ADD_WORKSPACE_FAIL
} from "./constants";

import { handleResponse } from "../utils/utils";

// Create new workspace

export const addNewWorkspaceStart = () => ({
  type: ADD_WORKSPACE_START
});
export const addNewWorkspaceSuccess = data => ({
  type: ADD_WORKSPACE_SUCCESS,
  payload: data
});
export const addNewWorkspaceFail = () => ({
  type: ADD_WORKSPACE_FAIL
});

export const addNewWorkspace = data => dispatch => {
  dispatch(addNewWorkspaceStart());

  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/workspace/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  })
    .then(handleResponse)
    .then(data => dispatch(addNewWorkspaceSuccess(data)))
    .catch(err => dispatch(addNewWorkspaceFail(err)));
};

// Fetch members
export const fetchMembersStart = () => ({
  type: FETCH_MEMBERS_START
});

export const fetchMembersSuccess = data => ({
  type: FETCH_MEMBERS_SUCCESS,
  payload: data
});

export const fetchMembersError = err => ({
  type: FETCH_MEMBERS_ERROR,
  payload: err
});

export const requestMembers = workspaceId => dispatch => {
  dispatch(fetchMembersStart());

  fetch(
    `${process.env.REACT_APP_API_BASE_URL}/api/workspace/info/${workspaceId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }
  )
    .then(handleResponse)
    .then(data => dispatch(fetchMembersSuccess(data)))
    .catch(err => dispatch(fetchMembersError(err)));
};

// Add member to workspace
export const addNewWorkspaceMemberStart = data => ({
  type: ADD_MEMBER_START
});

export const addNewWorkspaceMemberSuccess = data => ({
  type: ADD_MEMBER_SUCCESS,
  payload: data
});

export const addNewWorkspaceMemberError = err => ({
  type: ADD_MEMBER_ERROR,
  payload: err
});

export const addNewWorkspaceMember = data => dispatch => {
  dispatch(addNewWorkspaceMemberStart());

  const { email, workspaceId } = data;

  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/workspace/member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      workspaceId
    })
  })
    .then(handleResponse)
    .then(data => {
      dispatch(addNewWorkspaceMemberSuccess(data));
      dispatch(requestMembers(data.workspace._id));
    })
    .catch(err => dispatch(addNewWorkspaceMemberError(err)));
};

// Remove member from workspace
export const removeMemberFromWorkspaceStart = data => ({
  type: REMOVE_MEMBER_START
});

export const removeMemberFromWorkspaceSuccess = data => ({
  type: REMOVE_MEMBER_SUCCESS,
  payload: data
});

export const removeMemberFromWorkspaceError = err => ({
  type: REMOVE_MEMBER_ERROR,
  payload: err
});

export const removeMemberFromWorkspace = data => dispatch => {
  dispatch(removeMemberFromWorkspaceStart());

  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/workspace/member`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      userId: data.userId,
      workspaceId: data.workspaceId
    })
  })
    .then(handleResponse)
    .then(data => {
      dispatch(removeMemberFromWorkspaceSuccess(data));
      dispatch(requestMembers(data.workspace._id));
    })
    .catch(err => dispatch(removeMemberFromWorkspaceError(err)));
};
