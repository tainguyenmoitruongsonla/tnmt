// ** MUI Imports

import {Card, Typography, CardHeader, CardContent, Grid} from '@mui/material';

// ** Chart

import { PieChart, Pie, Tooltip, Cell } from "recharts";

const TotalLicense = 320;
const BTNMT = 110;
const UBND = 210;

const data = [
  {
    name: "BTNMT",
    value: BTNMT,
  },
  {
    name: "UBND",
    value: UBND,
  },
];
const COLORS = ['#0088FE', '#FFBB28'];

const CHARTS_SIZE = 180;
const RADIAN = Math.PI / CHARTS_SIZE;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  payload
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      fontSize={13}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {payload.name} : {payload.value}
    </text>
  );
};


const CountLicense = () => {

  const buttonHandler = (entry: any) => {
    alert(entry.name);
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
          <Grid item xs={5} md={5}>
            <Typography variant='subtitle1'>BTNMT: {BTNMT}</Typography>
            <Typography variant='subtitle1'>UBND: {UBND}</Typography>
          </Grid>
          <Grid item xs={7} md={7}>
            {/* Chart */}
            <PieChart width={CHARTS_SIZE} height={CHARTS_SIZE}>
              <Pie
                data={data}
                cx={(CHARTS_SIZE - 5) / 2}
                cy={(CHARTS_SIZE - 5) / 2}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} onClick={() => buttonHandler(entry)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  
};

export default CountLicense;
