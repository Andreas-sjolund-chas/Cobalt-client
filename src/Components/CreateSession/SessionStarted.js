import React from "react";
import QRCode from "qrcode.react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import FlexContainer from "../../Containers/FlexContainer";
import Heading from "../../Elements/Heading";
import Paragraph from "../../Elements/Paragraph";
import CopyTextfield from "../../Elements/CopyTextfield";
import QrCodeWindow from "../QrCodeWindow";

const openQrCodeWindow = sessionId => {};

const SessionStarted = ({ sessionId = null }) => (
  <FlexContainer align="start">
    <Heading appearance="primary" size="2">
      Have a great session!
    </Heading>
    <Paragraph size="normal">
      Here is your unique session url. Share it with your audience.
    </Paragraph>
    <CopyTextfield
      url={`${process.env.REACT_APP_CLIENT_BASE_URL}/session/${sessionId}`}
      style={{ width: "100%" }}
    />
    <Link
      to={`${process.env.REACT_APP_CLIENT_BASE_URL}/qr/${sessionId}`}
      target="_blank"
      onClick={event => {
        event.preventDefault();
        window.open(
          `${process.env.REACT_APP_CLIENT_BASE_URL}/qr/${sessionId}`,
          "Popup",
          "location,status,scrollbars,resizable,width=200,height=200"
        );
      }}
    >
      <FlexContainer direction="row">
        <QRCode
          value={sessionId}
          renderAs="svg"
          size="70"
          style={{ padding: "1px", backgroundColor: "#FFF" }}
          level="H"
        />
        <Paragraph
          style={{ marginLeft: "5px" }}
          size="normal"
          appearance="white"
        >
          Click to open QR-Code in separate window
        </Paragraph>
      </FlexContainer>
    </Link>
  </FlexContainer>
);

export default SessionStarted;
