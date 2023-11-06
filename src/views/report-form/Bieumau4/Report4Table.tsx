import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { CalculateReportData } from "../CalculateData"
import DeleteData from "src/@core/components/delete-data"
import CreateReport4 from "./CreateForm4"


const Report4Table = ({ data, handlePostSuccess  }: any) => {

  return (
    <Grid className='_text_center' sx={{ mt: 3 }}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead className='tableHead'>
          <TableRow>
            <TableCell size='small' align='center' rowSpan={4}>
              STT
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Lưu vực sông
            </TableCell>
            <TableCell size='small' align='center' colSpan={4}>
              Tổng lượng dòng chảy năm(triệu m3)
            </TableCell>
            <TableCell size='small' align='center' colSpan={4}>
              Tổng lượng dòng chảy lũ(triệu m3)
            </TableCell>
            <TableCell size='small' align='center' colSpan={4}>
              Tổng lượng dòng chảy mùa cạn(triệu m3)
            </TableCell>
            <TableCell size='small' align='center' rowSpan={4}>
              Thao tác
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell size='small' align='center'>
              Trung bình nhiều năm
            </TableCell>
            <TableCell size='small' align='center'>
              Kỳ trước
            </TableCell>
            <TableCell size='small' align='center'>
              Kỳ báo cáo
            </TableCell>
            <TableCell size='small' align='center'>
              Thay đổi
            </TableCell>

            <TableCell size='small' align='center'>
              Trung bình nhiều năm
            </TableCell>
            <TableCell size='small' align='center'>
              Kỳ trước
            </TableCell>
            <TableCell size='small' align='center'>
              Kỳ báo cáo
            </TableCell>
            <TableCell size='small' align='center'>
              Thay đổi
            </TableCell>

            <TableCell size='small' align='center'>
              Trung bình nhiều năm
            </TableCell>
            <TableCell size='small' align='center'>
              Kỳ trước
            </TableCell>
            <TableCell size='small' align='center'>
              Kỳ báo cáo
            </TableCell>
            <TableCell size='small' align='center'>
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
              (8)
            </TableCell>
            <TableCell size='small' align='center'>
              (9)=(8)-(7)
            </TableCell>

            <TableCell size='small' align='center'>
              (10)
            </TableCell>
            <TableCell size='small' align='center'>
              (11)&nbsp;
            </TableCell>
            <TableCell size='small' align='center'>
              (12)&nbsp;
            </TableCell>

            <TableCell size='small' align='center'>
              (13)=(12)-(11)
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody className='tableBody'>
          {data.map((item:any, index:any) => (
            <TableRow key={item.id}>
              <TableCell align='center' className="  size='small' align-middle font-13">
                {index + 1}
              </TableCell>
              <TableCell className="  size='small' align-middle font-13">{item.luuVucSong}</TableCell>
              <TableCell align='center' className="  size='small' align-middle font-13">
                {item.dongChayTBNam}
              </TableCell>
              <TableCell align='center' className="  size='small' align-middle font-13">
                {item.dongChayKyTruoc}
              </TableCell>
              <TableCell align='center' className="  size='small' align-middle font-13">
                {item.dongChayKyBaoCao}
              </TableCell>
              <TableCell align='center' className="  size='small' align-middle font-13">
                {CalculateReportData(item.dongChayKyBaoCao, item.dongChayKyTruoc)}
              </TableCell>
              <TableCell align='center' className="  size='small' align-middle font-13">
                {item.dongChayMuaLuTB}
              </TableCell>
              <TableCell align='center' className="  size='small' align-middle font-13">
                {item.dongChayMuaLuKyTruoc}
              </TableCell>
              <TableCell align='center' className="  size='small' align-middle font-13">
                {item.dongChayMuaLuKyBaoCao}
              </TableCell>
              <TableCell align='center' className="  size='small' align-middle font-13">
                {CalculateReportData(item.dongChayMuaLuKyBaoCao, item.dongChayMuaLuKyTruoc)}
              </TableCell>
              <TableCell align='center' className="  size='small' align-middle font-13">
                {item.dongChayMuaCanTB}
              </TableCell>
              <TableCell align='center' className="  size='small' align-middle font-13">
                {item.dongChayMuaCanKyTruoc}
              </TableCell>
              <TableCell align='center' className="  size='small' align-middle font-13">
                {item.dongChayMuaCanKyBaoCao}
              </TableCell>
              <TableCell align='center' className="  size='small' align-middle font-13">
                {CalculateReportData(item.dongChayMuaCanKyBaoCao, item.dongChayMuaCanKyTruoc)}
              </TableCell>
              <TableCell align='center' className="  size='small' align-middle font-13">
                <Box>
                  <CreateReport4 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                  <DeleteData url={'BieuMauSoBon'} data={item} setPostSuccess={handlePostSuccess} />
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

export default Report4Table
