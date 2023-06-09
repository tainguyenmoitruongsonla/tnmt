// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Imports
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow,TableContainer, Paper,TablePagination, Checkbox } from '@mui/material';
import { Delete } from '@mui/icons-material';
import EditPages from './EditPages';

function createData(
    src: string,
    name: string,
    description: string,
    PermitAccess: boolean
) {

    return { src, name, description, PermitAccess };
}

interface Column {
    id: 'src' | 'name' | 'description' | 'PermitAccess'
    label: string
    minWidth?: number
    align?: 'right' | 'center' | 'left'
    format?: (value: number) => string
}
  
const columns: readonly Column[] = [
    { id: 'src', label: 'Đường dẫn', minWidth: 170 },
    { id: 'name', label: 'Tên', minWidth: 100 },
    { id: 'description', label: 'Mô tả', minWidth: 170 },
    { id: 'PermitAccess', label: 'Đươc phép truy cập', minWidth: 100, align: 'center' }
]

const data = [
    createData('/admin', 'Admin','Admintrator', true),
    createData('/spuser', 'SupperUser','SupperUser', false),
    createData('/eclair', 'Default','Eclair', false),
    createData('/cupcake', 'Default','Cupcake', false),
    createData('/gingerbread', 'Default','Gingerbread', false),
    createData('/admin1', 'Admin','Admintrator', false),
    createData('/spuser1', 'SupperUser','SupperUser', false),
    createData('/eclair1', 'Default','Eclair', false),
    createData('/cupcake1', 'Default','Cupcake', false),
    createData('/gingerbread1', 'Default','Gingerbread', false),
];

const ACTION_COLUMN_WIDTH = 180;

const ListPages = () => {

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
            <Table className='mainTable'>
                <TableHead className='tableHead'>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell size='small' key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                                {column.label}
                            </TableCell>
                        ))}
                        <TableCell size='small' align='center' sx={{minWidth: ACTION_COLUMN_WIDTH, width: ACTION_COLUMN_WIDTH}}>
                            #
                            <EditPages isEdit={false} />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: any) => (
                    <TableRow key={row.src}>
                        {columns.map(column => {
                            const value = row[column.id]
                            
                            return (
                                <TableCell size='small' key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number' ? column.format(value) : 
                                        column.id === 'PermitAccess' ? (
                                            <Checkbox checked={row.PermitAccess} />
                                        ) : (
                                            value
                                        )
                                    }
                                </TableCell>
                            )
                        })}
                        <TableCell size='small' align='center' sx={{minWidth: ACTION_COLUMN_WIDTH, width: ACTION_COLUMN_WIDTH}}>
                            <IconButton aria-label="edit">
                                <EditPages isEdit={true} />
                            </IconButton>
                            <IconButton aria-label="delete">
                                <Delete className='tableActionBtn deleteBtn' />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </Paper>
  );
}

export default ListPages;
