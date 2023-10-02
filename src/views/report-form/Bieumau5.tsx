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
import DownloadIcon from '@mui/icons-material/Download'
import DialogControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import HeaderReport from './HeaderReport'
import FooterReport from './FooterReport'

const FormContruction = () => {
  return (
    <Paper sx={{ p: 8 }}>
      {/* dautrang */}
      <Grid container>
        <Grid md={11}>
          <Typography variant='h5'>Biểu mẫu số 5. Dòng chảy trung bình tháng năm trong kỳ báo cáo</Typography>
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
         Dòng chảy trung bình tháng năm trong kỳ báo cáo
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
                <TableCell size='small' align='center' rowSpan={2}>
                  STT
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Tên trạm
                </TableCell>
                
                <TableCell size='small' align='center' colSpan={12}>
                 Lưu lượng(m3/s)
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Lưu lượng bình quân(m3/s)
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  I
                </TableCell>
                <TableCell size='small' align='center'>
                  II
                </TableCell>
                <TableCell size='small' align='center'>
                  III
                </TableCell>

                <TableCell size='small' align='center'>
                  IV
                </TableCell>
                <TableCell size='small' align='center'>
                  V
                </TableCell>
                <TableCell size='small' align='center'>
                  VI
                </TableCell>

                <TableCell size='small' align='center'>
                  VII
                </TableCell>
                <TableCell size='small' align='center'>
                  VIII
                </TableCell>
                <TableCell size='small' align='center'>
                  IX
                </TableCell>

                <TableCell size='small' align='center'>
                  X
                </TableCell>
                <TableCell size='small' align='center'>
                  XI
                </TableCell>
                <TableCell size='small' align='center'>
                  XII
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

const Bieumau5 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 5'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 5</Typography>
              <Typography className='text-success text-weight-bold _font12'>
               Dòng chảy trung bình tháng năm trong kỳ báo cáo
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU5.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau5
