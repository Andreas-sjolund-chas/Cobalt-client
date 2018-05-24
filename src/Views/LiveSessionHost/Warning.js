import React from "react";
import { css, withStyles } from "../../withStyles";
import Heading from "../../Elements/Heading";

const Warning = ({ styles, ...props }) => {
  return (
    <div {...css(styles.warning)}>
      <Heading size="1" appearance="white">
        Engagement threshold reached
      </Heading>
      <span {...css(styles.value)}>{props.percentage}%</span>
    </div>
  );
};

export default withStyles(({ colors }) => {
  return {
    warning: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      backgroundColor: colors.danger,
      color: "white",
      fontSize: "48px",
      animation: "fade 0.5s ease",
      willChange: "transform"
    },
    value: {
      fontSize: "120px",
      fontWeight: "600"
    }
  };
})(Warning);
