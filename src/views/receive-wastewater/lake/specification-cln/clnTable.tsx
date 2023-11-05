import Paper from '@mui/material/Paper'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useRouter } from 'next/router'

const SpecCLNTable = () => {
  const route = useRouter()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead className='tableHead'>
          <TableRow>
            <TableCell size='small' align='center' rowSpan={2}>
              STT
            </TableCell>
            {route.pathname.split('/')[2] == 'nguon-nuoc-ao' ? (
               <TableCell size='small' align='center' colSpan={11}>
               Thông số
             </TableCell>
            ):
            route.pathname.split('/')[2] == 'nguon-nuoc-song' ? (
              <TableCell size='small' align='center' colSpan={10}>
               Thông số
             </TableCell>
            )  : (
              ''
            )}
           
            <TableCell size='small' align='center' rowSpan={2}>
              Mức phân loại <br />
              chất lượng nước
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell size='small' align='center'>
              pH
            </TableCell>
            <TableCell size='small' align='center'>
              BOD5(mg/L)
            </TableCell>
            <TableCell size='small' align='center'>
              COD(mg/L)
            </TableCell>
            <TableCell size='small' align='center'>
              TOC(mg/L)
            </TableCell>

            <TableCell size='small' align='center'>
              TSS(mg/L)
            </TableCell>
            <TableCell size='small' align='center'>
              DO(mg/L)
            </TableCell>
            <TableCell size='small' align='center'>
              Tổng Phosphor TP(mg/L)
            </TableCell>
            <TableCell size='small' align='center'>
              Tổng Nito TN(mg/L)
            </TableCell>
            {route.pathname.split('/')[2] == 'nguon-nuoc-ao' ? (
              <TableCell size='small' align='center'>
                Chiorophyll a <br/>
                (mg/m3)
              </TableCell>
            ) : (
              ''
            )}
            <TableCell size='small' align='center'>
              Tổng Coliform(CFU hoặc MPN/100ml)
            </TableCell>
            <TableCell size='small' align='center'>
              Coliform chịu nhiệt(CFU hoặc MPN/100ml)
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
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SpecCLNTable
