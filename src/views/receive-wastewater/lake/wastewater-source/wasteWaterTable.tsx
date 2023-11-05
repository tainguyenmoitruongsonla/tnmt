import Paper from '@mui/material/Paper'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const WasteTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead className='tableHead'>
          <TableRow>
            <TableCell size='small' align='center' rowSpan={2}>
              STT
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Tên đoạn <br />
              sông
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Thuộc lưu
              <br />
              vực sông
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Tên công trình
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Địa chỉ
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Loại hình <br />
              nước thải
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Số
              <br />
              GP
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Nguồn tiếp nhận <br />
              nước thải
            </TableCell>
            <TableCell size='small' align='center' colSpan={2}>
              Vị trí xả thải
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Phương thức <br />
              xả nước thải
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Chế độ <br />
              xả nước thải
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Lưu lượng <br />
              xả lớn nhất <br />
              (m3/ngày)
            </TableCell>
            <TableCell size='small' align='center' colSpan={2}>
              Quan trắc CLN
            </TableCell>
            <TableCell size='small' align='center' colSpan={11}>
              Thông số chất lượng nước nguồn thải
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell size='small' align='center'>
              x
            </TableCell>
            <TableCell size='small' align='center'>
              y
            </TableCell>

            <TableCell size='small' align='center'>
              Vị trí
            </TableCell>
            <TableCell size='small' align='center'>
              Ký hiệu <br />
              điểm QT
            </TableCell>

            <TableCell size='small' align='center'>
              BOD5(mg/L)
            </TableCell>
            <TableCell size='small' align='center'>
              COD(mg/L)
            </TableCell>
            <TableCell size='small' align='center'>
              TSS(mg/L)
            </TableCell>
            <TableCell size='small' align='center'>
              Amoni
            </TableCell>
            <TableCell size='small' align='center'>
              Nitrate
            </TableCell>
            <TableCell size='small' align='center'>
            Nitrite
            </TableCell>
            <TableCell size='small' align='center'>
             Photphate
            </TableCell>
            <TableCell size='small' align='center'>
              Tổng N
            </TableCell>
            <TableCell size='small' align='center'>
              Tổng P
            </TableCell>
            <TableCell size='small' align='center'>
             Tổng Coliform <br/>(CFU hoặc MPN/100ml)
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody className='tableBody'>
          <TableRow>
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
            <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
            <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default WasteTable
