import React from "react";
import { css, withStyles } from "../withStyles";

import FlexContainer from "../Containers/FlexContainer";

const setWrapperRef = node => {
  this.wrapperRef = node;
};
const killModal = e => {
  if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
    return true;
  }
  return false;
};

const Modal = ({
  withOverlay = false,
  withAnimation = false,
  appearance = "default",
  styles,
  closeModal,
  ...props
}) => (
  <div
    onClick={e => (closeModal ? closeModal(killModal(e)) : "")}
    {...css(withOverlay === true && styles.overlayColor, styles.overlay)}
    {...props}
  >
    <div
      ref={setWrapperRef}
      {...css(
        withAnimation === true && styles.animation,
        styles.rounded,
        styles.shadow,
        styles.modal,
        styles[appearance]
      )}
    >
      <FlexContainer>{props.children}</FlexContainer>
    </div>
  </div>
);

export default withStyles(({ colors, rounded, shadow }) => {
  return {
    modal: {
      padding: "40px",
      zIndex: "100",
      position: "relative"
    },
    default: {
      backgroundColor: colors.carbon
    },
    white: {
      backgroundColor: "#FFF"
    },
    overlay: {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "999",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    overlayColor: {
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    },
    animation: {
      animation: "fade 0.5s ease"
    },
    rounded: rounded,
    shadow: shadow
  };
})(Modal);
