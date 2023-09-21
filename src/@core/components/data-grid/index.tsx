import * as React from "react";
import { DataGrid } from "@mui/x-data-grid"
import { dataGridProps } from "./data-grid-props";

interface columnFillter {
  label: string,
  value: string,
  type: 'text' | 'select' | 'dateRange',
  options?: columnFillterOptions[]
}

interface columnFillterOptions {
  label: string,
  value: string | number
}

export type columnFillters = columnFillter;

interface DataGridComponentProps {
  rows: any
  columns: any
  columnGroupingModel?: any
  columnVisibility?: any
  columnFillter?: columnFillter[]
  formFilter?: any
  loading?: boolean
  actions?: any
}

const DataGridComponent = (props: DataGridComponentProps) => {

  const { rows, columns, columnGroupingModel, loading } = props;
  const [rowDatas, setRowDatas] = React.useState<any>(rows);
  const columnUpdated = columns;
  const [displayedColumns, setDisplayedColumns] = React.useState<any>(columnUpdated);

  React.useEffect(() => {
    setRowDatas(rows);
    setDisplayedColumns(columns)
  }, [rows, columns]);

  return (
    <div style={{ height: 610, width: '100%' }}>
      <DataGrid
        rows={rowDatas}
        columns={displayedColumns}
        columnGroupingModel={columnGroupingModel}
        loading={loading}
        {...dataGridProps}
      />
    </div>
  );
}

export default DataGridComponent;