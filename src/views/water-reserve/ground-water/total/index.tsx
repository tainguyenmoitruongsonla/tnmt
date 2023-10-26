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
import Header from '../../header'
import Footer from '../../footer'
 
  
  const GroundTotal = () => {
    return (
   <Grid container>
      <Header />
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
                  Tầng chứa nước
                </TableCell>
                <TableCell size='small' align='center' colSpan={4}>
                  Nước ngọt
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Nước mặn
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  Diện tích phân bố <br /> (km2)
                </TableCell>
                <TableCell size='small' align='center'>
                  Vị trí hành chính <br /> (xã,huyện)
                </TableCell>
                <TableCell size='small' align='center'>
                  Trữ lượng tiềm <br /> năng(m3/ngày)
                </TableCell>
                <TableCell size='small' align='center'>
                  Trữ lượng có thể <br /> khai thác(m3/ngày)
                </TableCell>
                <TableCell size='small' align='center'>
                  Diện tích phân bố <br /> (km2)
                </TableCell>
                <TableCell size='small' align='center'>
                  Vị trí hành chính <br /> (xã,huyện)
                </TableCell>
                <TableCell size='small' align='center'>
                  Trữ lượng  <br /> (m3/ngày)
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
                <TableCell size='small' align='center'>
                  (7)
                </TableCell>
                <TableCell size='small' align='center'>
                  (8)
                </TableCell>
                <TableCell size='small' align='center'>
                  (9)
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
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Footer />
    </Grid>
    )
  }
  export default GroundTotal
  