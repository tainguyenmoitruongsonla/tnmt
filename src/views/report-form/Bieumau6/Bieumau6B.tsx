import Paper from '@mui/material/Paper'
import {
  Grid,
  TextField,
  Typography,
  Link,
  Box,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';
import DialogControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import FooterReport from '../FooterReport';
import HeaderReport from '../HeaderReport';

const FormContruction = () => {
  return (
    <Paper sx={{ p: 8 }}>
      {/* dautrang */}
      <Grid container>
        <Grid md={11}>
          <Typography variant='h5'>
            Biểu mẫu số 6. Tổng dung tích các hồ chứa lớn, quan trọng trên các lưu vực sông
          </Typography>
        </Grid>
        <Grid md={1}>
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </Grid>
      </Grid>
      <HeaderReport/>

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h4'>
          BÁO CÁO
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
        Tổng dung tích các hồ chứa thủy điện trên địa bàn tỉnh Quảng Ngãi
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>

      <Grid className='_text_center' sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell size='small' align='center' rowSpan={3}>
                  STT
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Huyện
                </TableCell>
                <TableCell size='small' align='center'  rowSpan={2}>
                  Số lượng hồ chứa tổng hợp(hồ)
                </TableCell>
                <TableCell size='small' align='center' colSpan={4}>
                  Tổng dung tích
                </TableCell>
                
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center' >
                Toàn bộ (triệu m3)
                </TableCell>
                <TableCell size='small' align='center' >
                Hiệu tích (triệu m3)
                </TableCell>
                <TableCell size='small' align='center' >
                Phòng lũ (triệu m3)
                </TableCell>
                <TableCell size='small' align='center' >
                Tích được vào cuối mùa lũ, đầu mùa cạn (triệu m3)
                </TableCell>
              </TableRow>


              <TableRow>
                <TableCell size='small' align='center'>
                  (1)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (2)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (3)&nbsp;
                </TableCell>

                <TableCell size='small' align='center'>
                  (4)
                </TableCell>
                <TableCell size='small' align='center'>
                  (5)
                </TableCell>
                <TableCell size='small' align='center'>
                  (6)&nbsp;
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className='tableBody'>
              <TableRow>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
               
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <FooterReport/>
    </Paper>
  )
}

const Bieumau6B = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 6A'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 6B</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Tổng dung tích các hồ chứa thủy lợi
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU6.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau6B
