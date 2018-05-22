import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

import NotFound from "../Views/NotFound";
import SocketClient from "../Views/Client";
import LiveSessionHost from "../Views/LiveSessionHost/LiveSessionHost";
import Summary from "../Views/LiveSessionHost/Summary";
import Dashboard from "../Views/Dashboard/Dashboard";
import Login from "../Views/Login";
import LandingPage from "../Views/LandingPage";
import PricingArea from "../Views/PricingArea";
import CreateSession from "../Views/CreateSession";
import SignUp from "../Views/SignUp";
import Notifications from "../Components/Notifications";
import { removeOldNotification } from "../redux/notifications/actions";
import { verifyAuth } from "../redux/auth/actions";
import Client from "../Views/Client";

/* HOC */
import withSocket from "../Components/WithSocket";
import requireAuth from "../Components/RequireAuth";
import withPublicRoot from "../Containers/PublicRoot";
import PrivateRoute from "../Components/PrivateRoute";

const mapStateToProps = state => ({
  notifications: state.notifications.messages,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
  return {
    removeOldNotification: notifications =>
      dispatch(removeOldNotification(notifications)),
    verifyAuth: _ => dispatch(verifyAuth())
  };
};

const LandingPageWithPublic = withPublicRoot(LandingPage);
const LoginWithPublic = withPublicRoot(Login);
const SignUpWithPublic = withPublicRoot(SignUp);
const PricingAreaWithPublic = withPublicRoot(PricingArea);
const LiveSessionHostWithSocket = withSocket(LiveSessionHost);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.removeNotifications = this.removeNotifications.bind(this);
  }

  componentWillMount() {
    this.props.verifyAuth();
  }

  removeNotifications(id) {
    this.props.removeOldNotification(id);
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className="App">
        <Notifications
          notifications={this.props.notifications}
          removeNotifications={this.removeNotifications}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => (
              <LandingPageWithPublic
                {...routeProps}
                authenticated={isAuthenticated}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={routeProps => (
              <LoginWithPublic
                {...routeProps}
                authenticated={isAuthenticated}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={routeProps => (
              <SignUpWithPublic
                {...routeProps}
                authenticated={isAuthenticated}
              />
            )}
          />
          <Route path="/session/:sessionId" component={Client} />
          <PrivateRoute
            authenticated={isAuthenticated}
            path="/summary/:sessionId"
            component={Summary}
          />
          <PrivateRoute
            authenticated={isAuthenticated}
            path="/host/:sessionId"
            component={LiveSessionHostWithSocket}
          />
          <PrivateRoute
            authenticated={isAuthenticated}
            path="/dashboard"
            component={Dashboard}
          />
          <Route
            path="/pricing"
            render={routeProps => (
              <PricingAreaWithPublic
                {...routeProps}
                authenticated={isAuthenticated}
              />
            )}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
