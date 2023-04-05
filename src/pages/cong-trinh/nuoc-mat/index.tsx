// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'


// ** Icons Imports


// ** Components Imports
import Map from 'src/views/construction/Map'

const SurfaceWater = () => {
  useEffect(() => {
    document.title = "Quản lý thông tin công trình nước mặt";
  }, []);

  return (
    <Grid container spacing={3}>
        <Map />
    </Grid>
  )
}

export default SurfaceWater
