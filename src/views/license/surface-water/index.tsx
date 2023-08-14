//React Imports
import React, { useState, useEffect } from 'react';

//MUI Imports
import { Box, Tooltip, IconButton, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

//Other Imports
import FormatDate from 'src/@core/components/format-date';
import CheckEffect from 'src/views/license/check-effect';

// import MapComponent from 'src/@core/components/map';
import CountLicense from 'src/views/license/count-license';
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import DataGridComponent, { columnFillters } from 'src/@core/components/data-grid';
import { Delete } from '@mui/icons-material';
import CreateLicense from '../form';

import dynamic from 'next/dynamic';
import fetchData from 'src/api/fetch';
import { useLoadingContext } from 'src/@core/theme/loading-provider';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const EditLicense = (data: any) => {
  console.log('Edit: ' + data.row?.licenseNumber)
}

const DeleteLicense = (data: any) => {
  confirm(`Bạn muốn xóa:  ${data.row?.licenseNumber} chứ?`)
}

//Init columnTable
const columnsTable: GridColDef[] = [
  { field: 'id', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'ID', minWidth: 90 },
  { field: 'licenseNumber', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Số GP', minWidth: 150, renderCell: (data) => (<ShowFilePDF name={data.row.licenseNumber} src={`/pdf/Licenses/` + data.row.licensingAuthorities + `/` + data.row.typeSlug + `/` + data.row.licenseFile} />) },
  { field: 'effect', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Hiệu lực GP', minWidth: 150, renderCell: (data) => (<CheckEffect data={data.row} />) },
  { field: 'signDate', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Ngày ký', minWidth: 150, renderCell: (data) => (FormatDate(data.row.signDate)) },
  { field: 'issueDate', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Ngày có hiệu lực', minWidth: 150, renderCell: (data) => (FormatDate(data.row.issueDate)) },
  { field: 'expireDate', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Ngày hểt hiệu lực', minWidth: 150, renderCell: (data) => (FormatDate(data.row.expireDate)) },
  { field: 'licenseTypeName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Loại hình', minWidth: 120 },

  //business
  { field: 'business.name', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tên', minWidth: 400, valueGetter: (data) => (`${data.row.business?.name || ''}`) },
  { field: 'business.address', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Địa chỉ', minWidth: 400, valueGetter: (data) => (`${data.row.business?.address || ''}`) },

  //oldLicense
  { field: 'oldLicense.licenseNumber', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Số GP', minWidth: 150, renderCell: (data) => (<ShowFilePDF name={data.row.oldLicense?.licenseNumber} src={`/pdf/Licenses/` + data.row.oldLicense?.licensingAuthorities + `/` + data.row.oldLicense?.typeSlug + `/` + data.row.oldLicense?.LicenseFile} />) },
  { field: 'oldLicense.signDate', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Ngày ký', minWidth: 150, valueGetter: (data) => (`${data.row.oldLicense?.signDate || ''}`) },

  //Construction
  { field: 'construction.constructionName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tên Công trình', minWidth: 200, valueGetter: (data) => (`${data.row.construction?.constructionName || ''}`) },
  { field: 'construction.constructionLocation', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Địa điểm Công trình', minWidth: 400, valueGetter: (data) => (`${data.row.construction?.constructionLocation || ''}`) },
  { field: 'construction.constructionTypeName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Loại hình Công trình', minWidth: 150, valueGetter: (data) => (`${data.row.construction?.constructionTypeName || ''}`) },
  { field: 'construction.CommuneName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Xã', minWidth: 150, valueGetter: (data) => (`${data.row.construction?.CommuneName || ''}`) },
  { field: 'construction.districtName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Huyện', minWidth: 150, valueGetter: (data) => (`${data.row.construction?.districtName || ''}`) },
  { field: 'construction.exploitedWS', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Nguồn nước khai thác', minWidth: 150, valueGetter: (data) => (`${data.row.construction?.exploitedWS || ''}`) },
  { field: 'construction.riverName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Lưu vực', minWidth: 150, valueGetter: (data) => (`${data.row.construction?.riverName || ''}`) },
  { field: 'construction.basinName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tiểu vùng quy hoạch', minWidth: 250, valueGetter: (data) => (`${data.row.construction?.basinName || ''}`) },

  //licenseFee
  { field: 'licenseFee.licenseFeeNumber', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Số QĐ', minWidth: 150, renderCell: (data) => (<ShowFilePDF name={data.row.licenseFee?.licenseFeeNumber} src={`/pdf/licenseFees/` + data.row.licenseFee?.licensingAuthorities + `/` + data.row.licenseFee?.filePDF} />) },
  { field: 'licenseFee.signDate', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Ngày ký', minWidth: 150, renderCell: (data) => (FormatDate(data.row.licenseFee?.signDate)) },
  { field: 'licenseFee.TotalMoney', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tổng tiền cấp quyền (VNĐ)', minWidth: 150, type: 'number', valueGetter: (data) => (data.row.licenseFee?.totalMoney || '') },

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
      { field: 'licenseNumber' },
      { field: 'effect' },
      { field: 'signDate' },
      { field: 'issueDate' },
      { field: 'expireDate' },
      { field: 'licenseTypeName' },
    ],
  },
  {
    groupId: 'Cơ quan/cá nhân được CP',
    headerClassName: 'tableHead',
    headerAlign: 'center',
    children: [
      { field: 'business.name' },
      { field: 'business.address' }
    ],
  },
  {
    groupId: 'Thông tin GP cũ',
    headerClassName: 'tableHead',
    headerAlign: 'center',
    children: [
      { field: 'oldLicense.licenseNumber' },
      { field: 'oldLicense.signDate' }
    ]
  },
  {
    groupId: 'Thông tin CT',
    headerClassName: 'tableHead',
    headerAlign: 'center',
    children: [
      { field: 'construction.constructionName' },
      { field: 'construction.constructionLocation' },
      { field: 'construction.constructionTypeName' },
      { field: 'construction.CommuneName' },
      { field: 'construction.districtName' },
      { field: 'construction.exploitedWS' },
      { field: 'construction.riverName' },
      { field: 'construction.basinName' },
    ],
  },
  {
    groupId: 'Tiền cấp quyền',
    headerClassName: 'tableHead',
    headerAlign: 'center',
    children: [
      { field: 'licenseFee.licenseFeeNumber' },
      { field: 'licenseFee.signDate' },
      { field: 'licenseFee.TotalMoney' }
    ],
  },
  {
    groupId: ' ',
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
    value: 'licenseNumber',
    type: 'text',
  },
  {
    label: 'Cơ quan cấp phép',
    value: 'licensingAuthorities',
    type: 'select',
    options: [
      { label: 'BTNMT', value: 0 },
      { label: 'UBND Tỉnh', value: 1 },
    ],
  },
  {
    label: 'Loại hình cấp phép',
    value: 'licenseTypeSlug',
    type: 'select',
    options: [
      { label: 'Cấp mới', value: 'cap-moi' },
      { label: 'Cấp lại', value: 'cap-lai' },
      { label: 'Gia hạn', value: 'gia-han' },
      { label: 'Điểu chỉnh', value: 'dieu-chinh' },
      { label: 'Thu hồi', value: 'thu-hoi' },
    ],
  },
  {
    label: 'Hiệu lực giấy phép',
    value: 'licenseValidity',
    type: 'select',
    options: [
      { label: 'Còn hiệu lực', value: 'con-hieu-luc' },
      { label: 'Hết hiệu lực', value: 'het-hieu-luc' },
      { label: 'Sáp hết hiệu lực', value: 'sap-het-hieu-luc' },
      { label: 'Đã bị thu hồi', value: 'da-bi-thu-hoi' },
    ],
  },
  {
    label: 'Chủ  giấy phép',
    value: 'businessId',
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
    value: 'constructionName',
    type: 'text',
  },
  {
    label: 'Loại công trình',
    value: 'constructionTypeSlug',
    type: 'select',
    options: [
      { label: 'Thủy điện', value: 'thuydien' },
      { label: 'Hồ chứa', value: 'hochua' },
      { label: 'Trạm bơm', value: 'trambom' },
      { label: '...', value: '...' },
    ],
  },
  {
    label: 'Huyện',
    value: 'districtId',
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
    value: 'communeId',
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
    value: 'basinId',
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

  const [columns, setColumns] = useState<any[]>([]);
  const [columnFillters, setcolumnFillters] = useState<any[]>([]);

  const [postSuccess, setPostSuccess] = useState(false);
  const { showLoading, hideLoading } = useLoadingContext();
  const [loading, setLoading] = useState(false)
  loading == true ? showLoading() : hideLoading();

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  const [resData, setResData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchData('License/list');
        setResData(data);
      } catch (error) {
        setResData([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [postSuccess]);

  useEffect(() => {
    setColumns(columnsTable);
    setcolumnFillters(columnFillter)
  }, [postSuccess])

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12}>
        <Paper elevation={3} sx={{ py: 1, px: 3 }}>
          <Typography variant='overline'>Giấy phép/nước mặt</Typography>
        </Paper>
      </Grid>
      <Grid xs={12} md={3}>
        <CountLicense data={resData} />
      </Grid>
      <Grid xs={12} md={9} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Paper elevation={3} sx={{ height: '100%' }}>
          <Map center={mapCenter} zoom={mapZoom} mapData={null} />
        </Paper>
      </Grid>
      <Grid xs={12} md={12}>
        <Paper elevation={3} sx={{ p: 0, height: '100%' }}>
          <DataGridComponent
            rows={resData}
            columns={columns}
            columnGroupingModel={columnGroup}
            columnFillter={columnFillters}
            actions={
              <CreateLicense isEdit={false} setPostSuccess={handlePostSuccess} />
            }
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SurfaceWaterLicense;
