import React from "react";
import { css, withStyles } from "../../../withStyles";
import FlexContainer from "../../../Containers/FlexContainer";
import Heading from "../../../Elements/Heading";
import List from "../../../Elements/List";
import ListItem from "../../../Elements/ListItem";
import Paragraph from "../../../Elements/Paragraph";
import Icon from "../../../Elements/Icon";

const Members = ({ data, styles, ...props }) => {
  console.log(data);

  return (
    <div {...css(styles.members)}>
      <List {...css(styles.list)}>
        <ListItem>
          {data.owner} <span {...css(styles.owner)}>OWNER</span>
        </ListItem>
        {data.members.map(member => {
          return (
            <ListItem {...css(styles.listItem)}>
              <FlexContainer direction="row" align="center" justify="between">
                <Paragraph size="sub" style={{ marginBottom: "0px" }}>
                  {member.name} - {member.email}
                </Paragraph>
                <Icon icon="fas fa-times" fillColor="danger" />
              </FlexContainer>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default withStyles(({ themes, colors, rounded }) => {
  return {
    members: {
      borderColor: colors.nightsky,
      padding: "20px",
      width: "100%"
    },
    owner: {
      padding: "4px 7px 4px 7px",
      borderRadius: "4px",
      backgroundColor: colors.darkMetal,
      marginLeft: "10px",
      color: "white"
    },
    list: {
      maxWidth: "300px"
    },
    listItem: {
      marginTop: "10px"
    }
  };
})(Members);
