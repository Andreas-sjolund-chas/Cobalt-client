import React from "react";
import { css, withStyles } from "../../withStyles";

import { connect } from "react-redux";
import CountUp from "react-countup";
import moment from "moment";

import FlexContainer from "../../Containers/FlexContainer";
import Heading from "../../Elements/Heading";
import Paragraph from "../../Elements/Paragraph";
import Button from "../../Elements/Button";
import SessionGraph from "../../Components/SessionGraph";
import ButtonLink from "../../Elements/ButtonLink";
import Card from "../../Elements/Card";
import Loader from "../../Elements/Loader";
import CopyTextfield from "../../Elements/CopyTextfield";

import { requestSessionData } from "../../redux/session/actions";

class Summary extends React.Component {
  constructor({ styles, ...props }) {
    super(props);

    const {
      match: {
        params: { sessionId }
      }
    } = this.props;

    this.sessionId = sessionId;
  }

  componentDidMount() {
    this.props.dispatch(requestSessionData(this.sessionId));
  }

  render() {
    const { isFetching, session } = this.props.session;

    if (!session.data || session.data.length <= 0 || isFetching) {
      return <Loader />;
    }

    let duration = moment.duration(session.duration, "seconds");
    let totals = session.data[session.data.length - 1];

    return (
      <div {...css(this.props.styles.summary)}>
        <FlexContainer
          flex="1"
          align="start"
          justify="start"
          style={{ maxWidth: "960px" }}
        >
          <header {...css(this.props.styles.hero)}>
            <Heading size="1" appearance="dawn">
              {session.name}
            </Heading>
          </header>
          <section {...css(this.props.styles.statContainer)}>
            <Heading size="5" appearance="dawn">
              Session duration:
            </Heading>
            <Heading size="2" appearance="dawn">
              {moment.utc(duration.asMilliseconds()).format("HH:mm:ss")}
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
                <Paragraph appearance="dawn"> likes </Paragraph>
              </span>
            </section>
            <section {...css(this.props.styles.statContainer)}>
              <span {...css(this.props.styles.stats)}>
                <CountUp start={0} end={totals.attendees} />
                <Paragraph appearance="dawn"> Attendees </Paragraph>
              </span>
            </section>
            <section {...css(this.props.styles.statContainer)}>
              <span {...css(this.props.styles.stats)}>
                <CountUp start={0} end={totals.impressions} />
                <Paragraph appearance="dawn"> Impressions </Paragraph>
              </span>
            </section>
          </FlexContainer>
          <Heading size="4" appearance="dawn">
            Average engagement over time
          </Heading>
          <Card appearance="white">
            <SessionGraph data={session.data} isAverage threshold="30" />
          </Card>
          <FlexContainer direction="row" align="center" justify="center">
            <ButtonLink to="/dashboard" appearance="secondary">
              Return to dashboard
            </ButtonLink>
          </FlexContainer>
        </FlexContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    session: state.session
  };
};

Summary = connect(mapStateToProps)(Summary);

export default withStyles(({ colors }) => {
  return {
    summary: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      backgroundColor: colors.sand,
      minHeight: "100vh",
      animation: "fade 0.5s ease"
    },
    hero: {
      padding: "20px 0px",
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
      color: "dawn"
    },
    icon: {
      width: "128px",
      marginBottom: "48px"
    }
  };
})(Summary);
