import React from "react";
import { css, withStyles } from "../../../withStyles";
import FlexContainer from "../../../Containers/FlexContainer";
import Heading from "../../../Elements/Heading";
import Paragraph from "../../../Elements/Paragraph";
import List from "../../../Elements/List";
import ListItemWithIcon from "../../../Elements/ListItemWithIcon";

const Overview = ({ styles, ...props }) => {
  return (
    <FlexContainer fullWidth="1">
      <div {...css(styles.owner)}>
        <Paragraph size="sub">Owner: {props.data.owner}</Paragraph>
        <Paragraph size="sub">Plan: {props.data.plan}</Paragraph>
      </div>
      <div {...css(styles.billing)}>
        <Paragraph size="sub">Price: {props.data.billing.price}</Paragraph>
        <Paragraph style={{ margin: "0" }} size="sub">
          Your included features:
        </Paragraph>
        <List>
          {props.data.billing.features.map((f, i) => {
            return (
              <ListItemWithIcon
                key={i}
                iconPosition="right"
                iconFillColor="darkMetal"
                icon="fas fa-check"
              >
                <Paragraph size="sub">{f.title}</Paragraph>
              </ListItemWithIcon>
            );
          })}
        </List>
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
