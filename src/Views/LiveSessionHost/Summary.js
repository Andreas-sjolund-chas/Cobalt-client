import React from "react";
import { css, withStyles } from "../../withStyles";

import CountUp from "react-countup";
import moment from "moment";

import FlexContainer from "../../Containers/FlexContainer";
import Heading from "../../Elements/Heading";
import Paragraph from "../../Elements/Paragraph";
import Button from "../../Elements/Button";
import SessionGraph from "../../Components/SessionGraph";
import ButtonLink from "../../Elements/ButtonLink";
import Card from "../../Elements/Card";
import CopyTextfield from "../../Elements/CopyTextfield";

class Summary extends React.Component {
  constructor({ styles, ...props }) {
    super(props);
    this.state = {
      received: false,
      data: null
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(process.env.REACT_APP_API_BASE_URL + "/api/session/" + "rkVuo8g1m", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          received: true,
          data: res.presentation.data,
          title: res.presentation.name,
          duration: moment.duration(res.presentation.duration, "seconds")
        });
      });
  }

  render() {
    if (!this.state.received) {
      return "Fetching..";
    }

    console.log(this.props);

    let totals = this.state.data[this.state.data.length - 1];

    return (
      <div {...css(this.props.styles.summary)}>
        <FlexContainer
          flex="1"
          align="start"
          justify="start"
          style={{ maxWidth: "960px" }}
        >
          <header {...css(this.props.styles.hero)}>
            <Heading size="1" appearance="white">
              {this.state.title}
            </Heading>
          </header>
          <section {...css(this.props.styles.statContainer)}>
            <Heading size="5" appearance="white">
              Session duration:
            </Heading>
            <Heading size="2" appearance="white">
              {moment
                .utc(this.state.duration.asMilliseconds())
                .format("HH:mm:ss")}
            </Heading>
          </section>
          <FlexContainer
            direction="row"
            align="flex-start"
            justify="between"
            fullWidth="1"
            flex="flex1"
          >
            <section {...css(this.props.styles.statContainer)}>
              <span {...css(this.props.styles.stats)}>
                <CountUp start={0} end={totals.likes} />
                <Paragraph appearance="white"> likes </Paragraph>
              </span>
            </section>
            <section {...css(this.props.styles.statContainer)}>
              <span {...css(this.props.styles.stats)}>
                <CountUp start={0} end={totals.attendees} />
                <Paragraph appearance="white"> Attendees </Paragraph>
              </span>
            </section>
            <section {...css(this.props.styles.statContainer)}>
              <span {...css(this.props.styles.stats)}>
                <CountUp start={0} end={totals.impressions} />
                <Paragraph appearance="white"> Impressions </Paragraph>
              </span>
            </section>
          </FlexContainer>
          <Heading size="4" appearance="white">
            Average engagement over time
          </Heading>
          <Card appearance="white">
            <SessionGraph data={this.state.data} isAverage threshold="30" />
          </Card>
          <FlexContainer direction="row" align="center" justify="center">
            <ButtonLink to="/dashboard" appearance="danger">
              Return to dashboard
            </ButtonLink>
          </FlexContainer>
        </FlexContainer>
      </div>
    );
  }
}

export default withStyles(({ colors }) => {
  return {
    summary: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      backgroundColor: colors.carbon,
      minHeight: "100vh",
      animation: "fade 0.5s ease"
    },
    hero: {
      padding: "45px 0px",
      textAlign: "center"
    },
    statContainer: {
      marginBottom: "45px",
      marginRight: "20px",
      flexWrap: "wrap"
    },
    stats: {
      fontSize: "98px",
      fontWeight: "600",
      color: "white"
    },
    icon: {
      width: "128px",
      marginBottom: "48px"
    }
  };
})(Summary);
