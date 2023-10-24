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
import FooterReport from '../FooterReport'
import HeaderReport from '../HeaderReport'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import DeleteData from 'src/@core/components/delete-data'
import { Report12State } from './Report12InterFace';
import CreateReport12 from './CreateReport12';

const FormContruction = () => {
  const [data, setData] = useState<Report12State[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false);
    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState);
    };
  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoMuoiHai/danhsach')
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
            Biểu mẫu số 12. Lượng nước khai thác, sử dụng (quy mô) đã được cấp giấy phép khai thác tài nguyên nước
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
          Lượng nước khai thác, sử dụng (quy mô) đã được cấp giấy phép khai thác tài nguyên nước
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      <CreateReport12 isEdit={false} setPostSuccess={handlePostSuccess} />
      {loading ?(
        <BoxLoading />
      ):(
<Grid className='_text_center' sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell size='small' align='center' rowSpan={4}>
                  STT
                </TableCell>
                <TableCell size='small' align='center' rowSpan={3}>
                  Lưu vực sông/ <br /> Vùng/Tỉnh
                </TableCell>
                <TableCell size='small' align='center' rowSpan={3}>
                  Tổng số công trình
                </TableCell>
                <TableCell size='small' align='center' colSpan={5}>
                  Lượng nước khai thác, sử dụng đã được cấp phép <br /> phân theo mục đích khai thác và theo nguồn nước
                </TableCell>
                <TableCell size='small' align='center' rowSpan={4}>
                  Thao tác
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center' colSpan={2}>
                  Tưới (m3/s)
                </TableCell>
                <TableCell size='small' align='center'>
                  Thủy điện(MW)
                </TableCell>
                <TableCell size='small' align='center' colSpan={2}>
                  Mục đích khác <br />
                  (m3/ngày đêm)
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  Nguồn nước mặt
                </TableCell>
                <TableCell size='small' align='center'>
                  Nguồn nước dưới đất
                </TableCell>
                <TableCell size='small' align='center'>
                  
                </TableCell>
                <TableCell size='small' align='center'>
                  Nguồn nước mặt
                </TableCell>
                <TableCell size='small' align='center'>
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
              </TableRow>
            </TableHead>

            <TableBody className='tableBody'>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align='center' className="size='small' align-middle font-13">{index + 1}</TableCell>
                    <TableCell  className="size='small' align-middle font-13">{item.luuVucSong}</TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tongSoCongTrinh}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tuoiNguonNuocMat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.tuoiNguonNuocDuoiDat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.khaiThacThuyDien}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.mucDichKhacNguonNuocMat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.mucDichKhacNguonNuocDD}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      <Box>
                        <CreateReport12 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                        <DeleteData url={'BieuMauSoMuoiHai'} data={item} setPostSuccess={handlePostSuccess} />
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

const Bieumau12 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 12'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 12</Typography>
              <Typography className='text-success text-weight-bold _font12'>Lượng nước khai thác sử dụng</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU12.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau12
