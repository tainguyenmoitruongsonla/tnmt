import * as React from 'react';

// ** MUI Imports
import { Grid, Box, Button, Autocomplete, TextField, Card, CardContent } from '@mui/material';
import { useEffect } from 'react'

// ** Icons Imports
import SearchIcon from '@mui/icons-material/Search';

// ** Components Imports
import SearchLicense from 'src/views/license/Search';
import ApexChartLicense from 'src/views/license/LicenseBarChart';
import CountLicenseForManage from 'src/views/license/CountLicenseForManage'


const complete1 = [
  {title: "Khóa 1"},
  {title: "Khóa 2"},
  {title: "Khóa 3"},
];
const complete2 = [
  {title: "Đợt 1"},
  {title: "Đợt 2"},
  {title: "Đợt 3"},
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

  const data= [
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
       <Grid item xs={12} sm={12} md={12} sx={{height:'55vh', overflow:'hidden'}}>
        <Card sx={{height: '100%'}}>
          <CardContent sx={{p: 0, height: '100%'}}>
            <Box sx={{p:5}} className='_search'>
                <Box>
                  <Autocomplete  size="small" options={complete1} getOptionLabel={(option) => option.title} renderInput={(params) => (
                      <TextField
                          {...params}
                          variant="outlined"
                          label="Chọn loại hình CP"
                          placeholder=""
                      />
                      )}
                  />
                </Box>
                <Box>
                  <Autocomplete size="small" options={complete2} getOptionLabel={(option) => option.title} renderInput={(params) => (
                      <TextField
                          {...params}
                          variant="outlined"
                          label="Chọn cơ quan CP"
                          placeholder=""
                      />
                      )}
                  />
                </Box>
                <Box>
                  <SearchLicense/>
                </Box>           
                <Box>
                  <Button size='small' startIcon={<SearchIcon/>} variant="outlined">Xuất excel</Button>
                </Box>
            </Box>
              <ApexChartLicense data={data} year={year} color={color} />
          </CardContent>
        </Card>
       </Grid>
    </Grid>
  )
}

export default ManageLicense
