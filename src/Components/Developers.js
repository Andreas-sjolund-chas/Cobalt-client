import React from "react";
import { css, withStyles } from "../withStyles";

import FlexContainer from "../Containers/FlexContainer";
import Avatar from "../Elements/Avatar";
import Heading from "../Elements/Heading";
import Paragraph from "../Elements/Paragraph";

const Developers = ({ styles, ...props }) => {
  return (
    <div {...css(styles, styles.developers)}>
      <FlexContainer
        direction="row"
        justify="around"
        style={{ flexWrap: "wrap", width: "70vw" }}
      >
        <FlexContainer align="center">
          <Avatar
            size="xl"
            image="https://avatars0.githubusercontent.com/u/31238994?s=400&v=4"
          />
          <Heading size="4" appearance="primary">
            Andreas Sjölund
          </Heading>
          <a href="https://github.com/Andreas-sjolund-chas">Github</a>
        </FlexContainer>

        <FlexContainer align="center">
          <Avatar
            size="xl"
            image="https://avatars2.githubusercontent.com/u/31240478?s=460&v=4"
          />
          <Heading size="4" appearance="primary">
            Eleonor Bergqvist
          </Heading>
          <a href="https://github.com/eleonorbergqvist">Github</a>
        </FlexContainer>

        <FlexContainer align="center">
          <Avatar
            size="xl"
            image="https://avatars2.githubusercontent.com/u/31241054?s=460&v=4"
          />
          <Heading size="4" appearance="primary">
            Robert Jarske
          </Heading>
          <a href="https://github.com/robertjarske">Github</a>
        </FlexContainer>

        <FlexContainer align="center">
          <Avatar
            size="xl"
            image="https://avatars1.githubusercontent.com/u/17602389?s=460&v=4"
          />
          <Heading size="4" appearance="primary">
            Tom Ekander
          </Heading>
          <a href="https://github.com/lessp">Github</a>
        </FlexContainer>

        <FlexContainer align="center">
          <Avatar
            size="xl"
            image="https://avatars1.githubusercontent.com/u/24225542?s=460&v=4"
          />
          <Heading size="4" appearance="primary">
            Joakim Unge
          </Heading>
          <a href="https://github.com/joakimunge">Github</a>
        </FlexContainer>

        <FlexContainer align="center">
          <Avatar
            size="xl"
            image="https://avatars3.githubusercontent.com/u/31614316?s=460&v=4"
          />
          <Heading size="4" appearance="primary">
            Victor Ciavarella
          </Heading>
          <a href="https://github.com/Ciavarella">Github</a>
        </FlexContainer>
      </FlexContainer>
    </div>
  );
};

export default withStyles(({ themes }) => {
  return {
    developers: {}
  };
})(Developers);
