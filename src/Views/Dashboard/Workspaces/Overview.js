import React from "react";
import { css, withStyles } from "../../../withStyles";
import FlexContainer from "../../../Containers/FlexContainer";
import Heading from "../../../Elements/Heading";
import Paragraph from "../../../Elements/Paragraph";
import List from "../../../Elements/List";
import ListItemWithIcon from "../../../Elements/ListItemWithIcon";
import ButtonLink from "../../../Elements/ButtonLink";

const Overview = ({ styles, ...props }) => {
  console.log(props.data._id);
  return (
    <FlexContainer fullWidth="1">
      <div {...css(styles.owner)}>
        <Paragraph size="normal">Workspace Name: {props.data.name}</Paragraph>
        <Paragraph size="sub">
          Owner:{" "}
          {props.data.members.map(member => {
            if (props.data.owner === member._id) {
              return member.name;
            }
          })}
        </Paragraph>
        <Paragraph size="sub">Plan: {props.data.subscription.type}</Paragraph>
      </div>
      <div {...css(styles.billing)}>
        <Paragraph size="sub">Price: {props.data.subscription.price}</Paragraph>
        <Paragraph style={{ margin: "0" }} size="sub">
          Features:
        </Paragraph>
        {/*        <List>
          {props.data.billing.features.map((f, i) => {
            return (
              <ListItemWithIcon
                key={i}
                iconPosition="right"
                iconFillColor="darkMetal"
                icon={f.allowed ? "fas fa-check" : "fas fa-times"}
              >
                <Paragraph size="sub">{f.title}</Paragraph>
              </ListItemWithIcon>
            );
          })}
        </List> */}
      </div>
      {/*<ButtonLink to="/">Upgrade Plan</ButtonLink> Change me later*/}
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
