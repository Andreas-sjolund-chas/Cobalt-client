import React from "react";
import { css, withStyles } from "../withStyles";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import SignUpForm from "../Components/SignUpForm";
import FlexContainer from "../Containers/FlexContainer";
import { requestSignup } from "../redux/signup/actions";

let SignUp = ({ styles, dispatch, ...props }) => {
  const signupRequest = data => {
    dispatch(requestSignup(data));
  };

  if (props.success) {
    return <Redirect to="/login" />;
  }

  return (
    <div {...css(styles.signUp)}>
      <SignUpForm signupRequest={signupRequest} />
      <div {...css(styles.background)} />
    </div>
  );
};

const mapStateToProps = state => ({
  success: state.signup.success
});

/* Redux Connect */
SignUp = connect(mapStateToProps)(SignUp);

export default withStyles(({ colors, gradients }) => {
  return {
    signUp: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "0",
      left: "0",
      height: "100%",
      width: "100%",
      touchAction: "none"
    },
    background: {
      display: "flex",
      height: "100%",
      width: "100%",
      position: "absolute",
      zIndex: "-99",
      background:
        "url('https://images.unsplash.com/photo-1490806230066-f7e6f7bf5052?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2ca889535ea01f912f94ac4ddf0034e0&auto=format&fit=crop&w=2066&q=80')",
      backgroundSize: "cover",
      ":before": {
        content: '""',
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        position: "absolute",
        display: "block",
        zIndex: "1000",
        background: "rgba(0,0,0,0.5)"
      }
    },
    icon: {
      width: "128px",
      marginBottom: "48px"
    }
  };
})(SignUp);
