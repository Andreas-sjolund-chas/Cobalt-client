import React from "react";
import { css, withStyles } from "../../withStyles";
import Heading from "../../Elements/Heading";
import Button from "../../Elements/Button";
import FlexContainer from "../../Containers/FlexContainer";

const Paused = ({ styles, ...props }) => {
  return (
    <div {...css(styles.paused)}>
      <Heading size="1" appearance="white">
        Your session is paused.
      </Heading>
      <Heading size="2" appearance="white">
        Continue whenever you are ready.
      </Heading>
      <FlexContainer direction="row">
        <Button appearance="secondary" onClick={props.pauseSession}>
          Resume session
        </Button>
        <Button appearance="danger" onClick={props.stopSession}>
          End session
        </Button>
      </FlexContainer>
    </div>
  );
};

export default withStyles(({ colors }) => {
  return {
    paused: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      color: "white",
      fontSize: "48px",
      zIndex: "10000",
      animation: "fade 0.5s ease",
      willChange: "transform"
    },
    value: {
      fontSize: "120px",
      fontWeight: "600"
    }
  };
})(Paused);
