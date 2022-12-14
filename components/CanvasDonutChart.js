import React, { useRef, useEffect } from 'react'

const CanvasDonutChart = ({value = 0, width, height}) => {

  const canvasRef = useRef(null)


  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const start = 0 * Math.PI
    // const end = 1.5 * Math.PI
    const end = (2 * (value/100)) * Math.PI  

    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const startAngle = 0 * Math.PI;
    const endAngle = 2 * Math.PI;
    const radius = 120;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, false);
    context.lineWidth = 3;
    context.strokeStyle = 'gray';
    context.stroke();

    
    context.beginPath();
    context.arc(x, y, radius, start, end, false);
    context.lineWidth = 3;

    const grd = context.createLinearGradient(50, 100, 200, 300)
    grd.addColorStop(0, "#4f67c9");
    grd.addColorStop(1, "white");
    context.strokeStyle = grd;
    context.stroke();

    context.font = '60px NotoSans'
    context.fillStyle = 'white'


    if (value < 10) {
      context.fillText(value, x - 14, y + 8)
    } else if (value < 100) {
      context.fillText(value, x - 32, y + 8)
    } else {
      context.fillText(value, x - 50, y + 8)
    }

    context.font = '32px NotoSans'
    context.fillStyle = '#ccc'
    context.fillText('%', x - 10, y + 48)
    
    // context.font = '10pt Arial';
    // context.fillText('1', x - radius - 20, y + 5);
    // context.fillText('1.5', x - 10, y - radius - 15);
    // context.fillText('0(2)', x + radius + 15, y + 5);
    // context.fillText('0.5', x - 10, y + radius + 25);


  })

  return <canvas ref={canvasRef} width={width} height={height} />
}

export default CanvasDonutChart