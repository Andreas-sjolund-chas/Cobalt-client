import React, { Component } from "react";
import { css, withStyles } from "../../withStyles";
import { connect } from "react-redux";

import FlexContainer from "../../Containers/FlexContainer";
import Heading from "../../Elements/Heading";
import Paragraph from "../../Elements/Paragraph";
import Button from "../../Elements/Button";
import Card from "../../Elements/Card";
import Modal from "../../Components/Modal";
import Icon from "../../Elements/Icon";
import Input from "../../Elements/Input";
import Overview from "./Workspaces/Overview";
import Members from "./Workspaces/Members";
import Presentations from "./Workspaces/Presentations";
import {
  addNewWorkspaceMember,
  removeMemberFromWorkspace,
  requestMembers
} from "../../redux/workspace/actions";

const mapDispatchToProps = dispatch => {
  return {
    addNewWorkspaceMember: data => dispatch(addNewWorkspaceMember(data)),
    removeMemberFromWorkspace: data =>
      dispatch(removeMemberFromWorkspace(data)),
    requestMembers: data => dispatch(requestMembers(data))
  };
};

class Workspaces extends Component {
  constructor({ styles, ...props }) {
    super(...props);
    this.styles = styles;
    this.state = {
      modalShowing: false,
      newWorkspaceModal: false,
      workspaceModal: false,
      currentPage: 1,
      selectedWorkspaceId: undefined
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handleAddMemberSubmit = this.handleAddMemberSubmit.bind(this);
    this.fetchMembers = this.fetchMembers.bind(this);
    this.handleRemoveMember = this.handleRemoveMember.bind(this);
  }

  fetchMembers(workspaceId) {
    this.props.requestMembers(workspaceId);
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let workspaceName = formData.get("workspaceName");
    console.log(workspaceName);
    // this.props.addNewWorkspace(workspaceName);
    // Create the new workspace here
  }

  handleAddMemberSubmit(data) {
    console.log(data);
    // this.props.addNewWorkspaceMember(data);
    // Add the member to the workspace here
    this.props.addNewWorkspaceMember(data);
  }

  handleRemoveMember(userId, workspaceId) {
    // Remove the user from the workspace here
    this.props.removeMemberFromWorkspace({
      userId: userId,
      workspaceId: workspaceId
    });
  }

  openModal = (e, workspace = null, i) => {
    e.currentTarget.tagName === "BUTTON"
      ? this.setState({
          modalShowing: true,
          newWorkspaceModal: true
        })
      : this.setState({
          modalShowing: true,
          workspaceModal: true,
          // workspace: { [i]: workspace },
          selectedWorkspaceId: i
        });
  };

  closeModal = e => {
    if (e) {
      this.setState({
        modalShowing: false,
        newWorkspaceModal: false,
        workspaceModal: false
      });
    }
  };

  changePage(num) {
    this.setState({
      ...this.state,
      currentPage: num
    });
  }

  render() {
    return (
      <div {...css(this.styles.workspaces)}>
        {this.state.modalShowing ? (
          <Modal
            withOverlay
            withAnimation
            appearance="white"
            closeModal={this.closeModal}
          >
            <Icon
              icon="fas fa-times"
              fillColor="white"
              onClick={e => this.closeModal(e)}
              style={{
                borderRadius: "4px",
                width: "25px",
                height: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                alignSelf: "flex-end",
                position: "absolute",
                top: "20px",
                right: "20px"
              }}
              {...css(this.props.styles.closeModal)}
            />
            {this.state.newWorkspaceModal ? (
              <div>
                <Heading size="2">Create new workspace</Heading>
                <form
                  {...css(this.styles.addWorkspace)}
                  onSubmit={e => this.handleSubmit(e)}
                >
                  <Input
                    name="workspaceName"
                    style={{ margin: "20px 0 0 0 " }}
                    placeholder="Give your new workspace a name..."
                  />
                  <Button>Submit</Button>
                </form>
              </div>
            ) : (
              <FlexContainer appearance="white" style={{ minWidth: "500px" }}>
                <FlexContainer
                  style={{ borderBottom: "1px solid black" }}
                  direction="row"
                  fullWidth="1"
                  justify="center"
                >
                  <div
                    {...css(
                      this.state.currentPage == 0
                        ? this.styles.buttonActive
                        : this.styles.buttonInactive
                    )}
                    style={{
                      position: "relative",
                      display: "flex",
                      flex: "1",
                      height: "70px"
                    }}
                  >
                    <Button onClick={() => this.changePage(0)}>Overview</Button>
                  </div>
                  <div
                    {...css(
                      this.state.currentPage == 1
                        ? this.styles.buttonActive
                        : this.styles.buttonInactive
                    )}
                    style={{
                      position: "relative",
                      display: "flex",
                      flex: "1",
                      height: "70px"
                    }}
                  >
                    <Button onClick={() => this.changePage(1)}>Members</Button>
                  </div>
                  <div
                    {...css(
                      this.state.currentPage == 2
                        ? this.styles.buttonActive
                        : this.styles.buttonInactive
                    )}
                    style={{
                      position: "relative",
                      display: "flex",
                      flex: "1",
                      height: "70px"
                    }}
                  >
                    <Button onClick={() => this.changePage(2)}>
                      Presentations
                    </Button>
                  </div>
                </FlexContainer>
                <FlexContainer fullWidth="1">
                  {this.state.currentPage === 0 ? (
                    <Overview
                      data={
                        this.props.workspaces.workspaces[
                          this.state.selectedWorkspaceId
                        ]
                      }
                      owner={this.props.data.name}
                    />
                  ) : (
                    ""
                  )}
                  {this.state.currentPage === 1 ? (
                    <Members
                      handleRemoveMember={this.handleRemoveMember}
                      handleSubmit={this.handleAddMemberSubmit}
                      data={
                        this.props.workspaces.workspaces[
                          this.state.selectedWorkspaceId
                        ]
                      }
                      owner={this.props.data.name}
                      workspace={
                        this.props.workspaces.workspaces[
                          this.state.selectedWorkspaceId
                        ]
                      }
                    />
                  ) : (
                    ""
                  )}
                  {this.state.currentPage === 2 ? (
                    <Presentations
                      data={
                        this.props.workspaces.workspaces[
                          this.state.selectedWorkspaceId
                        ]
                      }
                    />
                  ) : (
                    ""
                  )}
                </FlexContainer>
              </FlexContainer>
            )}
          </Modal>
        ) : (
          ""
        )}
        <Button onClick={e => this.openModal(e)} style={{ margin: "20px" }}>
          Add new workspace
        </Button>
        <FlexContainer
          align="start"
          justify="start"
          direction="row"
          style={{ flexWrap: "wrap" }}
        >
          {this.props.workspaces.workspaces.map((workspace, i) => {
            return (
              <div
                key={i}
                onClick={e => this.openModal(e, workspace, i)}
                {...css(this.styles.workspace)}
              >
                <Card
                  appearance="white"
                  onClick={() => this.fetchMembers(workspace._id)}
                >
                  <Heading size="2">{workspace.name}</Heading>
                  <Paragraph size="sub">
                    Plan: {workspace.subscription.type}
                  </Paragraph>
                  <Paragraph size="sub">
                    Members: {workspace.members.length}
                  </Paragraph>
                  <Paragraph size="sub">
                    Presentations held in this workspace:{" "}
                    {workspace.presentations.length}
                  </Paragraph>
                </Card>
              </div>
            );
          })}
        </FlexContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    workspaces: state.workspace
  };
};

Workspaces = connect(mapStateToProps, mapDispatchToProps)(Workspaces);

export default withStyles(({ themes, colors }) => {
  return {
    centered: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    workspaces: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      margin: "0px 12px"
    },
    workspace: {
      margin: "20px",
      minWidth: "500px",
      transition: "transform 300ms ease",
      ":hover": {
        transform: "translateY(-8px)"
      }
    },
    workspaceModal: {
      minWidth: "500px",
      backgroundColor: "#FFF"
    },
    closeModal: themes.danger,
    addWorkspace: {
      width: "500px",
      display: "flex",
      flexDirection: "column"
    },
    buttonInactive: {
      ":nth-child(1n) button": {
        backgroundColor: colors.primary,
        color: "white",
        position: "absolute",
        animation: "btnUp 300ms ease"
      }
    },
    buttonActive: {
      ":nth-child(1n) button": {
        backgroundColor: "#FFF",
        border: "1px solid black",
        color: "black",
        position: "absolute",
        top: "14px",
        borderBottom: "0",
        borderRadius: "4px 4px 0 0",
        animation: "btnDown 300ms ease"
      }
    }
  };
})(Workspaces);
