import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import DeleteData from "src/@core/components/delete-data"
import CreateReport5 from "./CreateForm5"

const Report4Table = ({ data, handlePostSuccess  }: any) => {


  return (
    <TableContainer component={Paper}>
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
          <TableCell size='small' align='center' rowSpan={2}>
            Thao tác
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
      {data.map((item:any, index:any) => (
      <TableRow key={item.id}>
          <TableCell align='center' className="size='small' align-middle font-13">{index + 1}</TableCell>
          <TableCell align='center' className="size='small' align-middle font-13">{item.tenTram}</TableCell>
          <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang1}</TableCell>
          <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang2}</TableCell>
          <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang3}</TableCell>
          <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang4}</TableCell>
          <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang5}</TableCell>
          <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang6}</TableCell>
          <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang7}</TableCell>
          <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang8}</TableCell>
          <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang9}</TableCell>
          <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang10}</TableCell>
          <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang11}</TableCell>
          <TableCell align='center' className="size='small' align-middle font-13">{item.luuLuongThang12}</TableCell>
          <TableCell align='center' className="size='small' align-middle font-13">{item.ghiChu}</TableCell>
          <TableCell align='center' className="  size='small' align-middle font-13">
            <Box>
            <CreateReport5 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
            <DeleteData url={'BieuMauSoNam'} data={item} setPostSuccess={handlePostSuccess} />

        </Box>
            </TableCell>
      </TableRow>
    ))}
      
    </TableBody>
    </Table>
  </TableContainer>
  )
}

export default Report4Table
