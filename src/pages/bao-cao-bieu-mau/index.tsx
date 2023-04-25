// ** MUI Imports
import { Box, Link, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import React from 'react'
import { useEffect } from 'react'
import Bieumau1 from 'src/views/report-form/Bieumau1'

// ** Icons Imports

function FormRow() {
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Bieumau1/>
        </Grid>
        <Grid item xs={3}>
          <Link className='formReport_box' href='#'>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 1</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Số lượng trạm quan trắc khí tượng thủy văn,tài nguyên nước,nước dưới đất
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='https://example.com/my-image.jpg' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </Grid>
        <Grid item xs={3}>
          <Link className='formReport_box' href='#'>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 1</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Số lượng trạm quan trắc khí tượng thủy văn,tài nguyên nước,nước dưới đất
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='https://example.com/my-image.jpg' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </Grid>
        <Grid item xs={3}>
          <Link className='formReport_box' href='#'>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 1</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Số lượng trạm quan trắc khí tượng thủy văn,tài nguyên nước,nước dưới đất
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='https://example.com/my-image.jpg' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
const Report = () => {
  useEffect(() => {
    document.title = 'Báo cáo biểu mẫu'
  }, [])

  return (
    <Grid container spacing={10}>
      <Grid container item spacing={3}>
        <FormRow />
      </Grid>
      <Grid container item spacing={3}>
        <FormRow />
      </Grid>
      <Grid container item spacing={3}>
        <FormRow />
      </Grid>
      <Grid container item spacing={3}>
        <FormRow />
      </Grid>
      <Grid container item spacing={3}>
        <FormRow />
      </Grid>
      <Grid container item spacing={3}>
        <FormRow />
      </Grid>
    </Grid>
  )
}

export default Report
