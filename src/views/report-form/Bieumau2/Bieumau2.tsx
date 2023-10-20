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
import CreateReport2 from './CreateReport2'
import DeleteData from 'src/@core/components/delete-data'

interface Report2 {
  id: number
  tenTram: string
  thoiKyQuanTrac: string
  muaNamKyTruoc: number
  muaNamBaoCao: number
  muaNamThayDoi: number
  muaMuaKyTruoc: number
  muaMuaBaoCao: number
  muaMuaThayDoi: number
  muaKhoKyTruoc: number
  muaKhoBaoCao: number
  muaKhoThayDoi: number
}

const FormContruction = () => {
  const [data, setData] = useState<Report2[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false);
    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState);
    };
  useEffect(() => {
    async function getDataReport2() {
      setLoading(true)
      await getData('BieuMauSoHai/danhsach')
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
          <Typography variant='h5'>Biểu mẫu số 2. Tổng lượng mưa, phân phối lượng mưa trong năm</Typography>
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
          Tổng lượng mưa, phân phối lượng mưa trong năm
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      <CreateReport2 isEdit={false} setPostSuccess={handlePostSuccess}/>
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
                    Tên trạm
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={3}>
                    Thời kỳ quan trắc
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={9}>
                    Tổng lượng mưa(mm)
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={4}>
                   Thao tác
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell size='small' align='center' colSpan={3}>
                    Năm
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Mùa mưa
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Mùa khô
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
                    (4)&nbsp;
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (5)=(4)-(3)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (6)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (7)&nbsp;
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (8)=(7)-(6)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (9)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (10)&nbsp;
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
                    <TableCell className="text-center  size='small' align-middle font-13">{item.tenTram}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.thoiKyQuanTrac}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.muaNamKyTruoc}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.muaNamBaoCao}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.muaNamThayDoi}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.muaMuaKyTruoc}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.muaMuaBaoCao}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.muaMuaThayDoi}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.muaKhoKyTruoc}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.muaKhoBaoCao}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.muaKhoThayDoi}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
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

const Bieumau2 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 2'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 2</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Tổng lượng mưa,phân phối lượng mưa trong năm
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU2.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau2
