// ** MUI Imports
import {Card, Typography, CardHeader, CardContent, Grid} from '@mui/material';
import { borderBottom } from '@mui/system';

// ** Chart
import React, { useCallback, useState } from "react";
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, LabelList } from "recharts";

const TotalLicense = 320;
const BTNMT = 110;
const UBND = 210;

const data = [
  {
    name: "BTNMT",
    BTNMT: BTNMT,
  },
  {
    name: "UBND",
    UBND: UBND,
  },
];
const COLORS = ['#0088FE', '#FFBB28'];


const renderCustomizedLabel = (props: any) => {
  const { x, y, width, height, value } = props;

  return (
    <text x={x + width / 2} y={y + height / 2} fill="#000" textAnchor="middle" dominantBaseline="middle">
      {value}
    </text>
  );
};

const CountLicense = () => {

  const buttonHandler = (entry: any) => {
    alert(entry);
  };

  return (
    <Card sx={{ position: 'relative' }}>
      <CardHeader
      sx={{padding: 0}}
        title={`GIẤY PHÉP:  ${TotalLicense}`}
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            textAlign: 'center',
            fontSize: '18px !important',
            fontWeight: 600,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important',
            borderBottom: '1px solid gray',
          }
        }}
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            {/* Chart */}
            <ComposedChart
              layout="vertical"
              width={300}
              height={150}
              data={data}
            >
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" scale="auto" />
              <Tooltip />
              <Bar dataKey="BTNMT" stackId="a" fill={`${COLORS[0]}`} onClick={() => buttonHandler(this)} >
                <LabelList dataKey="name" content={renderCustomizedLabel} />
              </Bar>
              <Bar dataKey="UBND" stackId="a" fill={`${COLORS[1]}`} onClick={() => buttonHandler(this)} />
            </ComposedChart>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CountLicense;
