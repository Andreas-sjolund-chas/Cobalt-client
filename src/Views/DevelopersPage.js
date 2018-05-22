import React from "react";
import { css, withStyles } from "../withStyles";

import Developers from "../Components/Developers";

const DevelopersPage = ({ styles, ...props }) => {
  return (
    <div {...css(styles.content)}>
      <Developers />

      <div {...css(styles.background)} />
    </div>
  );
};

export default withStyles(({ colors, gradients }) => {
  return {
    background: {
      display: "flex",
      height: "100%",
      width: "100%",
      position: "absolute",
      zIndex: "-99",
      background:
        "url('https://images.unsplash.com/photo-1490806230066-f7e6f7bf5052?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2ca889535ea01f912f94ac4ddf0034e0&auto=format&fit=crop&w=2066&q=80')",
      backgroundSize: "cover",
      ":before": {
        content: '""',
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        position: "absolute",
        display: "block",
        zIndex: "1000",
        background: "rgba(0,0,0,0.5)"
      }
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "0",
      left: "0",
      height: "100%",
      width: "100%",
      touchAction: "none"
    },
    icon: {
      width: "128px",
      marginBottom: "48px"
    }
  };
})(DevelopersPage);
