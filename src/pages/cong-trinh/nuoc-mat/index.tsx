// ** MUI Imports
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'

// ** Icons Imports
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

// ** Components Imports
import ConstructionMap from 'src/views/construction'
import AutoComplete from 'src/views/construction/Autocomplete';
import TableList from 'src/views/construction/TableList';

const complete1 = [
  {label: "Khóa 1"},
  {label: "Khóa 2"},
  {label: "Khóa 3"},
];
const complete2 = [
  {label: "Đợt 1"},
  {label: "Đợt 2"},
  {label: "Đợt 3"},
];

const SurfaceWater = () => {
  useEffect(() => {
    document.title = "Quản lý thông tin công trình nước mặt";
  }, []);

  return (
    <Grid container spacing={3}>
       <Grid item xs={12} sm={12} md={12} sx={{height:'60vh'}}>
          <ConstructionMap />
       </Grid>
       <Grid item xs={12} sm={12} md={12} className='total_contruction'>
          <Box>
            <Typography>
              Tổng số công trình KTSDN  mặt: 132
            </Typography>
            <Typography>
              Số công trình đã cấp phép: 132
            </Typography>
          </Box>
          <Box className='contruction_search'>
            <AutoComplete options={complete1} label={"Chọn loại CT"}/>
            <AutoComplete options={complete2} label={"Chọn cơ quan CP"}/>
            <Button startIcon={<FilterAltIcon/>} variant="outlined">Bộ lọc</Button>
            <Button startIcon={<SearchIcon/>} variant="outlined">Tìm kiếm</Button>
            <Button startIcon={<SearchIcon/>} variant="outlined">Xuất excel</Button>
            <Button startIcon={<AddIcon/>} variant="outlined">Thêm mới</Button>
          </Box>
       </Grid>
       <Grid item xs={12} sm={12} md={12}>
          <TableList />
       </Grid>
    </Grid>
  )
}

export default SurfaceWater
