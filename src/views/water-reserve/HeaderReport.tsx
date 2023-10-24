import { Typography, Grid, TextField } from '@mui/material'

const HeaderReport = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0 (0 = tháng 1)
  const year = currentDate.getFullYear();

  return (
    <Grid className='_space_between' container sx={{mt:5}}>
      <Grid className='_text_center' item xs={4}>
      <Typography variant='h5'>UBND Tỉnh Quảng Ngãi</Typography>
          <Typography className='font-weight-bold ' variant='h5'>
            SỞ TÀI NGUYÊN VÀ MÔI TRƯỜNG
          </Typography>
          <Typography variant='h5'>
            Số:
            <TextField size='small' sx={{ width: '50px' }}></TextField>
            /STNMT-TNN-KS&KTTV
          </Typography>
      </Grid>

      <Grid className='_text_center' item xs={5}>
        <Typography variant='h5'>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</Typography>
        <Typography className='font-weight-bold ' variant='h5'>
            Độc lập - Tự do - Hạnh phúc
          </Typography>
        <Typography className='italicText' variant='h6'>Quãng Ngãi,ngày {day},tháng {month} ,năm{year}</Typography>
      </Grid>
    </Grid>
  )
}
export default HeaderReport
