import React from "react";
import { css, withStyles } from "../withStyles";

const Badge = ({ appearance = "primary", styles, ...props }) => (
  <span {...css(styles.badge, styles[appearance])}>{props.children}</span>
);

export default withStyles(({ colors, themes, text }) => {
  return {
    badge: {
      display: "inline-block",
      borderRadius: "2px",
      background: "transparent",
      padding: "4px"
    },

    /* Color */
    primary: {
      border: `1px solid ${colors.primary}`
    },
    secondary: {
      border: `1px solid ${colors.secondary}`
    },
    success: {
      border: `1px solid ${colors.success}`
    },
    danger: {
      border: `1px solid ${colors.danger}`
    },
    disabled: {
      cursor: "inherit",
      backgroundColor: "#b7b7b7"
    }
  };
})(Badge);
