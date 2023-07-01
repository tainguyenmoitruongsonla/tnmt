// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ConstructionStatus from './cons-status'
import RealTime from './real-time'
import CountLicense from './count-license'
import CountLicenseFee from './count-license-fee'
import HomeMap from './map'

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
        <Grid item xs={12} md={12} sx={{ marginTop: 5 }}>
          <CountLicense />
        </Grid>
        <Grid item xs={12} md={12} sx={{ marginTop: 5 }}>
          <CountLicenseFee />
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <HomeMap />
      </Grid>
    </Grid>
  )
}

export default Home