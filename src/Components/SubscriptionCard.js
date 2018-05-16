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

const mockSubscriptionCards = [
  {
    _id: "1",
    title: "Personal",
    icon: "fas fa-briefcase",
    price: "9.99",
    sellingPoints: [
      { title: "1-50 attendees per session", allowed: true },
      { title: "Customizable themes", allowed: true },
      { title: "Up to 25 saved sessions", allowed: true },
      { title: "Exclusive graphs", allowed: false },
      { title: "Fancy stuff", allowed: false }
    ]
  },
  {
    _id: "2",
    title: "Enterprise",
    icon: "fas fa-building",
    price: "49.99",
    sellingPoints: [
      { title: "51-150 attendees per session", allowed: true },
      { title: "Customizable themes", allowed: true },
      { title: "Unlimited saved sessions", allowed: true },
      { title: "Exclusive graphs", allowed: true },
      { title: "Fancy stuff", allowed: false }
    ]
  },
  {
    _id: "3",
    title: "Advanced",
    icon: "fas fa-boxes",
    price: "99.99",
    sellingPoints: [
      { title: "Unlimited attendees per session", allowed: true },
      { title: "Customizable themes", allowed: true },
      { title: "Unlimited saved sessions", allowed: true },
      { title: "Exclusive graphs", allowed: true },
      { title: "Fancy stuff", allowed: true }
    ]
  }
];

class SubscriptionCard extends React.Component {
  constructor({ styles, ...props }) {
    super(props);
    this.state = {
      cardActive: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.setState({
      cardActive: id
    });
  }

  render() {
    return (
      <FlexContainer direction="row">
        {mockSubscriptionCards.map(card => {
          return (
            <Card
              onClick={() => this.handleClick(card._id)}
              style={{
                borderRadius: "4px",
                width: "350px",
                transform:
                  this.state.cardActive === card._id
                    ? `scale(1.1)`
                    : `scale(1)`,
                zIndex: this.state.cardActive === card._id ? `99` : `0`
              }}
              appearance={
                this.state.cardActive === card._id ? "primary" : "secondary"
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
            </Card>
          );
        })}
      </FlexContainer>
    );
  }
}

export default withStyles(({ themes, text }) => {
  return {
    subscriptionCard: {}
  };
})(SubscriptionCard);
