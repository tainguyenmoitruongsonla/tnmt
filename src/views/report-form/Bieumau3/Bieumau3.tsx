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
import { Report3State } from './Report3Interface'
import CreateReport3 from './CreateForm3'

const FormContruction = () => {
  const [data, setData] = useState<Report3State[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  useEffect(() => {
    async function getDataReport2() {
      setLoading(true)
      await getData('BieuMauSoBa/danhsach')
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

    getDataReport2()
  }, [postSuccess])

  return (
    <Paper sx={{ p: 8 }}>
      {/* dautrang */}
      <Grid container>
        <Grid item md={11}>
          <Typography variant='h5'>Biểu mẫu số 3. Lượng mưa tháng năm trong kỳ báo cáo</Typography>
        </Grid>
        <Grid item md={1}>
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
          Số lượng trạm quan trắc khí tượng, thuỷ văn, tài nguyên nước, nước dưới đất
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      <CreateReport3 isEdit={false} setPostSuccess={handlePostSuccess}/>
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
                  <TableCell size='small' align='center' rowSpan={2}>
                    Tên trạm
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Thời kỳ quan trắc
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={12}>
                    Lượng mưa tháng
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Lượng mưa năm Xn(mm)
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Thao tác
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell size='small' align='center'>
                    I
                  </TableCell>
                  <TableCell size='small' align='center'>
                    II
                  </TableCell>
                  <TableCell size='small' align='center'>
                    III
                  </TableCell>

                  <TableCell size='small' align='center'>
                    IV
                  </TableCell>
                  <TableCell size='small' align='center'>
                    V
                  </TableCell>
                  <TableCell size='small' align='center'>
                    VI
                  </TableCell>

                  <TableCell size='small' align='center'>
                    VII
                  </TableCell>
                  <TableCell size='small' align='center'>
                    VIII
                  </TableCell>
                  <TableCell size='small' align='center'>
                    IX
                  </TableCell>

                  <TableCell size='small' align='center'>
                    X
                  </TableCell>
                  <TableCell size='small' align='center'>
                    XI
                  </TableCell>
                  <TableCell size='small' align='center'>
                    XII
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody className='tableBody'>
              {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center  size='small' align-middle font-13">{index + 1}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.tenTram}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.thoiKyQuanTrac}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.luongMuaThang1}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.luongMuaThang2}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.luongMuaThang3}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.luongMuaThang4}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.luongMuaThang5}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.luongMuaThang6}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.luongMuaThang7}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.luongMuaThang8}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.luongMuaThang9}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.luongMuaThang10}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.luongMuaThang11}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.luongMuaThang12}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.luongMuaNam}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      <Box>
                      <CreateReport3 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                        <DeleteData url={'BieuMauSoBa'} data={item} setPostSuccess={handlePostSuccess} />
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

const Bieumau3 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 3'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 3</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Lượng mưa tháng,năm trong kỳ báo cáo
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU3.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau3
