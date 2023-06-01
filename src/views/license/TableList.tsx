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
import { EditNote, Delete } from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from '@mui/material'
import FormatDate from 'src/views//FormatDate'
import CheckEffect from './CheckEffect'
import ShowFilePDF from '../ShowFilePDF'

const TableList = ({ data }:any) => {
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
        <Table aria-label='sticky table' className='mainTable'>
          <TableHead className='tableHead'>
            <TableRow>
              <TableCell size='small' align="center" rowSpan={2} className='sticky-col start-col'>Số GP</TableCell>
              <TableCell size='small' align="center" rowSpan={2} className=' sticky-col start-col'>Hiệu lực GP</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Ngày ký</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Thời hạn</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Ngày có hiệu lực</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Ngày hết hiệu lực</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Loại hình</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Tên chủ GP</TableCell>
              <TableCell size='small' align="center" rowSpan={2}>Địa chỉ chủ GP</TableCell>
              <TableCell size='small' align="center" colSpan={2}>Thông tin GP cũ</TableCell>
              <TableCell size='small' align="center" colSpan={8}>Thông tin CT</TableCell>
              <TableCell size='small' align="center" colSpan={3}>Tiền cấp quyền</TableCell>
              <TableCell size='small' align="center" rowSpan={2} className='sticky-col end-col'>Thao tác</TableCell>
            </TableRow>
            <TableRow>
              {/* lat,long */}
              <TableCell size='small' align="center">Số GP cũ</TableCell>
              <TableCell size='small' align="center">Ngày ký</TableCell>
              {/* contruction specifications */}
              <TableCell size='small' align="center">Tên Công trình</TableCell> 
              <TableCell size='small' align="center">Địa điểm công trình </TableCell>
              <TableCell size='small' align="center">Loại hình <br /> công trình</TableCell>
              <TableCell size='small' align="center">Xã</TableCell>
              <TableCell size='small' align="center">Huyện</TableCell>
              <TableCell size='small' align="center">Nguồn nước khai thác</TableCell>
              <TableCell size='small' align="center">Lưu vực</TableCell>
              <TableCell size='small' align="center">Tiểu vùng quy hoạch</TableCell>
              {/* license fee */}
              <TableCell size='small' align="center">Số QĐ</TableCell>
              <TableCell size='small' align="center">Ngày ký</TableCell>
              <TableCell size='small' align="center">Tổng tiền (VNĐ)</TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody className='tableBody'>
            {
              data === null || typeof data === 'undefined' ? (
                <TableRow>
                  <TableCell colSpan={15}>
                    <div style={{width: 'calc(100vw - 260px)', right: 0, textAlign: 'center'}}>
                      Không có dữ liệu ! 
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data:any,index:any) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                        <TableCell className='sticky-col start-col'>
                          <ShowFilePDF src={data.LicenseFile} name={data.LicenseNumber} />
                        </TableCell>
                        <TableCell><CheckEffect data={data} /></TableCell>
                        <TableCell><FormatDate time={data.SignDate} /></TableCell>
                        <TableCell>{data.Duration}</TableCell>
                        <TableCell><FormatDate time={data.IssueDate} /></TableCell>
                        <TableCell><FormatDate time={data.ExpireDate} /></TableCell>
                        <TableCell>{data.ConstructionType}</TableCell>
                        <TableCell>{data.LicenseHolderName}</TableCell>
                        <TableCell>{data.LicenseHolderAddress}</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>                                
                        <TableCell align="center" className='sticky-col end-col'>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Tooltip title="Chỉnh sửa công trình">
                              <IconButton>
                                <EditNote className='tableActionBtn' />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={6}>
                            <Tooltip title="Xóa công trình">
                              <IconButton>
                                <Delete className='tableActionBtn deleteBtn' />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                        </TableCell>
                    </TableRow>
                  )
                })
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      {
        data === null || typeof data === 'undefined' ? (
          <></>
        ) : (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )
      }
    </Paper>
  )
}

export default TableList
