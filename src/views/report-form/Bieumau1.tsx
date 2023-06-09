import Paper from '@mui/material/Paper'
import {
  Grid,
  TextField,
  Typography,
  Link,
  Box,
  IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import DialogControlFullScreen from 'src/views/DialogControlFullScreen'
import TableList from '../construction/TableList';

const FormContruction = (  ) => {

  return (
    <Paper sx={{p:2}}>
      {/* dautrang */}
      <Grid container>
        <Grid md={11}>
          <Typography>
            Biểu mẫu số 1. Số lượng trạm quan trắc khí tượng, thủy văn, tài nguyên nước, nước dưới đất
          </Typography>
        </Grid>
        <Grid md={1}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid className='_space_between'>
        <Grid className='_text_center'>
          <Typography>
            UBND Tỉnh Sơn La
          </Typography>
          <Typography >
            UBND Tỉnh Sơn La
          </Typography>
          <Typography>
            Số:
            <TextField size='small' sx={{width:'50px'}}></TextField>
            /STNMT-TNN-KS&KTTV        
          </Typography>
        </Grid>

        <Grid  className='_text_center'>
          <Typography>
            CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </Typography>
          <Typography>
            Độc lập - Tự do - Hạnh phúc
          </Typography>
          <Typography>
            Sơn La, ngày 25 tháng 04 năm 2023        
          </Typography>
        </Grid>
      </Grid>

      <Grid  className='_text_center'>
          <Typography>
            BÁO CÁO
          </Typography>
          <Typography>
            Số lượng trạm quan trắc khí tượng, thuỷ văn, tài nguyên nước, nước dưới đất
          </Typography>
          <Typography>
          (Kỳ báo cáo: <TextField size='small' sx={{width:'50px'}}></TextField>)       
          </Typography>
      </Grid>

      <Grid  className='_text_center'>
          <TableList/>
      </Grid>
    </Paper>
  )
  
}

const Bieumau1 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 1'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() =>
                openDialogs(<FormContruction />, formTitle)
              }>
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
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau1
