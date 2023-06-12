import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexcharts from 'src/@core/components/react-apexcharts';

interface ApexChartLicenseProps {
  data: any;
  year: any;
  color: any;
}

interface Annotation {
  x: any;
  y: number;
  label: {
    text: string;
    style: {
      color: string;
    };
  };
}

const ApexChartLicense: React.FC<ApexChartLicenseProps> = ({ data, year, color }) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const series = data;
  const options: ApexOptions = {
    annotations: {
      points: annotations,
    },
    legend: {
      show: true,
      position: 'bottom',
    },
    colors: color,
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
      },
    },
    chart: {
      type: 'bar',
      height: 333,
      width: '100%',
      stacked: true,
      events: {
        mounted: function () {
          addStackedTotalsAnnotations();
        },
      },
    },
    xaxis: {
      categories: year,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          
          return 'Đã cấp ' + val + ' giấy phép';
        },
      },
    },
  };

  const addStackedTotalsAnnotations = () => {
    const seriesData = series.map((seriesItem: any) => seriesItem.data);
    const stackedTotals = Array.from({ length: seriesData[0].length }, () => 0);

    for (let i = 0; i < seriesData.length; i++) {
      for (let j = 0; j < seriesData[i].length; j++) {
        stackedTotals[j] += seriesData[i][j];
      }
    }

    const newAnnotations: Annotation[] = stackedTotals.map((total, index) => ({
      x: year[index],
      y: total,
      label: {
        text: `Tổng: ${total}`,
        style: {
          color: '#777',
        },
      },
    }));

    setAnnotations(newAnnotations);
  };

  return (
    <ReactApexcharts
      options={options}
      series={series}
      type="bar"
      width={options.chart?.width}
      height={options.chart?.height}
    />
  );
};

export default ApexChartLicense;
