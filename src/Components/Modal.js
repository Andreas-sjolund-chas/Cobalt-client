import React from "react";
import { css, withStyles } from "../withStyles";

import FlexContainer from "../Containers/FlexContainer";
import Icon from "../Elements/Icon";

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.modalRef = React.createRef();

    this.killModal = this.killModal.bind(this);
    this.handleIconKillModal = this.handleIconKillModal.bind(this);
  }

  killModal(e) {
    this.props.closeModal &&
      this.props.closeModal(e, e.target.contains(this.modalRef));
  }

  handleIconKillModal(e) {
    e.stopPropagation();

    this.props.closeModal && this.props.closeModal(null, true);
  }

  render() {
    const {
      withOverlay = false,
      withAnimation = false,
      appearance = "default",
      styles,
      closeModal,
      ...props
    } = this.props;

    return (
      <div
        ref={modalRef => (this.modalRef = modalRef)}
        onClick={this.killModal}
        {...css(withOverlay === true && styles.overlayColor, styles.overlay)}
        {...props}
      >
        <div
          {...css(
            withAnimation === true && styles.animation,
            styles.rounded,
            styles.shadow,
            styles.modal,
            styles[appearance]
          )}
        >
          <FlexContainer
            align="end"
            style={{
              width: "100%",
              position: "absolute",
              top: "12px",
              right: "12px"
            }}
          >
            <Icon
              onClick={this.handleIconKillModal}
              icon="fas fa-times"
              fillColor="white"
              style={{
                borderRadius: "4px",
                width: "25px",
                height: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                alignSelf: "flex-end",
                position: "absolute"
              }}
              {...css(this.props.styles.closeModal)}
            />
          </FlexContainer>
          <FlexContainer>{props.children}</FlexContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(({ colors, rounded, shadow, themes }) => {
  return {
    modal: {
      padding: "40px",
      zIndex: "100",
      position: "relative"
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

    default: {
      backgroundColor: colors.carbon
    },
    white: {
      backgroundColor: "#FFF"
    },
    overlayColor: {
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    },
    animation: {
      animation: "fade 0.5s ease"
    },
    rounded: rounded,
    shadow: shadow,
    closeModal: themes.danger
  };
})(Modal);
