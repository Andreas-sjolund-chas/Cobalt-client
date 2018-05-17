import React from "react";
import { css, withStyles } from "../withStyles";
import balloon from "../assets/balloon.svg";

class Balloon extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.handleDelete(this.props.id);
  }

  render() {
    const { styles, pos } = this.props;

    return (
      <span
        onAnimationEnd={this.handleDelete}
        {...css(styles.balloon)}
        style={pos}
      >
        <img src={balloon} width="92px" />
      </span>
    );
  }
}

export default withStyles(({ colors }) => {
  return {
    balloon: {
      position: "absolute",
      transition: "margin 3s ease",
      animation: "balloonRise 5s linear forwards"
    }
  };
})(Balloon);
