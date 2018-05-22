import React from "react";
import { css, withStyles } from "../../withStyles";
import moment from "moment";

class Timer extends React.Component {
  constructor({ styles, ...props }) {
    super(...props);
    this.styles = styles;
    this.displayTime = this.displayTime.bind(this);
    this.state = {
      time: "00:00"
    };
  }

  componentDidMount() {
    let timerId = setInterval(this.displayTime, 1000);
  }

  displayTime() {
    if (this.props.data.status.isPaused) return;
    if (this.props.data.status.time % 10 === 1) {
      this.props.requestSave(this.state.time);
    }
    let time =
      this.props.data.status.time >= 3600
        ? moment()
            .hour(0)
            .minute(0)
            .second(this.props.data.status.time)
            .format("h:mm:ss")
        : moment()
            .minute(0)
            .second(this.props.data.status.time)
            .format("mm:ss");
    this.setState({
      time: time
    });
  }

  render() {
    return (
      <div {...css(this.styles.timer)}>
        <span>{this.state.time}</span>
      </div>
    );
  }
}

export default withStyles(({ colors }) => {
  return {
    timer: {
      fontSize: "4.8rem",
      color: "white"
    }
  };
})(Timer);
