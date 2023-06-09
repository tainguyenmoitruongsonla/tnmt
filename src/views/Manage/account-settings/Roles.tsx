// ** React Imports
// ** MUI Imports
import {Grid, Checkbox, Table, TableHead, TableBody, TableRow, TableCell, IconButton} from '@mui/material'
import { Delete } from '@mui/icons-material';
import EditRoles from './EditRoles';

const createData = (name: string, isDefault: boolean) => {
  return { name, isDefault }
}

const roleData = [
  createData('Supper User', false),
  createData('Admintrators', false),
  createData('Default', true),
]

const ACTION_COLUMN_WIDTH = 120;

const Roles = () => {

  return (
    <>
      <Grid container columnSpacing={8}>
        <Grid item xs={12} md={12}>
          <Table className='mainTable'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell size='small'>TÊN</TableCell>
                <TableCell size='small' align='center'>MẶC ĐỊNH</TableCell>
                <TableCell size='small' align='center' sx={{minWidth: ACTION_COLUMN_WIDTH, width: ACTION_COLUMN_WIDTH}}>
                    #
                    <EditRoles isEdit = {false} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roleData.map(row => (
                <TableRow key={row.name}>
                  <TableCell size='small'>
                    {row.name}
                  </TableCell>
                  <TableCell size='small' align='center' sx={{minWidth: ACTION_COLUMN_WIDTH, width: ACTION_COLUMN_WIDTH}}>
                    <Checkbox checked={row.isDefault} />
                  </TableCell>
                  <TableCell size='small' align='center' sx={{minWidth: ACTION_COLUMN_WIDTH, width: ACTION_COLUMN_WIDTH}}>
                    <IconButton aria-label="delete">
                      <EditRoles isEdit = {true} />
                  </IconButton>
                  <IconButton aria-label="delete">
                      <Delete className='tableActionBtn deleteBtn' />
                  </IconButton>
                  </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  )
}
export default Roles
