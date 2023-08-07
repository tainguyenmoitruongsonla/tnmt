import Paper from '@mui/material/Paper'
import {
  Grid,
  TextField,
  Typography,
  Link,
  Box,
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import DialogControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import { useState, useEffect  } from 'react';
import bieumau1 from 'src/api/report/bieumau1';
import TableComponent from 'src/@core/components/table';

const columnsTable = [
  { id: 'stt', label: 'STT', rowspan: 2, },
  { id: 'LuuVucSong', label: 'Lưu vực', rowspan: 2, },
  {
    id: '#', label: 'Tổng số trạm quan trắc(trạm)',  children: [
      { id: 'TongTramKyTruoc', label: 'Kỳ trước', },
      { id: 'TongTramBaoCao', label: 'Kỳ báo cáo', },
      { id: 'TongTramThayDoi', label: 'Kỳ thay đổi', },
    ]
  },
  {
    id: '#', label: 'Trạm khí tượng',  children: [
      { id: 'TramKTKyTruoc', label: 'Kỳ trước', },
      { id: 'TramKTBaoCao', label: 'Kỳ báo cáo', },
      { id: 'TramKTThayDoi', label: 'Kỳ thay đổi', },
    ]
  },
 
  {
    id: '#', label: 'Thủy văn, thủy văn kết hợp tài nguyên nước',  children: [
      { id: 'TramTVKyTruoc', label: 'Kỳ trước', },
      { id: 'TramTVBaoCao', label: 'Kỳ báo cáo', },
      { id: 'TramTVThayDoi', label: 'Kỳ thay đổi', },
    ]
  },
  {
    id: '#', label: 'Tài nguyên nước độc lập',  children: [
      { id: 'TramTNNKyTruoc', label: 'Kỳ trước', },
      { id: 'TramTNNBaoCao', label: 'Kỳ báo cáo', },
      { id: 'TramTNNThayDoi', label: 'Kỳ thay đổi', },
    ]
  },
  {
    id: '#', label: 'Quan trắc nước dưới đất',  children: [
      { id: 'TramNDDKyTruoc', label: 'Kỳ trước', },
      { id: 'TramNDDBaoCao', label: 'Kỳ báo cáo ', },
      { id: 'TramNDDThayDoi', label: 'Kỳ thay đổi', },
    ]
  },
];

const FormContruction = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  useEffect(() => {
    setData(bieumau1);
    setColumns(columnsTable);

    // fetchData();
  }, []);
  
  return (
    <Paper sx={{ p: 8 }}>
      {/* dautrang */}
      <Grid container>
        <Grid md={11}>
          <Typography variant='h5'>
          Biểu mẫu số 4. Tổng lượng nước mặt trên các lưu vực sông
          </Typography>
        </Grid>
        <Grid md={1}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid className='_space_between' sx={{mt:5}}>
        <Grid className='_text_center'>
          <Typography variant="h5">
            UBND Tỉnh Sơn La
          </Typography >
          <Typography className='font-weight-bold ' variant="h5">
          SỞ TÀI NGUYÊN VÀ MÔI TRƯỜNG
          </Typography>
          <Typography variant="h5">
            Số:
            <TextField size='small' sx={{ width: '50px' }}></TextField>
            /STNMT-TNN-KS&KTTV
          </Typography>
        </Grid>

        <Grid className='_text_center'>
          <Typography variant="h5">
            CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </Typography >
          <Typography className='font-weight-bold ' variant="h5">
            Độc lập - Tự do - Hạnh phúc
          </Typography>
          <Typography variant="h6">
            Sơn La, ngày 25 tháng 04 năm 2023
          </Typography>
        </Grid>
      </Grid>

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant="h4">
          BÁO CÁO
        </Typography>
        <Typography className='font-weight-bold ' variant="h6">
          Số lượng trạm quan trắc khí tượng, thuỷ văn, tài nguyên nước, nước dưới đất
        </Typography>
        <Typography className='font-weight-bold ' variant="h6">
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>

      <Grid className='_text_center' sx={{mt:3}} >
      <TableComponent
            columns={columns}
            data={data}/>
      </Grid>
      <Grid className='_space_between' sx={{mt:5}}>
        <Grid >
          <Typography >
            Nơi nhận
          </Typography >
          <Typography >
            - Ban Giám đốc sở
          </Typography >
          <Typography>
            - Lưu:VT; TNN, KS&KTTV; VP, 10b
          </Typography>
        </Grid>

        <Grid >
          <Typography  className='font-weight-bold' variant='h6'>
            Người thống kê
          </Typography >
        </Grid>
        
      </Grid>
    </Paper>
  )

}

const Bieumau14= () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 14'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() =>
            openDialogs(<FormContruction />, formTitle)
          }>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 14</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Chất lượng nước dưới đất
              </Typography>
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
