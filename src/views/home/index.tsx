// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ConstructionStatus from 'src/views/home/cons-status'
import RealTime from 'src/views/home/real-time'
import CountLicense from 'src/views/home/count-license'
import CountLicenseFee from 'src/views/home/count-license-fee'
import MapComponent from 'src/@core/components/map'

const Home = () => {
  return (
    <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <RealTime />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid item xs={12} md={12}>
            <ConstructionStatus />
          </Grid>
          <Grid item xs={12} md={12} sx={{marginTop: 5}}>
            <CountLicense />
          </Grid>
          <Grid item xs={12} md={12} sx={{marginTop: 5}}>
            <CountLicenseFee />
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} sx={{height: 'calc(100vh - 120px)'}}>
          <MapComponent />
        </Grid>
      </Grid>
  )
}

export default Home