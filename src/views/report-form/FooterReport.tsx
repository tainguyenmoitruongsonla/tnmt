import { Typography, Grid } from '@mui/material'

const FooterReport = () => {
  return (
    <Grid className='_space_between' sx={{ mt: 5 }}>
      <Grid>
        <Typography>Nơi nhận</Typography>
        <Typography>- Ban Giám đốc sở</Typography>
        <Typography>- Lưu:VT; TNN, KS&KTTV; VP, 10b</Typography>
      </Grid>

      <Grid>
        <Typography className='font-weight-bold' variant='h6'>
          Người thống kê
        </Typography>
      </Grid>
    </Grid>
  )
}
export default FooterReport
