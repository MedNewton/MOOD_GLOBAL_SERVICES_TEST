import React, { useState, useRef } from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";


const Tooltip = ({ x, y, data }) => {
    console.log(data.x);
    return (
      <div style={{ position: "absolute", left: x, top: y }}>
          <div style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "#fff", padding: "10px" }}>
              <div>{data.x}</div>
              <div>{data.y + "M"}</div>
          </div>
      </div>
    );
  };


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

    const [tooltip, setTooltip] = useState(null);

    const handleMouseOver = (e, d) => {
        console.log(d)
        setTooltip({
            x: e.clientX - 50,
            y: e.clientY - 50,
            data: d
        });
    };

    const handleMouseOut = () => {
        setTooltip(null);
    };

    return (
        <div style={{ position: "relative" }}>
            <svg width={'100%'} height={canvasHeight}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    {data.map(d => (
                        <rect
                            key={x(d)}
                            x={xScale(x(d)) + barMargin / 2}
                            y={yScale(y(d))}
                            width={xScale.bandwidth() - barMargin}
                            height={height - yScale(y(d))}
                            fill="#6495ED"
                            stroke="#030303"
                            strokeWidth={1}
                            onMouseOver={e => handleMouseOver(e, d)}
                            onMouseOut={handleMouseOut}
                        />
                    ))}
                    {/* Render the X axis */}
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
                    {/* Render the Y axis */}
                    <g style={{ fontSize: "12px", fill: "#fff" }}>
                        <line x1={0} x2={0} y1={0} y2={height} stroke="#030303" />
                        {yScale.ticks().map((d, i) => (
                            <g key={d} transform={`translate(0, ${yScale(d)})`}>
                                <text x={-20} y={0} textAnchor="end" dominantBaseline="central">
                                    {d}
                                </text>
                                <line x1={0} x2={width} y1={0} y2={0} stroke="#030303" strokeDasharray="2,2" />
                            </g>
                        ))}

                    </g>
                </g>
            </svg>
            {tooltip && <Tooltip x={tooltip.x} y={tooltip.y} data={tooltip.data} />}
            <div style={{ position: "absolute", top: 0, right: 0 }}>
                <div style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "#fff", padding: "10px" }}>
                    Legends
                </div>
            </div>
        </div>
    );
};

export default BarChart;


