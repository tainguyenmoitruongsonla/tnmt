import Paper from '@mui/material/Paper'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const WasteReceiveTable = () => {
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
              Chiều dài(km)
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Diện tích lưu vực <br />
              (km2)
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Địa giới hành chính
            </TableCell>
            <TableCell size='small' align='center' colSpan={2}>
              Tọa độ (VN2000)
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Qs <br />
              (m3/s)
            </TableCell>
            <TableCell size='small' align='center' colSpan={11}>
              Thông số chất lượng nước nguồn thải
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell size='small' align='center'>
              Điểm đầu, x(m),y(m)
            </TableCell>
            <TableCell size='small' align='center'>
              Điểm cuối, x(m),y(m)
            </TableCell>
            <TableCell size='small' align='center'>
              DO(mg/l)
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
              Tổng Coliform <br />
              (CFU hoặc MPN/100ml)
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

export default WasteReceiveTable
