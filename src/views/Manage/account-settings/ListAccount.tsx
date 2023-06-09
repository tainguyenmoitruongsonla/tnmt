// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Imports
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow,TableContainer, Paper,TablePagination } from '@mui/material';
import { Delete } from '@mui/icons-material';
import SetRole from './SetRole';
import ChangePassword from './ChangePassword';
import EditAccount from './EditAccount';

function createData(
    username: string,
    roles: string,
    fullname: string,
    email: string,
    phone: string,
) {

    return { username, roles, fullname, email, phone };
}

interface Column {
    id: 'username' | 'roles' | 'fullname' | 'email' | 'phone'
    label: string
    minWidth?: number
    align?: 'right'
    format?: (value: number) => string
}
  
const columns: readonly Column[] = [
    { id: 'username', label: 'Tài khoản', minWidth: 170 },
    { id: 'roles', label: 'Vai trò', minWidth: 100 },
    { id: 'fullname', label: 'Họ tên', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'phone', label: 'Số điện thoại', minWidth: 170 }
]

const data = [
    createData('admin', 'Admin','Admintrator', 'example@gmail.com', '0909999999'),
    createData('spuser', 'SupperUser','SupperUser', 'example@gmail.com', '0909999999'),
    createData('eclair', 'Default','Eclair', 'example@gmail.com', '0909999999'),
    createData('cupcake', 'Default','Cupcake', 'example@gmail.com', '0909999999'),
    createData('gingerbread', 'Default','Gingerbread', 'example@gmail.com', '0909999999'),
    createData('admin1', 'Admin','Admintrator', 'example@gmail.com', '0909999999'),
    createData('spuser1', 'SupperUser','SupperUser', 'example@gmail.com', '0909999999'),
    createData('eclair1', 'Default','Eclair', 'example@gmail.com', '0909999999'),
    createData('cupcake1', 'Default','Cupcake', 'example@gmail.com', '0909999999'),
    createData('gingerbread1', 'Default','Gingerbread', 'example@gmail.com', '0909999999'),
];

const ACTION_COLUMN_WIDTH = 180;

const ListAccount = () => {

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
                            <EditAccount isEdit={false} />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: any) => (
                    <TableRow key={row.username}>
                        {columns.map(column => {
                            const value = row[column.id]
                            
                            return (
                            <TableCell size='small' key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                            )
                        })}
                        <TableCell size='small' align='center' sx={{minWidth: ACTION_COLUMN_WIDTH, width: ACTION_COLUMN_WIDTH}}>
                            <IconButton aria-label="setRole">
                                <SetRole />
                            </IconButton>
                            <IconButton aria-label="changePasword">
                                <ChangePassword />
                            </IconButton>
                            <IconButton aria-label="edit">
                                <EditAccount isEdit={true} />
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

export default ListAccount;
