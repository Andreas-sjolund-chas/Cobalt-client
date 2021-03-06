import {
  REQUEST_USER_START,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_FAIL,
  REQUEST_AVATAR_UPDATE_START,
  REQUEST_AVATAR_UPDATE_SUCCESS,
  REQUEST_AVATAR_UPDATE_FAIL
} from "./constants";
import { ADD_WORKSPACES } from "../workspace/constants";

import { handleResponse } from "../utils/utils";

export const addWorkspaces = data => ({ type: ADD_WORKSPACES, payload: data });

export const requestUserStart = () => ({ type: REQUEST_USER_START });
export const requestUserSuccess = data => ({
  type: REQUEST_USER_SUCCESS,
  payload: data
});
export const requestUserFail = err => ({
  type: REQUEST_USER_FAIL,
  payload: err
});

// AVATAR
export const requestAvatarUpdateStart = () => ({
  type: REQUEST_AVATAR_UPDATE_START
});
export const requestAvatarUpdateSuccess = data => ({
  type: REQUEST_AVATAR_UPDATE_SUCCESS,
  payload: data
});
export const requestAvatarUpdateFail = err => ({
  type: REQUEST_AVATAR_UPDATE_FAIL,
  payload: err
});

export const requestUser = id => dispatch => {
  dispatch(requestUserStart());

  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(handleResponse)
    .then(data => {
      dispatch(requestUserSuccess(data));
      dispatch(addWorkspaces(data.user.workspaces));
    })
    .catch(err => dispatch(requestUserFail(err)));
};

export const requestUserUpdate = data => dispatch => {
  dispatch(requestUserStart());
  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(handleResponse)
    .then(data => {
      dispatch(requestUserSuccess(data));
      dispatch(addWorkspaces(data.user.workspaces));
    })
    .catch(err => dispatch(requestUserFail(err)));
};

export const requestAvatarUpdate = data => dispatch => {
  dispatch(requestAvatarUpdateStart());
  const file = new FormData();
  file.append("file", data);

  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/upload/avatar`, {
    method: "POST",
    credentials: "include",
    body: file
  })
    .then(handleResponse)
    .then(data => {
      dispatch(requestAvatarUpdateSuccess(data));
    })
    .catch(err => dispatch(requestAvatarUpdateFail(err)));
};
