import React from "react";
import { css, withStyles } from "../withStyles";
import { Link } from "react-router-dom";
import Media from "react-media";

import FlexContainer from "../Containers/FlexContainer";
import ButtonLink from "../Elements/ButtonLink";
import List from "../Elements/List";
import ListItem from "../Elements/ListItem";
import Heading from "../Elements/Heading";
import Icon from "../Elements/Icon";
import Paragraph from "../Elements/Paragraph";

const Header = ({ styles, ...props }) => (
  <header {...css(styles.header)}>
    <Media query={{ minHeight: 400 }}>
      <FlexContainer direction="row" justify="between">
        <FlexContainer direction="row" justify="start" flex="1">
          <Link to="/">
            <Heading {...css(styles.logo)} size="2">
              Feed<span>.io</span>
            </Heading>
          </Link>
        </FlexContainer>

        <Media query={{ maxWidth: 768 }}>
          {matches =>
            matches ? (
              ""
            ) : (
              <FlexContainer direction="row" justify="end" flex="1">
                <List direction="row">
                  <ListItem>
                    <Link to="about">About</Link>
                  </ListItem>
                  <ListItem>
                    <Link to="tour">Tour</Link>
                  </ListItem>
                  <ListItem>
                    <Link to="pricing">Pricing</Link>
                  </ListItem>
                  <ListItem>
                    <Link to="contact">Contact</Link>
                  </ListItem>
                </List>
              </FlexContainer>
            )
          }
        </Media>

        {props.isAuthenticated != true ? (
          <Media query={{ maxWidth: 480 }}>
            {matches => (
              <FlexContainer direction="row">
                <ButtonLink
                  to="login"
                  size={matches ? "small" : "medium"}
                  appearance="secondary"
                >
                  LOG IN
                </ButtonLink>
                <ButtonLink
                  to="signup"
                  size={matches ? "small" : "medium"}
                  appearance="primary"
                  style={matches ? { marginRight: 0 } : {}}
                >
                  SIGN UP
                </ButtonLink>
              </FlexContainer>
            )}
          </Media>
        ) : (
          <FlexContainer direction="row">
            <Media query={{ maxWidth: 480 }}>
              {matches =>
                matches ? (
                  <Link to="dashboard">
                    <FlexContainer direction="row" align="center">
                      <Paragraph appearance="white" style={{ margin: 0 }}>
                        Dashboard
                      </Paragraph>
                      <Icon size="large" icon="fas fa-columns" />
                    </FlexContainer>
                  </Link>
                ) : (
                  <ButtonLink to="dashboard" appearance="secondary">
                    Dashboard
                  </ButtonLink>
                )
              }
            </Media>
          </FlexContainer>
        )}
      </FlexContainer>
    </Media>
  </header>
);

export default withStyles(({ themes, colors }) => {
  return {
    header: {
      padding: "20px",
      width: "100%",
      position: "absolute",
      zIndex: 999,
      background: "transparent",
      ":nth-child(1n) a": {
        color: "#FFF",
        fontSize: "12px",
        fontWeight: "600",
        ":hover": {
          color: colors.dawn
        }
      }
    },
    logo: {
      color: "#FFF",
      marginBottom: "0px",
      ":nth-child(1n) span": {
        color: colors.danger
      }
    }
  };
})(Header);
