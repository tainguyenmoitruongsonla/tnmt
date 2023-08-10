//React Imports
import React, { useState, useEffect } from 'react';

//MUI Imports
import { Card, CardContent, Box, Tooltip, IconButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

//Other Imports
import FormatDate from 'src/@core/components/format-date';
import CheckEffect from 'src/@core/components/license-page/check-effect';
import licenseSFData from 'src/api/license/nuocmat';

// import MapComponent from 'src/@core/components/map';
import CountLicense from 'src/@core/components/license-page/count-license';
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import DataGridComponent, { columnFillters } from 'src/@core/components/data-grid';
import { Delete } from '@mui/icons-material';
import CreateLicense from '../form';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const EditLicense = (data: any) => {
  console.log('Edit: ' + data.row?.LicenseNumber)
}

const DeleteLicense = (data: any) => {
  confirm(`Bạn muốn xóa:  ${data.row?.LicenseNumber} chứ?`)
}

//Init columnTable
const columnsTable: GridColDef[] = [
  { field: 'id', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'ID', minWidth: 90 },
  { field: 'LicenseNumber', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Số GP', minWidth: 150, renderCell: (data) => (<ShowFilePDF name={data.row.LicenseNumber} src={`/pdf/Licenses/` + data.row.LicensingAuthorities + `/` + data.row.TypeSlug + `/` + data.row.LicenseFile} />) },
  { field: 'Effect', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Hiệu lực GP', minWidth: 150, renderCell: (data) => (<CheckEffect data={data.row} />) },
  { field: 'SignDate', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Ngày ký', minWidth: 150, renderCell: (data) => (FormatDate(data.row.SignDate)) },
  { field: 'IssueDate', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Ngày có hiệu lực', minWidth: 150, renderCell: (data) => (FormatDate(data.row.IssueDate)) },
  { field: 'LicenseTypeName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Loại hình', minWidth: 120 },

  //Business
  { field: 'Business.Name', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tên', minWidth: 400, valueGetter: (data) => (`${data.row.Business?.Name || ''}`) },
  { field: 'Business.Address', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Địa chỉ', minWidth: 400, valueGetter: (data) => (`${data.row.Business?.Address || ''}`) },

  //oldLicense
  { field: 'OldLicense.LicenseNumber', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Số GP', minWidth: 150, renderCell: (data) => (<ShowFilePDF name={data.row.OldLicense?.LicenseNumber} src={`/pdf/Licenses/` + data.row.OldLicense?.LicensingAuthorities + `/` + data.row.OldLicense?.TypeSlug + `/` + data.row.OldLicense?.LicenseFile} />) },
  { field: 'OldLicense.SignDate', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Ngày ký', minWidth: 150, valueGetter: (data) => (`${data.row.OldLicense?.SignDate || ''}`) },

  //Construction
  { field: 'Construction.ConstructionName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tên Công trình', minWidth: 200, valueGetter: (data) => (`${data.row.Construction?.ConstructionName || ''}`) },
  { field: 'Construction.ConstructionLocation', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Địa điểm Công trình', minWidth: 400, valueGetter: (data) => (`${data.row.Construction?.ConstructionLocation || ''}`) },
  { field: 'Construction.ConstructionTypeName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Loại hình Công trình', minWidth: 150, valueGetter: (data) => (`${data.row.Construction?.ConstructionTypeName || ''}`) },
  { field: 'Construction.CommuneName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Xã', minWidth: 150, valueGetter: (data) => (`${data.row.Construction?.CommuneName || ''}`) },
  { field: 'Construction.DistrictName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Huyện', minWidth: 150, valueGetter: (data) => (`${data.row.Construction?.DistrictName || ''}`) },
  { field: 'Construction.ExploitedWS', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Nguồn nước khai thác', minWidth: 150, valueGetter: (data) => (`${data.row.Construction?.ExploitedWS || ''}`) },
  { field: 'Construction.RiverName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Lưu vực', minWidth: 150, valueGetter: (data) => (`${data.row.Construction?.RiverName || ''}`) },
  { field: 'Construction.BasinName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tiểu vùng quy hoạch', minWidth: 250, valueGetter: (data) => (`${data.row.Construction?.BasinName || ''}`) },

  //LicenseFee
  { field: 'LicenseFee.LicenseFeeNumber', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Số QĐ', minWidth: 150, renderCell: (data) => (<ShowFilePDF name={data.row.LicenseFee?.LicenseFeeNumber} src={`/pdf/LicenseFees/` + data.row.LicenseFee?.LicensingAuthorities + `/` + data.row.LicenseFee?.FilePDF} />) },
  { field: 'LicenseFee.SignDate', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Ngày ký', minWidth: 150, type: 'date', valueGetter: (data) => (data.row.LicenseFee?.SignDate || '') },
  { field: 'LicenseFee.TotalMoney', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tổng tiền cấp quyền (VNĐ)', minWidth: 150, type: 'number', valueGetter: (data) => (data.row.LicenseFee?.TotalMoney || '') },

  //Action
  {
    field: 'actions', headerClassName: 'tableHead', headerAlign: 'center', headerName: '#', minWidth: 120, sortable: false,
    renderCell: (data) => (
      <Box>
        <Tooltip title="Chỉnh sửa giấy phép">
          <IconButton onClick={() => EditLicense(data)}>
            <CreateLicense isEdit={true} data={data.row} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa giấy phép">
          <IconButton onClick={() => DeleteLicense(data)}>
            <Delete className='tableActionBtn deleteBtn' />
          </IconButton>
        </Tooltip>
      </Box>
    )
  },
];

//Grouping Column
const columnGroup: GridColumnGroupingModel = [
  {
    groupId: 'Thông tin GP',
    headerClassName: 'tableHead',
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
    headerClassName: 'tableHead',
    headerAlign: 'center',
    children: [
      { field: 'Business.Name' },
      { field: 'Business.Address' }
    ],
  },
  {
    groupId: 'Thông tin GP cũ',
    headerClassName: 'tableHead',
    headerAlign: 'center',
    children: [
      { field: 'OldLicense.LicenseNumber' },
      { field: 'OldLicense.SignDate' }
    ]
  },
  {
    groupId: 'Thông tin CT',
    headerClassName: 'tableHead',
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
    headerClassName: 'tableHead',
    headerAlign: 'center',
    children: [
      { field: 'LicenseFee.LicenseFeeNumber' },
      { field: 'LicenseFee.SignDate' },
      { field: 'LicenseFee.TotalMoney' }
    ],
  },
  {
    groupId: '#',
    renderHeaderGroup: () => (
      <Tooltip title="Thêm mới giấy phép">
        <IconButton onClick={() => console.log('Create license')}>
          <CreateLicense isEdit={false} />
        </IconButton>
      </Tooltip>
    ),
    headerClassName: 'tableHead',
    headerAlign: 'center',
    children: [
      { field: 'actions' }
    ],
  }
];

const columnFillter: columnFillters[] = [
  {
    label: 'Số GP',
    value: 'LicenseNumber',
    type: 'text',
  },
  {
    label: 'Cơ quan cấp phép',
    value: 'LicensingAuthorities',
    type: 'select',
    options: [
      { label: 'BTNMT', value: 0 },
      { label: 'UBND Tỉnh', value: 1 },
    ],
  },
  {
    label: 'Loại hình cấp phép',
    value: 'LicensingTypeId',
    type: 'select',
    options: [
      { label: 'Cấp mới', value: 1 },
      { label: 'Cấp lại', value: 2 },
      { label: 'Gia hạn', value: 3 },
      { label: 'Điểu chỉnh', value: 4 },
      { label: 'Thu hồi', value: 5 },
    ],
  },
  {
    label: 'Hiệu lực giấy phép',
    value: 'LicensingEffect',
    type: 'select',
    options: [
      { label: 'Còn hiệu lực', value: 1 },
      { label: 'Hết hiệu lực', value: 2 },
      { label: 'Sáp hết hiệu lực', value: 3 },
      { label: 'Đã bị thu hồi', value: 4 },
    ],
  },
  {
    label: 'Chủ  giấy phép',
    value: 'BusinessId',
    type: 'select',
    options: [
      { label: 'Công ty A', value: 1 },
      { label: 'Công ty B', value: 2 },
      { label: 'Công ty C', value: 3 },
      { label: '...', value: 4 },
    ],
  },
  {
    label: 'Công trình',
    value: 'ConstructionId',
    type: 'text',
  },
  {
    label: 'Huyện',
    value: 'DistrictId',
    type: 'select',
    options: [
      { label: 'Huyện 1', value: 1 },
      { label: 'Huyện 2', value: 2 },
      { label: 'Huyện 3', value: 3 },
      { label: '...', value: 4 },
    ],
  },
  {
    label: 'Xã',
    value: 'CommuneId',
    type: 'select',
    options: [
      { label: 'Xã 1', value: 1 },
      { label: 'Xã 2', value: 2 },
      { label: 'Xã 3', value: 3 },
      { label: '...', value: 4 },
    ],
  },
  {
    label: 'Tiểu vùng quy hoạch',
    value: 'BasinId',
    type: 'select',
    options: [
      { label: 'Tiểu vùng quy hoạch 1', value: 1 },
      { label: 'Tiểu vùng quy hoạch 2', value: 2 },
      { label: 'Tiểu vùng quy hoạch 3', value: 3 },
      { label: '...', value: 4 },
    ],
  },
];

const SurfaceWaterLicense = () => {
  const [mapCenter] = useState([15.012172, 108.676488]);
  const [mapZoom] = useState(9);

  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [columnFillters, setcolumnFillters] = useState<any[]>([]);

  useEffect(() => {
    setData(licenseSFData);
    setColumns(columnsTable);
    setcolumnFillters(columnFillter)
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={3}>
        <CountLicense />
      </Grid>
      <Grid xs={12} md={9} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 0, height: '100%' }}>
            <Map center={mapCenter} zoom={mapZoom} mapData={null} />
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={12}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 0, height: '100%' }}>
            <DataGridComponent
              rows={data}
              columns={columns}
              columnGroupingModel={columnGroup}
              columnFillter={columnFillters}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SurfaceWaterLicense;
