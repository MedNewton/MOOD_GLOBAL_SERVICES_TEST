import React from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";

const BarChart = ({ data }) => {
  const canvasWidth = window.innerWidth - 200;
  const canvasHeight = window.innerHeight / 1.4;
  const margin = { top: 10, right: 10, bottom: 40, left: 40 };
  const width = canvasWidth - margin.left - margin.right;
  const height = canvasHeight - margin.top - margin.bottom;

  const barMargin = 3;

  const x = d => d.x;
  const y = d => d.y;

  const xScale = scaleBand()
    .domain(data.map(x))
    .range([0, width])
    .padding(0.05);

  const yScale = scaleLinear()
    .domain([0, max(data, y)])
    .range([height, 0]);

  return (
    <svg width={'100%'} height={canvasHeight}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map(d => (
          <rect
            key={x(d)}
            x={(xScale(x(d)) + barMargin / 2) + barMargin * 3}
            y={yScale(y(d))}
            width={(xScale.bandwidth() - barMargin) / 2}
            height={height - yScale(y(d))}
            fill="#6495ED"
            stroke="#030303"
            strokeWidth={1}
          />
        ))}
        <g
          transform={`translate(0, ${height})`}
          style={{ fontSize: "12px", fill: "#fff" }}
        >
          <line x1={0} x2={width} y1={0} y2={0} stroke="#030303" />
          {data.map(d => (
            <g key={x(d)} transform={`translate(${xScale(x(d)) + xScale.bandwidth() / 2}, 0)`}>
              
              <text transform={`rotate(-90)`} x={-25} y={0} textAnchor="middle" dominantBaseline="central">
                {x(d)}
              </text>
            </g>
          ))}
        </g>
        <g style={{ fontSize: "12px", fill: "#fff" }}>
          <line x1={0} x2={0} y1={0} y2={height} stroke="#030303" />
          {yScale.ticks().map(tick => (
            <text key={tick} x={-30} y={yScale(tick)} dy="0.3em">
              {tick + "M"}
            </text>
          ))}
        </g>
      </g>
    </svg>
  );
};



export default BarChart;
