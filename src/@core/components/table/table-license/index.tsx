import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';

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
  TypeOfConsId: number[];
}

const TableLicenseComponent: React.FC<TableProps> = ({ columns, data, TypeOfConsId }: TableProps) => {
  const tableColumns: TableColumn[] = columns.filter((column) => column.showId && column.showId.includes(Number(TypeOfConsId)));

  function createData(data: any): Data {
    const {
      Id, LicenseId, LicenseParentId, BasinId, BusinessId, DistrictId, CommuneId, ConstructionId, LicenseFeeId, LicensingTypeId, TypeOfConstructionId, AquiferId,} = data.License_Fk;
  
    return { Id, LicenseId, LicenseParentId, BasinId, BusinessId, DistrictId, CommuneId, ConstructionId, LicenseFeeId, LicensingTypeId, TypeOfConstructionId, AquiferId};
  }
  const tableData = data.map((item: any) => createData(item));

  return (
    <TableContainer component={Paper}>
      <Table>
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
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              {tableColumns.map((column, columnIndex) =>
                column.children ? (
                  column.children.map((childColumn, childIndex) => (
                    <TableCell key={childIndex} size='small' align='center'>
                      {row[childColumn.id]}
                    </TableCell>
                  ))
                ) : (
                  <TableCell key={columnIndex} size='small' align='center'>
                    {row[column.id]}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableLicenseComponent;
