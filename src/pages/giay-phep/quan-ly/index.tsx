import * as React from 'react';

// ** MUI Imports
import { Grid,  Button, Card, CardContent } from '@mui/material';
import { useEffect } from 'react'

// ** Icons Imports
import SearchIcon from '@mui/icons-material/Search';

// ** Components Imports
import SearchLicense from 'src/views/license/Search';
import CountLicenseForManage from 'src/@core/components/license-page/count-license-for-manage';
import ApexChartLicense from 'src/@core/components/license-page/license-bar-chart';
import AutoComplete from 'src/@core/components/field/auto-complete';


const complete1 = [
  { title: "Khóa 1" },
  { title: "Khóa 2" },
  { title: "Khóa 3" },
];
const complete2 = [
  { title: "Đợt 1" },
  { title: "Đợt 2" },
  { title: "Đợt 3" },
];

const ManageLicense = () => {
  useEffect(() => {
    document.title = "Quản lý thông tin giấy phép nước mặt";
  }, []);

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://tnnsl.loc/api/Construction/list?BasinId=0&CommuneId=0&DistrictId=0&Keyword=&LicenseId=-1&LicensingAuthorities=-1&PageIndex=1&PageSize=0&ProvinceId=0&StartDate=-1&Status=true&TypeOfConstructionId=1'); // Thay đổi URL API tùy thuộc vào nguồn dữ liệu của bạn
  //     const jsonData = await response.json();
  //     console.log(jsonData.ListData)
  //     setData(jsonData.ListData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }; 

  const data = [
    {
      name: 'Khai thác và sử dụng nước mặt',
      data: [2, 3, 4, 7, 3, 2, 3, 4, 7, 3],
    },
    {
      name: 'Khai thác sử dụng nước dưới đất',
      data: [4, 4, 5, 2, 6, 2, 3, 4, 7, 3],
    },
    {
      name: 'Thăm dò nước dưới đất',
      data: [5, 6, 7, 4, 9, 2, 3, 4, 7, 3],
    },
    {
      name: 'Hành nghề khoan',
      data: [5, 6, 3, 2, 1, 2, 3, 4, 7, 3],
    },
    {
      name: 'Xả thải vào nguồn nước',
      data: [4, 9, 4, 3, 0, 2, 3, 4, 7, 3],
    },
  ]
  const year = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]

  const color = [
    'rgb(106, 179, 230)',
    'rgb(0, 61, 126)',
    'rgb(125, 95, 58)',
    'rgb(0, 178, 151)',
    'rgb(244, 153, 23)',
  ];

  return (
    <Grid container spacing={3}>
      <CountLicenseForManage />
      <Grid item xs={12} sm={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 4, height: '100%' }}>
            <Grid container xs={12} sm={7} md={9} direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={4}>
              <Grid item xs={12} sm={7} md={3}>
                <AutoComplete
                  size="small"
                  options={complete1}
                  getOptionLabel={(option: any) => option.title}
                  label="Chọn loại hình CT"
                />
              </Grid>
              <Grid item xs={12} sm={7} md={3}>
                <AutoComplete
                  size="small"
                  options={complete2}
                  getOptionLabel={(option: any) => option.title}
                  label="Chọn loại hình GP"
                />
              </Grid>
              <Grid item xs={12} sm={7} md={3}>
                <AutoComplete
                  size="small"
                  options={complete2}
                  getOptionLabel={(option: any) => option.title}
                  label="Chọn hiệu lực GP"
                />
              </Grid>
              <Grid item xs={12} sm={7} md={3}>
                <AutoComplete
                  size="small"
                  options={complete2}
                  getOptionLabel={(option: any) => option.title}
                  label="Chọn cơ quan CP"
                />
              </Grid>
            </Grid>
            <Grid container xs={12} sm={12} md={4} direction="row" justifyContent="flex-end" alignItems="center" spacing={4} sx={{pt:3}}>
              <Grid item xs={12} sm={12} md={4}>
                <SearchLicense />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Button size='small' fullWidth startIcon={<SearchIcon />} variant="outlined">Tìm kiếm</Button>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Button size='small' fullWidth startIcon={<SearchIcon />} variant="outlined">Xuất excel</Button>
              </Grid>
            </Grid>
            <ApexChartLicense data={data} year={year} color={color} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ManageLicense
