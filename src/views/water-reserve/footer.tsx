import { Typography, Grid } from '@mui/material'

const FooterWaterReseve = () => {
  return (
    <Grid className='_space_between' container sx={{mt:5}}>
      <Grid className='_text_center' item xs={4}>
        <Typography variant='h5'>
          Người lập biểu
        </Typography>
      </Grid>

      <Grid className='_text_center' item xs={4}>
        <Typography variant='h5'>Người kiểm tra</Typography>
      </Grid>
      <Grid className='_text_center' item xs={4}>
        <Typography variant='h5'>Sở Tài nguyên và Môi trường</Typography>
      </Grid>
    </Grid>
  )
}
export default FooterWaterReseve
