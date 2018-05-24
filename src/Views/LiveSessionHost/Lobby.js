import React from "react";
import { css, withStyles } from "../../withStyles";
import FlexContainer from "../../Containers/FlexContainer";
import Heading from "../../Elements/Heading";
import Paragraph from "../../Elements/Paragraph";
import Button from "../../Elements/Button";
import CopyTextfield from "../../Elements/CopyTextfield";
import Modal from "../../Components/Modal";

class Lobby extends React.Component {
  constructor({ styles, ...props }) {
    super(...props);
    this.styles = styles;
    this.state = {
      showModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    return (
      <div {...css(this.styles.lobby)}>
        {this.state.showModal ? (
          <Modal withAnimation>
            <Heading size="3" appearance="white">
              Are you sure you want to cancel this session?
            </Heading>
            <Paragraph appearance="white">
              You will have to create a new session.
            </Paragraph>
            <FlexContainer direction="row">
              <Button appearance="danger" onClick={this.props.stopSession}>
                Yes, cancel
              </Button>
              <Button appearance="secondary" onClick={this.toggleModal}>
                No
              </Button>
            </FlexContainer>
          </Modal>
        ) : (
          " "
        )}
        <FlexContainer direction="row" fullWidth="1" justify="end">
          <Button appearance="danger" onClick={this.toggleModal}>
            Cancel session
          </Button>
          <Button appearance="disabled">Settings </Button>
        </FlexContainer>
        <FlexContainer flex="1" align="center" justify="center">
          <Heading size="2">Your session is ready!</Heading>
          <Paragraph>
            Whenever you are ready, click the button to start!
          </Paragraph>
          <Button appearance="primary" onClick={this.props.startSession}>
            Let's go!
          </Button>
          <Heading size="3">
            {this.props.data.attendees} attendees in lobby
          </Heading>
        </FlexContainer>
        <FlexContainer fullWidth="1" align="end" justify="end">
          <FlexContainer direction="row">
            <Button
              appearance="secondary"
              onClick={event => {
                const size = window.innerHeight * 0.75;
                event.preventDefault();
                window.open(
                  `${process.env.REACT_APP_CLIENT_BASE_URL}/qr/${
                    this.props.data.sessionId
                  }`,
                  "Popup",
                  `location,status,resizable,centerscreen,width=${size},height=${size}`
                );
              }}
            >
              Show QR-code
            </Button>
            <CopyTextfield
              url={`${process.env.REACT_APP_CLIENT_BASE_URL}/session/${
                this.props.data.sessionId
              }`}
            />
          </FlexContainer>
        </FlexContainer>
      </div>
    );
  }
}

export default withStyles(({ colors }) => {
  return {
    lobby: {
      display: "flex",
      padding: "0px 20px",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      height: "100vh",
      backgroundColor: colors.sand
    },
    icon: {
      width: "128px",
      marginBottom: "48px"
    }
  };
})(Lobby);
