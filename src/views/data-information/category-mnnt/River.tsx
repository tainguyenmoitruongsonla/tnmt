import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

const MNNTRiver = () => {
  return (
    <Grid>
      <Grid className='_text_center'>
        <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>
        Thống kê nguồn nước mặt nội tỉnh thuộc các sông suối tỉnh Quảng Ngãi
        </Typography>
      </Grid>

      <Grid className='_text_center' sx={{ mt: 3 }}>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead className='tableHead'>
            <TableRow>
              <TableCell size='small' align='center' rowSpan={2}>
                STT
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2}>
                Mã sông
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2}>
                Tên sông suối
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2}>
                Chảy ra
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2}>
                Chiều dài
              </TableCell>
              <TableCell size='small' align='center'colSpan={5}>
                Điểm đầu
              </TableCell>
              <TableCell size='small' align='center'colSpan={5}>
               Điểm cuối
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2}>
                Ghi chú
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2}>
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
                Thôn 
              </TableCell>
              <TableCell size='small' align='center'>
                Xã/Phường/Thị trấn
              </TableCell>
              <TableCell size='small' align='center'>
               Huyện/Thành phố
              </TableCell>
              <TableCell size='small' align='center'>
                Tọa độ X
              </TableCell>
              <TableCell size='small' align='center'>
                Tọa độ Y
              </TableCell>
              <TableCell size='small' align='center'>
                Thôn 
              </TableCell>
              <TableCell size='small' align='center'>
                Xã/Phường/Thị trấn
              </TableCell>
              <TableCell size='small' align='center'>
               Huyện/Thành phố
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

export default MNNTRiver
