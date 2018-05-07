import React from "react";
import { css, withStyles } from "../withStyles";

const Tooltip = ({
  styles,
  appearance = "default",
  isRounded = false,
  withShadow = false,
  children,
  ...props
}) => (
  <span
    {...css(
      styles.tooltip,
      styles[appearance],
      isRounded && styles.rounded,
      withShadow && styles.shadow
    )}
    {...props}
  >
    {children}
  </span>
);

export default withStyles(({ themes, rounded, shadow }) => {
  return {
    tooltip: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "6px",
      border: "1px solid"
    },

    default: themes.default,
    primary: themes.primary,
    secondary: themes.secondary,
    success: themes.success,
    carbon: themes.carbon,

    rounded,
    shadow
  };
})(Tooltip);
