import React from "react";
import { withStyles } from "../withStyles";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Wizard from "../Components/Wizard";
import Preferences from "../Components/CreateSession/Preferences";
import Name from "../Components/CreateSession/Name";
import Modal from "../Components/Modal";
import ButtonLink from "../Elements/ButtonLink";
import { requestNewSession, sessionCreated } from "../redux/session/actions";

import SessionStarted from "../Components/CreateSession/SessionStarted";

const mapDispatchToProps = dispatch => {
  return {
    requestNewSession: data => dispatch(requestNewSession(data)),
    sessionCreated: () => dispatch(sessionCreated())
  };
};

const mapStateToProps = ({
  session: { isFetching, newSessionCreated, session, message },
  workspace: { workspaces }
}) => ({
  isFetching,
  newSessionCreated,
  session,
  message,
  workspaces
});

class CreateSession extends React.Component {
  constructor({ styles, handleSubmit = null, ...props }) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.closeModal = this.closeModal.bind(this);

    this.state = {
      isModalHidden: false
    };
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      workspaces: this.props.workspaces
    });
  }

  handleSubmit(data) {
    const dataObj = {
      name: data.get("name"),
      maxAttendees: data.get("maxAttendees"),
      threshold: data.get("threshold"),
      descriptionPositive: data.get("descriptionPositive"),
      descriptionNegative: data.get("descriptionNegative"),
      message: data.get("message"),
      comments: data.get("comments"),
      isAverage: data.get("isAverage"),
      workspace: data.get("workspace")
    };

    this.props.requestNewSession(dataObj);
  }

  componentWillUnmount() {
    this.props.sessionCreated();
  }

  closeModal(e, shouldClose) {
    this.setState({
      isModalHidden: shouldClose
    });
  }

  render() {
    const { isFetching, newSessionCreated, session, workspaces } = this.props;

    {
      return !this.state.isModalHidden ? (
        newSessionCreated ? (
          <Modal closeModal={this.closeModal} withOverlay>
            <SessionStarted sessionId={session.sessionId} />
            <ButtonLink
              to={"/host/" + session.sessionId}
              appearance="secondary"
            >
              GO TO PRESENTATION LOBBY
            </ButtonLink>
          </Modal>
        ) : (
          <Wizard handleSubmit={this.handleSubmit} isLoading={isFetching}>
            <Name workspace={this.state.workspaces} />
            <Preferences />
          </Wizard>
        )
      ) : (
        <Redirect to="/dashboard" />
      );
    }
  }
}

CreateSession = connect(mapStateToProps, mapDispatchToProps)(CreateSession);

export default withStyles(({ colors }) => {
  return {
    createSession: {}
  };
})(CreateSession);
