import React from "react";
import { css, withStyles } from "../../withStyles";

import FlexContainer from "../../Containers/FlexContainer";
import Heading from "../../Elements/Heading";
import Paragraph from "../../Elements/Paragraph";
import Input from "../../Elements/Input";
// import Checkbox from "../../Elements/Checkbox";

const Preferences = ({ styles }) => (
  <div {...css(styles.preferences)}>
    <FlexContainer align="start">
      <Heading appearance="primary" size="2">
        Preferences
      </Heading>
      <Paragraph size="normal">
        Here you can set some preferred settings for your session.
      </Paragraph>
      <Paragraph>Don't worry, you can change them before starting!</Paragraph>

      <FlexContainer
        direction="row"
        justify="between"
        style={{ width: "420px", marginBottom: "20px" }}
      >
        {/** Here is possible feature to implement in the future, setting max attendees  **/
        /*
        <FlexContainer align="start">
        <Paragraph size="sub">Max attendees</Paragraph>
        <Input
        type="number"
        name="maxAttendees"
        icon="fas fa-users"
        iconFillColor="white"
        iconBackground="primary"
        />
        </FlexContainer>
        */}

        <FlexContainer align="start">
          <Paragraph size="sub">Lobby message</Paragraph>
          <Input
            name="message"
            placeholder="Ex. Welcome to my lecture!"
            style={{ marginLeft: "0px", marginTop: "0px", width: "200px" }}
          />
        </FlexContainer>

        <FlexContainer align="start">
          <Paragraph size="sub">Warning threshold</Paragraph>
          <Input
            name="threshold"
            icon="fas fa-exclamation-triangle"
            iconFillColor="white"
            iconBackground="primary"
          />
        </FlexContainer>
      </FlexContainer>

      <FlexContainer
        direction="row"
        align="start"
        justify="between"
        style={{ width: "450px", marginBottom: "20px" }}
      >
        <FlexContainer justify="around" align="start">
          <Paragraph size="sub">Engagement descriptions</Paragraph>
          <FlexContainer
            direction="row"
            justify="between"
            style={{ width: "450px", marginBottom: "20px" }}
          >
            <Input
              name="descriptionPositive"
              placeholder="Are you able to follow..?"
              style={{ marginLeft: "0px", marginTop: "0px", width: "200px" }}
            />
            <Input
              name="descriptionNegative"
              placeholder="Are you not able to follow..?"
              style={{ marginLeft: "0px", marginTop: "0px", width: "200px" }}
            />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>

      {/** Here is possible feature to implement in the future,
       allowing comments and setting avarage as percentage **/
      /*
        <FlexContainer
        direction="row"
        justify="between"
        style={{ marginBottom: "20px", width: "450px", paddingRight: "18px" }}
        >
        <FlexContainer direction="row">
        <Checkbox name="comments" />
        <Paragraph size="sub">Allow comments</Paragraph>
        </FlexContainer>
        
        <FlexContainer direction="row">
        <Checkbox name="isAverage" />
        <Paragraph size="sub">Show average as percentage</Paragraph>
        </FlexContainer>
        </FlexContainer>
      */}
    </FlexContainer>
  </div>
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
