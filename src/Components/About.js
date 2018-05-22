import React from "react";
import { css, withStyles } from "../withStyles";

import FlexContainer from "../Containers/FlexContainer";
import Heading from "../Elements/Heading";
import Paragraph from "../Elements/Paragraph";

const About = ({ styles, ...props }) => {
  return (
    <div {...css(styles.about)}>
      <FlexContainer>
        <Heading size="1" appearance="primary">
          About our project
        </Heading>
        <FlexContainer style={{ width: "50%" }}>
          <Paragraph appearance="white">
            Feedback.io is a real-time web application designed to provide
            presenters with direct feedback from the audience. For our frontend
            we used: React, Redux, Storybook, Service Worker and Canvas. For
            backend we used: NodeJS, Express, Mongoose and MongoDB. Our code
            standard is based on Airbnb style guide. We also use React With
            Styles.
          </Paragraph>
        </FlexContainer>
      </FlexContainer>
    </div>
  );
};

export default withStyles(({ themes }) => {
  return {
    about: {}
  };
})(About);
