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
import DownloadIcon from '@mui/icons-material/Download'
import DialogControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import HeaderReport from '../HeaderReport'
import FooterReport from '../FooterReport'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import DeleteData from 'src/@core/components/delete-data'
import { Report17State } from './Report17InterFace'
import CreateReport17 from './CreateReport17'
import { CalculateReportData } from '../CalculateData'

const FormContruction = () => {
  const [data, setData] = useState<Report17State[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoMuoiBay/danhsach')
        .then(data => {
          setData(data)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    getDataReport1()
  }, [postSuccess])

  return (
    <Paper sx={{ p: 8 }}>
      {/* dautrang */}
      <Grid container>
        <Grid md={11}>
          <Typography variant='h5'>
            Biểu mẫu số 17. Tổng hợp kết quả phê duyệt tiền cấp quyền khai thác tài nguyên nước
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
          Tổng hợp kết quả phê duyệt tiền cấp quyền khai thác tài nguyên nước
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      <CreateReport17 isEdit={false} setPostSuccess={handlePostSuccess} />

      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead className='tableHead'>
                <TableRow>
                  <TableCell size='small' align='center' rowSpan={4}>
                    STT
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={4}>
                    Tỉnh
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2} colSpan={3}>
                    Tổng số công trình đã <br /> phê duyệt tiền cấp quyền
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={6}>
                    Tổng số công trình đã phê duyệt tiền <br /> cấp quyền phân theo thẩm quyền
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2} colSpan={3}>
                    Tổng số tiền cấp quyền <br />
                    đã phê duyệt(tỷ đồng)
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={4}>
                    Thao tác
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell size='small' align='center' colSpan={3}>
                    Bộ TNMT phê duyệt
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Địa phương phê duyệt
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell size='small' align='center'>
                    Lũy kế đến kỳ trước
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Lũy kế đến kỳ báo cáo
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Thay đổi
                  </TableCell>

                  <TableCell size='small' align='center'>
                    Lũy kế đến kỳ trước
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Lũy kế đến kỳ báo cáo
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Thay đổi
                  </TableCell>

                  <TableCell size='small' align='center'>
                    Lũy kế đến kỳ trước
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Lũy kế đến kỳ báo cáo
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Thay đổi
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Lũy kế đến kỳ trước
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Lũy kế đến kỳ báo cáo
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
                    (3)= (2)-(1)
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (4)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (5)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (6)=(5)-(4)
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (7)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (8)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (9)=(8)-(7)
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (10)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (11)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (12)=(11)-(10)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className='tableBody'>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align='center' className="size='small' align-middle font-13">{index + 1}</TableCell>
                    <TableCell  className="size='small' align-middle font-13">{item.tinh}</TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongCTPheDuyetTCQKyTruoc}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongCTPheDuyetTCQKyBaoCao}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {CalculateReportData(item.tongCTPheDuyetTCQKyBaoCao, item.tongCTPheDuyetTCQKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongCTPheDuyetTCQBoKyTruoc}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongCTPheDuyetTCQBoKyBaoCao}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {CalculateReportData(item.tongCTPheDuyetTCQBoKyBaoCao, item.tongCTPheDuyetTCQBoKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongCTPheDuyetTCQDiaPhuongKyTruoc}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongCTPheDuyetTCQDiaPhuongKyBaoCao}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {CalculateReportData(item.tongCTPheDuyetTCQDiaPhuongKyBaoCao, item.tongCTPheDuyetTCQDiaPhuongKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongTCQpKyTruoc}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongTCQKyBaoCao}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {CalculateReportData(item.tongTCQKyBaoCao, item.tongTCQpKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      <Box>
                        <CreateReport17 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                        <DeleteData url={'BieuMauSoMuoiBay'} data={item} setPostSuccess={handlePostSuccess} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}

      <FooterReport />
    </Paper>
  )
}

const Bieumau17 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 17'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 17</Typography>
              <Typography className='text-success text-weight-bold _font12'>Cấp quyền khai thác</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU17.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau17
