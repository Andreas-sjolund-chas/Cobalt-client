import React, { Component } from "react";
import { css, withStyles } from "../withStyles";
import { CSSTransitionGroup } from "react-transition-group";

import Notification from "../Elements/Notification";
import FlexContainer from "../Containers/FlexContainer";

class Notifications extends Component {
  constructor({ styles, position = "bottomRight", ...props }) {
    super(...props);
    this.styles = styles;
    this.position = position;

    this.removeNotification;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id, e) {
    return this.props.removeNotifications(id);
  }

  render() {
    const notifications = Object.keys(this.props.notifications).map(
      key => this.props.notifications[key]
    );

    return (
      <div {...css(this.styles.notifications, this.styles[this.position])}>
        <CSSTransitionGroup
          transitionName="notification"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {notifications.map(notification => {
            if (notification.body) {
              return (
                <Notification
                  appearance={
                    notification.type == "warning" ? "danger" : "success"
                  }
                  timer={setTimeout(() => {
                    this.props.removeNotifications(notification.id);
                  }, 5000)}
                  key={notification.id}
                  handleClick={e => this.handleClick(notification.id, e)}
                >
                  {notification.body}
                </Notification>
              );
            }
          })}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default withStyles(({ themes }) => {
  return {
    notifications: {
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      width: "30%",
      zIndex: "100000",
      ":nth-child(1n) div": {
        marginBottom: "15px"
      }
    },
    /* Position */
    bottomRight: {
      bottom: "2.5rem",
      right: "2.5rem"
    },
    bottomLeft: {
      bottom: "2.5rem",
      left: "2.5rem"
    }
  };
})(Notifications);
