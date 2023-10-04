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
  
  const GRInformation = () => {
    return (
      <Grid className='_text_center'>
        <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>BẢNG TỔNG HỢP CÁC ĐẶC TRƯNG NƯỚC DƯỚI ĐẤT </Typography>
        <TableContainer component={Paper} sx={{ mt: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell size='small' align='center' rowSpan={4}>
                  STT
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Vùng/tầng <br/>chứa nước
                </TableCell>
                <TableCell size='small' align='center'  rowSpan={2}  >
                Số lượng <br/>giếng quan trắc
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Mực nước lớn nhất(m)
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Mực nước trung bình (m)
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Mực nước nhỏ nhất (m)
                </TableCell>
              </TableRow>

              <TableRow>
               
                <TableCell size='small' align='center' >
                  Kỳ trước
                </TableCell>
                <TableCell size='small' align='center' >
                  Kỳ báo cáo
                </TableCell>
                <TableCell size='small' align='center' >
                  Thay đổi
                </TableCell>

               
                <TableCell size='small' align='center' >
                  Kỳ trước
                </TableCell>
                <TableCell size='small' align='center' >
                  Kỳ báo cáo
                </TableCell>
                <TableCell size='small' align='center' >
                  Thay đổi
                </TableCell>

               
                <TableCell size='small' align='center' >
                  Kỳ trước
                </TableCell>
                <TableCell size='small' align='center' >
                  Kỳ báo cáo
                </TableCell>
                <TableCell size='small' align='center' >
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
                  (4)
                </TableCell>
                <TableCell size='small' align='center'>
                  (5)=(4)-(3)
                </TableCell>
                <TableCell size='small' align='center'>
                  (6)&nbsp;
                </TableCell>

                <TableCell size='small' align='center'>
                  (7)
                </TableCell>
                <TableCell size='small' align='center'>
                (8)=(7)-(6)
                </TableCell>
                <TableCell size='small' align='center'>
                  (9)
                </TableCell>

                <TableCell size='small' align='center'>
                  (10)
                </TableCell>
                <TableCell size='small' align='center'>
                (11)=(10)-(9)
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
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    )
  }
  
  export default GRInformation
  