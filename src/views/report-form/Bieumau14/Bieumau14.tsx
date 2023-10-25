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
import { Report14State } from './Report14InterFace'
import CreateReport14 from './CreateReport14'
import { CalculateMedium } from '../CalculateData'

const FormContruction = () => {
  const [data, setData] = useState<Report14State[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoMuoiBon/danhsach')
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
            Biểu mẫu số 14. Tổng hợp các đặc trưng của các chỉ tiêu cơ bản về chất lượng nước dưới đất
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
          Tổng hợp các đặc trưng của các chỉ tiêu cơ bản về chất lượng nước dưới đất
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      <CreateReport14 isEdit={false} setPostSuccess={handlePostSuccess} />
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
                  <TableCell size='small' align='center' colSpan={18}>
                    Kết quả phân tích chất lượng nước dưới đất
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
                    pH
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Độ cứng(tính theo CaCO3)
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Amoni NH4+(tính theo N)
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Nitrat (NO3-) <br/>
                    (tính theo N)
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Sulfat(SO42-)
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                   Asen (As)
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
                  <TableCell size='small' align='center'>
                    (12)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (13)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (14)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (15)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (16)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (17)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (18)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (19)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (20)&nbsp;
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody className='tableBody'>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {index + 1}
                    </TableCell>
                    <TableCell className="size='small' align-middle font-13">{item.viTriQuanTrac}</TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.pHlonNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.phNhoNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {CalculateMedium(item.pHlonNhat, item.phNhoNhat)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.doCungLonNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.doCungNhoNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {CalculateMedium(item.doCungLonNhat, item.doCungNhoNhat)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.amoniLonNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.amoniNhoNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {CalculateMedium(item.amoniLonNhat, item.amoniNhoNhat)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.nitratLonNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.nitratNhoNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {CalculateMedium(item.nitratLonNhat, item.nitratNhoNhat)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.sulfatLonNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.sulfatNhoNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {CalculateMedium(item.sulfatLonNhat, item.sulfatNhoNhat)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.asenLonNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.asenNhoNhat}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {CalculateMedium(item.asenLonNhat, item.asenNhoNhat)}
                    </TableCell>
                    <TableCell align='center' className="size='small' align-middle font-13">
                      {item.ghiChu}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      <Box>
                        <CreateReport14 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                        <DeleteData url={'BieuMauSoMuoiBon'} data={item} setPostSuccess={handlePostSuccess} />
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

const Bieumau14 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 14'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 14</Typography>
              <Typography className='text-success text-weight-bold _font12'>Chất lượng nước dưới đất</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU14.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau14
