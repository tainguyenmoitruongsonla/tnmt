import { Typography, Grid } from '@mui/material'

const HeaderWaterReseve = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0 (0 = tháng 1)
  const year = currentDate.getFullYear();

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
        <Typography className='italicText' variant='h6'>Quãng Ngãi,ngày {day},tháng {month} ,năm{year}</Typography>
      </Grid>
    </Grid>
  )
}
export default HeaderWaterReseve
