import React from "react";
import { Redirect } from "react-router-dom";
import { css, withStyles } from "../withStyles";
import Media from "react-media";

import FlexContainer from "../Containers/FlexContainer";
import Button from "../Elements/Button";
import Heading from "../Elements/Heading";
import Input from "../Elements/Input";
import Qrscanner from "../Components/Qrscanner";

class JoinSession extends React.Component {
  constructor({ styles, ...props }) {
    super(props);
    this.state = {
      code: "",
      fireRedirect: false,
      fireQrRedirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQrSubmit = this.handleQrSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleQRCode = this.handleQRCode.bind(this);
  }

  handleSubmit(e) {
    this.setState({ fireRedirect: true });
  }

  handleQrSubmit(e) {
    this.setState({ fireQrRedirect: true });
  }

  handleChange(e) {
    this.setState({ code: e.target.value });
  }

  handleQRCode(qrCode) {
    this.setState({
      qrCode: qrCode
    });

    this.handleQrSubmit(null);
  }

  render() {
    const { fireRedirect, fireQrRedirect } = this.state;

    if (fireRedirect) {
      return <Redirect to={`/session/${this.state.code}`} />;
    }

    if (fireQrRedirect) {
      return (window.location = this.state.qrCode);
    }

    return (
      <FlexContainer flex="1" style={{ textAlign: "center", width: "inherit" }}>
        <Media query={{ minHeight: 400 }}>
          <div>
            <Heading size="1" appearance="white">
              Have a unique code?
            </Heading>
            <Heading size="2" appearance="white">
              Paste it here to enter your session!
            </Heading>
          </div>
        </Media>
        <form onSubmit={this.handleSubmit}>
          <FlexContainer
            direction="row"
            justify="center"
            style={{ flexWrap: "wrap" }}
          >
            <FlexContainer direction="row">
              <span {...css(this.props.styles.inputPrefix)}>
                http://feedback.io/
              </span>
              <Media query={{ maxWidth: 480 }}>
                {matches => (
                  <div
                    {...css(
                      matches
                        ? this.props.styles.mobileInput
                        : this.props.styles.desktopInput
                    )}
                  >
                    <Input
                      name="code"
                      type="text"
                      placeholder="Session code..."
                      value={this.state.code}
                      onChange={this.handleChange}
                      style={{
                        marginLeft: "0px",
                        borderRadius: "0px 4px 4px 0px"
                      }}
                    />
                  </div>
                )}
              </Media>
            </FlexContainer>
            <Button
              style={{ marginLeft: "15px" }}
              appearance="secondary"
              type="submit"
            >
              JOIN
            </Button>
            <Qrscanner passQRCode={this.handleQRCode} />
          </FlexContainer>
        </form>
      </FlexContainer>
    );
  }
}

export default withStyles(({ themes, text, colors }) => {
  return {
    JoinSession: {},
    inputPrefix: {
      backgroundColor: colors.secondary,
      color: "white",
      height: "43px",
      display: "flex",
      alignItems: "center",
      padding: "16px",
      fontWeight: "600",
      borderRadius: "4px 0px 0px 4px"
    },
    mobileInput: {
      ":nth-child(1n) input": {
        width: "180px"
      }
    },
    desktopInput: {
      ":nth-child(1n) input": {
        width: "400px"
      }
    }
  };
})(JoinSession);
