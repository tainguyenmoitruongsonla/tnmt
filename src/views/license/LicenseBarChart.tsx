// ** MUI Imports
import {Card, CardContent, Grid} from '@mui/material';

// ** Chart

import { ResponsiveContainer, LabelList, BarChart, Bar, Tooltip, Legend, YAxis, XAxis } from "recharts";

const data = [
    { name: '2014', 'KTSD nước mặt': 5, 'KTSD nước dưới đất': 7, 'Thăm dò nước dưới đất': 3, 'Hành nghề khoan': 7, 'Xả thải vào nguồn nước': 1 },
    { name: '2015', 'KTSD nước mặt': 7, 'KTSD nước dưới đất': 2, 'Thăm dò nước dưới đất': 3, 'Hành nghề khoan': 2, 'Xả thải vào nguồn nước': 4 },
    { name: '2016', 'KTSD nước mặt': 3, 'KTSD nước dưới đất': 6, 'Thăm dò nước dưới đất': 7, 'Hành nghề khoan': 2, 'Xả thải vào nguồn nước': 3 },
    { name: '2017', 'KTSD nước mặt': 4, 'KTSD nước dưới đất': 3, 'Thăm dò nước dưới đất': 3, 'Hành nghề khoan': 3, 'Xả thải vào nguồn nước': 0 },
    { name: '2018', 'KTSD nước mặt': 5, 'KTSD nước dưới đất': 5, 'Thăm dò nước dưới đất': 4, 'Hành nghề khoan': 4, 'Xả thải vào nguồn nước': 7 },
    { name: '2019', 'KTSD nước mặt': 2, 'KTSD nước dưới đất': 7, 'Thăm dò nước dưới đất': 8, 'Hành nghề khoan': 6, 'Xả thải vào nguồn nước': 0 },
    { name: '2020', 'KTSD nước mặt': 1, 'KTSD nước dưới đất': 4, 'Thăm dò nước dưới đất': 3, 'Hành nghề khoan': 5, 'Xả thải vào nguồn nước': 4 },
    { name: '2021', 'KTSD nước mặt': 2, 'KTSD nước dưới đất': 3, 'Thăm dò nước dưới đất': 1, 'Hành nghề khoan': 2, 'Xả thải vào nguồn nước': 3 },
    { name: '2022', 'KTSD nước mặt': 5, 'KTSD nước dưới đất': 2, 'Thăm dò nước dưới đất': 5, 'Hành nghề khoan': 6, 'Xả thải vào nguồn nước': 2 },
    { name: '2023', 'KTSD nước mặt': 6, 'KTSD nước dưới đất': 7, 'Thăm dò nước dưới đất': 5, 'Hành nghề khoan': 6, 'Xả thải vào nguồn nước': 0 },
  ];

const COLORS = ['rgb(106, 179, 230)', 'rgb(0, 61, 126)', 'rgb(125, 95, 58)', 'rgb(0, 178, 151)', 'rgb(244, 153, 23)'];
const CHARTS_LEGEND = ['KTSD nước mặt', 'KTSD nước dưới đất', 'Thăm dò nước dưới đất', 'Hành nghề khoan', 'Xả thải vào nguồn nước'];

let prevStackIndex = -1;

const renderCustomizedLabel = (props:any) => {
    const { x, y, width, height, value, index, payload  } = props;
    const stackData = data[index];
    const stackTotal = stackData['KTSD nước mặt'] + stackData['KTSD nước dưới đất'] + stackData['Thăm dò nước dưới đất'] + stackData['Hành nghề khoan'] + stackData['Xả thải vào nguồn nước']
  console.log(payload)
    return (
      <g>
        {value > 0 ? 
            <text x={x + width / 2} y={y + height / 2} fill="#fff" textAnchor="middle">
            {value}
        </text>
        : ''}
        {
            // Display the total value only for the first bar in the stack

            index !== prevStackIndex ? 
            <text x={x + width / 2} y={y - 20} fill="#000" textAnchor="middle">
                Tổng: {stackTotal}
            </text> : ''
        }
      </g>
    );
  };
  

const LicenseBarChart = () => {

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} height="100%">
            {/* Chart */}
            <div style={{ width: '100%', height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} width={500} height={350}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {CHARTS_LEGEND.map((label, index) => (
                                <Bar key={label} dataKey={label} stackId="a" fill={COLORS[index]}>
                                    <LabelList dataKey={label} content={renderCustomizedLabel} />
                                </Bar>
                            ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LicenseBarChart;
