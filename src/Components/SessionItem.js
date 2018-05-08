import React from "react";
import { css, withStyles } from "../withStyles";
import moment from "moment";

import Icon from "../Elements/Icon";
import Card from "../Elements/Card";
import Heading from "../Elements/Heading";
import Paragraph from "../Elements/Paragraph";
import Badge from "../Elements/Badge";
import FlexContainer from "../Containers/FlexContainer";

const stripStringLength = string => string.slice(0, 80) + "...";

const SessionItem = ({ styles, ...props }) => {
  return (
    <div {...css(styles, styles.sessionItem)} onClick={props.toggleModal}>
      <FlexContainer
        fullWidth="1"
        direction="row"
        justify="center"
        style={{ flexWrap: "wrap" }}
      >
        <Card
          appearance="white"
          style={{ margin: "12px 12px 0px 0px", width: "400px" }}
        >
          <FlexContainer
            fullWidth="1"
            direction="row"
            justify="between"
            align="start"
          >
            <Paragraph size="sub">{props.workspace}</Paragraph>
          </FlexContainer>
          <FlexContainer
            direction="row"
            justify="between"
            align="start"
            style={{ marginBottom: "50px" }}
          >
            <Paragraph size="sub">
              {moment(props.data.date).format("dddd, MMMM Do YYYY")}
            </Paragraph>
            <Paragraph size="sub">Attendees: {props.data.attendees}</Paragraph>
          </FlexContainer>
          <FlexContainer align="start">
            <Heading size="3" appearance="default">
              {props.data.name}
            </Heading>{" "}
            {props.data.hasEnded ? (
              <Badge appearance="danger">
                <Paragraph size="sub" appearance="danger">
                  {" "}
                  This session has ended{" "}
                </Paragraph>
              </Badge>
            ) : (
              <Badge appearance="success">
                <Paragraph size="sub" appearance="success">
                  {" "}
                  Ready to go!{" "}
                </Paragraph>
              </Badge>
            )}
          </FlexContainer>
        </Card>
      </FlexContainer>
    </div>
  );
};

export default withStyles(({ themes, colors }) => {
  return {
    sessionItem: {
      cursor: "pointer",
      transition: "all 0.3s ease",
      ":hover": {
        transform: "translateY(-8px)"
      }
    },
    icon: {
      display: "block",
      position: "absolute",
      top: "8px",
      right: "8px"
    },
    badge: {
      display: "inline-block",
      border: `1px solid ${colors.danger}`,
      borderRadius: "2px",
      background: "transparent",
      padding: "4px"
    },

    primary: colors.primary,
    danger: colors.danger,
    success: colors.success
  };
})(SessionItem);
