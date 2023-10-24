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
import FooterReport from '../FooterReport'
import HeaderReport from '../HeaderReport'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import DeleteData from 'src/@core/components/delete-data'
import { Report6AState } from './Report6Interface'
import CreateReport6 from './CreateForm6'


const FormContruction = () => {
  const [data, setData] = useState<Report6AState[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoSau/danhsach')
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
            Biểu mẫu số 6. Tổng dung tích các hồ chứa lớn, quan trọng trên các lưu vực sông
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
          Tổng dung tích các hồ chứa thủy điện trên địa bàn tỉnh Quảng Ngải
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      <CreateReport6 isEdit={false}  setPostSuccess={handlePostSuccess} />
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead className='tableHead'>
                <TableRow>
                  <TableCell size='small' align='center' rowSpan={3}>
                    STT
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Huyện
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Số lượng hồ chứa tổng hợp(hồ)
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={4}>
                    Tổng dung tích
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={3}>
                    Thao tác
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell size='small' align='center'>
                    Toàn bộ (triệu m3)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Hiệu tích (triệu m3)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Phòng lũ (triệu m3)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Tích được vào cuối mùa lũ, đầu mùa cạn (triệu m3)
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
                {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {index + 1}
                    </TableCell>
                    <TableCell className="  size='small' align-middle font-13">{item.luuVucSong}</TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.slHoChua}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.dungTichToanBo}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.dungTichHuuich}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.dungTichPhongLu}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.dungTichTichDuoc}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      <Box>
                        <CreateReport6 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                        <DeleteData url={'BieuMauSoSau'} data={item} setPostSuccess={handlePostSuccess} />
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

const Bieumau6A = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 6A'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 6A</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Tổng dung tích các hồ chứa thủy lợi
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU6.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau6A
