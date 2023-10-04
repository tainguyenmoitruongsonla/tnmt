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
  
  const AverageFlowSF = () => { 
    return (
      <Grid className='_text_center' >
        <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>BẢNG DÒNG CHẢY TRUNG BÌNH THÁNG, NĂM CÁC TRẠM THỦY VĂN TRÊN ĐỊA BÀN TỈNH </Typography>
        <TableContainer component={Paper} sx={{ mt: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell size='small' align='center' rowSpan={2}>
                  STT
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Tên trạm
                </TableCell>
                
                <TableCell size='small' align='center' colSpan={12}>
                 Lưu lượng(m3/s)
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Lưu lượng bình quân(m3/s)
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  I
                </TableCell>
                <TableCell size='small' align='center'>
                  II
                </TableCell>
                <TableCell size='small' align='center'>
                  III
                </TableCell>

                <TableCell size='small' align='center'>
                  IV
                </TableCell>
                <TableCell size='small' align='center'>
                  V
                </TableCell>
                <TableCell size='small' align='center'>
                  VI
                </TableCell>

                <TableCell size='small' align='center'>
                  VII
                </TableCell>
                <TableCell size='small' align='center'>
                  VIII
                </TableCell>
                <TableCell size='small' align='center'>
                  IX
                </TableCell>

                <TableCell size='small' align='center'>
                  X
                </TableCell>
                <TableCell size='small' align='center'>
                  XI
                </TableCell>
                <TableCell size='small' align='center'>
                  XII
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className='tableBody'>
              <TableRow>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
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
    )
  }
  
  export default AverageFlowSF
  