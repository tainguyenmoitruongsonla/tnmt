//React Imports
import React, { useState, useEffect } from 'react';

//MUI Imports
import { Box, Tooltip, IconButton, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

//Other Imports
import FormatDate from 'src/@core/components/format-date';
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import DataGridComponent, { columnFillters } from 'src/@core/components/data-grid';
import { Delete } from '@mui/icons-material';


import dynamic from 'next/dynamic';
import fetchData from 'src/api/fetch';
import CreateConstructionGround from '../form/groundwater';




const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const EditLicense = (data: any) => {
  console.log('Edit: ' + data.row?.licenseNumber)
}

const DeleteLicense = (data: any) => {
  confirm(`Bạn muốn xóa:  ${data.row?.licenseNumber} chứ?`)
}

const GroundConstruction = () => {

  //Init columnTable
  const columnsTable: GridColDef[] = [
    { field: 'id', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'ID', minWidth: 90 },
    {
      field: 'constructionName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tên công trình', minWidth: 250, renderCell: (data) => (<Typography
        className='btnShowFilePdf' onClick={() => zoomConstruction([data.row.lat, data.row.lng])}>{data.row.constructionName}</Typography>)
    },
    { field: 'constructionLocation', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Ví trí công trình', minWidth: 150, },
    { field: 'miningPurpose', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Mục đích khai thác,sử dụng nước', minWidth: 150, },
    { field: 'numberMiningWells', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Số giếng khai thác', minWidth: 150, },
    { field: 'constructionTime', headerClassName: 'tableHead', headerAlign: 'center', headerName: '	Năm xây dựng', minWidth: 100, },
    { field: 'startDate', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Năm vận hành', minWidth: 100, },
    { field: 'amountWaterExploited', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>Q<sub>KT</sub> (m<sup>3</sup>/ngày đêm)</span>), minWidth: 150, },
    { field: 'wellNumber', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Số hiệu', minWidth: 150, },
    { field: 'drillingDuration', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Thời gian hành nghề khoan', minWidth: 150, },

    //coordinates
    { field: 'x', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'X', minWidth: 150, },
    { field: 'y', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Y', minWidth: 150, },

    //
    { field: 'waterDepthFrom', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Từ ', minWidth: 150, },
    { field: 'waterDepthTo', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Đến', minWidth: 150, },

    //constructionDetails
    { field: 'waterSupplyFlow', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>Q<sub>khai thác</sub> (m<sup>3</sup>/ng.đêm)</span>), minWidth: 150, },
    { field: 'wellWL', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span> H<sub>giếng khai thác</sub></span>), minWidth: 150, },
    { field: 'monitoringWellWL', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span> H<sub>giếng quan trắc</sub></span>), minWidth: 150, },
    { field: 'miningMethod', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Chế độ KT (giờ/ng.đêm)', minWidth: 150, },
    { field: 'staticWL', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Chiều sâu MN tĩnh(m)', minWidth: 150, },
    { field: 'dynamicWL', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Chiều sâu MN động max(m)', minWidth: 150, },
    { field: 'miningAquifer', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tầng chứa nước KT', minWidth: 150, },
    { field: 'lowWL', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Mực nước hạ thấp', minWidth: 150, },

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
              <CreateConstructionGround isEdit={true} data={data.row} />
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
        { field: 'miningPurpose' },
        { field: 'numberMiningWells' },
        { field: 'constructionTime' },
        { field: 'startDate' },
        { field: 'amountWaterExploited' },
        { field: 'wellNumber' },
        { field: 'drillingDuration' },
      ],
    },
    {
      groupId: 'Tọa độ',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'x' },
        { field: 'y' },
      ]
    },
    {
      groupId: 'Chiều sâu đoạn thu nước(m)',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'waterDepthFrom' },
        { field: 'waterDepthTo' },
      ]
    },
    {
      groupId: 'Thông số của công trình',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'waterSupplyFlow' },
        { field: 'wellWL' },
        { field: 'monitoringWellWL' },
        { field: 'miningMethod' },
        { field: 'staticWL' },
        { field: 'dynamicWL' },
        { field: 'miningAquifer' },
        { field: 'lowWL' },
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
        label: 'Loại công trình',
        value: 'constructionTypeSlug',
        type: 'select',
        options: [
          { label: 'Khai thác', value: 'khaithac' },
          { label: 'Thăm dò', value: 'thamdo' },
          { label: 'Hành nghề khoan', value: 'hanhnghekhoan' },
          { label: 'Trám lấp giếng', value: 'tramlapgieng' },
          { label: 'Công trình khác', value: 'congtrinh_nuocduoidatkhac' },
        ],
      },

    {
        label: 'Cơ quan cấp phép',
        value: 'licensingAuthorities',
        type: 'select',
        options: [
          { label: 'BTNMT', value: 'BTNMT' },
          { label: 'UBND Tỉnh', value: 'UBNDT' },
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
        label: ' Nhập tên công trình',
        value: 'constructionName',
        type: 'text',
      },
      {
          label: ' Nhập số GP',
          value: 'licenseName',
          type: 'text',
        },
   
   
  ];

  const [mapCenter, setMapCenter] = useState([15.012172, 108.676488]);
  const [mapZoom, setMapZoom] = useState(9);

  const [columns, setColumns] = useState<any[]>([]);
  const [columnFillters, setcolumnFillters] = useState<columnFillters[]>([]);

  const [postSuccess, setPostSuccess] = useState(false);
  
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  const [resData, setResData] = useState([]);

  useEffect(() => {
    setColumns(columnsTable);
    setcolumnFillters(columnFillter)

    const getData = async () => {
      
      try {
        const data = await fetchData('Construction/list');
        const filteredData = data.filter((item: { [key: string]: any }) =>
          ['khaithac', 'thamdo', 'hanhnghekhoan', 'tramlapgieng', 'congtrinh_nuocduoidatkhac'].some(keyword =>
            item['constructionTypeSlug']?.toString().toLowerCase().includes(keyword.toLowerCase())
          )
        );
        setResData(filteredData);
      } catch (error) {
        setResData([]);
      } finally {
        
      }
    };

    getData();

  }, [postSuccess]);

  const zoomConstruction = (coords: any) => {
    setMapCenter(coords);
    setMapZoom(13);
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
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
              <CreateConstructionGround isEdit={false} setPostSuccess={handlePostSuccess} />
            }
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GroundConstruction;
