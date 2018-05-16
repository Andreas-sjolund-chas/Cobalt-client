import React, { Component } from "react";
import QRCode from "qrcode.react";
import ReactDOM from "react-dom";

const url = window.location.href;

class QrCodeWindow extends Component {
  constructor(props) {
    super(props);
    this.href = window.location.href;
    this.sessionId = this.href.substr(this.href.lastIndexOf("/") + 1);
  }
  render() {
    return (
      <QRCode
        value={this.sessionId}
        renderAs="svg"
        size="100vh"
        style={{ padding: "20px", backgroundColor: "#FFF" }}
        level="H"
      />
    );
  }
}

export default QrCodeWindow;
