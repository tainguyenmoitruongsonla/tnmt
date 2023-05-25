// ** MUI Imports
import { Grid, Box, Button, Typography, Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react'

// ** Icons Imports

import SearchIcon from '@mui/icons-material/Search';

// ** Components Imports
import ConstructionMap from 'src/views/construction'
import TableList from 'src/views/construction/TableList';
import CreateConstruction from 'src/views/construction/CreateConstruction';
import SearchConstruction from 'src/views/construction/Search';


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

interface Data {
  stt: number,
  name: string
  diadiem: string
  x: number
  y: number
  nguonnuoc: string
  phuongthuc:string
  chedo:string
}

function createData(stt:number,name: string, diadiem: string, x: number, y: number,nguonnuoc:string,phuongthuc:string,chedo:string): Data {
  return { stt,name, diadiem, x, y, nguonnuoc,phuongthuc,chedo }
}

const SurfaceWater = () => {
  useEffect(() => {
    document.title = "Quản lý thông tin công trình nước mặt";
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://tnnsl.loc/api/Construction/list?BasinId=0&CommuneId=0&DistrictId=0&Keyword=&LicenseId=-1&LicensingAuthorities=-1&PageIndex=1&PageSize=0&ProvinceId=0&StartDate=-1&Status=true&TypeOfConstructionId=1'); // Thay đổi URL API tùy thuộc vào nguồn dữ liệu của bạn
      const jsonData = await response.json();
      console.log(jsonData.ListData)
      setData(jsonData.ListData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }; 

  return (
    <Grid container spacing={3}>
       <Grid item xs={12} sm={12} md={12} sx={{height:'55vh', overflow:'hidden'}}>
          <ConstructionMap />
       </Grid>
       <Grid item xs={12} sm={12} md={12} className='_row _justifyContentBetween' >
          <Box>
            <Typography className='_font12'>
              Tổng số công trình KTSDN  mặt: 132
            </Typography>
            <Typography className='_font12'>
              Số công trình đã cấp phép: 132
            </Typography>
          </Box>
          <Box className='_search'>
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
              <SearchConstruction/>
            </Box>           
            <Box>
              <Button size='small' startIcon={<SearchIcon/>} variant="outlined">Xuất excel</Button>
            </Box>
            <Box>
              <CreateConstruction isEdit={false}/>
            </Box>
          </Box>
        </Grid> 
       <Grid item xs={12} sm={12} md={12}>
          <TableList data={data} />
       </Grid>
    </Grid>
  )
}

export default SurfaceWater
