import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import FlexContainer from "../Containers/FlexContainer";
import Loader from "../Elements/Loader";

const PrivateRoute = ({
  component: Component,
  authenticated,
  isFetching,
  ...rest
}) => {
  return isFetching ? (
    <FlexContainer
      align="center"
      justify="center"
      direction="column"
      fullWidth="1"
      style={{
        height: "100vh"
      }}
    >
      <p>Checking your credentials...</p>
      <Loader fillColor="nightsky" size="large" />
    </FlexContainer>
  ) : (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated,
  isFetching: state.auth.isFetching
});

export default connect(mapStateToProps)(PrivateRoute);
