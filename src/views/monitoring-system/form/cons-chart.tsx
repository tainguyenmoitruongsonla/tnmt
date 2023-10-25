import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material'

import ReactApexcharts from 'src/@core/components/react-apexcharts';
import { ApexOptions } from "apexcharts";

const MonitoringSFChart = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const options: ApexOptions = {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
              return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          },
        },
        title: {
          text: 'Thuỷ điện Huy Măng',
          align: 'center'
        },
        grid: {
          borderColor: '#f1f1f1',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['24/10/2023 15:15:00', '24/10/2023 15:20:00', '24/10/2023 15:25:05', '24/10/2023 15:30:05', '24/10/2023 15:35:05'],
        },
        markers: {
          size: 0,
          hover: {
              sizeOffset: 6 
          }
        },
        tooltip: {
            enabled: true,
            onDatasetHover: {
              highlightDataSeries: true,
            },
            y: [
                {
                    title: {
                        formatter: function (val) {
                            return val;
                        }
                    }
                },
            ]
        },
    };

    const series = [{
        name: "Mực nước thượng lưu hồ",
        data: [168.29, 170.35, 168.93, 167.06, 169.37]
    },{
        name: "Lưu lượng DCTT",
        data: [1.29, 1.35, 1.93, 2.06, 2.37]
    },{
        name: "Lưu lượng qua nhà máy",
        data: [31.29, 32.35, 50.93, 56.06, 69.37]
    },{
        name: "Lưu lượng xả qua tràn",
        data: [41.29, 39.35, 44.39, 42.60, 39.73]
    },{
        name: "Lưu lượng về hạ du",
        data: [41.89, 42.35, 43.93, 45.06, 33.37]
    }];

    return (
        <Grid>
            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center' }}><img src='/images/icon/live.gif' width={25} height={20} alt="live" />&nbsp;Thời gian hiện tại: {time.toLocaleString('zh-HK', { hour12: false })}</Typography>
            <ReactApexcharts options={options} series={series} type="line" height={450}/>
        </Grid>
    )
}

export default MonitoringSFChart
