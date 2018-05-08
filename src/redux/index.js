import { combineReducers } from "redux";

import auth from "./auth/authReducer";
import session from "./session/sessionReducer";
import signup from "./signup/signupReducer";
import notifications from "./notifications/notificationsReducer";
import user from "./user/userReducer";

const feedbackApp = combineReducers({
  auth,
  session,
  user,
  signup,
  notifications
});

export default feedbackApp;
