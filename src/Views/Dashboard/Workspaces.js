import React, { Component } from "react";
import { css, withStyles } from "../../withStyles";

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
import { addMemberToWorkspace } from "../../redux/workspace/actions";

const mockWorkspaces = [
  {
    _id: "1",
    name: "Personal",
    plan: "Personal",
    owner: "Workspace Owner",
    billing: {
      price: "FREE",
      features: [
        { title: "1-50 attendees per session", allowed: true },
        { title: "Customizable themes", allowed: true },
        { title: "Up to 25 saved sessions", allowed: true },
        { title: "Exclusive graphs", allowed: false },
        { title: "Fancy stuff", allowed: false }
      ]
    },
    members: [
      {
        _id: "5aec6579023b093b3d66db73",
        email: "some@email.com",
        name: "Super presenter name",
        type: "viewer"
      },
      {
        _id: "2139772398713827",
        email: "some@email.com",
        name: "Super presenter name",
        type: "viewer"
      },
      {
        _id: "2813738291832190",
        email: "some@email.com",
        name: "Super presenter name",
        type: "viewer"
      },
      {
        _id: "1273632972819832817",
        email: "some@email.com",
        name: "Super presenter name",
        type: "viewer"
      },
      {
        _id: "212893291728317320",
        email: "some@email.com",
        name: "Super presenter name",
        type: "viewer"
      }
    ],
    presentations: [
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description:
          "Some fancy presentation description here that might or not be super duper duper long so that we can see what happens if the text is really really really long",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      }
    ]
  },
  {
    _id: "2",
    name: "Chas Academy",
    plan: "Custom",
    owner: "Axel Olsson",
    billing: {
      price: "$29.99",
      features: [
        { title: "Unlimited attendees per session", allowed: true },
        { title: "Customizable themes", allowed: true },
        { title: "Unlimited saved sessions", allowed: true },
        { title: "Exclusive graphs", allowed: true },
        { title: "Fancy stuff", allowed: true }
      ]
    },
    members: [
      {
        _id: "5aec6579023b093b3d66db73",
        email: "joakim@unge.com",
        name: "Joakim Unge"
      },
      {
        _id: "2139772398713827",
        email: "robert@jarske.eriksson.com",
        name: "Robert Jarske Eriksson"
      },
      {
        _id: "2813738291832190",
        email: "Victor@ciavarella.com",
        name: "Victor Ciavarella"
      },
      {
        _id: "1273632972819832817",
        email: "tom@ekander.com",
        name: "Tom Ekander"
      },
      {
        _id: "212893291728317320",
        email: "some@email.com",
        name: "Super presenter name"
      }
    ],
    presentations: [
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description:
          "Some fancy presentation description here that might or not be super duper duper long so that we can see what happens if the text is really really really long",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      }
    ]
  },
  {
    _id: "3",
    name: "Super awesome company",
    plan: "Enterprise",
    owner: "Workspace Owner",
    billing: {
      price: "$99.99",
      features: [
        { title: "51-150 attendees per session", allowed: true },
        { title: "Customizable themes", allowed: true },
        { title: "Unlimited saved sessions", allowed: true },
        { title: "Exclusive graphs", allowed: true },
        { title: "Fancy stuff", allowed: false }
      ]
    },
    members: [
      {
        _id: "5aec6579023b093b3d66db73",
        email: "some@email.com",
        name: "Super presenter name",
        type: "viewer"
      },
      {
        _id: "2139772398713827",
        email: "some@email.com",
        name: "Super presenter name",
        type: "viewer"
      },
      {
        _id: "2813738291832190",
        email: "some@email.com",
        name: "Super presenter name",
        type: "viewer"
      },
      {
        _id: "1273632972819832817",
        email: "some@email.com",
        name: "Super presenter name",
        type: "viewer"
      },
      {
        _id: "212893291728317320",
        email: "some@email.com",
        name: "Super presenter name",
        type: "viewer"
      }
    ],
    presentations: [
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description:
          "Some fancy presentation description here that might or not be super duper duper long so that we can see what happens if the text is really really really long",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      },
      {
        date: "2018-05-10 16:00",
        sessionId: Math.floor(Math.random() * Math.floor(100)),
        name: "Some fancy presentation name here",
        description: "Some fancy presentation description here",
        attendees: Math.floor(Math.random() * Math.floor(1000))
      }
    ]
  }
];

// const mapStateToProps = state => ({
//   workspaces: state.workspaces
// });

// const mapDispatchToProps = dispatch => {
//   return {
//     addNewWorkspace: workspace => dispatch(addNewWorkspace(workspace)),
//     addNewWorkspaceMember: data => dispatch(addNewWorkspaceMember(data)),
//     removeWorkspaceMember: data => dispatch(removeWorkspaceMember(data))
//   };
// };
class Workspaces extends Component {
  constructor({ styles, ...props }) {
    super(...props);
    this.styles = styles;
    this.state = {
      modalShowing: false,
      newWorkspaceModal: false,
      workspaceModal: false,
      currentPage: 0
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handleAddMemberSubmit = this.handleAddMemberSubmit.bind(this);
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
  }

  handleRemoveUser(userId, workspaceId) {
    // Remove the user from the workspace here
    console.log("user id:", userId);
    console.log("workspace id:", workspaceId);
    const data = {
      userId: userId,
      workspaceId: workspaceId
    };

    // this.props.removeWorkspaceMember(data);
  }

  openModal = (e, workspace = null) => {
    e.currentTarget.tagName === "BUTTON"
      ? this.setState({
          modalShowing: true,
          newWorkspaceModal: true
        })
      : this.setState({
          modalShowing: true,
          workspaceModal: true,
          workspace: workspace
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
                    <Overview data={this.state.workspace} />
                  ) : (
                    ""
                  )}
                  {this.state.currentPage === 1 ? (
                    <Members
                      handleRemoveUser={this.handleRemoveUser}
                      handleSubmit={this.handleAddMemberSubmit}
                      data={this.state.workspace}
                    />
                  ) : (
                    ""
                  )}
                  {this.state.currentPage === 2 ? (
                    <Presentations data={this.state.workspace} />
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
          {mockWorkspaces.map((workspace, i) => {
            return (
              <div
                key={i}
                onClick={e => this.openModal(e, workspace)}
                {...css(this.styles.workspace)}
              >
                <Card appearance="white">
                  <Heading size="2">{workspace.name}</Heading>
                  <Paragraph size="sub">Plan: {workspace.plan}</Paragraph>
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
