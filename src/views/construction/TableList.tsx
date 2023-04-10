// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'


interface Data {
  stt: number,
  name: string
  diadiem: string
  x: number
  y: number
  nguonnuoc: string
  phuongthuc:string
  chedo:string
}

function createData(stt:number,name: string, diadiem: string, x: number, y: number,nguonnuoc:string,phuongthuc:string,chedo:string): Data {

  return { stt,name, diadiem, x, y, nguonnuoc,phuongthuc,chedo }
}

const rows = [
  createData(1,'Thủy điện Suối Tân', 'xã Chiềng Khoa, huyện Mộc Châu, tỉnh Sơn La', 1324171354, 3287263,'Suối Tân','KTSD nước bằng CT với các thông số như trong HSTK đã được cấp có thẩm quyền PD','Điều tiết ngày đêm'),
  createData(2,'Thủy điện Suối Tân', 'xã Chiềng Khoa, huyện Mộc Châu, tỉnh Sơn La', 1324171354, 3287263,'Suối Tân','KTSD nước bằng CT với các thông số như trong HSTK đã được cấp có thẩm quyền PD','Điều tiết ngày đêm'),
  createData(3,'Thủy điện Suối Tân', 'xã Chiềng Khoa, huyện Mộc Châu, tỉnh Sơn La', 1324171354, 3287263,'Suối Tân','KTSD nước bằng CT với các thông số như trong HSTK đã được cấp có thẩm quyền PD','Điều tiết ngày đêm'),
  createData(4,'Thủy điện Suối Tân', 'xã Chiềng Khoa, huyện Mộc Châu, tỉnh Sơn La', 1324171354, 3287263,'Suối Tân','KTSD nước bằng CT với các thông số như trong HSTK đã được cấp có thẩm quyền PD','Điều tiết ngày đêm'),
  createData(5,'Thủy điện Suối Tân', 'xã Chiềng Khoa, huyện Mộc Châu, tỉnh Sơn La', 1324171354, 3287263,'Suối Tân','KTSD nước bằng CT với các thông số như trong HSTK đã được cấp có thẩm quyền PD','Điều tiết ngày đêm'),
  createData(6,'Thủy điện Suối Tân', 'xã Chiềng Khoa, huyện Mộc Châu, tỉnh Sơn La', 1324171354, 3287263,'Suối Tân','KTSD nước bằng CT với các thông số như trong HSTK đã được cấp có thẩm quyền PD','Điều tiết ngày đêm'),
  
]

const TableList = () => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper>
      <TableContainer>
        <Table aria-label='sticky table'>
          <TableHead className='tableHead'>
            <TableRow>
              <TableCell size='small' align="center" rowSpan={2} className='start-col'>STT</TableCell>
              <TableCell size='small' align="center" rowSpan={2} className='start-col'>Tên công trình</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Địa điểm</TableCell>
              <TableCell size='small' align="center" colSpan={2}>Tọa độ đập chính</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Nguồn nước khai thác</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Phương thưc khai thác</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Chế độ KT</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Mục đích KT</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Tiểu vùng quy hoạch</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Năm xây dựng</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Năm vận hành</TableCell>
              <TableCell size='small' align="center" colSpan={30}>Tọa độ đập chính</TableCell>
              <TableCell size='small' align="center" colSpan={3}>Thông tin giấy phép</TableCell>
              <TableCell size='small' align="center" colSpan={3}>Tiền cấp quyền</TableCell>
              <TableCell size='small' align="center" rowSpan={2} className='end-col'>Thao tác</TableCell>
            </TableRow>
            <TableRow>
              {/* lat,long */}
              <TableCell size='small' align="center">X (m)</TableCell>
              <TableCell size='small' align="center">Y (m)</TableCell>
              {/* contruction specifications */}
              <TableCell size='small' align="center">Cấp CT</TableCell> 
              <TableCell size='small' align="center">F lưu vực <br />(km2) </TableCell>
              <TableCell size='small' align="center">X <sub>TB năm</sub> <br />(m)</TableCell>
              <TableCell size='small' align="center">Q <sub>TB năm</sub><br />(m3/s)</TableCell>
              <TableCell size='small' align="center">CS lắp máy (MW)</TableCell>
              <TableCell size='small' align="center">CS <br /> đảm bảo(MW)</TableCell>
              <TableCell size='small' align="center">Chiều cao <br /> đập (m)</TableCell>
              <TableCell size='small' align="center">YChiều dài <br />đập (m)</TableCell>
              <TableCell size='small' align="center">Cao trình <br />đập (m)</TableCell>
              <TableCell size='small' align="center">Q<sub>max</sub>(m<sup>3</sup>/s)</TableCell>
              <TableCell size='small' align="center">Q<sub>TT</sub>(m<sup>3</sup>/s)</TableCell>
              <TableCell size='small' align="center">Q<sub>đảm bảo</sub>(m<sup>3</sup>/s)</TableCell>
              <TableCell size='small' align="center">H<sub>max</sub> (m) </TableCell>
              <TableCell size='small' align="center">H<sub>min</sub> (m) </TableCell>
              <TableCell size='small' align="center">H<sub>TT</sub></TableCell>
              <TableCell size='small' align="center">MNC(m)</TableCell>
              <TableCell size='small' align="center">MNDBT(m)</TableCell>
              <TableCell size='small' align="center">MNLTK(m)</TableCell>
              <TableCell size='small' align="center">MNLKT(m)</TableCell>
              <TableCell size='small' align="center">W<sub>toàn bộ</sub>(triệu m<sup>3</sup>)</TableCell>
              <TableCell size='small' align="center">W<sub> chết </sub>(triệu m<sup>3</sup>)</TableCell>
              <TableCell size='small' align="center">W<sub>hữu ích</sub>(triệu m<sup>3</sup>)</TableCell>
              <TableCell size='small' align="center">Số máy bơm</TableCell>
              <TableCell size='small' align="center">Q<sub>TK</sub> (m<sup>3</sup>/h)</TableCell>
              <TableCell size='small' align="center">Q<sub>TT</sub> (m<sup>3</sup>/h)</TableCell>
              <TableCell size='small' align="center">F<sub>tưới TK</sub> (ha)</TableCell>
              <TableCell size='small' align="center">F<sub>tưới TT</sub> (ha)</TableCell>
              <TableCell size='small' align="center">T<sub>bơm TB</sub>(h)</TableCell>
              <TableCell size='small' align="center">T<sub>bơm min</sub>(h)</TableCell>
              <TableCell size='small' align="center">T<sub>bơm max</sub></TableCell>
              {/* license */}
              <TableCell size='small' align="center">Số GP</TableCell>
              <TableCell size='small' align="center">Ngày cấp</TableCell>
              <TableCell size='small' align="center">Thời hạn</TableCell>
              {/* license fee */}
              <TableCell size='small' align="center">Số QĐ</TableCell>
              <TableCell size='small' align="center">Tổng tiền (đồng)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='tableBody'>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.name}>
                    <TableCell align="center">{row.stt}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.diadiem}</TableCell>
                    <TableCell align="center">{row.x}</TableCell>
                    <TableCell align="left">{row.y}</TableCell>
                    <TableCell align="left">{row.nguonnuoc}</TableCell>
                    <TableCell align="center">{row.phuongthuc}</TableCell>
                    <TableCell align="center">{row.chedo}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableList
