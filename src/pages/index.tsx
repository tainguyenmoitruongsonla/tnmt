// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ShowCountLicense from 'src/views/dashboard/ConstructionStatus'
import RealTime from 'src/views/dashboard/RealTime'
import Map from 'src/views/construction/Map'

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <RealTime />
        </Grid>
        <Grid item xs={12} md={4}>
          <ShowCountLicense />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>
  )
}

export default Dashboard
