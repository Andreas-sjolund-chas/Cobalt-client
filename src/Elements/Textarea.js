import React from "react";
import { css, withStyles } from "../withStyles";
import Icon from "./Icon";

const Textarea = ({
  icon = null,
  iconFillColor = "white",
  iconPosition = "left",
  iconBackground = null,
  inputRef,
  appearance = "default",
  styles,
  ...props
}) => {
  const iconBackgroundColor = `iconBackground${iconBackground}`;

  return (
    <div {...css(styles.container, styles[iconPosition])}>
      {icon !== null ? (
        <div {...css(styles[iconBackgroundColor], styles.icon)}>
          <Icon fillColor={iconFillColor} icon={icon} />
        </div>
      ) : (
        ""
      )}
      <textarea
        ref={inputRef}
        {...css(styles.textarea, styles[appearance])}
        {...props}
      ></textarea>
    </div>
  );
};

export default withStyles(({ themes, colors }) => {
  return {
    textarea: {
      padding: "13px",
      margin: "0",
      border: "1px solid",
      borderRadius: "2px",
      width: "100%",
      minWidth: "120px",
      height: "200px",
      borderColor: colors.aluminum,
      ":focus": {
        borderColor: colors.secondary
      }
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%"
    },
    icon: {
      display: "flex",
      alignItems: "flex-start"
    },
    left: {
      ":nth-child(1n) div": {
        borderRadius: "2px 0 0 2px"
      },
      ":nth-child(1n) div + textarea": {
        marginLeft: "0",
        borderRadius: "0 2px 2px 0",
        borderLeft: "0"
      }
    },
    right: {
      flexDirection: "row-reverse",
      justifyContent: "flex-end",
      ":nth-child(1n) div": {
        borderRadius: "0 2px 2px 0"
      },
      ":nth-child(1n) div + textarea": {
        marginRight: "0",
        borderRadius: "2px 0 0 2px",
        borderRight: "0"
      }
    },

    default: {
      ":focus": {
        borderColor: colors.default
      }
    },
    primary: {
      ":focus": {
        borderColor: colors.primary
      }
    },
    secondary: {
      ":focus": {
        borderColor: colors.secondary
      }
    },
    success: {
      ":focus": {
        borderColor: colors.success
      }
    },
    danger: {
      ":focus": {
        borderColor: colors.danger
      }
    },
    iconBackgroundprimary: { backgroundColor: colors.primary },
    iconBackgroundsecondary: { backgroundColor: colors.secondary },
    iconBackgroundsuccess: { backgroundColor: colors.success },
    iconBackgrounddanger: { backgroundColor: colors.danger },
    iconBackgrounddawn: { backgroundColor: colors.dawn },
    iconBackgroundnightsky: { backgroundColor: colors.nightsky },
    iconBackgroundcarbon: { backgroundColor: colors.carbon },
    iconBackgrounddarkMetal: { backgroundColor: colors.darkMetal },
    iconBackgroundaluminum: { backgroundColor: colors.aluminum },
    iconBackgroundsand: { backgroundColor: colors.sand }
  };
})(Textarea);
