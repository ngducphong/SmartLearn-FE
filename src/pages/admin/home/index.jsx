import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Grid} from "@mui/material";
export default function HomeAdmin() {
  const data = [
    { name: 'Jan', value: 10 },
    { name: 'Feb', value: 20 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 25 },
    { name: 'May', value: 30 },
    { name: 'Jun', value: 35 },
  ];
  const Chart1 = ({ data }) => (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
  );

  const Chart2 = ({ data }) => (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
  );

  const Chart3 = ({ data }) => (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
  );

  const Chart4 = ({ data }) => (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>);

  return (
  <Grid container spacing={2}>
    <Grid item xs={5}>
      <Chart1 data={data} />
    </Grid>
    <Grid item xs={5}>
      <Chart2 data={data} />
    </Grid>
    <Grid item xs={5}>
      <Chart3 data={data} />
    </Grid>
    <Grid item xs={5}>
      <Chart4 data={data} />
    </Grid>
  </Grid>
  );
}
