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
import HeaderReport from '../HeaderReport'
import FooterReport from '../FooterReport'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import DeleteData from 'src/@core/components/delete-data'
import { CalculateReportData } from '../CalculateData'
import CreateReport9 from './CreateReport9'

interface Report1 {
  id: number
  luuVucSong: string
  tongCongTrinhKyTruoc: number
  tongCongTrinhKyBaoCao: number
  congTrinhNuocMatKyTruoc: number
  congTrinhNuocMatKyBaoCao: number
  congTrinhNDDKyTruoc: number
  congTrinhNDDKyBaoCao: number
  ghiChu: string
}
const FormContruction = () => {
  const [data, setData] = useState<Report1[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoChin/danhsach')
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
          <Typography variant='h5'>Biểu mẫu số 9. Số lượng công trình khai thác phân theo nguồn nước</Typography>
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
          Số lượng công trình khai thác phân theo nguồn nước
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      <CreateReport9 isEdit={false} setPostSuccess={handlePostSuccess} />
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
                  <TableCell size='small' align='center' rowSpan={2}>
                    Huyện
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Tổng số công trình
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Số lượng công trình khai thác nước mặt
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Số lượng công trình khai thác nước dưới đất
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={4}>
                    Thao tác
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
                    (3)
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (4)= (3)-(2)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (5)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (6)
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (7)=(6)-(5)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (8)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (9)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (10)=(9)-(8)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className='tableBody'>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align='center' className="size='small' align-middle font-13">{index + 1}</TableCell>
                    <TableCell  className="size='small' align-middle font-13">{item.luuVucSong}</TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongCongTrinhKyTruoc}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongCongTrinhKyBaoCao}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {CalculateReportData(item.tongCongTrinhKyBaoCao, item.tongCongTrinhKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.congTrinhNuocMatKyTruoc}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.congTrinhNuocMatKyBaoCao}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {CalculateReportData(item.congTrinhNuocMatKyBaoCao, item.congTrinhNuocMatKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.congTrinhNDDKyTruoc}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.congTrinhNDDKyBaoCao}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {CalculateReportData(item.congTrinhNDDKyBaoCao, item.congTrinhNDDKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      <Box>
                        <CreateReport9 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                        <DeleteData url={'BieuMauSoChin'} data={item} setPostSuccess={handlePostSuccess} />
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

const Bieumau9 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 9'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 9</Typography>
              <Typography className='text-success text-weight-bold _font12'>Số lượng CTKT theo nguồn nước</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU9.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau9
