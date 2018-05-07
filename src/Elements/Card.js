import React from "react";
import { css, withStyles } from "../withStyles";

const Card = ({
  appearance = "carbon",
  shadow = "shadow",
  styles,
  ...props
}) => (
  <div
    {...css(styles.card, styles[appearance], styles[shadow], styles.rounded)}
    {...props}
  />
);

export default withStyles(({ themes, shadow, rounded }) => {
  return {
    card: {
      padding: "40px",
      color: "white",
      position: "relative"
    },

    /* Color */
    default: themes.default,
    primary: themes.primary,
    secondary: themes.secondary,
    success: themes.success,
    danger: themes.danger,
    carbon: themes.carbon,
    white: {
      backgroundColor: "white"
    },

    /* Shadow */
    shadow: shadow,
    rounded: rounded
  };
})(Card);
