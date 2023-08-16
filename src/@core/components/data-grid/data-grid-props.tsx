import { GridDensity } from "@mui/x-data-grid";

export const dataGridProps = {
    className: "mainTable",
    disableColumnMenu: true,
    showCellVerticalBorder: true,
    showColumnVerticalBorder: true,
    density: "compact" as GridDensity,
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