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

const mockWorkspaces = [
  {
    _id: "1",
    name: "Personal",
    workspaceType: "Personal",
    members: ["5aec6579023b093b3d66db73"],
    presentations: [
      { id: "4" },
      { id: "4" },
      { id: "4" },
      { id: "4" },
      { id: "4" }
    ],
    features: [
      { title: "1-50 attendees per session", allowed: true },
      { title: "Customizable themes", allowed: true },
      { title: "Up to 25 saved sessions", allowed: true }
    ]
  },
  {
    _id: "2",
    name: "Custom named workspace",
    workspaceType: "Custom",
    members: [
      "5aec6579023b093b3d66db73",
      "5252525",
      "2662626",
      "2387342897243897432"
    ],
    presentations: [
      { id: "4" },
      { id: "4" },
      { id: "4" },
      { id: "4" },
      { id: "4" },
      { id: "4" },
      { id: "4" },
      { id: "4" }
    ],
    features: [
      { title: "Unlimited attendees per session", allowed: true },
      { title: "Customizable themes", allowed: true },
      { title: "Unlimited saved sessions", allowed: true },
      { title: "Exclusive graphs", allowed: true },
      { title: "Fancy stuff", allowed: true }
    ]
  },
  {
    _id: "3",
    name: "Super awesome company",
    workspaceType: "Enterprise",
    members: [
      "5aec6579023b093b3d66db73",
      "2139772398713827",
      "2813738291832190",
      "1273632972819832817",
      "212893291728317320"
    ],
    presentations: [
      { id: "4" },
      { id: "4" },
      { id: "4" },
      { id: "4" },
      { id: "4" },
      { id: "4" },
      { id: "4" }
    ],
    features: [
      { title: "51-150 attendees per session", allowed: true },
      { title: "Customizable themes", allowed: true },
      { title: "Unlimited saved sessions", allowed: true },
      { title: "Exclusive graphs", allowed: true }
    ]
  }
];

class Workspaces extends Component {
  constructor({ styles, ...props }) {
    super(props);
    this.styles = styles;
    this.state = {
      modalShowing: false,
      newWorkspaceModal: false,
      workspaceModal: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let entries = formData.entries();
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
    this.setState({
      modalShowing: false,
      newWorkspaceModal: false,
      workspaceModal: false
    });
  };

  render() {
    return (
      <div {...css(this.styles.workspaces)}>
        {this.state.modalShowing ? (
          <Modal withOverlay withAnimation>
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
                top: "8px"
              }}
              {...css(this.props.styles.closeModal)}
            />
            {this.state.newWorkspaceModal ? (
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
            ) : (
              <div {...css(this.styles.workspaceModal)}>
                <Card>
                  <Heading size="2">{this.state.workspace.name}</Heading>
                  <Paragraph size="sub">
                    Workspace Type: {this.state.workspace.workspaceType}
                  </Paragraph>
                  <Paragraph size="sub">
                    Members: {this.state.workspace.members.length}
                  </Paragraph>
                  <Paragraph size="sub">
                    Presentations held in this workspace:{" "}
                    {this.state.workspace.presentations.length}
                  </Paragraph>
                </Card>
              </div>
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
                  <Paragraph size="sub">
                    Workspace Type: {workspace.workspaceType}
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
      minWidth: "500px"
    },
    closeModal: themes.danger,
    addWorkspace: {
      width: "500px",
      display: "flex",
      flexDirection: "column"
    }
  };
})(Workspaces);

// '0.3 sec ease'
