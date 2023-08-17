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

const DischargeConstruction = () => {

  //Init columnTable
  const columnsTable: GridColDef[] = [
    { field: 'id', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'ID', minWidth: 90 },
    {
      field: 'constructionName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tên công trình', minWidth: 250, renderCell: (data) => (<Typography
        className='btnShowFilePdf' onClick={() => zoomConstruction([data.row.lat, data.row.lng])}>{data.row.constructionName}</Typography>)
    },
    { field: 'constructionLocation', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Vị trí công trình', minWidth: 150, },
    { field: 'constructionDetailLocation', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Ví trí xả thải', minWidth: 150, valueGetter: (data) => (`${data.row.x},${data.row.y}`) },
    { field: 'dischargeWS', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Nguồn tiếp nhận nước thải', minWidth: 150, },

    //coordinates
    { field: 'x', headerClassName: 'tableHead', headerAlign: 'center',headerName: 'X', minWidth: 150, },
    { field: 'y', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Y', minWidth: 150, },


    //constructionDetails
    { field: 'dischargeMethod', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Phương thức xả nước thải', minWidth: 150, },
    { field: 'dischargeMode', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Chế độ xả nước thải', minWidth: 150, },
    { field: 'averageDischargeFlow', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>Q<sub>xả trung bình</sub>  (m<sup>3</sup>/ngày đêm) </span>), minWidth: 150, },
    { field: 'maximumWasteWaterFlow', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>Q<sub>xả lớn nhất</sub> (m<sup>3</sup>/ngày đêm)</span>), minWidth: 150, },
    { field: 'kqKf', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Chất lượng nước thải (hệ số Kq và Kf)', minWidth: 150, },
    
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
        { field: 'constructionDetailLocation' },
        { field: 'dischargeWS' },
      ],
    },

    {
      groupId: 'Tọa độ (VN2000, Kinh tuyến trục 104⁰, múi chiếu 3⁰)',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'x' },
        { field: 'y' },
      ]
    },

    {
        groupId: 'Phương thức khai thác',
        headerClassName: 'tableHead',
        headerAlign: 'center',
        children: [
          { field: 'dischargeMethod' },
          { field: 'dischargeMode' },
          { field: 'averageDischargeFlow' },
          { field: 'maximumWasteWaterFlow' },
          { field: 'kqKf' },
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
          { label: 'Khu/cụm CN tập trung', value: 'khu_cumcn_taptrung' },
          { label: 'SX tiểu thủ CN', value: 'sx_tieuthu_cn' },
          { label: 'SX KD dịch vụ', value: 'sx_kd_dv' },
          { label: 'CS bệnh viện', value: 'cs_benhvien' },
          { label: 'Khu dân cư/Làng nghề', value: 'khudancu_langnghe' },
          { label: 'Chăn nuôi/ NTTS', value: 'channuoi_ntts' },
          { label: 'Công trình khác', value: 'congtrinh_xathaikhac' },
        ],
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
    setColumns(columnsTable);
    setcolumnFillters(columnFillter)

    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchData('Construction/list');
        const filteredData = data.filter((item: { [key: string]: any }) =>
          ['khu_cumcn_taptrung','sx_tieuthu_cn','sx_kd_dv','cs_benhvien','khudancu_langnghe','channuoi_ntts','congtrinh_xathaikhac'].some(keyword =>
            item['constructionTypeSlug']?.toString().toLowerCase().includes(keyword.toLowerCase())
          )
        );
        setResData(filteredData);
      } catch (error) {
        setResData([]);
      } finally {
        setLoading(false);
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

export default DischargeConstruction;
