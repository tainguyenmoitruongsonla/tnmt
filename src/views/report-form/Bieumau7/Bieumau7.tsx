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
import BoxLoading from 'src/@core/components/box-loading'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import DeleteData from 'src/@core/components/delete-data'
import { Report7State } from './Report7Interface'
import CreateReport7 from './CreateForm7'

const FormContruction = () => {
  const [data, setData] = useState<Report7State[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoBay/danhsach')
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
            Biểu mẫu số 7. Diện tích đã được điều tra, đánh giá tài nguyên nước dưới đất
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
          Diện tích đã được điều tra, đánh giá tài nguyên nước dưới đất
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      <CreateReport7 isEdit={false}  setPostSuccess={handlePostSuccess} />
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead className='tableHead'>
                <TableRow>
                  <TableCell size='small' align='center' rowSpan={2}>
                    STT
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Vùng/khu vực
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Vùng điều tra
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Diện tích được <br /> kiểm tra (km2)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Tầng chứa nước <br /> được điều tra
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Tỷ lệ điều tra <br />
                    đánh giá
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Thao tác
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align='center'>(1)</TableCell>
                  <TableCell align='center'>(2)</TableCell>
                  <TableCell align='center'>(3)</TableCell>
                  <TableCell align='center'>(4)</TableCell>
                  <TableCell align='center'>(5)</TableCell>
                </TableRow>
              </TableHead>

              <TableBody className='tableBody'>
                {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {index + 1}
                    </TableCell>
                    <TableCell className="  size='small' align-middle font-13">{item.khuVuc}</TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.vungDieuTra}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.dienTichDuocDieuTra}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.tangChuaNuocDieuTra}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.tyLeDieuTra}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      <Box>
                        <CreateReport7 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                        <DeleteData url={'BieuMauSoBay'} data={item} setPostSuccess={handlePostSuccess} />
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

const Bieumau7 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 7'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 7</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Diện tích đã được điều tra,đánh giá tài nguyên nước dưới đất
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU7.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau7
