import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

const MNNTLake = () => {
  return (
    <Grid>
      <Grid className='_text_center'>
        <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>
        Thống kê danh mục các hồ, ao nội tỉnh Quảng Ngãi
        </Typography>
      </Grid>

      <Grid className='_text_center' sx={{ mt: 3 }}>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead className='tableHead'>
            <TableRow>
              <TableCell size='small' align='center' >
                STT
              </TableCell>
              <TableCell size='small' align='center' >
                Mã hồ
              </TableCell>
              <TableCell size='small' align='center' >
                Tên hồ chứa
              </TableCell>
              <TableCell size='small' align='center' >
              Xã/ Phường/ Thị trấn
              </TableCell>
              <TableCell size='small' align='center' >
              Huyện/ Thành phố
              </TableCell>
              <TableCell size='small' align='center'>
              Nguồn nước
              </TableCell>
              <TableCell size='small' align='center'>
              Thuộc hệ thống sông
              </TableCell>
              <TableCell size='small' align='center' >
                Ghi chú
              </TableCell>
              <TableCell size='small' align='center' >
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
              <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    </Grid>
  )
}

export default MNNTLake
