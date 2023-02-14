import React, { useRef, useEffect } from 'react';

const BarChart = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const data = props.data;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const padding = 20;
    const xMax = canvas.width - padding;
    const yMax = canvas.height - padding;
    const barWidth = xMax / data.length - padding;
    const xScale = xMax / data.length;
    const yScale = yMax / getMaxY(data);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw X axis
    ctx.beginPath();
    ctx.moveTo(padding, yMax);
    ctx.lineTo(xMax, yMax);
    ctx.stroke();

    // draw X axis reference dates
    for (let i = 0; i < data.length; i++) {
      ctx.fillText(data[i].x, padding + i * xScale + barWidth / 2, yMax + padding / 2);
    }

    // draw Y axis
    ctx.beginPath();
    ctx.moveTo(padding, yMax);
    ctx.lineTo(padding, 0);
    ctx.stroke();

    // draw Y axis reference numbers
    for (let i = 0; i <= getMaxY(data); i++) {
      ctx.fillText(i, 0, yMax - i * yScale + padding / 2);
    }

    // draw bar chart
    for (let i = 0; i < data.length; i++) {
      ctx.fillStyle = getRandomColor();
      ctx.fillRect(
        padding + i * xScale,
        yMax - data[i].y * yScale,
        barWidth,
        data[i].y * yScale
      );
    }
  }, [props.data]);

  const getMaxY = (data) => {
    return data.reduce((max, item) => {
      return Math.max(max, item.y);
    }, 0);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <canvas ref={canvasRef} width={props.width} height={props.height} />
  );
};

export default BarChart;
