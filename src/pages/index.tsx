// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
// ** Demo Components Imports
import ShowCountLicense from 'src/views/dashboard/ConstructionStatus'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import RealTime from 'src/views/dashboard/RealTime'

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
          <StatisticsCard />
        </Grid>
      </Grid>
  )
}

export default Dashboard
