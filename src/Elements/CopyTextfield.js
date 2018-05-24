import React from "react";
import { css, withStyles } from "../withStyles";

import FlexContainer from "../Containers/FlexContainer";
import Button from "./Button";
import Input from "./Input";

const CopyTextfield = ({ url = "SESSIONID", styles, ...props }) => {
  let inputElementRef;

  const copyToClipboard = event => {
    event.preventDefault();

    if (!inputElementRef) return;

    inputElementRef.focus();
    inputElementRef.select();

    let success = document.execCommand("copy");

    if (!success) {
      throw new Error("Could not copy the contents to clipboard.");
    } else {
      // TODO: Add notification that the message has been copied
    }
  };

  return (
    <div {...css(styles.textfield)} {...props}>
      <FlexContainer direction="row">
        <Button appearance="secondary" onClick={copyToClipboard}>
          Copy
        </Button>
        <Input
          inputRef={ref => (inputElementRef = ref)}
          onClick={copyToClipboard}
          value={url}
          readOnly
        />
      </FlexContainer>
    </div>
  );
};

export default withStyles(({ themes }) => {
  return {
    textfield: {
      ":nth-child(1n) button": {
        marginRight: "0",
        height: "43px",
        borderRadius: "4px 0px 0px 4px"
      },
      ":nth-child(1n) input": {
        marginLeft: "0",
        borderRadius: "0px 4px 4px 0px"
      }
    },

    default: {
      color: themes.default.color
    },
    primary: {
      color: themes.primary.backgroundColor
    },
    secondary: {
      color: themes.secondary.color
    }
  };
})(CopyTextfield);
