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
import HeaderReport from '../HeaderReport';
import FooterReport from '../FooterReport';
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import DeleteData from 'src/@core/components/delete-data'
import { Report10State } from './Report10InterFace';
import CreateReport10 from './CreateReport10';

const FormContruction = () => {
  const [data, setData] = useState<Report10State[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false);
    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState);
    };
  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoMuoi/danhsach')
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
          <Typography variant='h5'>Biểu mẫu số 10. Số lượng công trình khai thác nước mặt, nước dưới đất phân theo mục đích sử dụng </Typography>
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
          Số lượng công trình khai thác nước mặt, nước dưới đất phân theo mục đích sử dụng
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      <CreateReport10 isEdit={false} setPostSuccess={handlePostSuccess} />

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
                    Lưu vực/sông/ <br/>
                    Vùng/Tỉnh
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={3}>
                    Tổng số công trình
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={5}>
                    Số lượng công trình 
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={4}>
                    Thao tác
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell size='small' align='center' colSpan={2}>
                   Tưới
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Thủy điện
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={2}>
                    Mục đích khác
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell size='small' align='center' >
                   Nguồn nước mặt
                  </TableCell>
                  <TableCell size='small' align='center' >
                   Nguồn nước dưới đất
                  </TableCell>
                  <TableCell size='small' align='center' >
                   Nguồn nước mặt
                  </TableCell>
                  <TableCell size='small' align='center' >
                   Nguồn nước dưới đất
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
                    (7)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className='tableBody'>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align='center' className="size='small' align-middle font-13">{index + 1}</TableCell>
                    <TableCell  className="size='small' align-middle font-13">{item.luuVucSong}</TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongCongTrinh}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.ctTuoiNuocMat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.ctTuoiNuocDuoiDat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.ctThuyDien}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.ctMucDichKhacNuocMat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.ctMucDichKhacNuocDuoiDat}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      <Box>
                        <CreateReport10 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                        <DeleteData url={'BieuMauSoMuoi'} data={item} setPostSuccess={handlePostSuccess} />
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

const Bieumau10 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 10'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 10</Typography>
              <Typography className='text-success text-weight-bold _font12'>Số lượng CTKT phân theo sử dụng</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU10.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau10
