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

const QualitySuface = () => {
  return (
    <Grid className='_text_center'>
      <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>TỔNG HỢP CÁC ĐẶC TRƯNG CỦA CÁC CHỈ TIÊU CƠ BẢN VỀ CHẤT LƯỢNG NƯỚC MẶT </Typography>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead className='tableHead'>
            <TableRow>
              <TableCell size='small' align='center' rowSpan={3}>
                STT
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2}>
                Lưu vực sông/ <br /> Vùng/Tỉnh
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2}>
                Sông,suối,hồ chứa
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2}>
                Vị trí <br /> quan trắc
              </TableCell>
              <TableCell size='small' align='center' colSpan={3}>
                Kết quả phân tích <br /> chỉ tiêu ...
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2}>
                Ghi chú
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell size='small' align='center'>
                Lớn nhất
              </TableCell>
              <TableCell size='small' align='center'>
                Nhỏ nhất
              </TableCell>
              <TableCell size='small' align='center'>
                Trung bình
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
                (5)
              </TableCell>
              <TableCell size='small' align='center'>
                (6)&nbsp;
              </TableCell>
              <TableCell size='small' align='center'>
                (7)&nbsp;
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
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default QualitySuface
