// ** MUI Imports
import { Grid, Box, Button, Typography, Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react'

// ** Icons Imports
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

// ** Components Imports
import ConstructionMap from 'src/views/construction'
import TableList from 'src/views/construction/TableList';

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

const SurfaceWater = () => {
  useEffect(() => {
    document.title = "Quản lý thông tin công trình nước mặt";
  }, []);

  return (
    <Grid container spacing={3}>
       <Grid item xs={12} sm={12} md={12} sx={{height:'60vh'}}>
          <ConstructionMap />
       </Grid>
       <Grid item xs={12} sm={12} md={12} className='_row _justifyContentBetween' >
          <Box className='_count'>
            <Typography>
              Tổng số công trình KTSDN  mặt: 132
            </Typography>
            <Typography>
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
              <Button size='small' startIcon={<FilterAltIcon/>} variant="outlined">Bộ lọc</Button>
            </Box>
            <Box>
              <Button size='small' startIcon={<SearchIcon/>} variant="outlined">Tìm kiếm</Button>
            </Box>
            <Box>
              <Button size='small' startIcon={<SearchIcon/>} variant="outlined">Xuất excel</Button>
            </Box>
            <Box>
              <Button size='small' startIcon={<AddIcon/>} variant="outlined">Thêm mới</Button>
            </Box>
          </Box>
       </Grid>
       <Grid item xs={12} sm={12} md={12}>
          <TableList />
       </Grid>
    </Grid>
  )
}

export default SurfaceWater
