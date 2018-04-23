import React from "react";
import { css, withStyles } from "../withStyles";

const Button = ({
  appearance = "primary",
  size = "medium",
  styles,
  ...props
}) => (
  <button
    {...css(styles.button, styles[appearance], styles[size])}
    {...props}
  />
);

export default withStyles(({ themes, text }) => {
  return {
    button: {
      minWidth: "100px",
      padding: "16px 24px",
      border: "none",
      borderRadius: "4px",
      margin: "12px 12px 12px 0px",
      fontWeight: "bold"
    },

    /* Color */
    default: themes.default,
    primary: themes.primary,
    secondary: themes.secondary,
    success: themes.success,
    danger: themes.danger,
    primaryGradient: themes.primaryGradient,
    secondaryGradient: themes.secondaryGradient,
    successGradient: themes.successGradient,
    dangerGradient: themes.dangerGradient
  };
})(Button);
