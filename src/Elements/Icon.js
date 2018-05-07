import React from "react";
import { css, withStyles } from "../withStyles";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faUsers,
  faUser,
  faEnvelope,
  faTimes,
  faUnlock,
  faColumns,
  faPlus,
  faTag,
  faCog,
  faPowerOff,
  faBriefcase,
  faBuilding,
  faBoxes,
  faQuestion,
  faExclamationTriangle,
  faSpinner
} from "@fortawesome/fontawesome-free-solid";

const Icon = ({
  icon = null,
  fillColor = "white",
  size = "small",
  padding = "padding",
  styles,
  ...props
}) => {
  let faIcon;
  switch (icon) {
    case "fas fa-users":
      faIcon = faUsers;
      break;
    case "fas fa-user":
      faIcon = faUser;
      break;
    case "fas fa-check":
      faIcon = faCheck;
      break;
    case "fas fa-envelope":
      faIcon = faEnvelope;
      break;
    case "fas fa-times":
      faIcon = faTimes;
      break;
    case "fas fa-unlock":
      faIcon = faUnlock;
      break;
    case "fas fa-columns":
      faIcon = faColumns;
      break;
    case "fas fa-plus":
      faIcon = faPlus;
      break;
    case "fas fa-tag":
      faIcon = faTag;
      break;
    case "fas fa-cog":
      faIcon = faCog;
      break;
    case "fas fa-power-off":
      faIcon = faPowerOff;
      break;
    case "fas fa-briefcase":
      faIcon = faBriefcase;
      break;
    case "fas fa-building":
      faIcon = faBuilding;
      break;
    case "fas fa-boxes":
      faIcon = faBoxes;
      break;
    case "fas fa-exclamation-triangle":
      faIcon = faExclamationTriangle;
      break;
    case "fas fa-spinner":
      faIcon = faSpinner;
      break;
    default:
      faIcon = faQuestion;
  }

  return (
    <span
      {...css(styles.icon, styles[size], styles[fillColor], styles[padding])}
      {...props}
    >
      <FontAwesomeIcon icon={faIcon} />
    </span>
  );
};

export default withStyles(({ colors, text }) => {
  return {
    icon: {
      ":nth-child(1) svg": {
        verticalAlign: "0px"
      }
    },
    padding: {
      padding: "13.5px"
    },
    /** TODO: change from fontawesome to svg? */

    /* Size */
    xs: text.xs,
    small: text.small,
    medium: text.medium,
    large: text.large,
    /* Color */
    primary: { color: colors.primary },
    secondary: { color: colors.secondary },
    danger: { color: colors.danger },
    dawn: { color: colors.dawn },
    nightsky: { color: colors.nightsky },
    carbon: { color: colors.carbon },
    darkMetal: { color: colors.darkMetal },
    aluminum: { color: colors.aluminum },
    sand: { color: colors.sand },
    white: { color: "#FFF" }
  };
})(Icon);
