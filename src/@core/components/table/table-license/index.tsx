import { FC, useState, ChangeEvent } from 'react'

import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, TablePagination } from '@mui/material';

interface TableColumn {
  id: string;
  label?: string;
  showId?: number[];
  colspan?: number;
  rowspan?: number;
  children?: TableColumn[];
}

interface Data {
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  data: Data[];
  TypeOfConsId?: number[];
  actions?: React.ReactNode;
}

const TableLicenseComponent: FC<TableProps> = ({ columns, data, TypeOfConsId, actions }: TableProps) => {
  const tableColumns: TableColumn[] = columns.filter((column) => column.showId && column.showId.includes(Number(TypeOfConsId)));

  function createData(data: any): Data {
    const rowData: Data = {};
  
    function traverse(obj: any, prefix: string = '') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
  
          if (typeof value === 'object' && value !== null) {
            traverse(value, prefix + key + '.');
          } else {
            rowData[prefix + key] = value;
          }
        }
      }
    }
  
    traverse(data);
  
    return rowData;
  }
  const rowsData = data.map((item: any) => createData(item));

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
        <Table className='mainTable'>
          <TableHead className='tableHead'>
            <TableRow>
              {tableColumns.map((column, index) => (
                <TableCell size='small' align='center' key={index} rowSpan={column.rowspan} colSpan={column.colspan}>
                  {column.label}
                </TableCell>
              ))}
                <TableCell size='small' align='center' rowSpan={2}>
                  ACTIONS
                </TableCell>
            </TableRow>
            <TableRow>
              {tableColumns.map((column) =>
                column.children ? (
                  column.children.map((childColumn, index) => (
                    <TableCell size='small' align='center' key={index}>
                      {childColumn.label}
                    </TableCell>
                  ))
                ) : null
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {tableColumns.map((column, columnIndex) =>
                  column.children ? (
                    column.children.map((childColumn, childIndex) => {
                      const parentId = column.id;
                      const key = `${parentId}.${childColumn.id}`; // Tạo chuỗi khóa

                      return(
                        <TableCell key={childIndex} size='small' align='center'>
                          {row[key]}
                        </TableCell>
                      )
                    })
                  ) : (
                    <TableCell key={columnIndex} size='small' align='center'>
                      {row[column.id]}
                    </TableCell>
                  )
                )}
                <TableCell size='small' align='center'>
                  {actions}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      }
    </Paper>
  );
};

export default TableLicenseComponent;
