import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexcharts from 'src/@core/components/react-apexcharts';

export interface ApexChartLicenseProps {
  series: any;
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

// Define the addStackedTotalsAnnotations function outside the component
const addStackedTotalsAnnotations = (series: any, year: any, setAnnotations: (annotations: Annotation[]) => void) => {
  const seriesData = series.map((seriesItem: any) => seriesItem.data);
  const stackedTotals = Array.from({ length: seriesData[0]?.length }, () => 0);

  for (let i = 0; i < seriesData.length; i++) {
    for (let j = 0; j < seriesData[i]?.length; j++) {
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

const ApexChartLicense: React.FC<ApexChartLicenseProps> = ({ series, year, color }) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  useEffect(() => {
    // Call the annotation function here after the series data is fetched and set
    addStackedTotalsAnnotations(series, year, setAnnotations);
  }, [series, year, setAnnotations]);

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
      height: 444 ,
      width: '100%',
      stacked: true,
      events: {
        mounted: function () {
          addStackedTotalsAnnotations(series, year, setAnnotations);
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
