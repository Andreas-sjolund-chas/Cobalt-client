import React from "react";
import { withStyles, css } from "../withStyles";
import Card from "../Elements/Card";
import Heading from "../Elements/Heading";
import Paragraph from "../Elements/Paragraph";
import List from "../Elements/List";
import FlexContainer from "../Containers/FlexContainer";
import ListItemWithIcon from "../Elements/ListItemWithIcon";
import Button from "../Elements/Button";
import Modal from "../Components/Modal";

const mockCards = [
  {
    id: "1",
    name: "Business",
    price: "$49.99",
    features: [
      { title: "1-50 attendees per session", allowed: true },
      { title: "Customizable themes", allowed: true },
      { title: "Up to 25 saved sessions", allowed: true },
      { title: "Exclusive graphs", allowed: false },
      { title: "Fancy stuff", allowed: false }
    ]
  },
  {
    id: "2",
    name: "Custom",
    price: "$99.99",
    features: [
      { title: "Unlimited attendees per session", allowed: true },
      { title: "Customizable themes", allowed: true },
      { title: "Unlimited saved sessions", allowed: true },
      { title: "Exclusive graphs", allowed: true },
      { title: "Fancy stuff", allowed: true }
    ]
  },
  {
    id: "3",
    name: "Enterprise",
    price: "$79.99",
    features: [
      { title: "51-150 attendees per session", allowed: true },
      { title: "Customizable themes", allowed: true },
      { title: "Unlimited saved sessions", allowed: true },
      { title: "Exclusive graphs", allowed: true },
      { title: "Fancy stuff", allowed: false }
    ]
  }
];

class UpgradePlan extends React.Component {
  constructor({ styles, ...props }) {
    super(...props);
    this.styles = styles;
    this.state = {
      activeCard: {},
      workspaceName: "Some name"
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleClick(e, card) {
    this.setState(
      {
        activeCard: card
      },
      () => {
        console.log(this.state);
      }
    );
  }

  handleButtonClick() {
    console.log(this.state);
  }

  render() {
    return (
      <Modal withOverlay withAnimation appearance="white">
        <FlexContainer>
          <Heading size="2">Workspace name: {this.state.workspaceName}</Heading>
          <div {...css(this.styles.upgradePlan)}>
            {mockCards.map((card, i) => {
              return (
                <Card
                  onClick={e => this.handleClick(e, card)}
                  key={i}
                  appearance={
                    this.state.activeCard.id === card.id
                      ? "successBorder"
                      : "white"
                  }
                  style={
                    this.state.activeCard.id === card.id
                      ? {
                          transform: "translateY(-8px)"
                        }
                      : {}
                  }
                >
                  <Heading size="3">Plan: {card.name}</Heading>
                  <Paragraph>Price: {card.price}</Paragraph>
                  <List>
                    {card.features.map((feature, i) => {
                      return (
                        <ListItemWithIcon
                          key={i}
                          iconFillColor="carbon"
                          icon={
                            feature.allowed ? "fas fa-check" : "fas fa-times"
                          }
                        >
                          <Paragraph size="sub">{feature.title}</Paragraph>
                        </ListItemWithIcon>
                      );
                    })}
                  </List>
                </Card>
              );
            })}
          </div>
          <div {...css(this.styles.button)}>
            {this.state.activeCard.id ? (
              <Button
                appearance="success"
                onClick={() => this.handleButtonClick()}
              >
                Upgrade Plan
              </Button>
            ) : (
              <Button disabled onClick={() => this.handleButtonClick()}>
                Upgrade Plan
              </Button>
            )}
          </div>
        </FlexContainer>
      </Modal>
    );
  }
}

export default withStyles(({ colors }) => {
  return {
    upgradePlan: {
      display: "flex",
      ":nth-child(1n) div": {
        minWidth: "200px",
        margin: "10px",
        transition: "transform 300ms ease",
        ":hover": {
          transform: "translateY(-8px)",
          cursor: "pointer"
        }
      }
    },
    button: {
      ":nth-child(1n) button": {
        ":disabled": {
          cursor: "not-allowed",
          backgroundColor: colors.danger
        }
      }
    }
  };
})(UpgradePlan);
