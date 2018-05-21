import React from "react";
import { css, withStyles } from "../../withStyles";

import FlexContainer from "../../Containers/FlexContainer";
import Heading from "../../Elements/Heading";
import Paragraph from "../../Elements/Paragraph";
import Input from "../../Elements/Input";
import Checkbox from "../../Elements/Checkbox";

import { MobileContext } from "../../Containers/MobileContext";

const Preferences = ({ styles }) => (
  <MobileContext.Consumer>
    {({ isMobile }) => (
      <div {...css(styles.preferences)}>
        <FlexContainer align="start">
          <Heading appearance="primary" size="2">
            Preferences
          </Heading>
          <Paragraph size="normal">
            Here you can set some preferred settings for your session.
          </Paragraph>
          <Paragraph>
            Don't worry, you can change them before starting!
          </Paragraph>
          <FlexContainer
            direction="row"
            justify="between"
            fullWidth="1"
            wrap
            align="center"
            style={{ marginBottom: "20px" }}
          >
            <FlexContainer
              flex="1"
              align="start"
              style={{ marginBottom: "8px" }}
            >
              <Paragraph size="sub">Lobby message</Paragraph>
              <Input
                name="message"
                placeholder="Ex. Welcome to my lecture!"
                style={{ marginLeft: "0px", marginTop: "0px" }}
              />
            </FlexContainer>

            <FlexContainer
              flex="1"
              align="start"
              style={{
                marginBottom: "8px",
                marginLeft: !isMobile && "25px"
              }}
            >
              <Paragraph size="sub">Warning threshold</Paragraph>
              <Input
                name="threshold"
                placeholder="A number between 1-100"
                icon="fas fa-exclamation-triangle"
                iconFillColor="white"
                iconBackground="primary"
              />
            </FlexContainer>
          </FlexContainer>

          <FlexContainer
            direction="row"
            justify="between"
            fullWidth="1"
            align="center"
            wrap
          >
            <Paragraph style={{ flexBasis: "100%" }}>
              Engagement descriptions
            </Paragraph>
            <FlexContainer
              align="start"
              flex="1"
              style={{ marginBottom: "8px" }}
            >
              <Paragraph size="sub">Up</Paragraph>
              <Input
                name="descriptionPositive"
                placeholder="Are you able to follow..?"
                style={{
                  marginLeft: "0px",
                  minWidth: "130px",
                  marginTop: "0px"
                }}
              />
            </FlexContainer>
            <FlexContainer
              align="start"
              flex="1"
              style={{
                marginBottom: "8px",
                minWidth: "130px",
                marginLeft: !isMobile && "25px"
              }}
            >
              <Paragraph size="sub">Down</Paragraph>
              <Input
                name="descriptionNegative"
                placeholder="Are you not able to follow..?"
                style={{ marginLeft: "0px", marginTop: "0px" }}
              />
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      </div>
    )}
  </MobileContext.Consumer>
);

export default withStyles(() => {
  return {
    preferences: {
      ":nth-child(1n) div div input": {
        margin: "0px"
      },
      ":nth-child(1n) div div svg": {
        verticalAlign: "0px"
      },
      ":nth-child(1n) div div span": {
        padding: "13.5px"
      }
    }
  };
})(Preferences);
