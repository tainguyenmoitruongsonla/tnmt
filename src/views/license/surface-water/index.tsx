//React Imports
import React, { useState, useEffect } from 'react';

//MUI Imports
import { Grid, Card, CardContent, Button, Box } from '@mui/material';
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

//Other Imports
import FormatDate from 'src/@core/components/format-date';
import CheckEffect from 'src/@core/components/license-page/check-effect';
import licenseSFData from 'src/api/license/nuocmat';

// import MapComponent from 'src/@core/components/map';
import CountLicense from 'src/@core/components/license-page/count-license';
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import DataGridComponent from 'src/@core/components/data-grid';

const formatNum = (num: any) => {
  if (typeof Intl === 'undefined' || !Intl.NumberFormat) {
    return 'NaN';
  } else {
    const nf = new Intl.NumberFormat();
    const x = num;
    if (num !== undefined) {
      return nf.format(x);
    }
  }
};


//Hanlde click to nutton in actions column
const ActionButton = (data: any) => {
  const [count, setCount] = React.useState(0);

  const handleClickBtn = () => {
    setCount((prev) => prev + 1)
    console.log(data)
  }

  return (
    <Box>
      <Button size='small' variant='outlined' onClick={() => handleClickBtn()}>{count}</Button>
    </Box>
  );
};

//Init columnTable
const columnsTable: GridColDef[] = [
  { field: 'id', headerName: 'ID', minWidth: 90 },
  { field: 'LicenseNumber', headerName: 'Số GP', minWidth: 150, renderCell: (data) => (<ShowFilePDF name={data.row.LicenseNumber} src={`/pdf/Licenses/` + data.row.LicensingAuthorities + `/` + data.row.TypeSlug + `/` + data.row.LicenseFile} />) },
  { field: 'Effect', headerName: 'Hiệu lực GP', minWidth: 150, renderCell: (data) => (<CheckEffect data={data.row} />) },
  { field: 'SignDate', headerName: 'Ngày ký', minWidth: 150, renderCell: (data) => (FormatDate(data.row.SignDate)) },
  { field: 'IssueDate', headerName: 'Ngày có hiệu lực', minWidth: 150, renderCell: (data) => (FormatDate(data.row.IssueDate)) },
  { field: 'LicenseTypeName', headerName: 'Loại hình', minWidth: 120 },

  //Business
  { field: 'BusinessName', headerName: 'Tên', minWidth: 400, valueGetter: (data) => (`${data.row.Business?.Name || ''}`) },
  { field: 'BusinessAddress', headerName: 'Địa chỉ', minWidth: 400, valueGetter: (data) => (`${data.row.Business?.Address || ''}`) },

  //oldLicense
  { field: 'OldLicense.LicenseNumber', headerName: 'Số GP', minWidth: 150, renderCell: (data) => (<ShowFilePDF name={data.row.OldLicense?.LicenseNumber} src={`/pdf/Licenses/` + data.row.OldLicense?.LicensingAuthorities + `/` + data.row.OldLicense?.TypeSlug + `/` + data.row.OldLicense?.LicenseFile} />) },
  { field: 'OldLicense.SignDate', headerName: 'Ngày ký', minWidth: 150, valueGetter: (data) => (`${data.row.OldLicense?.SignDate || ''}`) },

  //Construction
  { field: 'Construction.ConstructionName', headerName: 'Tên Công trình', minWidth: 200, valueGetter: (data) => (`${data.row.Construction?.ConstructionName || ''}`) },
  { field: 'Construction.ConstructionLocation', headerName: 'Địa điểm Công trình', minWidth: 400, valueGetter: (data) => (`${data.row.Construction?.ConstructionLocation || ''}`) },
  { field: 'Construction.ConstructionTypeName', headerName: 'Loại hình Công trình', minWidth: 150, valueGetter: (data) => (`${data.row.Construction?.ConstructionTypeName || ''}`) },
  { field: 'Construction.CommuneName', headerName: 'Xã', minWidth: 150, valueGetter: (data) => (`${data.row.Construction?.CommuneName || ''}`) },
  { field: 'Construction.DistrictName', headerName: 'Huyện', minWidth: 150, valueGetter: (data) => (`${data.row.Construction?.DistrictName || ''}`) },
  { field: 'Construction.ExploitedWS', headerName: 'Nguồn nước khai thác', minWidth: 150, valueGetter: (data) => (`${data.row.Construction?.ExploitedWS || ''}`) },
  { field: 'Construction.RiverName', headerName: 'Lưu vực', minWidth: 150, valueGetter: (data) => (`${data.row.Construction?.RiverName || ''}`) },
  { field: 'Construction.BasinName', headerName: 'Tiểu vùng quy hoạch', minWidth: 250, valueGetter: (data) => (`${data.row.Construction?.BasinName || ''}`) },

  //LicenseFee
  { field: 'LicenseFee.LicenseFeeNumber', headerName: 'Số QĐ TCC', minWidth: 150, renderCell: (data) => (<ShowFilePDF name={data.row.LicenseFee?.LicenseFeeNumber} src={`/pdf/LicenseFees/` + data.row.LicenseFee?.LicensingAuthorities + `/` + data.row.LicenseFee?.FilePDF} />) },
  { field: 'LicenseFee.SignDate', headerName: 'Ngày ký TCC', minWidth: 150, renderCell: (data) => (FormatDate(data.row.LicenseFee?.SignDate)) },
  { field: 'LicenseFee.TotalMoney', headerName: 'Tổng tiền cấp quyền (VNĐ)', minWidth: 150, valueGetter: (data) => (`${formatNum(data.row.LicenseFee?.TotalMoney) || ''}`) },

  //Action
  { field: 'actions', headerName: '#', headerAlign: 'center', minWidth: 150, renderCell: (data) => (<ActionButton data={data} />) },
];

