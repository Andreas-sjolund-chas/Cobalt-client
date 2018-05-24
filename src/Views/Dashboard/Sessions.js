import React from "react";
import { css, withStyles } from "../../withStyles";
import FlexContainer from "../../Containers/FlexContainer";
import Heading from "../../Elements/Heading";
import Paragraph from "../../Elements/Paragraph";
import Button from "../../Elements/Button";
import ButtonLink from "../../Elements/ButtonLink";
import Loader from "../../Elements/Loader";
import Modal from "../../Components/Modal";
import SessionItem from "../../Components/SessionItem";
import openBoxIcon from "../../assets/open-box.svg";

import { requestDeleteSession } from "../../redux/session/actions";
import { requestUser } from "../../redux/user/actions";

class Sessions extends React.Component {
  constructor({ styles, ...props }) {
    super(...props);
    this.state = {
      showModal: false,
      sessionId: null
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  toggleModal(session) {
    this.setState({
      showModal: !this.state.showModal,
      session: session
    });
  }

  closeModal = (e, shouldClose) => {
    if (shouldClose) {
      this.setState({
        showModal: false
      });
    }
  };

  handleDelete() {
    this.props.dispatch(requestDeleteSession(this.state.session._id));
    this.props.dispatch(requestUser());
    this.setState({ showModal: false });
  }

  renderSessions(data, onlyCompleted) {
    return data.map(workspace =>
      workspace.presentations
        .filter(session => session.hasEnded === onlyCompleted)
        .map((session, key) => (
          <SessionItem
            toggleModal={() => {
              this.toggleModal(session);
            }}
            key={key}
            data={session}
            workspace={workspace.name}
          />
        ))
    );
  }

  render() {
    const { styles, data } = this.props;

    if (this.props.data.isFetching || !this.props.data.user.workspaces) {
      return (
        <div {...css(styles.centered)}>
          <Loader fillColor="dawn" size="large" />
        </div>
      );
    }

    const workspaces = data.user.workspaces.filter(
      workspace => workspace.presentations.length
    );

    if (workspaces.length <= 0) {
      return (
        <div {...css(styles.centered)}>
          <FlexContainer justify="center" align="center">
            <img {...css(styles.icon)} src={openBoxIcon} alt="Empty Box" />
            <Heading size="2">You don't have any sessions saved</Heading>
            <Paragraph>
              Why don't you get started right now? Let's host your ﬁrst session!
            </Paragraph>
            <ButtonLink to={`/dashboard/new`} appearance="primaryGradient">
              Host your first session!
            </ButtonLink>
          </FlexContainer>
        </div>
      );
    }

    return (
      <div {...css(styles.sessions)}>
        {this.state.showModal ? (
          <Modal withAnimation withOverlay closeModal={this.closeModal}>
            <Heading size="3" appearance="white">
              {this.state.session.name}
            </Heading>
            <Paragraph appearance="white">What do you want to do?</Paragraph>
            <FlexContainer direction="row">
              {this.state.session.hasEnded ? (
                <ButtonLink
                  to={`/summary/${this.state.session.sessionId}`}
                  appearance="secondary"
                  onClick={this.toggleModal}
                >
                  Go to summary
                </ButtonLink>
              ) : (
                <ButtonLink
                  to={`/host/${this.state.session.sessionId}`}
                  appearance="success"
                  onClick={this.toggleModal}
                >
                  Go to lobby
                </ButtonLink>
              )}

              <Button appearance="danger" onClick={this.handleDelete}>
                Delete
              </Button>
            </FlexContainer>
          </Modal>
        ) : (
          " "
        )}
        <Heading size="5" appearance="darkMetal">
          In progress
        </Heading>
        <span {...css(styles.divider)} />
        <FlexContainer
          align="start"
          justify="start"
          direction="row"
          style={{ flexWrap: "wrap", marginBottom: "40px" }}
        >
          {this.renderSessions(this.props.data.user.workspaces, false)}
        </FlexContainer>
        <Heading size="5" appearance="darkMetal">
          Completed
        </Heading>
        <span {...css(styles.divider)} />
        <FlexContainer
          align="start"
          justify="start"
          direction="row"
          style={{ flexWrap: "wrap", marginBottom: "40px" }}
        >
          {this.renderSessions(this.props.data.user.workspaces, true)}
        </FlexContainer>
      </div>
    );
  }
}

export default withStyles(({ themes, colors }) => {
  return {
    centered: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    sessions: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "12px 0px",
      margin: "0px 12px"
    },
    icon: {
      width: "128px",
      marginBottom: "48px"
    },
    closeModal: themes.danger,
    divider: {
      display: "block",
      width: "100%",
      height: "2px",
      backgroundColor: colors.aluminum
    }
  };
})(Sessions);
