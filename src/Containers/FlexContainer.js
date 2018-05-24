import React from "react";
import { css, withStyles } from "../withStyles";

const FlexContainer = ({
  styles,
  element = "div",
  direction = "column",
  align = "center",
  justify = "start",
  fullWidth = null,
  flex = null,
  wrap = false,
  ...props
}) => {
  const flexSize = `flex${flex}`;
  const alignItems = `align${align}`;
  const justifyContent = `justify${justify}`;
  const ElementType = `${element}`;
  return (
    <ElementType
      {...css(
        styles.flexContainer,
        styles[direction],
        styles[alignItems],
        styles[justifyContent],
        styles[flexSize],
        styles[fullWidth],
        wrap && styles.wrap
      )}
      {...props}
    />
  );
};

export default withStyles(() => {
  return {
    flexContainer: {
      display: "flex"
    },
    column: {
      flexDirection: "column"
    },
    row: {
      flexDirection: "row",
      alignItems: "center"
    },
    alignstart: {
      alignItems: "flex-start"
    },
    alignend: {
      alignItems: "flex-end"
    },
    aligncenter: {
      alignItems: "center"
    },
    justifycenter: {
      justifyContent: "center"
    },
    justifystart: {
      justifyContent: "flex-start"
    },
    justifyend: {
      justifyContent: "flex-end"
    },
    justifybetween: {
      justifyContent: "space-between"
    },
    justifyaround: {
      justifyContent: "space-around"
    },
    flex1: {
      flex: "1"
    },
    flex2: {
      flex: "2"
    },
    flex3: {
      flex: "3"
    },
    flex4: {
      flex: "4"
    },
    "1": {
      width: "100%"
    },
    wrap: {
      flexWrap: "wrap"
    }
  };
})(FlexContainer);
