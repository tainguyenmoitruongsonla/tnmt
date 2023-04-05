// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'


// ** Icons Imports


// ** Components Imports
import Map from 'src/views/construction/Map'

const DischargeWater = () => {
  useEffect(() => {
    document.title = "Quản lý thông tin công trình xả nước thải";
  }, []);

  return (
    <Grid container spacing={3}>
        <Map />
    </Grid>
  )
}

export default DischargeWater
