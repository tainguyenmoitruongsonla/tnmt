// ** MUI Imports
import Grid from '@mui/material/Grid'
import React from 'react'
import { useEffect } from 'react'
import Bieumau1 from 'src/views/report-form/Bieumau1'
import Bieumau2 from 'src/views/report-form/Bieumau2'
import Bieumau3 from 'src/views/report-form/Bieumau3'
import Bieumau4 from 'src/views/report-form/Bieumau4'

// ** Icons Imports
const Report = () => {
  useEffect(() => {
    document.title = 'Báo cáo biểu mẫu'
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Bieumau1 />
      </Grid>
      <Grid item xs={3}>
      <Bieumau2 />
      </Grid>
      <Grid item xs={3}>
      <Bieumau3 />
      </Grid>
      <Grid item xs={3}>
      <Bieumau4 />
      </Grid>
    </Grid>
  )
}

export default Report
