import React from "react";
import { css, withStyles } from "../../withStyles";
import Profile from "../../Components/Profile";
import { connect } from "react-redux";
import { requestUserUpdate } from "../../redux/user/actions";

let ProfileView = ({ styles, dispatch, ...props }) => {
  const updateRequest = data => {
    dispatch(requestUserUpdate(data));
  };

  const handleAvatarChange = data => {
    console.log(data);
    debugger;
  };
  return (
    <div {...css(styles.Profile)}>
      <Profile
        updateRequest={updateRequest}
        handleAvatarChange={handleAvatarChange}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

ProfileView = connect(mapStateToProps)(ProfileView);

export default withStyles(({ colors }) => {
  return {
    Profile: {
      display: "flex",
      flexWrap: "wrap",
      height: "100%"
    }
  };
})(ProfileView);
