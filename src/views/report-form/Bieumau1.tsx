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

const FormContruction = () => {
  return (
    <Paper sx={{ p: 8 }}>
      {/* dautrang */}
      <Grid container>
        <Grid md={11}>
          <Typography variant='h5'>
            Biểu mẫu số 1. Số lượng trạm quan trắc khí tượng, thủy văn, tài nguyên nước, nước dưới đất
          </Typography>
        </Grid>
        <Grid md={1}>
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid className='_space_between' sx={{ mt: 5 }}>
        <Grid className='_text_center'>
          <Typography variant='h5'>UBND Tỉnh Sơn La</Typography>
          <Typography className='font-weight-bold ' variant='h5'>
            SỞ TÀI NGUYÊN VÀ MÔI TRƯỜNG
          </Typography>
          <Typography variant='h5'>
            Số:
            <TextField size='small' sx={{ width: '50px' }}></TextField>
            /STNMT-TNN-KS&KTTV
          </Typography>
        </Grid>

        <Grid className='_text_center'>
          <Typography variant='h5'>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</Typography>
          <Typography className='font-weight-bold ' variant='h5'>
            Độc lập - Tự do - Hạnh phúc
          </Typography>
          <Typography variant='h6'>Sơn La, ngày 25 tháng 04 năm 2023</Typography>
        </Grid>
      </Grid>

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h4'>
          BÁO CÁO
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          Số lượng trạm quan trắc khí tượng, thuỷ văn, tài nguyên nước, nước dưới đất
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
                  Lưu vực
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2} colSpan={3}>
                  Tổng số trạm quan trắc(trạm)
                </TableCell>
                <TableCell size='small' align='center' colSpan={12}>
                  Loại trạm
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center' colSpan={3}>
                  Khí tượng
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Thủy văn, thủy văn kết hợp tài nguyên nước
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Tài nguyên nước độc lập
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Quan trắc nước dưới đất
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  Kỳ trước
                </TableCell>
                <TableCell size='small' align='center'>
                  Kỳ báo cáo
                </TableCell>
                <TableCell size='small' align='center'>
                  Thay đổi
                </TableCell>

                <TableCell size='small' align='center'>
                  Kỳ trước
                </TableCell>
                <TableCell size='small' align='center'>
                  Kỳ báo cáo
                </TableCell>
                <TableCell size='small' align='center'>
                  Thay đổi
                </TableCell>

                <TableCell size='small' align='center'>
                  Kỳ trước
                </TableCell>
                <TableCell size='small' align='center'>
                  Kỳ báo cáo
                </TableCell>
                <TableCell size='small' align='center'>
                  Thay đổi
                </TableCell>

                <TableCell size='small' align='center'>
                  Kỳ trước
                </TableCell>
                <TableCell size='small' align='center'>
                  Kỳ báo cáo
                </TableCell>
                <TableCell size='small' align='center'>
                  Thay đổi
                </TableCell>

                <TableCell size='small' align='center'>
                  Kỳ trước
                </TableCell>
                <TableCell size='small' align='center'>
                  Kỳ báo cáo
                </TableCell>
                <TableCell size='small' align='center'>
                  Thay đổi
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
                  (4)=(3)-(2)
                </TableCell>
                <TableCell size='small' align='center'>
                  (5)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (6)&nbsp;
                </TableCell>

                <TableCell size='small' align='center'>
                  (7)=(6)-(5)
                </TableCell>
                <TableCell size='small' align='center'>
                  (8)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (9)&nbsp;
                </TableCell>

                <TableCell size='small' align='center'>
                  (10)=(9)-(8)
                </TableCell>
                <TableCell size='small' align='center'>
                  (11)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (12)&nbsp;
                </TableCell>

                <TableCell size='small' align='center'>
                  (13)=(12)-(11)
                </TableCell>
                <TableCell size='small' align='center'>
                  (14)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (15)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (16)=(15)-(14)
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
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
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
    </Paper>
  )
}

const Bieumau1 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 1'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 1</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Số lượng trạm quan trắc khí tượng thủy văn,tài nguyên nước,nước dưới đất
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU1.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau1
