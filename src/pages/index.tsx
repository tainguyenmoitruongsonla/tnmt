// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ConstructionStatus from 'src/views/home/ConstructionStatus'
import RealTime from 'src/views/home/RealTime'
import ConstructionMap from 'src/views/construction'
import CountLicense from 'src/views/home/CountLicense'
import CountLicenseFee from 'src/views/home/CountLicenseFee'

const Dashboard = () => {
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
          <ConstructionMap />
        </Grid>
      </Grid>
  )
}

export default Dashboard
