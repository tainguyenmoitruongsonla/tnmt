// ** MUI Imports
import { Card, Typography, CardHeader, CardContent, Grid } from '@mui/material';
import { ApexOptions } from "apexcharts";

// ** ApexCharts
import ReactApexcharts from 'src/@core/components/react-apexcharts';

const TotalLicense = 320;
const BTNMT = 110;
const UBND = 210;

const data = [
  {
    name: 'BTNMT',
    value: BTNMT,
  },
  {
    name: 'UBND',
    value: UBND,
  },
];
const COLORS = ['#0088FE', '#FFBB28'];

const CHARTS_SIZE = 180;

const CountLicense = () => {

  const options: ApexOptions = {
    labels: data.map((entry) => entry.name),
    colors: COLORS,
    dataLabels: {
      enabled: true,
      style: {
          fontSize: '15px',
      },
      formatter: function (val, opt) {
          val;
          const name = opt.w.globals.labels[opt.seriesIndex];
          const value = opt.w.globals.seriesTotals[opt.seriesIndex];

          return `${name}: ${value}`;
      },
    },
    chart: {
      width: CHARTS_SIZE,
        type: 'pie',
        events: {
          dataPointSelection: (event, chartContext, config) => { 
            console.log(config.w.config.labels[config.dataPointIndex])
          }
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                offset: -20,
            },
        }
    },
    tooltip: {
      enabled: true,
    },
    legend: {
      show: false,
    },
  };

  const series = data.map((entry) => entry.value);

  return (
    <Card sx={{ position: 'relative' }}>
      <CardHeader
        sx={{ padding: 0 }}
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
          },
        }}
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={5} md={5}>
            <Typography variant="subtitle1">BTNMT: {BTNMT}</Typography>
            <Typography variant="subtitle1">UBND: {UBND}</Typography>
          </Grid>
          <Grid item xs={7} md={7}>
            {/* Chart */}
            <ReactApexcharts
              options={options}
              series={series}
              type="pie"
              width={CHARTS_SIZE}
              height={CHARTS_SIZE}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CountLicense;
