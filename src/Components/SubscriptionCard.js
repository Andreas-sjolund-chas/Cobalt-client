import React from "react";
import { css, withStyles } from "../withStyles";
import Heading from "../Elements/Heading";
import Paragraph from "../Elements/Paragraph";
import Button from "../Elements/Button";
import List from "../Elements/List";
import ListItem from "../Elements/ListItem";
import ListItemWithIcon from "../Elements/ListItemWithIcon";
import Icon from "../Elements/Icon";
import Card from "../Elements/Card";
import FlexContainer from "../Containers/FlexContainer";

const SubscriptionCard = ({ styles, ...props }) => {
  return (
    <FlexContainer direction="row">
      {props.SubscriptionCards.map(card => {
        return (
          <Card
            style={{
              borderRadius: "4px",
              width: "350px",
              transform:
                props.cardActive === card._id ? `scale(1.1)` : `scale(1)`,
              zIndex: props.cardActive === card._id ? `99` : `0`
            }}
            appearance={
              props.cardActive === card._id
                ? "primaryBackground"
                : "secondaryBackground"
            }
            shadow="shadow"
          >
            <Heading appearance="primary" size="5">
              {card.title.toUpperCase()}
            </Heading>
            <FlexContainer align="center">
              <Icon
                appearance="primary"
                icon={card.icon}
                size="large"
                style={{ margin: "30px", fontSize: "5rem" }}
              />
              <Heading size="3" appearance="primary" style={{ padding: "5px" }}>
                $ {card.price} / month
              </Heading>
              <FlexContainer align="center">
                <Icon
                  appearance="primary"
                  icon={card.icon}
                  size="large"
                  style={{ margin: "30px", fontSize: "5rem" }}
                />
                <Heading
                  size="3"
                  appearance="primary"
                  style={{ padding: "5px" }}
                >
                  $ {card.price} / month
                </Heading>
              </FlexContainer>

              <List>
                {card.sellingPoints.map(sellingPoint => {
                  return (
                    <ListItemWithIcon
                      style={{
                        marginBottom: "10px"
                      }}
                      icon={
                        sellingPoint.allowed ? "fas fa-check" : "fas fa-times"
                      }
                      iconPosition="right"
                    >
                      {sellingPoint.title}
                    </ListItemWithIcon>
                  );
                })}
              </List>
            </FlexContainer>
          </Card>
        );
      })}
    </FlexContainer>
  );
};

export default withStyles(({ themes, text }) => {
  return {
    subscriptionCard: {}
  };
})(SubscriptionCard);
