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
  TableRow,
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';
import DialogControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import HeaderReport from '../HeaderReport';
import FooterReport from '../FooterReport';

const FormContruction = () => {

  return (
    <Paper sx={{ p: 8 }}>
      {/* dautrang */}
      <Grid container>
        <Grid md={11}>
          <Typography variant='h5'>
          Biểu mẫu số 24. Tổng hợp tình hình xả nước thải 
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
        <Typography className='font-weight-bold ' variant="h4">
          BÁO CÁO
        </Typography>
        <Typography className='font-weight-bold ' variant="h6">
        Tổng hợp tình hình xả nước thải 
        </Typography>
        <Typography className='font-weight-bold ' variant="h6">
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>

      <Grid className='_text_center' sx={{mt:3}} >
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell size='small' align='center' rowSpan={3}>
                  STT
                </TableCell>
                <TableCell size='small' align='center' rowSpan={3}>
                  Thời gian
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                Lưu lượng xả nước thải  <br />
                (m3/ngày đêm)
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Lưu lượng xả thải <br/> được cấp phép<br />
                  (m3/ngày đêm hoặc m3/s tùy loại hình)
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Số ngày xả <br />
                  nước thải
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Tổng lượng <br />
                  xả thải(nghìn m3)
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  Lớn nhất
                </TableCell>
                <TableCell size='small' align='center'>
                  Nhỏ nhất
                </TableCell>
                <TableCell size='small' align='center'>
                  Trung bình
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
                <TableCell className="text-center  size='small' align-middle font-13">Tháng 1</TableCell>
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

const Bieumau24= () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 24'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() =>
            openDialogs(<FormContruction />, formTitle)
          }>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 24</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Tổng hợp tình hình xả nước thải
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU20.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau24
