import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

const StationSF = () => {
  return (
    <Grid>
      <Grid className='_text_center'>
        <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>
          THỐNG KÊ HỒ SƠ KỸ THUẬT CÁC CÔNG TRÌNH QUAN TRẮC NƯỚC MẶT TỈNH QUẢNG NGÃI
        </Typography>
      </Grid>
      <Button variant='outlined'>Thêm mới</Button>
      <Grid className='_text_center' sx={{ mt: 3 }}>
        <TableContainer component={Paper} sx={{ mt: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell size='small' align='center'>
                  STT
                </TableCell>
                <TableCell size='small' align='center'>
                  ký hiệu công trình/Mã trạm
                </TableCell>
                <TableCell size='small' align='center'>
                  Tên tài liệu hồ sơ công trình quan trắc
                </TableCell>
                <TableCell size='small' align='center'>
                  Tên tổ chức thực hiện quan trắc
                </TableCell>
                <TableCell size='small' align='center'>
                  Người thành lập hồ sơ
                </TableCell>
                <TableCell size='small' align='center'>
                  Người kiểm tra hồ sơ
                </TableCell>
                <TableCell size='small' align='center'>
                  File PDF
                </TableCell>
                <TableCell size='small' align='center'>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className='tableBody'>
              <TableRow>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default StationSF
