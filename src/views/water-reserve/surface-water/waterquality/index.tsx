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
 
  
  const WaterQuality = () => {
    return (
      <Grid container>
        <HeaderWaterReseve />
        <Grid md={12} xs={12} textAlign={'center'} textTransform={'uppercase'}>
          <Typography pt={7} pb={4} className='font-weight-bold ' variant='h6'>
             KIỂM KÊ CHẤT LƯỢNG NƯỚC MẶT <br/>
             (Theo chỉ số chất lượng nước tổng hợp WQI)
          </Typography>
        </Grid>
        <Grid md={12} xs={12} pt={3}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead className='tableHead'>
                <TableRow>
                  <TableCell size='small' align='center' rowSpan={2}>
                    STT
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Nguồn nước(sông,suối <br/>
                    kênh,hồ,đầm,...)
                  </TableCell>
                  <TableCell size='small' align='center'  colSpan={3}>
                    Vị trí hành chính
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Thuộc lưu vực sông
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Giá trị WQI
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Thời gian
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
                    Tỉnh
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
                </TableRow>
              </TableHead>
  
              <TableBody className='tableBody'>
                <TableRow>
                  <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                  <TableCell className="text-center  size='small' align-middle font-13">Trà khúc</TableCell>
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
        <FooterWaterReseve />
      </Grid>
    )
  }
  export default WaterQuality
  