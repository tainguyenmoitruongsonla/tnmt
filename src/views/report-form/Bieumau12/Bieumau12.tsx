import Paper from '@mui/material/Paper'
import {
  Grid,
  TextField,
  Typography,
  Link,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';
import DialogControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import FooterReport from '../FooterReport'
import HeaderReport from '../HeaderReport'

const FormContruction = () => {
  return (
    <Paper sx={{ p: 8 }}>
      {/* dautrang */}
      <Grid container>
        <Grid md={11}>
          <Typography variant='h5'>
            Biểu mẫu số 12. Lượng nước khai thác, sử dụng (quy mô) đã được cấp giấy phép khai thác tài nguyên nước
          </Typography>
        </Grid>
        <Grid md={1}>
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </Grid>
      </Grid>
      <HeaderReport />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h4'>
          BÁO CÁO
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          Lượng nước khai thác, sử dụng (quy mô) đã được cấp giấy phép khai thác tài nguyên nước
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
                <TableCell size='small' align='center' rowSpan={4}>
                  STT
                </TableCell>
                <TableCell size='small' align='center' rowSpan={3}>
                  Lưu vực sông/ <br /> Vùng/Tỉnh
                </TableCell>
                <TableCell size='small' align='center' rowSpan={3}>
                  Tổng số công trình
                </TableCell>
                <TableCell size='small' align='center' colSpan={5}>
                  Lượng nước khai thác, sử dụng đã được cấp phép <br /> phân theo mục đích khai thác và theo nguồn nước
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center' colSpan={2}>
                  Tưới (m3/s)
                </TableCell>
                <TableCell size='small' align='center'>
                  Thủy điện(MW)
                </TableCell>
                <TableCell size='small' align='center' colSpan={2}>
                  Mục đích khác <br />
                  (m3/ngày đêm)
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  Nguồn nước mặt
                </TableCell>
                <TableCell size='small' align='center'>
                  Nguồn nước dưới đất
                </TableCell>
                <TableCell size='small' align='center'>
                  
                </TableCell>
                <TableCell size='small' align='center'>
                  Nguồn nước mặt
                </TableCell>
                <TableCell size='small' align='center'>
                  Nguồn nước dưới đất
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
                <TableCell size='small' align='center'>
                  (7)&nbsp;
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
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <FooterReport />
    </Paper>
  )
}

const Bieumau12 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 12'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 12</Typography>
              <Typography className='text-success text-weight-bold _font12'>Lượng nước khai thác sử dụng</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU12.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau12
