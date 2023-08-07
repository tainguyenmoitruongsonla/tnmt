import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { DataGrid, GridToolbarExport } from "@mui/x-data-grid";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { AutoComplete, TextField } from "../field";
import Grid from '@mui/material/Unstable_Grid2';

function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

interface SearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
  input: SearchToolbarProps;
  select: SearchToolbarProps;
}

function SearchToolbar(props: SearchToolbarProps) {

  const licensingType = [
    { title: "Cấp mới giấy phép", value: 1 },
    { title: "Cấp lại giấy phép", value: 2 },
    { title: "Gia hạn giấy phép", value: 3 },
    { title: "Điều chỉnh giấy phép", value: 4 },
    { title: "Thu hồi giấy phép", value: 5 },
  ];

  const typeOfCons = [
    { title: "Chọn loại CT", value: 1 },
    { title: "Thủy điện", value: 4 },
    { title: "Hồ chứa", value: 5 },
    { title: "Trạm bơm", value: 6 },
    { title: "Đập/Hệ thống thủy lợi", value: 12 },
    { title: "Cống", value: 13 },
    { title: "Trạm cấp nước", value: 11 },
    { title: "Nhà máy nước", value: 14 },
    { title: "Công trình khác", value: 23 },
  ];

  return (
    <Grid container p={2} gap={4} justifyContent={'end'} >
      <Grid md={2} xs={6}>
        <AutoComplete
          id="TypeOfConstructionId"
          size="small"
          options={typeOfCons}
          getOptionLabel={(option: any) => option.title}
          label="Chọn loại CT"
          onChange={props.select.onChange}
          isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
        />
      </Grid>
      <Grid md={2} xs={6}>
        <AutoComplete
          id="LicensingTypeId"
          size="small"
          options={licensingType}
          getOptionLabel={(option: any) => option.title}
          label="Chọn loại hình CP"
          onChange={props.select.onChange}
          isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
        />
      </Grid>
      <TextField
        variant="standard"
        value={props.input.value}
        onChange={props.input.onChange}
        placeholder="Tìm kiếm nhanh…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          )
        }}
        sx={{ width: 165 }}
      />
      <GridToolbarExport csvOptions={{
        fileName: 'customerDataBase',
        utf8WithBom: true,
      }} />
    </Grid>
  );
}

interface SearchSelect {
  LicensingTypeId: number | string,
  TypeOfConstructionId: number | string,
}

const DataGridComponent = (data: any) => {

  const dataGrid = data.data;

  const [searchText, setSearchText] = React.useState("");
  const [searchSelect, setSearchSelect] = React.useState<SearchSelect>({
    LicensingTypeId: 0,
    TypeOfConstructionId: 0,
  });
  const [rows, setRows] = React.useState<any[]>(dataGrid.rows);

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = dataGrid.rows.filter((row: any) => {
      return Object.keys(row).some((field: any) => {
        return searchRegex.test(row[field]?.toString());
      });
    });
    setRows(filteredRows);
  };

  const handleSectecSearch = (searchValue: any, fieldName: string) => {
    setSearchSelect({ ...searchSelect, [fieldName]: searchValue });
    if (searchValue <= 0 || searchValue == undefined) {
      setRows(dataGrid.rows);
    } else {
      const filteredRows = dataGrid.rows.filter((row: any) => {
        return row[fieldName] === searchValue;
      });
      setRows(filteredRows);
    }
  }

  React.useEffect(() => {
    setRows(dataGrid.rows);
  }, [dataGrid.rows]);

  return (
    <DataGrid
      className="mainTable"
      rows={rows}
      columns={dataGrid.columns}
      disableColumnMenu
      showCellVerticalBorder
      showColumnVerticalBorder
      density="compact"
      experimentalFeatures={{ columnGrouping: true }}
      columnGroupingModel={dataGrid.columnGroupingModel}
      initialState={{
        columns: {
          columnVisibilityModel: {
            // Hide columns status and traderName, the other columns will remain visible
            id: false,
          },
        },
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10, 25, 50]}
      slots={{ toolbar: SearchToolbar }}
      slotProps={{
        toolbar: {
          input: {
            value: searchText,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              requestSearch(event.target.value),
            clearSearch: () => requestSearch("")
          },
          select: {
            value: searchSelect,
            onChange: (event: React.ChangeEvent<HTMLInputElement>, value: any) =>
              handleSectecSearch(value?.value, event.target.id.split('-')[0]),
            clearSearch: () => handleSectecSearch('', '')
          },
        }
      }}
    />
  );
}

export default DataGridComponent;