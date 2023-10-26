import Paper from '@mui/material/Paper'
import {
  Grid,
  TextField,
  Typography,
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
import Header from '../header'
import Footer from '../footer'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'

const RainWater = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // const [postSuccess, setPostSuccess] = useState(false);
  //   const handlePostSuccess = () => {
  //       setPostSuccess(prevState => !prevState);
  //   };
  useEffect(() => {
    async function getDataRainWater() {
      setLoading(true)
      await getData('NMua_TongLuong/danh-sach')
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

    getDataRainWater()
  }, [])
  

  return (
    <Paper sx={{ p: 8 }}>
      {/* dautrang */}
      <Grid container>
        <Grid item md={11}>
          <Typography variant='h5'>Trữ lượng nước mưa</Typography>
        </Grid>
        <Grid item md={1}>
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Header />

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
      {/* <CreateReport2 isEdit={false} setPostSuccess={handlePostSuccess}/> */}
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
                    Tên trạm
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Năm bắt đầu quan trắc
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Năm kết thúc quan trắc
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={2}>
                   Vị trí
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={12}>
                   Tháng
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={3}>
                   Thao tác
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell size='small' align='center'>
                    Xã
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Huyện
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Tháng 1
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Tháng 2
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Tháng 3
                  </TableCell>

                  <TableCell size='small' align='center'>
                    Tháng 4
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Tháng 5
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Tháng 6
                  </TableCell>

                  <TableCell size='small' align='center'>
                    Tháng 7
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Tháng 8
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Tháng 9
                  </TableCell>

                  <TableCell size='small' align='center'>
                    Tháng 10
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Tháng 11
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Tháng 12
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
                    (5)&nbsp;
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
                    (11)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (12)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (13)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (14)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (15)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (16)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (17)&nbsp;
                  </TableCell>
                  
                </TableRow>
              </TableHead>

              <TableBody className='tableBody'>
                {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center  size='small' align-middle font-13">{index + 1}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.tram?.tenTram}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.tram?.ngayBatDau}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.tram?.ngayKetThuc}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.donvi_hanhchinh?.tenXa}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.donvi_hanhchinh?.tenHuyen}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.thang1}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.thang2}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.thang3}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.thang4}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.thang5}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.thang6}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.thang7}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.thang8}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.thang9}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.thang10}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.thang11}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.thang12}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                    <Box>
                    {/* <CreateReport2 isEdit={true} data={item} setPostSuccess={handlePostSuccess} /> */}
                    {/* <DeleteData url={'BieuMauSoHai'} data={item} setPostSuccess={handlePostSuccess} /> */}

                </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default RainWater
