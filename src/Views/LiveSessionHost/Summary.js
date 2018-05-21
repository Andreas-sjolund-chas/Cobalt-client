import React from "react";
import { css, withStyles } from "../../withStyles";
import FlexContainer from "../../Containers/FlexContainer";
import Heading from "../../Elements/Heading";
import Paragraph from "../../Elements/Paragraph";
import Button from "../../Elements/Button";
import SessionGraph from "../../Components/SessionGraph";
import ButtonLink from "../../Elements/ButtonLink";
import Card from "../../Elements/Card";
import CopyTextfield from "../../Elements/CopyTextfield";

// const data = require("../../stories/Components/data.json");

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
    fetch(process.env.REACT_APP_API_BASE_URL + "/api/session/" + "ry5nomgy7", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.presentation.data);
        this.setState({
          received: true,
          data: res.presentation.data
        });
      });
  }

  render() {
    if (!this.state.received) {
      return "Fetching..";
    }
    return (
      <div {...css(this.props.styles.summary)}>
        <FlexContainer flex="1" align="center" justify="center">
          <Heading size="1">Nice job!</Heading>
          <Heading size="2">Here's some statistics about your session!</Heading>

          <Card
            appearance="white"
            style={{ maxWidth: "960px", margin: "20px" }}
          >
            <SessionGraph data={this.state.data} isAverage threshold="30" />
          </Card>
          <FlexContainer direction="row">
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
      padding: "20px",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      backgroundColor: colors.sand,
      animation: "fade 0.5s ease"
    },
    icon: {
      width: "128px",
      marginBottom: "48px"
    }
  };
})(Summary);
