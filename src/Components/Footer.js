import React from "react";
import { css, withStyles } from "../withStyles";
import { Link } from "react-router-dom";
import Media from "react-media";

import FlexContainer from "../Containers/FlexContainer";
import List from "../Elements/List";
import ListItem from "../Elements/ListItem";

const Footer = ({ size = "medium", styles, ...props }) => (
  <footer {...css(styles.footer, styles[size])} {...props}>
    <Media query={{ minHeight: 300 }}>
      <List direction="row">
        <ListItem>
          <Link to="about">About</Link>
        </ListItem>
        <ListItem>
          <Link to="press">Press</Link>
        </ListItem>
        <ListItem>
          <Link to="developers">Developers</Link>
        </ListItem>
        <ListItem>
          <Link to="channels">Channels</Link>
        </ListItem>
      </List>
    </Media>
  </footer>
);

export default withStyles(({ themes, text }) => {
  return {
    footer: {
      padding: "20px",
      color: "#FFF",
      zIndex: "99",
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      ":nth-child(1n) a": {
        fontSize: "10px"
      },
      ":nth-child(1n) ul": {
        maxWidth: "400px",
        width: "100%",
        justifyContent: "space-between",
        margin: 0
      },
      ":nth-child(1n) li:last-child": {
        margin: "0px"
      }
    }
  };
})(Footer);
