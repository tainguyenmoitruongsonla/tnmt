import Paper from '@mui/material/Paper'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const RiverForeCastTable = () => {
  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead className='tableHead'>
          <TableRow>
            <TableCell size='small' align='center' rowSpan={3}>
              STT
            </TableCell>
            <TableCell size='small' align='center' rowSpan={3}>
              Tên đoạn sông
            </TableCell>
            <TableCell size='small' align='center' rowSpan={3}>
              Thuộc lưu <br />
              vực sông
            </TableCell>
            <TableCell size='small' align='center' rowSpan={3}>
              Chiều dài <br />
              (km)
            </TableCell>
            <TableCell size='small' align='center' rowSpan={3}>
              Diện tích lưu vực <br />
              (km3)
            </TableCell>
            <TableCell size='small' align='center' rowSpan={3}>
              Địa giới hành chính
            </TableCell>
            <TableCell size='small' align='center' rowSpan={3}>
              Mục đích sử dụng <br />
              nước theo QCVN
            </TableCell>
            <TableCell size='small' align='center' colSpan={4}>
              Tọa độ(VN2000)
            </TableCell>
            <TableCell size='small' align='center' colSpan={11}>
              Thông số chất lương nước nguồn tiếp nhận nước thải
            </TableCell>
            <TableCell size='small' align='center' rowSpan={3}>
              Ghi chú
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell size='small' align='center' colSpan={2}>
              Điểm đầu
            </TableCell>
            <TableCell size='small' align='center' colSpan={2}>
              Điểm cuối
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              pH
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              BOD5(mg/L)
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              COD(mg/L)
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              TOC(mg/L)
            </TableCell>

            <TableCell size='small' align='center' rowSpan={2}>
              TSS(mg/L)
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              DO(mg/L)
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Tổng P
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Tổng N
            </TableCell>

            <TableCell size='small' align='center' rowSpan={2}>
              Tổng Coliform
              <br />
              (CFU hoặc MPN/100ml)
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Coliform chịu nhiệt
              <br />
              (CFU hoặc MPN/100ml)
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Amoni NH4+N
              <br />
              (mg/L)
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell size='small' align='center'>
              X
            </TableCell>
            <TableCell size='small' align='center'>
              Y
            </TableCell>
            <TableCell size='small' align='center'>
              X
            </TableCell>
            <TableCell size='small' align='center'>
              Y
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody className='tableBody'>
          <TableRow>
            <TableCell size='small' align='center'></TableCell>
            <TableCell size='small' align='center'></TableCell>

            <TableCell size='small' align='center'></TableCell>
            <TableCell size='small' align='center'></TableCell>
            <TableCell size='small' align='center'></TableCell>
            <TableCell size='small' align='center'></TableCell>

            <TableCell size='small' align='center'></TableCell>
            <TableCell size='small' align='center'></TableCell>
            <TableCell size='small' align='center'></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RiverForeCastTable
