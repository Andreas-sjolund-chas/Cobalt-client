import React, { Component } from "react";
import { css, withStyles } from "../../withStyles";
import QRCode from "qrcode.react";
import FlexContainer from "../../Containers/FlexContainer";
import Heading from "../../Elements/Heading";
import Paragraph from "../../Elements/Paragraph";
import CopyTextfield from "../../Elements/CopyTextfield";
import Icon from "../../Elements/Icon";

class SessionStarted extends Component {
  constructor({ styles, ...props }) {
    super(props);
    this.state = {
      sessionId: null,
      copyHover: false,
      popUpHover: false
    };
  }

  componentWillMount() {
    this.setState({
      sessionId: this.props.sessionId
    });
  }

  copyEnter() {
    this.setState({
      copyHover: true
    });
  }

  copyLeave() {
    this.setState({
      copyHover: false
    });
  }

  popUpEnter() {
    this.setState({
      popUpHover: true
    });
  }

  popUpLeave() {
    this.setState({
      popUpHover: false
    });
  }

  copyQrLink = sessionId => {
    const text = `${process.env.REACT_APP_CLIENT_BASE_URL}/qr/${sessionId}`;

    const dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("value", text);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  };
  render() {
    return (
      <FlexContainer align="start">
        <Heading appearance="primary" size="2">
          Have a great session!
        </Heading>
        <Paragraph size="normal">
          Here is your unique session url. Share it with your audience.
        </Paragraph>
        <CopyTextfield
          url={`${process.env.REACT_APP_CLIENT_BASE_URL}/session/${
            this.state.sessionId
          }`}
          style={{ width: "100%" }}
        />
        <FlexContainer
          direction="row"
          justify="center"
          style={{ width: "100%" }}
        >
          <div {...css(this.props.styles.qrContainer)}>
            <div
              {...css(
                this.state.popUpHover === true && this.props.styles.hover,
                this.state.popUpHover === false && this.props.styles.hide
              )}
            >
              <Paragraph
                appearance="primary"
                style={{
                  backgroundColor: "white",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  animation: "fade 0.3s ease"
                }}
              >
                Open QR-code in new window
              </Paragraph>
            </div>
            <div
              {...css(
                this.state.copyHover === true && this.props.styles.hover,
                this.state.copyHover === false && this.props.styles.hide
              )}
            >
              <Paragraph
                appearance="secondary"
                style={{
                  backgroundColor: "white",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  animation: "fade 0.3s ease"
                }}
              >
                Copy QR-link to clipboard
              </Paragraph>
            </div>

            <QRCode
              value={`${process.env.REACT_APP_CLIENT_BASE_URL}/session/${
                this.state.sessionId
              }`}
              renderAs="svg"
              size="150"
              style={{ padding: "1px", backgroundColor: "#FFF" }}
              level="H"
            />
            <Icon
              icon="fas fa-copy"
              size="large"
              onClick={() => {
                this.copyQrLink(this.state.sessionId);
              }}
              onMouseEnter={() => {
                this.copyEnter();
              }}
              onMouseLeave={() => {
                this.copyLeave();
              }}
              style={{
                marginLeft: "5px",
                backgroundColor: "rgb(47, 216, 249)",
                borderRadius: "4px",
                padding: "4px",
                position: "absolute",
                bottom: "5px",
                left: "0px",
                width: "30px",
                height: "32px"
              }}
              appearance="secondary"
            />
            <Icon
              icon="fas fa-external-link-alt"
              size="large"
              appearance="secondary"
              style={{
                marginLeft: "5px",
                backgroundColor: "rgb(255, 182, 119)",
                borderRadius: "4px",
                padding: "4px",
                position: "absolute",
                bottom: "5px",
                right: "5px",
                width: "30px",
                height: "32px"
              }}
              to={`${process.env.REACT_APP_CLIENT_BASE_URL}/qr/${
                this.state.sessionId
              }`}
              target="_blank"
              onClick={event => {
                const size = window.innerHeight * 0.75;
                event.preventDefault();
                window.open(
                  `${process.env.REACT_APP_CLIENT_BASE_URL}/qr/${
                    this.state.sessionId
                  }`,
                  "Popup",
                  `location,status,resizable,centerscreen,width=${size},height=${size}`
                );
              }}
              onMouseEnter={() => {
                this.popUpEnter();
              }}
              onMouseLeave={() => {
                this.popUpLeave();
              }}
            />
          </div>
        </FlexContainer>
      </FlexContainer>
    );
  }
}

export default withStyles(({ themes, text, colors }) => {
  return {
    qrContainer: {
      width: "150px",
      position: "relative"
    },
    hover: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      width: "150px",
      height: "150px",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center"
    },
    hide: {
      display: "none"
    }
  };
})(SessionStarted);
