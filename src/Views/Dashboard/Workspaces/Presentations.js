import React from "react";
import { css, withStyles } from "../../../withStyles";
import FlexContainer from "../../../Containers/FlexContainer";
import Paragraph from "../../../Elements/Paragraph";
import List from "../../../Elements/List";
import ListItem from "../../../Elements/ListItem";
import Moment from "moment";

const Presentations = ({ styles, ...props }) => {
  return (
    <FlexContainer fullWidth="1">
      <div {...css(styles.presentationsInfo)}>
        <Paragraph size="sub">
          Total presentations held in this workspace:{" "}
          {props.data.presentations.length}
        </Paragraph>
      </div>
      <div {...css(styles.presentations)}>
        <Paragraph style={{ margin: "0" }} size="sub">
          Your latest presentations in this workspace:
        </Paragraph>
        <List style={{ width: "100%" }}>
          {props.data.presentations.slice(0, 5).map((p, i) => {
            return (
              <div {...css(styles.listItems)}>
                <ListItem key={i}>
                  <Paragraph size="sub">
                    {Moment(p.date).format("dddd, MMMM Do YYYY")}
                  </Paragraph>
                  <Paragraph size="sub">Name: {p.name}</Paragraph>
                  <Paragraph size="sub">Attendees: {p.attendees}</Paragraph>
                </ListItem>
              </div>
            );
          })}
        </List>
      </div>
    </FlexContainer>
  );
};

export default withStyles(({ themes, colors }) => {
  return {
    presentationsInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
      borderBottom: "1px solid black",
      padding: "20px"
    },
    presentations: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
      padding: "20px"
    },
    listItems: {
      width: "100%",
      borderBottom: "1px solid black",
      paddingBottom: "10px",
      ":nth-child(1n)": {
        marginTop: "20px"
      }
    }
  };
})(Presentations);
