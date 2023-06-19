import { FC, useState, ChangeEvent } from 'react'

import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, TablePagination } from '@mui/material';

interface TableColumn {
  id: string;
  label?: string;
  showId?: number[];
  colspan?: number;
  rowspan?: number;
  children?: TableColumn[];
  format?: (value: any) => string;
  elm?: React.ReactNode;
}

interface Data {
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  data: Data[];
  TypeOfConsId?: number[];
  actions?: ((row: Data) => React.ReactNode) | null;
}

const TableLicenseComponent: FC<TableProps> = ({ columns, data, TypeOfConsId, actions }: TableProps) => {

  const tableColumns: TableColumn[] = columns.filter((column) => column.showId && column.showId.includes(Number(TypeOfConsId)));

  const rowsData = data;

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
          <TableBody className='tableBody'>
            {rowsData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {tableColumns.map((column, columnIndex) =>
                  column.children ? (
                    column.children.map((childColumn, childIndex) => {
                      const parentId = column.id;
                      const rowValue = row[parentId];

                      return (
                        <TableCell key={childIndex} size='small'>
                          {Array.isArray(rowValue)
                            ? rowValue.map((e, k) => (
                              <span key={k}>{e}</span>
                            ))
                            : typeof rowValue === 'object' && rowValue !== null && Object.keys(rowValue).length > 0
                              ? (
                                typeof childColumn.elm === 'function'
                                  ? childColumn.elm(rowValue)
                                  : childColumn.format
                                    ? childColumn.format(rowValue[childColumn.id])
                                    : rowValue[childColumn.id]
                              )
                              : <span>{rowValue}</span>
                          }
                        </TableCell>
                      )
                    })
                  ) : (
                    <TableCell key={columnIndex} size='small'>
                      {column.id == "actions" ? actions && actions(row)
                        :
                        (
                          typeof column.elm === 'function' ? column.elm(row) : (column.format ? column.format(row[column.id]) : row[column.id])
                        )}
                    </TableCell>
                  )
                )}
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
