import React from "react";
import { css, withStyles } from "../withStyles";

const Notification = ({
  styles,
  appearance = "default",
  position = "bottomRight",
  handleClick,
  ...props
}) => (
  <div
    {...css(styles.notification, styles[appearance], styles[position])}
    {...props}
    onClick={handleClick}
  >
    {props.children}
    <span {...css(styles.cross)}>X</span>
  </div>
);

export default withStyles(({ themes, colors }) => {
  return {
    notification: {
      /* FlexContainer? */
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      /* From theme? */
      border: "2px solid",
      borderRadius: "5px",
      padding: "2.5rem"
    },
    cross: {
      position: "absolute",
      right: "1.5rem",
      top: "1rem",
      cursor: "pointer"
    },

    /* Appearance */
    default: themes.default,
    success: themes.success,
    danger: themes.danger,

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
})(Notification);
