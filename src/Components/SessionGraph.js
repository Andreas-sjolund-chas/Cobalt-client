import React from "react";

import FlexContainer from "../Containers/FlexContainer";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

const SessionTooltip = ({ active, payload, label, ...props }) =>
  active ? (
    <div
      style={{
        background: "white",
        borderRadius: "5px",
        padding: "8px",
        border: "1px solid #eee",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <p>Time: {label}</p>
      <p>Value: {payload[0].value}</p>
      <p>Custom text.</p>
    </div>
  ) : null;

const SessionGraph = ({ data, threshold = "30", ...props }) => {
  const getPositive = data => data.value.positive;
  const getNegative = data => data.value.negative;
  const getAverage = data => data.value.average;
  const formatter = value => (value === -threshold / 10 ? "Threshold" : value);

  return (
    <FlexContainer style={{ height: "320px" }}>
      <ResponsiveContainer height="100%" width="80%">
        <LineChart
          data={data}
          margin={{ top: 15, right: 35, left: 35, bottom: 15 }}
        >
          <Line
            type="monotone"
            dataKey={getAverage}
            stroke="#8884d8"
            strokeWidth={4}
            activeDot={{ r: 8 }}
          />
          <XAxis dataKey="timeStamp" />
          <Tooltip content={<SessionTooltip />} />
          <YAxis tickFormatter={formatter} ticks={[-5, -threshold / 10, 5]} />
        </LineChart>
      </ResponsiveContainer>
    </FlexContainer>
  );
};

export default SessionGraph;
