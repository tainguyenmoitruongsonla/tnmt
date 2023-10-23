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
import { Report4State } from './Report4Interface'
import CreateReport4 from './CreateForm4'

const FormContruction = () => {
  const [data, setData] = useState<Report4State[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoBon/danhsach')
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
          <Typography variant='h5'>Biểu mẫu số 4. Tổng lượng nước mặt trên các lưu vực sông</Typography>
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
          Tổng lượng nước mặt trên các lưu vực sông
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      <CreateReport4 isEdit={false} setPostSuccess={handlePostSuccess} />
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
                    Lưu vực sông
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={4}>
                    Tổng lượng dòng chảy năm(triệu m3)
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={4}>
                    Tổng lượng dòng chảy lũ(triệu m3)
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={4}>
                    Tổng lượng dòng chảy mùa cạn(triệu m3)
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={4}>
                    Thao tác
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell size='small' align='center'>
                    Trung bình nhiều năm
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
                    Trung bình nhiều năm
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
                    Trung bình nhiều năm
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
                    (8)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (9)=(8)-(7)
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (10)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (11)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (12)&nbsp;
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (13)=(12)-(11)
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
                      {item.dongChayTBNam}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.dongChayKyTruoc}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.dongChayKyBaoCao}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {CalculateReportData(item.dongChayKyBaoCao, item.dongChayKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.dongChayMuaLuTB}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.dongChayMuaLuKyTruoc}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.dongChayMuaLuKyBaoCao}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {CalculateReportData(item.dongChayMuaLuKyBaoCao, item.dongChayMuaLuKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.dongChayMuaCanTB}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.dongChayMuaCanKyTruoc}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {item.dongChayMuaCanKyBaoCao}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      {CalculateReportData(item.dongChayMuaCanKyBaoCao, item.dongChayMuaCanKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      <Box>
                        <CreateReport4 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                        <DeleteData url={'BieuMauSoBon'} data={item} setPostSuccess={handlePostSuccess} />
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

const Bieumau4 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 4'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 4</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Tổng số lượng nước mặt trên các lưu vực sông
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU4.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau4
