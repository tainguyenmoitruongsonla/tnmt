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
import React from 'react'
import HeaderReport from '../HeaderReport'
import FooterReport from '../FooterReport'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import DeleteData from 'src/@core/components/delete-data'
import { Report16State } from './Report16InterFace'
import CreateReport16 from './CreateReport16'
import { CalculateReportData } from '../CalculateData'

const FormContruction = () => {
  const [data, setData] = useState<Report16State[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoMuoiSau/danhsach')
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
          <Typography variant='h5'>Biểu mẫu số 16. Tổng hợp số lượng giấy phép tài nguyên nước đã được cấp</Typography>
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
          Tổng hợp số lượng giấy phép tài nguyên nước đã được cấp
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      <CreateReport16 isEdit={false} setPostSuccess={handlePostSuccess} />

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
                    Loại giấy phép
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2} colSpan={3}>
                    Tổng số giấy phép đã cấp
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={6}>
                    Tổng số giấy phép cấp phân theo thẩm quyền
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={4}>
                    Thao tác
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell size='small' align='center' colSpan={3}>
                    Bộ TNMT cấp
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Địa phương cấp
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
                </TableRow>
              </TableHead>
              <TableBody className='tableBody'>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align='center' className="size='small' align-middle font-13">{index + 1}</TableCell>
                    <TableCell  className="size='small' align-middle font-13">{item.loaiGiayPhep}</TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongGPCapKyTruoc}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongGPCapKyBaoCao}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {CalculateReportData(item.tongGPCapKyBaoCao, item.tongGPCapKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongGPBoCapKyTruoc}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongGPBoCapKyBaoCao}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {CalculateReportData(item.tongGPBoCapKyBaoCao, item.tongGPBoCapKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongGPDiaPhuongCapKyTruoc}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongGPDiaPhuongCapBaoCao}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {CalculateReportData(item.tongGPDiaPhuongCapBaoCao, item.tongGPDiaPhuongCapKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      <Box>
                        <CreateReport16 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                        <DeleteData url={'BieuMauSoMuoiSau'} data={item} setPostSuccess={handlePostSuccess} />
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

const Bieumau16 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 16'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 16</Typography>
              <Typography className='text-success text-weight-bold _font12'>Số lượng giấy phép TNN đã cấp</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU16.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau16
