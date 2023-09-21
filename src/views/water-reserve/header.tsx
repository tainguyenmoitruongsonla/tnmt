import { Typography, Grid } from '@mui/material'

const HeaderWaterReseve = () => {
  return (
    <Grid className='_space_between' container sx={{mt:5}}>
      <Grid className='_text_center' item xs={4}>
        <Typography  variant='h5'>
          SỞ TÀI NGUYÊN VÀ MÔI TRƯỜNG
        </Typography>
        <Typography variant='h5'>Tỉnh Quảng Ngãi</Typography>

      </Grid>

      <Grid className='_text_center' item xs={5}>
        <Typography variant='h5'>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</Typography>
        <Typography  variant='h5'>
          Độc lập - Tự do - Hạnh phúc
        </Typography>
        <Typography className='italicText' variant='h6'>Quãng Ngãi, ngày 19 tháng 09 năm 2023</Typography>
      </Grid>
    </Grid>
  )
}
export default HeaderWaterReseve
