import React from "react";
import { Switch, Route } from "react-router-dom";
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
import Workspaces from "../Views/Dashboard/Workspaces"; /*REMOVE ME LATER*/

/* HOC */
import withSocket from "../Components/WithSocket";
import requireAuth from "../Components/RequireAuth";
import withPublicRoot from "../Containers/PublicRoot";

const mapStateToProps = state => ({
  notifications: state.notifications.messages
});

const mapDispatchToProps = dispatch => {
  return {
    removeOldNotification: notifications =>
      dispatch(removeOldNotification(notifications))
  };
};

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
    return (
      <div className="App">
        <Notifications
          notifications={this.props.notifications}
          removeNotifications={this.removeNotifications}
        />
        <Switch>
          <Route exact path="/" component={this.LandingPage} />
          <Route exact path="/login" component={this.Login} />
          <Route exact path="/createsession" component={this.CreateSession} />
          <Route exact path="/workspaces-dev" component={Workspaces} />{" "}
          {/*REMOVE ME LATER*/}
          <Route exact path="/signup" component={this.SignUp} />
          <Route exact path="/pricing" component={this.PricingArea} />
          <Route path="/session/:sessionId" component={Client} />
          <Route path="/host/:sessionId" component={this.LiveSessionHost} />
          <Route path="/lobby" component={this.Lobby} />
          <Route path="/dashboard" component={this.Dashboard} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
