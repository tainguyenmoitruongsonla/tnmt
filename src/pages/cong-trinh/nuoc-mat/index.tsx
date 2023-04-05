// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'


// ** Icons Imports


// ** Components Imports
import ConstructionMap from 'src/views/construction'

const SurfaceWater = () => {
  useEffect(() => {
    document.title = "Quản lý thông tin công trình nước mặt";
  }, []);

  return (
    <Grid container spacing={3}>
        <ConstructionMap />
    </Grid>
  )
}

export default SurfaceWater
