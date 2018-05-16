import React, { Component } from "react";

import { css, withStyles } from "react-with-styles";

import QRCode from "qrcode.react";
import ReactDOM from "react-dom";

import Card from "../Elements/Card";
import Heading from "../Elements/Heading";

const url = window.location.href;

class QrCodeWindow extends Component {
  constructor(props) {
    super(props);
    this.href = window.location.href;
    this.sessionId = this.href.substr(this.href.lastIndexOf("/") + 1);
  }
  render() {
    const { styles } = this.props;

    return (
      <Card style={{ height: "calc(100% - 48px)", width: "100%" }}>
        <Heading {...css(styles.logo)} size="2">
          Feed<span>.io</span>
        </Heading>
        <QRCode
          value={this.sessionId}
          renderAs="svg"
          size="100%"
          style={{
            width: "100%",
            height: "100%",
            padding: "20px",
            backgroundColor: "#FFF"
          }}
          level="H"
        />
      </Card>
    );
  }
}

export default withStyles(({ colors }) => {
  return {
    logo: {
      color: "#FFF",
      marginBottom: "0px",
      ":nth-child(1n) span": {
        color: colors.danger
      }
    }
  };
})(QrCodeWindow);
