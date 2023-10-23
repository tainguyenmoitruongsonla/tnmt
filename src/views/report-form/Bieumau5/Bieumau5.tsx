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
import CreateReport5 from './CreateForm5'

interface Report5 {
  id: number
  tenTram: string
  luuLuongThang1: number
  luuLuongThang2: number
  luuLuongThang3: number
  luuLuongThang4: number
  luuLuongThang5: number
  luuLuongThang6: number
  luuLuongThang7: number
  luuLuongThang8: number
  luuLuongThang9: number
  luuLuongThang10: number
  luuLuongThang11: number
  luuLuongThang12: number
  ghiChu: string
}
const FormContruction = () => {
  const [data, setData] = useState<Report5[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoNam/danhsach')
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
          <Typography variant='h5'>Biểu mẫu số 5. Dòng chảy trung bình tháng năm trong kỳ báo cáo</Typography>
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
          Dòng chảy trung bình tháng năm trong kỳ báo cáo
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      <CreateReport5 isEdit={false}  setPostSuccess={handlePostSuccess} />
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

                  <TableCell size='small' align='center' colSpan={12}>
                    Lưu lượng(m3/s)
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Lưu lượng bình quân(m3/s)
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
                  <TableCell align='center' className="size='small' align-middle font-13">{index + 1}</TableCell>
                  <TableCell align='center' className="size='small' align-middle font-13">{item.tenTram}</TableCell>
                  <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang1}</TableCell>
                  <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang2}</TableCell>
                  <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang3}</TableCell>
                  <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang4}</TableCell>
                  <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang5}</TableCell>
                  <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang6}</TableCell>
                  <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang7}</TableCell>
                  <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang8}</TableCell>
                  <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang9}</TableCell>
                  <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang10}</TableCell>
                  <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang11}</TableCell>
                  <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang12}</TableCell>
                  <TableCell align='center' className="size='small' align-middle font-13">{item.ghiChu}</TableCell>
                  <TableCell align='center' className="  size='small' align-middle font-13">
                    <Box>
                    <CreateReport5 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                    <DeleteData url={'BieuMauSoNam'} data={item} setPostSuccess={handlePostSuccess} />

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

const Bieumau5 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 5'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 5</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Dòng chảy trung bình tháng năm trong kỳ báo cáo
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU5.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau5
