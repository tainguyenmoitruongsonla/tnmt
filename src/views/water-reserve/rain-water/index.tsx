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
import HeaderWaterReseve from '../header'
import FooterWaterReseve from '../footer'
import Action from '../action'

const RainWater = () => {
  return (
    <Grid container>
      <HeaderWaterReseve />
      <Grid md={12} xs={12} textAlign={'center'} textTransform={'uppercase'}>
        <Typography pt={7} pb={4} className='font-weight-bold ' variant='h6'>
          KIỂM KÊ TỔNG LƯỢNG NƯỚC MƯA
        </Typography>
      </Grid>
      <Grid>
        <Button variant='outlined'>Thêm mới</Button>
      </Grid>
      <Grid md={12} xs={12} >
        <Typography className='_flexEnd'>Đơn vị:mm</Typography>
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
                  Năm
                </TableCell>
                <TableCell size='small' align='center' colSpan={2}>
                  Vị trí hành chính
                </TableCell>
                <TableCell size='small' align='center' colSpan={12}>
                  Tháng
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Mùa mưa
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Mùa khô
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Cả năm
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
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
                  1
                </TableCell>
                <TableCell size='small' align='center'>
                  2
                </TableCell>
                <TableCell size='small' align='center'>
                  3
                </TableCell>
                <TableCell size='small' align='center'>
                  4
                </TableCell>
                <TableCell size='small' align='center'>
                  5
                </TableCell>
                <TableCell size='small' align='center'>
                  6
                </TableCell>
                <TableCell size='small' align='center'>
                  7
                </TableCell>
                <TableCell size='small' align='center'>
                  8
                </TableCell>
                <TableCell size='small' align='center'>
                  9
                </TableCell>
                <TableCell size='small' align='center'>
                  10
                </TableCell>
                <TableCell size='small' align='center'>
                  11
                </TableCell>
                <TableCell size='small' align='center'>
                  12
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className='tableBody'>
              <TableRow>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  Trà khúc
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className="size='small' font-13">
                  1
                </TableCell>
                <TableCell align='center' className=" size='small' font-13">
                  <Action />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <FooterWaterReseve />
    </Grid>
  )
}
export default RainWater
