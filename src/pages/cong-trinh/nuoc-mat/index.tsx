// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'


// ** Icons Imports


// ** Components Imports
import ConstructionMap from 'src/views/construction'
import TableList from 'src/views/construction/TableList';

const SurfaceWater = () => {
  useEffect(() => {
    document.title = "Quản lý thông tin công trình nước mặt";
  }, []);

  return (
    <Grid container spacing={3}>
       <Grid item xs={12} sm={12} md={12}>
          <ConstructionMap />
       </Grid>
       <Grid item xs={12} sm={12} md={12}>
          <TableList />
       </Grid>
    </Grid>
  )
}

export default SurfaceWater
