import { FC, useState, ChangeEvent } from 'react'

import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, TablePagination, Typography } from '@mui/material';

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

const TableComponent: FC<TableProps> = ({ columns, data, TypeOfConsId, actions }: TableProps) => {

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
                {tableColumns.map((column, columnIndex) => {
                  if (column.children) {
                    return column.children.map((childColumn, childIndex) => {
                      const parentId = column.id;
                      const rowValue = row[parentId];

                      if (parentId === "#") {
                        return (
                          <TableCell key={`${columnIndex}-${childIndex}`} size='small'>
                            {childColumn.id === "actions" ? actions && actions(row)
                              : (
                                typeof childColumn.elm === 'function'
                                  ? childColumn.elm(row)
                                  : (childColumn.format
                                    ? childColumn.format(row[childColumn.id])
                                    : row[childColumn.id])
                              )}
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell key={`${columnIndex}-${childIndex}`} size='small'>
                            {Array.isArray(rowValue) ? (
                              rowValue.map((e, k) => (
                                <span key={k}>
                                  {typeof rowValue === 'object' && rowValue !== null && Object.keys(rowValue).length > 0 ? (
                                    rowValue.map((e, k) => (
                                      <span key={k}>
                                        {Object.keys(rowValue).length > 1 ? (
                                          <p>
                                            {typeof childColumn.elm === 'function'
                                              ? childColumn.elm(row)
                                              : (childColumn.format
                                                ? childColumn.format(e[childColumn.id])
                                                : e[childColumn.id])
                                            }
                                          </p>
                                        ) : (
                                          typeof childColumn.elm === 'function'
                                            ? childColumn.elm(row)
                                            : (childColumn.format
                                              ? childColumn.format(e[childColumn.id])
                                              : e[childColumn.id])
                                        )}
                                      </span>
                                    ))
                                  ) : (
                                    typeof childColumn.elm === 'function'
                                      ? childColumn.elm(row)
                                      : (childColumn.format
                                        ? childColumn.format(e[childColumn.id])
                                        : e[childColumn.id])
                                  )}
                                </span>
                              ))
                            ) : (
                              typeof rowValue === 'object' && rowValue !== null && Object.keys(rowValue).length > 0 ? (
                                typeof childColumn.elm === 'function'
                                  ? childColumn.elm(rowValue)
                                  : childColumn.format
                                    ? childColumn.format(rowValue[childColumn.id])
                                    : rowValue[childColumn.id]
                              ) : (
                                rowValue
                              )
                            )}
                          </TableCell>
                        )
                      }
                    });
                  } else {
                    return (
                      <TableCell key={`${columnIndex}`} size='small'>
                        {column.id === "actions" ? actions && actions(row)
                          : (
                            typeof column.elm === 'function'
                              ? column.elm(row)
                              : (column.format
                                ? column.format(row[column.id])
                                : row[column.id])
                          )}
                      </TableCell>
                    );
                  }
                })}
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

export default TableComponent;
