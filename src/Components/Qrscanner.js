import React, { Component } from "react";

import Button from "../Elements/Button";

import QrReader from "react-qr-reader";

class Qrscanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: "No result"
    };

    this.handleScan = this.handleScan.bind(this);
    this.openImageDialog = this.openImageDialog.bind(this);
  }
  handleScan(result) {
    alert(result)
    if (result) {
      this.setState({ result });
      this.props.passQRCode(result);
    }
  }
  handleError(err) {
    alert(err);
    console.error(err);
  }
  openImageDialog(event) {
    event.preventDefault();

    this.qrReader.openImageDialog();
  }

  render() {
    return (
      <div>
        <Button onClick={this.openImageDialog}>QR-CODE</Button>
        <QrReader
          style={{
            display: "none"
          }}
          ref={qrReader => (this.qrReader = qrReader)}
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          legacyMode
        />
      </div>
    );
  }
}
export default Qrscanner;
