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
import DownloadIcon from '@mui/icons-material/Download';
import DialogControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import HeaderReport from '../HeaderReport';
import FooterReport from '../FooterReport';
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import DeleteData from 'src/@core/components/delete-data'
import { CalculateReportData } from '../CalculateData';
import CreateReport1 from './Createform';
import { Report1State } from './Report1InterFace';

const FormContruction = () => {
  const [data, setData] = useState<Report1State[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false);
    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState);
    };
  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoMot/danhsach')
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
            Biểu mẫu số 1. Số lượng trạm quan trắc khí tượng, thủy văn, tài nguyên nước, nước dưới đất
          </Typography>
        </Grid>
        <Grid md={1}>
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </Grid>
      </Grid>
    
    <HeaderReport/>

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
      <CreateReport1 isEdit={false} setPostSuccess={handlePostSuccess}/>
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell size='small' align='center' rowSpan={5}>
                  STT
                </TableCell>
                <TableCell size='small' align='center' rowSpan={3}>
                  Lưu vực
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2} colSpan={3}>
                  Tổng số trạm quan trắc(trạm)
                </TableCell>
                <TableCell size='small' align='center' colSpan={12}>
                  Loại trạm
                </TableCell>
                <TableCell size='small' align='center' rowSpan={5}>
                  Thao Tác
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center' colSpan={3}>
                  Khí tượng
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Thủy văn, thủy văn kết hợp tài nguyên nước
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Tài nguyên nước độc lập
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Quan trắc nước dưới đất
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
                  (4)=(3)-(2)
                </TableCell>
                <TableCell size='small' align='center'>
                  (5)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (6)&nbsp;
                </TableCell>

                <TableCell size='small' align='center'>
                  (7)=(6)-(5)
                </TableCell>
                <TableCell size='small' align='center'>
                  (8)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (9)&nbsp;
                </TableCell>

                <TableCell size='small' align='center'>
                  (10)=(9)-(8)
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
                <TableCell size='small' align='center'>
                  (14)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (15)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (16)=(15)-(14)
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  Tổng
                </TableCell>
                <TableCell size='small' align='center'>
                  
                </TableCell>
                <TableCell size='small' align='center'>
                
                </TableCell>

                <TableCell size='small' align='center'>
                  
                </TableCell>
                <TableCell size='small' align='center'>
                
                </TableCell>
                <TableCell size='small' align='center'>
                
                </TableCell>

                <TableCell size='small' align='center'>
                 
                </TableCell>
                <TableCell size='small' align='center'>
                
                </TableCell>
                <TableCell size='small' align='center'>
                
                </TableCell>

                <TableCell size='small' align='center'>
                 
                </TableCell>
                <TableCell size='small' align='center'>
                  
                </TableCell>
                <TableCell size='small' align='center'>
                  
                </TableCell>

                <TableCell size='small' align='center'>
                  
                </TableCell>
                <TableCell size='small' align='center'>
                  
                </TableCell>
                <TableCell size='small' align='center'>
                  
                </TableCell>
                <TableCell size='small' align='center'>
                  
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className='tableBody'>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell align='center' className="  size='small' align-middle font-13">{index + 1}</TableCell>
                <TableCell className="  size='small' align-middle font-13">{item.luuVucSong}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{item.tongTramQuanTracKyTruoc}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{item.tongTramQuanTracBaoCao}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{CalculateReportData(item.tongTramQuanTracBaoCao,item.tongTramQuanTracKyTruoc)}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{item.tramKhiTuongKyTruoc}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{item.tramKhiTuongBaoCao}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{CalculateReportData(item.tramKhiTuongBaoCao,item.tramKhiTuongKyTruoc)}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{item.tramThuyVanKyTruoc}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{item.tramThuyVanKyBaoCao}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{CalculateReportData(item.tramThuyVanKyBaoCao,item.tramThuyVanKyTruoc)}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{item.tramTNNKyTruoc}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{item.tramTNNKyBaoCao}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{CalculateReportData(item.tramTNNKyBaoCao,item.tramTNNKyTruoc)}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{item.tramQuanTracKyTruoc}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{item.tramQuanTracKyBaoCao}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">{CalculateReportData(item.tramQuanTracKyBaoCao,item.tramQuanTracKyTruoc)}</TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">
                    <Box>
                    <CreateReport1 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                    <DeleteData url={'BieuMauSoMot'} data={item} setPostSuccess={handlePostSuccess} />

                </Box>
                    </TableCell>
              </TableRow>
            ))}
              
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      )}
     
  
      <FooterReport/>
    </Paper>
  )
}

const Bieumau1 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 1'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 1</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Số lượng trạm quan trắc khí tượng thủy văn,tài nguyên nước,nước dưới đất
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU1.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau1
