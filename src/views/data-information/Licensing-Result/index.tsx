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

const LicenseResult = () => {
  return (
    <Grid className='_text_center'>
      <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>
        THỐNG KÊ KẾT QUẢ CẤP PHÉP
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead className='tableHead'>
            <TableRow>
              <TableCell size='small' align='center'>
                STT
              </TableCell>
              <TableCell size='small' align='center'>
                Số giấy phép KTSDN
              </TableCell>
              <TableCell size='small' align='center'>
                Tên giấy phép KTSDN
              </TableCell>
              <TableCell size='small' align='center'>
                Ngày ký giấy phép KTSDN
              </TableCell>
              <TableCell size='small' align='center'>
                Ngày giấy phép có hiệu lực KTSDN
              </TableCell>
              <TableCell size='small' align='center'>
                Ngày giấy phép hết hạn KTSDN
              </TableCell>
              <TableCell size='small' align='center'>
                Cơ quan cấp phép KTSDN
              </TableCell>
              <TableCell size='small' align='center'>
                Tên chủ giấy phép KTSDN
              </TableCell>
              <TableCell size='small' align='center'>
                Địa chỉ chủ giấy phép KTSDN
              </TableCell>
              <TableCell size='small' align='center'>
                File scan giấy phép KTSDN
              </TableCell>
              <TableCell size='small' align='center'>
                File scan giấy tờ liên quan của giấy phép KTSDN
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className='tableBody'>
            <TableRow>
              <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
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
    </Grid>
  )
}

export default LicenseResult
