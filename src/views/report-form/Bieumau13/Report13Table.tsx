import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import DeleteData from 'src/@core/components/delete-data'
import CreateReport13 from './CreateReport13'
import { CalculateMedium } from '../CalculateData'

const Report13Table = ({ data, handlePostSuccess }: any) => {
  return (
    <Grid className='_text_center' sx={{ mt: 3 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead className='tableHead'>
            <TableRow>
              <TableCell size='small' align='center' rowSpan={4}>
                STT
              </TableCell>
              <TableCell size='small' align='center' rowSpan={3}>
                Vị trí quan trắc
              </TableCell>
              <TableCell size='small' align='center' colSpan={9}>
                Kết quả phân tích chất lượng nước
              </TableCell>
              <TableCell size='small' align='center' rowSpan={3}>
                Ghi chú
              </TableCell>
              <TableCell size='small' align='center' rowSpan={4}>
                Thao tác
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell size='small' align='center' colSpan={3}>
                BOD5
              </TableCell>
              <TableCell size='small' align='center' colSpan={3}>
                COD
              </TableCell>
              <TableCell size='small' align='center' colSpan={3}>
                DO
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

              <TableCell size='small' align='center'>
                Lớn nhất
              </TableCell>
              <TableCell size='small' align='center'>
                Nhỏ nhất
              </TableCell>
              <TableCell size='small' align='center'>
                Trung bình
              </TableCell>

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
              <TableCell size='small' align='center'>
                (8)&nbsp;
              </TableCell>
              <TableCell size='small' align='center'>
                (9)&nbsp;
              </TableCell>
              <TableCell size='small' align='center'>
                (10)&nbsp;
              </TableCell>
              <TableCell size='small' align='center'>
                (11)
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className='tableBody'>
            {data.map((item:any, index:any) => (
              <TableRow key={index}>
                <TableCell align='center' className="size='small' align-middle font-13">
                  {index + 1}
                </TableCell>
                <TableCell className="size='small' align-middle font-13">{item.viTriQuanTrac}</TableCell>
                <TableCell align='center' className="size='small' align-middle font-13">
                  {item.boD5LonNhat}
                </TableCell>
                <TableCell align='center' className="size='small' align-middle font-13">
                  {item.boD5NhoNhat}
                </TableCell>
                <TableCell align='center' className="size='small' align-middle font-13">
                  {CalculateMedium(item.boD5LonNhat, item.boD5NhoNhat)}
                </TableCell>
                <TableCell align='center' className="size='small' align-middle font-13">
                  {item.codLonNhat}
                </TableCell>
                <TableCell align='center' className="size='small' align-middle font-13">
                  {item.codNhoNhat}
                </TableCell>
                <TableCell align='center' className="size='small' align-middle font-13">
                  {CalculateMedium(item.codLonNhat, item.codNhoNhat)}
                </TableCell>
                <TableCell align='center' className="size='small' align-middle font-13">
                  {item.doLonNhat}
                </TableCell>
                <TableCell align='center' className="size='small' align-middle font-13">
                  {item.doNhoNhat}
                </TableCell>
                <TableCell align='center' className="size='small' align-middle font-13">
                  {CalculateMedium(item.doLonNhat, item.doNhoNhat)}
                </TableCell>
                <TableCell align='center' className="size='small' align-middle font-13">
                  {item.ghiChu}
                </TableCell>
                <TableCell align='center' className="  size='small' align-middle font-13">
                  <Box>
                    <CreateReport13 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                    <DeleteData url={'BieuMauSoMuoiBa'} data={item} setPostSuccess={handlePostSuccess} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default Report13Table
