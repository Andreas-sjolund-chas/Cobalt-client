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
import Loader from "../../../Elements/Loader";

const Members = ({
  data,
  owner,
  isFetching,
  workspace,
  handleSubmit,
  handleRemoveMember,
  styles,
  ...props
}) => {
  return !isFetching && data ? (
    <div {...css(styles.members)}>
      <List {...css(styles.list)}>
        {data.members.map(member => {
          return (
            <ListItem {...css(styles.listItem)}>
              <FlexContainer direction="row" align="center" justify="between">
                <Paragraph size="sub" style={{ marginBottom: "0px" }}>
                  {member.name}
                </Paragraph>
                -
                <Paragraph size="sub" style={{ marginBottom: "0px" }}>
                  {member.email}
                </Paragraph>
                {data.owner === member._id ? (
                  <span {...css(styles.owner)}>OWNER</span>
                ) : (
                  <Icon
                    onClick={e => handleRemoveMember(member._id, workspace._id)}
                    icon="fas fa-times"
                    fillColor="danger"
                    size="medium"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </FlexContainer>
            </ListItem>
          );
        })}
      </List>
      <AddMember data={data} handleAddMemberSubmit={handleSubmit} />
    </div>
  ) : (
    <div {...css(styles.loader)}>
      <Loader fillColor="carbon" size="large" />
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
    },
    loader: {
      marginTop: "100px",
      marginBottom: "100px"
    }
  };
})(Members);
