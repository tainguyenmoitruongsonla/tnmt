import Paper from '@mui/material/Paper'
import {
  Grid,
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
import Header from '../../header'
import Footer from '../../footer'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'

const RiverQuantity = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // const [postSuccess, setPostSuccess] = useState(false);
  //   const handlePostSuccess = () => {
  //       setPostSuccess(prevState => !prevState);
  //   };
  useEffect(() => {
    async function getDataRiverQuantity() {
      setLoading(true)
      await getData('NM_SoLuong/danh-sach')
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

    getDataRiverQuantity()
  }, [])
  console.log(data);
  

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
        <Typography className='font-weight-bold ' variant='h6'>
            KIỂM KÊ SỐ LƯỢNG NGUỒN NƯỚC MẶT SÔNG, SUỐI, KÊNH RẠCH
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
                    Mã sông
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Tên sông
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Chảy ra
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                   Chiều dài
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={4}>
                   Vị trí đầu sông
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={4}>
                   Vị trí cuối sông
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                   Ghi chú 
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={3}>
                   Thao tác
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell size='small' align='center'>
                  Tọa độ X
                  </TableCell>
                  <TableCell size='small' align='center'>
                  Tọa độ Y
                  </TableCell>
                  <TableCell size='small' align='center'>
                  Xã
                  </TableCell>
                  <TableCell size='small' align='center'>
                  Huyện
                  </TableCell>


                  <TableCell size='small' align='center'>
                  Tọa độ X
                  </TableCell>
                  <TableCell size='small' align='center'>
                  Tọa độ Y
                  </TableCell>
                  <TableCell size='small' align='center'>
                  Xã
                  </TableCell>
                  <TableCell size='small' align='center'>
                  Huyện
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
                  
                </TableRow>
              </TableHead>

              <TableBody className='tableBody'>
                {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center  size='small' align-middle font-13">{index + 1}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.song?.maSong}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.song?.tenSong}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.chayRa}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.chieuDai}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.song?.dauSong.x}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.song?.dauSong.y}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.song?.dauSong.xa}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.song?.dauSong.huyen}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.song?.cuoiSong.x}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.song?.cuoiSong.y}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.song?.cuoiSong.xa}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.song?.cuoiSong.huyen}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.song?.chuGiai}</TableCell>
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

export default RiverQuantity
