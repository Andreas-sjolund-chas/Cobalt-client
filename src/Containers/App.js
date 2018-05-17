import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

import NotFound from "../Views/NotFound";
import SocketClient from "../Views/Client";
import LiveSessionHost from "../Views/LiveSessionHost/LiveSessionHost";
import Lobby from "../Views/LiveSessionHost/Lobby";
import Dashboard from "../Views/Dashboard/Dashboard";
import Login from "../Views/Login";
import LandingPage from "../Views/LandingPage";
import PricingArea from "../Views/PricingArea";
import CreateSession from "../Views/CreateSession";
import SignUp from "../Views/SignUp";
import Notifications from "../Components/Notifications";
import { removeOldNotification } from "../redux/notifications/actions";
import Client from "../Views/Client";

/* HOC */
import withSocket from "../Components/WithSocket";
import requireAuth from "../Components/RequireAuth";
import withPublicRoot from "../Containers/PublicRoot";

const mapStateToProps = state => ({
  notifications: state.notifications.messages,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
  return {
    removeOldNotification: notifications =>
      dispatch(removeOldNotification(notifications))
  };
};

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
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
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.LandingPage = withPublicRoot(LandingPage);
    this.Login = withPublicRoot(Login);
    this.SignUp = withPublicRoot(SignUp);
    this.PricingArea = withPublicRoot(PricingArea);
    this.CreateSession = requireAuth(CreateSession);
    this.LiveSessionHost = withSocket(LiveSessionHost);
    this.Dashboard = requireAuth(Dashboard);
    this.Lobby = requireAuth(Lobby);
    this.removeNotifications = this.removeNotifications.bind(this);
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
          <Route exact path="/" component={this.LandingPage} />
          <Route exact path="/login" component={this.Login} />
          <PrivateRoute
            authenticated={isAuthenticated}
            exact
            path="/createsession"
            component={CreateSession}
          />
          <Route exact path="/signup" component={this.SignUp} />
          <Route path="/session/:sessionId" component={Client} />
          <PrivateRoute
            authenticated={isAuthenticated}
            path="/host/:sessionId"
            component={LiveSessionHost}
          />
          <PrivateRoute
            authenticated={isAuthenticated}
            path="/lobby"
            component={Lobby}
          />
          <PrivateRoute
            authenticated={isAuthenticated}
            path="/dashboard"
            component={Dashboard}
          />
          <Route path="/pricing" component={this.PricingArea} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
