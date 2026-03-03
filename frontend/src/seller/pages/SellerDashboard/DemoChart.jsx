import React from 'react'
import { XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
    {
      name: 'Page A',
      uv,
      pv: 2400,
      amt,
    },
    {
      name: 'Page B',
      uv,
      pv: 1398,
      amt,
    },
    {
      name: 'Page C',
      uv,
      pv: 9800,
      amt,
    },
    {
      name: 'Page D',
      uv,
      pv: 3908,
      amt,
    },
    {
      name: 'Page E',
      uv,
      pv: 4800,
      amt,
    },
    {
      name: 'Page F',
      uv,
      pv: 3800,
      amt,
    },
    {
      name: 'Page G',
      uv,
      pv: 4300,
      amt,
    },
  ];

const DemoChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}
      margin={{
        top: 10,
        right,
        left: 0,
        bottom,
      }}
      >
        <Line type="monotone" dataKey="pv" stroke="#FFFFFF" strokeWidth={2} />
        <XAxis dataKey="name"  stroke="#FFFFFF" />
        <YAxis  stroke="#FFFFFF"  />
      </LineChart>
    </ResponsiveContainer>
    
  )
}

export default DemoChart