//Grouping Column
const columnGroup: GridColumnGroupingModel = [
  {
    groupId: 'Thông tin GP',
    headerAlign: 'center',
    children: [
      { field: 'LicenseNumber' },
      { field: 'Effect' },
      { field: 'SignDate' },
      { field: 'IssueDate' },
      { field: 'LicenseTypeName' },
    ],
  },
  {
    groupId: 'Cơ quan/cá nhân được CP',
    headerAlign: 'center',
    children: [
      { field: 'BusinessName' },
      { field: 'BusinessAddress' }
    ],
  },
  {
    groupId: 'Thông tin GP cũ',
    headerAlign: 'center',
    children: [
      { field: 'OldLicense.LicenseNumber' },
      { field: 'OldLicense.SignDate' }
    ]
  },
  {
    groupId: 'Thông tin CT',
    headerAlign: 'center',
    children: [
      { field: 'Construction.ConstructionName' },
      { field: 'Construction.ConstructionLocation' },
      { field: 'Construction.ConstructionTypeName' },
      { field: 'Construction.CommuneName' },
      { field: 'Construction.DistrictName' },
      { field: 'Construction.ExploitedWS' },
      { field: 'Construction.RiverName' },
      { field: 'Construction.BasinName' },
    ],
  },
  {
    groupId: 'Tiền cấp quyền',
    headerAlign: 'center',
    children: [
      { field: 'LicenseFee.LicenseFeeNumber' },
      { field: 'LicenseFee.SignDate' },
      { field: 'LicenseFee.TotalMoney' }
    ],
  },
];

const SurfaceWaterLicense = () => {

  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);


  useEffect(() => {
    setData(licenseSFData);
    setColumns(columnsTable);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={3} sm={3} md={3}>
        <CountLicense />
      </Grid>
      <Grid item xs={9} sm={9} md={9} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 0, height: '100%' }}>
            {/* <MapComponent /> */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 0, height: '100%' }}>
            <DataGridComponent
              data={{ rows: data, columns: columns, columnGroupingModel: columnGroup }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SurfaceWaterLicense;
