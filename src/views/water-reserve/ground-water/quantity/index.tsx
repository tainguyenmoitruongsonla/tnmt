import {
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
import HeaderWaterReseve from '../../header'
import FooterWaterReseve from '../../footer'

const GroundQuantity = () => {
  return (
    <Grid container>
      <HeaderWaterReseve />
      <Grid item md={12} xs={12} textAlign={'center'} textTransform={'uppercase'}>
        <Typography pt={7} pb={4} className='font-weight-bold ' variant='h6'>
          KIỂM KÊ SỐ LƯỢNG NƯỚC DƯỚI ĐẤT
        </Typography>
      </Grid>
      <Grid item md={12} xs={12} pt={3}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell size='small' align='center' rowSpan={2}>
                  STT
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Tên tầng chứa nước
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Diện tích phân bố(km2)
                </TableCell>
                <TableCell size='small' align='center' colSpan={2}>
                  Chiều sâu phân bố(m)
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Ghi chú
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  Từ 
                </TableCell>
                <TableCell size='small' align='center'>
                  Đến
                </TableCell>
               
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  (1)
                </TableCell>
                <TableCell size='small' align='center'>
                  (2)
                </TableCell>
                <TableCell size='small' align='center'>
                  (3)
                </TableCell>
                <TableCell size='small' align='center'>
                  (4)
                </TableCell>
                <TableCell size='small' align='center'>
                  (5)
                </TableCell>
                <TableCell size='small' align='center'>
                  (6)
                </TableCell>
               
              </TableRow>
            </TableHead>

            <TableBody className='tableBody'>
              <TableRow>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">Tầng chứa nước qp</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <FooterWaterReseve />
    </Grid>
  )
}
export default GroundQuantity
