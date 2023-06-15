import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface TableColumn {
    label: string;
    showId?: number[];
    colspan?: number;
    rowspan?: number;
    children?: TableColumn[];
  }
  
interface TableData {
  [key: string]: string;
}

interface TableProps {
    columns: TableColumn[];
    data: TableData[];
    TypeOfConsId: number[];
  }

const TableLicenseComponent: React.FC<TableProps> = ({columns, data, TypeOfConsId}:any) => {

    const tableColumns: TableColumn[] = columns.filter((column:TableColumn) => column.showId && column.showId.includes(Number(TypeOfConsId)));

    const tableData: TableData[] = data;

  return (
    <TableContainer>
      <Table>
      <TableHead className='tableHead'>
        <TableRow>
            {tableColumns.map((column, index) => (
            <TableCell size='small' align='center' key={index} rowSpan={column.rowspan} colSpan={column.colspan}>{column.label}</TableCell>
            ))}
        </TableRow>
        <TableRow>
            {tableColumns.map((column) => (
            column.children && (
                column.children.map((childColumn, index) => (
                <TableCell size='small' align='center' key={index}>{childColumn.label}</TableCell>
                ))
            )
            ))}
        </TableRow>
            </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              {tableColumns.map((column, index) => (
                <TableCell size='small' align='center' key={index}>{row[column.label]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableLicenseComponent;
