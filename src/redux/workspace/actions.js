import {
  ADD_MEMBER_START,
  ADD_MEMBER_ERROR,
  ADD_MEMBER_SUCCESS,
  REMOVE_MEMBER_START,
  REMOVE_MEMBER_ERROR,
  REMOVE_MEMBER_SUCCESS
} from "./constants";

import handleError from "../utils";

// Add member to workspace
export const addMemberToWorkspaceSuccess = data => ({
  type: ADD_MEMBER_SUCCESS,
  payload: data
});
export const addMemberToWorkspaceError = err => ({
  type: ADD_MEMBER_ERROR,
  payload: err
});

export const addMemberToWorkspace = data => {
  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      userId,
      workspaceId
    })
  })
    .then(handleResponse)
    .then(data => dispatch(addMemberToWorkspaceSuccess(data)))
    .catch(err => dispatch(addMemberToWorkspaceError(err)));
};

// Remove member from workspace
export const removeMemberFromWorkspaceSuccess = data => ({
  type: ADD_MEMBER_SUCCESS,
  payload: data
});
export const removeMemberFromWorkspaceError = err => ({
  type: ADD_MEMBER_ERROR,
  payload: err
});

export const removeMemberFromWorkspace = data => {
  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      userId,
      workspaceId
    })
  })
    .then(handleResponse)
    .then(data => dispatch(removeMemberFromWorkspaceSuccess(data)))
    .catch(err => dispatch(removeMemberFromWorkspaceError(err)));
};
