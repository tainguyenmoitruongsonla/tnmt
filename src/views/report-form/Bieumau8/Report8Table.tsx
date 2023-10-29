import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { CalculateReportData } from "../CalculateData"
import DeleteData from "src/@core/components/delete-data"
import CreateReport8 from "./CreateForm8"


const Report8Table = ({ data, handlePostSuccess  }: any) => {
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
                    Vùng/tầng <br />
                    chứa nước
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2}>
                    Số lượng <br />
                    giếng quan trắc
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Mực nước lớn nhất(m)
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Mực nước trung bình (m)
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Mực nước nhỏ nhất (m)
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={4}>
                    Thao tác
                  </TableCell>
                </TableRow>

                <TableRow>
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
                    Kỳ trước
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Kỳ báo cáo
                  </TableCell>
                  <TableCell size='small' align='center'>
                    Thay đổi
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
                    (8)=(7)-(6)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (9)
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (10)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (11)=(10)-(9)
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody className='tableBody'>
                {data.map((item:any, index:any) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center  size='small' align-middle font-13">{index + 1}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.tangChuaNuoc}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.slGieng}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.mucNuocMaxKyTruoc}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.mucNuocMaxKyBaoCao}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {CalculateReportData(item.mucNuocMaxKyBaoCao, item.mucNuocMaxKyTruoc)}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.mucNuocMediumKyTruoc}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.mucNuocMediumKyBaoCao}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {CalculateReportData(item.mucNuocMediumKyBaoCao, item.mucNuocMediumKyTruoc)}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.mucNuocMinKyTruoc}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {item.mucNuocMinKyBaoCao}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {CalculateReportData(item.mucNuocMinKyBaoCao, item.mucNuocMinKyTruoc)}
                    </TableCell>
                    <TableCell align='center' className="  size='small' align-middle font-13">
                      <Box>
                        <CreateReport8 isEdit={true} data={item} setPostSuccess={handlePostSuccess} />
                        <DeleteData url={'BieuMauSoTam'} data={item} setPostSuccess={handlePostSuccess} />
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

export default Report8Table
