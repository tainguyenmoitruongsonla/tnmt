//React Imports
import React, { useState, useEffect } from 'react';

//MUI Imports
import { Box, Tooltip, IconButton, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

//Other Imports
import FormatDate from 'src/@core/components/format-date';

import MapLegend from 'src/views/construction/MapLegend';
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import DataGridComponent, { columnFillters } from 'src/@core/components/data-grid';
import { Delete } from '@mui/icons-material';


import dynamic from 'next/dynamic';
import fetchData from 'src/api/fetch';
import { useLoadingContext } from 'src/@core/theme/loading-provider';
import CreateConstruction from '../form/sufacewater';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const EditLicense = (data: any) => {
  console.log('Edit: ' + data.row?.licenseNumber)
}

const DeleteLicense = (data: any) => {
  confirm(`Bạn muốn xóa:  ${data.row?.licenseNumber} chứ?`)
}

const WaterSupplyStation = () => {

  //Init columnTable
  const columnsTable: GridColDef[] = [
    { field: 'id', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'ID', minWidth: 90 },
    {
      field: 'constructionName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tên công trình', minWidth: 250, renderCell: (data) => (<Typography
        className='btnShowFilePdf' onClick={() => zoomConstruction([data.row.lat, data.row.lng])}>{data.row.constructionName}</Typography>)
    },
    { field: 'constructionLocation', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Địa điểm', minWidth: 150, },
    { field: 'coordinates', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Toạ độ đập chính(X,Y)', minWidth: 150, valueGetter: (data) => (`${data.row.x},${data.row.y}`) },
    { field: 'exploitedWS', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Nguồn nước khai thác', minWidth: 150, },
    { field: 'miningMethod', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Phương thức khai thác', minWidth: 150, },
    { field: 'miningMode', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Chế độ KT', minWidth: 150, },
    { field: 'miningPurpose', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Mục đích KT', minWidth: 150, },
    { field: 'basinName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tiểu vùng quy hoạch', minWidth: 150, },
    { field: 'constructionTime', headerClassName: 'tableHead', headerAlign: 'center', headerName: '	Năm xây dựng', minWidth: 100, },
    { field: 'startDate', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Năm vận hành', minWidth: 100, },

    //constructionDetails
    { field: 'power', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'CS lắp máy(MW)', minWidth: 150, },
    { field: 'flowDesigned', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>Q<sub>TK</sub> (m<sup>3</sup>/h)</span>), minWidth: 150, },
    { field: 'realityFlow', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>Q<sub>TT</sub> (m<sup>3</sup>/h)</span>), minWidth: 150, },
   
    //license
    { field: 'licenseNumber', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Số GP', minWidth: 150, renderCell: (data) => (<ShowFilePDF name={data.row.licenseNumber} src={`/pdf/Licenses/` + data.row.licensingAuthorities + `/` + data.row.typeSlug + `/` + data.row.licenseFile} />) },
    { field: 'signDate', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Hiệu lực GP', minWidth: 150, renderCell: (data) => (FormatDate(data.row.signDate)) },
    { field: 'issueDate', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Ngày ký', minWidth: 150, renderCell: (data) => (FormatDate(data.row.signDate)) },

    //licensefee
    { field: 'licenseFeeNumber', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Số QĐ', minWidth: 150, },
    { field: 'totalMoney', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tổng tiền(đồng)', minWidth: 150, },

    //Action
    {
      field: 'actions', headerClassName: 'tableHead', headerAlign: 'center', headerName: '#', minWidth: 120, sortable: false,
      renderCell: (data) => (
        <Box>
          <Tooltip title="Chỉnh sửa giấy phép">
            <IconButton onClick={() => EditLicense(data)}>
              <CreateConstruction isEdit={true} data={data.row} />
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
      groupId: 'Thông tin công trình',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'constructionName' },
        { field: 'constructionLocation' },
        { field: 'coordinates' },
        { field: 'exploitedWS' },
        { field: 'miningMethod' },
        { field: 'miningMode' },
        { field: 'miningPurpose' },
        { field: 'basinName' },
        { field: 'constructionTime' },
        { field: 'startDate' },
      ],
    },

    {
      groupId: 'Thông số của công trình',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'power' },
        { field: 'flowDesigned' },
        { field: 'realityFlow' },
      ]
    },
    {
      groupId: 'Thông tin giấy phép',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'licenseNumber' },
        { field: 'signDate' },
        { field: 'issueDate' },
      ]
    },
    {
      groupId: 'Tiền cấp quyền',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'licenseFeeNumber' },
        { field: 'totalMoney' },
      ]
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

  const [mapCenter, setMapCenter] = useState([15.012172, 108.676488]);
  const [mapZoom, setMapZoom] = useState(9);

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
        const data = await fetchData('Construction/list');
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

  const zoomConstruction = (coords: any) => {
    setMapCenter(coords);
    setMapZoom(13);
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
          <Box className="map-legend" sx={{ background: 'white' }}>
            <MapLegend />
          </Box>
          <Map center={mapCenter} zoom={mapZoom} mapData={null} mapMarkerData={resData} />
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
              <CreateConstruction isEdit={false} setPostSuccess={handlePostSuccess} />
            }
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default WaterSupplyStation;
