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
import { Report13State } from './Report13InterFace'
import CreateReport13 from './CreateReport13'
import { CalculateMedium } from '../CalculateData'

const FormContruction = () => {
  const [data, setData] = useState<Report13State[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoMuoiBa/danhsach')
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
            Biểu mẫu số 13.Tổng hợp các đặc trưng của các chỉ tiêu cơ bản về chất lượng nước mặt
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
          Tổng hợp các đặc trưng của các chỉ tiêu cơ bản về chất lượng nước mặt
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      <CreateReport13 isEdit={false} setPostSuccess={handlePostSuccess} />
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
                  <TableCell size='small' align='center' rowSpan={3}>
                    Vị trí quan trắc
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={9}>
                    Kết quả phân tích chất lượng nước
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={3}>
                    Ghi chú
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={4}>
                    Thao tác
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell size='small' align='center' colSpan={3}>
                    BOD5
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    COD
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    DO
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
               
                  <TableCell size='small' align='center'>
                    Lớn nhất
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Nhỏ nhất
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Trung bình
                  </TableCell>
               
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
                  <TableCell size='small' align='center'>
                    (7)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (8)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (9)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (10)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (11)
                  </TableCell>
                  
                </TableRow>
              </TableHead>

              <TableBody className='tableBody'>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align='center' className="size='small' align-middle font-13">{index + 1}</TableCell>
                    <TableCell  className="size='small' align-middle font-13">{item.viTriQuanTrac}</TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.boD5LonNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.boD5NhoNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {CalculateMedium(item.boD5LonNhat,item.boD5NhoNhat)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.codLonNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.codNhoNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {CalculateMedium(item.codLonNhat,item.codNhoNhat)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.doLonNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.doNhoNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {CalculateMedium(item.doLonNhat,item.doNhoNhat)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.ghiChu}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      <Box>
                        <CreateReport13 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                        <DeleteData url={'BieuMauSoMuoiBa'} data={item} setPostSuccess={handlePostSuccess} />
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

const Bieumau13 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 13'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 13</Typography>
              <Typography className='text-success text-weight-bold _font12'>Chất lượng nước mặt</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU13.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau13
