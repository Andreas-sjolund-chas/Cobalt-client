import React from "react";
import { css, withStyles } from "../../../withStyles";
import FlexContainer from "../../../Containers/FlexContainer";

import Paragraph from "../../../Elements/Paragraph";

const Overview = ({ styles, ...props }) => {
  return (
    <FlexContainer fullWidth="1">
      <div {...css(styles.owner)}>
        <Paragraph size="normal">Workspace Name: {props.data.name}</Paragraph>
        <Paragraph size="sub">
          Owner:{" "}
          {props.data.members
            .filter(member => member._id === props.data.owner)
            .map(member => member.name)}
        </Paragraph>
        <Paragraph size="sub">Plan: {props.data.subscription.type}</Paragraph>
      </div>
      <div {...css(styles.billing)}>
        <Paragraph size="sub">Price: {props.data.subscription.price}</Paragraph>
      </div>
    </FlexContainer>
  );
};

export default withStyles(({ themes, colors }) => {
  return {
    owner: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
      borderBottom: "1px solid black",
      padding: "20px"
    },
    billing: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
      padding: "20px"
    }
  };
})(Overview);
