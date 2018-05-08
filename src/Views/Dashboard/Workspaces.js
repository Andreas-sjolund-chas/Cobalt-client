import React from "react";
import { css, withStyles } from "../../withStyles";
import FlexContainer from "../../Containers/FlexContainer";
import Heading from "../../Elements/Heading";
import Paragraph from "../../Elements/Paragraph";
import Button from "../../Elements/Button";
import Loader from "../../Elements/Loader";
import Card from "../../Elements/Card";

import openBoxIcon from "../../assets/open-box.svg";

const mockWorkspaces = [
  {
    _id: "1",
    name: "Personal",
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
    name: "Custom",
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
    name: "Enterprise",
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

const Workspaces = ({ styles, ...props }) => {
  console.log(props.data.workspaces);

  if (!props.data.workspaces) {
    return (
      <div {...css(styles.centered)}>
        <Loader fillColor="dawn" size="large" />
      </div>
    );
  }

  return (
    <div {...css(styles.workspaces)}>
      <FlexContainer
        align="start"
        justify="start"
        direction="row"
        style={{ flexWrap: "wrap" }}
      >
        {mockWorkspaces.map((workspace, i) => {
          return (
            <div {...css(styles.workspace)}>
              <Card key={i}>
                <Heading size="2">{workspace.name}</Heading>
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
};

export default withStyles(({ colors }) => {
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
      margin: "0px 12px"
    },
    workspace: {
      padding: "20px"
    },
    icon: {
      width: "128px",
      marginBottom: "48px"
    }
  };
})(Workspaces);
