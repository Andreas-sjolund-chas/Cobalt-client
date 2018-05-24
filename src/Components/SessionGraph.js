import React from "react";

import { withStyles } from "../withStyles";

import FlexContainer from "../Containers/FlexContainer";
import Tooltip from "../Elements/Tooltip";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RCTooltip
} from "recharts";

const SessionTooltip = ({ active, payload, label, ...props }) =>
  active ? (
    <Tooltip isRounded withShadow>
      <p>Time: {label}</p>
      <p>Value: {payload[0].value}</p>
    </Tooltip>
  ) : null;

const SessionGraph = ({
  styles,
  data,
  threshold = "30",
  isAverage = false,
  ...props
}) => {
  const getPositive = data => data.value.positive;
  const getNegative = data => data.value.negative;
  const getAverage = data => data.value.average;
  const formatter = value =>
    isAverage
      ? value === -threshold / 10
        ? "!"
        : value
      : value === threshold
        ? "!"
        : value;

  const renderAverage = () => (
    <LineChart
      data={data}
      margin={{ top: 15, right: 15, left: 15, bottom: 15 }}
    >
      <XAxis dataKey="timeStamp" />
      <RCTooltip content={<SessionTooltip />} />
      <YAxis tickFormatter={formatter} ticks={[-5, -threshold / 10, 5]} />
      <Line
        type="monotone"
        dataKey={getAverage}
        stroke={styles.secondary._definition}
        strokeWidth={4}
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );

  const renderPercent = () => (
    <LineChart
      data={data}
      margin={{ top: 15, right: 35, left: 35, bottom: 15 }}
    >
      <XAxis dataKey="timeStamp" />
      <RCTooltip content={<SessionTooltip />} />
      <YAxis tickFormatter={formatter} ticks={[0, threshold, 100]} />
      <Line
        type="monotone"
        dataKey={getPositive}
        stroke={styles.success._definition}
        strokeWidth={4}
        activeDot={{ r: 8 }}
      />
      <Line
        type="monotone"
        dataKey={getNegative}
        stroke={styles.danger._definition}
        strokeWidth={4}
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );

  return (
    <FlexContainer style={{ height: "240px", width: "100%" }}>
      <ResponsiveContainer height="100%" width="100%">
        {isAverage ? renderAverage() : renderPercent()}
      </ResponsiveContainer>
    </FlexContainer>
  );
};

export default withStyles(({ themes }) => {
  return {
    default: themes.default.backgroundColor,
    primary: themes.primary.backgroundColor,
    secondary: themes.secondary.backgroundColor,
    success: themes.success.backgroundColor,
    danger: themes.danger.backgroundColor,
    carbon: themes.carbon.backgroundColor
  };
})(SessionGraph);
