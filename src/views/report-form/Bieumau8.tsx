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
import HeaderReport from './HeaderReport'
import FooterReport from './FooterReport'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import CreateReport2 from './Bieumau2/CreateReport2'
import DeleteData from 'src/@core/components/delete-data'
import { CalculateReportData } from './CalculateData'

interface Report1 {
  id: number
  tangChuaNuoc: string
  slGieng: string
  mucNuocMaxKyTruoc: number
  mucNuocMaxKyBaoCao: number
  mucNuocMediumKyTruoc: number
  mucNuocMediumKyBaoCao: number
  mucNuocMinKyTruoc: number
  mucNuocMinKyBaoCao: number
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
      await getData('BieuMauSoTam/danhsach')
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
          <Typography variant='h5'>Biểu mẫu số 8. Tổng hợp các đặc trưng mực nước dưới đất</Typography>
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
          Tổng hợp các đặc trưng mực nước dưới đất
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
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
                    Vùng/tầng <br />
                    chứa nước
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Số lượng <br />
                    giếng quan trắc
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Mực nước lớn nhất(m)
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Mực nước trung bình (m)
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Mực nước nhỏ nhất (m)
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={4}>
                    Thao tác
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
                    (5)=(4)-(3)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (6)&nbsp;
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (7)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (8)=(7)-(6)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (9)
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (10)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (11)=(10)-(9)
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody className='tableBody'>
                {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center  size='small' align-middle font-13">{index + 1}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.tangChuaNuoc}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.slGieng}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.mucNuocMaxKyTruoc}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.mucNuocMaxKyBaoCao}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {CalculateReportData(item.mucNuocMaxKyBaoCao, item.mucNuocMaxKyTruoc)}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.mucNuocMediumKyTruoc}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.mucNuocMediumKyBaoCao}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {CalculateReportData(item.mucNuocMediumKyBaoCao, item.mucNuocMediumKyTruoc)}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.mucNuocMinKyTruoc}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.mucNuocMinKyBaoCao}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {CalculateReportData(item.mucNuocMinKyBaoCao, item.mucNuocMinKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      <Box>
                        <CreateReport2 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                        <DeleteData url={'BieuMauSoHai'} data={item} setPostSuccess={handlePostSuccess} />
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

const Bieumau8 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 8'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 8</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Tổng hợp các đặc trưng mực nước dưới đất
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU8.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau8
