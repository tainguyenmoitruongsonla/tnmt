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
  
  const CategoryOfCons = () => {
    return (
      <Grid className='_text_center'>
        <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>DANH MỤC CÁC CÔNG TRÌNH KHAI THÁC, SỬ DỤNG TÀI NGUYÊN NƯỚC </Typography>
        <TableContainer component={Paper} sx={{ mt: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell size='small' align='center' rowSpan={4}>
                  STT
                </TableCell>
                <TableCell size='small' align='center' rowSpan={3}>
                  Tên công trình
                </TableCell>
                <TableCell size='small' align='center' rowSpan={3}>
                  Loại hình công trình <br />
                  (hồ,đập,cống,trạm bơm,giếng khoan,khác)
                </TableCell>
                <TableCell size='small' align='center' rowSpan={3}>
                  Nguồn nước khai thác <br /> (hồ,đập,cống,trạm bơm,giếng khoan,khác)
                </TableCell>
                <TableCell size='small' align='center' colSpan={3} >
                  Vị trí
                </TableCell>
                <TableCell size='small' align='center' colSpan={5}>
                  Thông số cơ bản
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center' rowSpan={2}>
                  Xã
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Huyện
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Tỉnh
                </TableCell>

                <TableCell size='small' align='center' colSpan={3}>
                  Hồ chứa,đập
                </TableCell>
                <TableCell size='small' align='center' colSpan={2}>
                  Giếng khoan và <br /> loại hình khác
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  Dung tích toàn bộ (triệu m3)
                </TableCell>
                <TableCell size='small' align='center'>
                  Dung tích hữu ích (triệu m3)
                </TableCell>
                <TableCell size='small' align='center'>
                  Công suất (MW)
                </TableCell>
                <TableCell size='small' align='center'>
                  Lưu lượng thiết kế(m3/ngày đêm)
                </TableCell>
                <TableCell size='small' align='center'>
                  Lưu lượng thực tế (m3/ngày đêm)
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
                  (3)=(2)-(1)
                </TableCell>

                <TableCell size='small' align='center'>
                  (4)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (5)
                </TableCell>
                <TableCell size='small' align='center'>
                  (6)
                </TableCell>

                <TableCell size='small' align='center'>
                  (7)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (8)
                </TableCell>
                <TableCell size='small' align='center'>
                  (9)
                </TableCell>

                <TableCell size='small' align='center'>
                  (10)
                </TableCell>
                <TableCell size='small' align='center'>
                  (11)
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
  
  export default CategoryOfCons
  