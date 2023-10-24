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
import HeaderReport from '../HeaderReport'
import FooterReport from '../FooterReport'

const FormContruction = () => {
  return (
    <Paper sx={{ p: 8 }}>
      {/* dautrang */}
      <Grid container>
        <Grid md={11}>
          <Typography variant='h5'>
            Biểu mẫu số 20. Danh mục các công trình khai thác, sử dụng tài nguyên nước
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
          Danh mục các công trình khai thác, sử dụng tài nguyên nước
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
                  Tên công trình
                </TableCell>
                <TableCell size='small' align='center' rowSpan={3}>
                  Loại hình công trình <br />
                  (hồ,đập,cống,trạm bơm,giếng khoan,khác)
                </TableCell>
                <TableCell size='small' align='center' rowSpan={3}>
                  Nguồn nước khai thác <br /> (hồ,đập,cống,trạm bơm,giếng khoan,khác)
                </TableCell>
                <TableCell size='small' align='center' colSpan={3} >
                  Vị trí
                </TableCell>
                <TableCell size='small' align='center' colSpan={5}>
                  Thông số cơ bản
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center' rowSpan={2}>
                  Xã
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Huyện
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Tỉnh
                </TableCell>

                <TableCell size='small' align='center' colSpan={3}>
                  Hồ chứa,đập
                </TableCell>
                <TableCell size='small' align='center' colSpan={2}>
                  Giếng khoan và <br /> loại hình khác
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  Dung tích toàn bộ (triệu m3)
                </TableCell>
                <TableCell size='small' align='center'>
                  Dung tích hữu ích (triệu m3)
                </TableCell>
                <TableCell size='small' align='center'>
                  Công suất (MW)
                </TableCell>
                <TableCell size='small' align='center'>
                  Lưu lượng thiết kế(m3/ngày đêm)
                </TableCell>
                <TableCell size='small' align='center'>
                  Lưu lượng thực tế (m3/ngày đêm)
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
                  (3)=(2)-(1)
                </TableCell>

                <TableCell size='small' align='center'>
                  (4)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (5)
                </TableCell>
                <TableCell size='small' align='center'>
                  (6)
                </TableCell>

                <TableCell size='small' align='center'>
                  (7)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (8)
                </TableCell>
                <TableCell size='small' align='center'>
                  (9)
                </TableCell>

                <TableCell size='small' align='center'>
                  (10)
                </TableCell>
                <TableCell size='small' align='center'>
                  (11)
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
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <FooterReport />
    </Paper>
  )
}

const Bieumau20 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 20'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 20</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Danh mục các CTKT,SD tài nguyên nước
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

export default Bieumau20
