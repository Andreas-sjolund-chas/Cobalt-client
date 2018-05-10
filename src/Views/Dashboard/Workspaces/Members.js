import React from "react";
import { css, withStyles } from "../../../withStyles";
import FlexContainer from "../../../Containers/FlexContainer";
import Heading from "../../../Elements/Heading";
import List from "../../../Elements/List";
import ListItem from "../../../Elements/ListItem";
import Paragraph from "../../../Elements/Paragraph";
import Icon from "../../../Elements/Icon";
import Button from "../../../Elements/Button";
import Input from "../../../Elements/Input";
import AddMember from "../../../Components/AddMember";

const Members = ({
  data,
  handleSubmit,
  handleRemoveUser,
  styles,
  ...props
}) => {
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
                -
                <Paragraph size="sub" style={{ marginBottom: "0px" }}>
                  {member.email}
                </Paragraph>
                <Icon
                  onClick={e => handleRemoveUser(member._id, data._id)}
                  icon="fas fa-times"
                  fillColor="danger"
                  size="medium"
                  style={{ cursor: "pointer" }}
                />
              </FlexContainer>
            </ListItem>
          );
        })}
      </List>
      <AddMember data={data} handleAddMemberSubmit={handleSubmit} />
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
      maxWidth: "400px"
    },
    listItem: {
      marginTop: "10px"
    }
  };
})(Members);
