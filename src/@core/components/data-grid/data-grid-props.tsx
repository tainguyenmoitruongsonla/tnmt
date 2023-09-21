export const dataGridProps = {
  className: "mainTable",
  disableColumnMenu: true,
  showCellVerticalBorder: true,
  showColumnVerticalBorder: true,
  rowHeight: 45,
  columnHeaderHeight: 45,
  experimentalFeatures: {
    'columnGrouping': true
  },
  initialState: {
    columns: {
      columnVisibilityModel: {
        id: false,
      }
    },
    pagination: { paginationModel: { pageSize: 10 } },
  },
  pageSizeOptions: [10, 25, 50],
};