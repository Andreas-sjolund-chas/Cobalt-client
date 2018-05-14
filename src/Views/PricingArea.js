import React, { Component } from "react";
import { css, withStyles } from "../withStyles";
import SubscriptionCard from "../Components/SubscriptionCard";

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
    title: "Custom",
    icon: "fas fa-boxes",
    price: "99.99",
    sellingPoints: [
      { title: "Unlimited attendees per session", allowed: true },
      { title: "Customizable themes", allowed: true },
      { title: "Unlimited saved sessions", allowed: true },
      { title: "Exclusive graphs", allowed: true },
      { title: "Fancy stuff", allowed: true }
    ]
  },
  {
    _id: "3",
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
  }
];

class PricingArea extends Component {
  constructor({ styles, ...props }) {
    super(props);
    this.styles = styles;
    this.state = {
      cardActive: "2"
    };
  }

  render() {
    return (
      <div {...css(this.styles.content)}>
        <SubscriptionCard
          SubscriptionCards={mockSubscriptionCards}
          cardActive={this.state.cardActive}
        />
        <div {...css(this.styles.background)} />
      </div>
    );
  }
}

export default withStyles(({ gradients, colors }) => {
  return {
    background: {
      display: "flex",
      height: "100%",
      width: "100%",
      position: "absolute",
      zIndex: "-99",
      background: gradients.carbon
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "0",
      left: "0",
      height: "100%",
      width: "100%"
    }
  };
})(PricingArea);
