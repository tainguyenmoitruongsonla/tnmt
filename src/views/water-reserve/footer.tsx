import { Typography, Grid } from '@mui/material'

const FooterWaterReseve = () => {
  return (
    <Grid className='_space_between' container sx={{mt:5}}>
      <Grid className='_text_center' item xs={4}>
        <Typography>
          Người lập biểu
        </Typography>
      </Grid>

      <Grid className='_text_center' item xs={4}>
        <Typography>Người kiểm tra</Typography>
      </Grid>
      <Grid className='_text_center' item xs={4}>
        <Typography>Sở Tài nguyên và Môi trường</Typography>
      </Grid>
    </Grid>
  )
}
export default FooterWaterReseve
