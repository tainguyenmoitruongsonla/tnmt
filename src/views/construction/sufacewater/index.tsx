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

const SurfaceConstruction = () => {

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
    { field: 'constructionLevel', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Cấp CT', minWidth: 150, },
    { field: 'basinArea', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'F lưu vực (km2)', minWidth: 150, },
    { field: 'rainAvgForYears', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>X <sub>TB năm</sub> (m)</span>), minWidth: 150, },
    { field: 'flowAvgForYears', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>Q <sub>TB năm</sub>(m3/s)</span>), minWidth: 150, },
    { field: 'power', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'CS lắp máy(MW)', minWidth: 150, },
    { field: 'guaranteedPower', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'CS đảm bảo (MW)', minWidth: 150, },
    { field: 'damHeight', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Chiều cao đập (m)', minWidth: 150, },
    { field: 'damWidth', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Chiều dài đập (m)', minWidth: 150, },
    { field: 'damElevation', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Cao trình đập (m)', minWidth: 150, },
    { field: 'maximumFlow', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>Q<sub>max</sub>(m<sup>3</sup>/s)</span>), minWidth: 150, },
    { field: 'minimumFlow', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>Q<sub>TT</sub>(m<sup>3</sup>/s)</span>), minWidth: 150, },
    { field: 'guaranteedFlow', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>Q<sub>đảm bảo</sub>(m<sup>3</sup>/s)</span>), minWidth: 150, },
    { field: 'hmax', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>H<sub>max</sub> (m) </span>), minWidth: 150, },
    { field: 'hmin', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>H<sub>min</sub> (m)</span>), minWidth: 150, },
    { field: 'htt', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>H<sub>TT</sub></span>), minWidth: 150, },
    { field: 'deadWL', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'MNC(m)', minWidth: 150, },
    { field: 'riseWL', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'MNDBT(m)', minWidth: 150, },
    { field: 'designFloodLevel', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'MNLTK(m)', minWidth: 150, },
    { field: 'checkFloodWL', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'MNLKT(m)', minWidth: 150, },
    { field: 'totalCapacity', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>W<sub>toàn bộ</sub>(triệu m<sup>3</sup>)</span>), minWidth: 150, },
    { field: 'deadCapacity', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>W<sub> chết </sub>(triệu m<sup>3</sup>)</span>), minWidth: 150, },
    { field: 'usefulCapacity', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>W<sub>hữu ích</sub>(triệu m<sup>3</sup>)</span>), minWidth: 150, },

    { field: 'pumpNumber', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Số máy bơm', minWidth: 150, },
    { field: 'flowDesigned', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>Q<sub>TK</sub> (m<sup>3</sup>/h)</span>), minWidth: 150, },
    { field: 'realityFlow', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>Q<sub>TT</sub> (m<sup>3</sup>/h)</span>), minWidth: 150, },
    { field: 'wateringAreaDesigned', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>F<sub>tưới TK</sub> (ha)</span>), minWidth: 150, },
    { field: 'realityWateringArea', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>F<sub>tưới TT</sub> (ha)</span>), minWidth: 150, },
    { field: 'averagePumpTime', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>T<sub>bơm TB</sub>(h)</span>), minWidth: 150, },
    { field: 'minimumPumpTime', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>T<sub>bơm min</sub>(h)</span>), minWidth: 150, },
    { field: 'maximumPumpTime', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>T<sub>bơm max</sub>(h)</span>), minWidth: 150, },

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
        { field: 'constructionLevel' },
        { field: 'basinArea' },
        { field: 'rainAvgForYears' },
        { field: 'flowAvgForYears' },
        { field: 'power' },
        { field: 'guaranteedPower' },
        { field: 'damHeight' },
        { field: 'damWidth' },
        { field: 'damElevation' },
        { field: 'maximumFlow' },
        { field: 'minimumFlow' },
        { field: 'guaranteedFlow' },
        { field: 'hmax' },
        { field: 'hmin' },
        { field: 'htt' },
        { field: 'deadWL' },
        { field: 'riseWL' },
        { field: 'designFloodLevel' },
        { field: 'checkFloodWL' },
        { field: 'totalCapacity' },
        { field: 'deadCapacity' },
        { field: 'usefulCapacity' },
        { field: 'pumpNumber' },
        { field: 'flowDesigned' },
        { field: 'realityFlow' },
        { field: 'wateringAreaDesigned' },
        { field: 'realityWateringArea' },
        { field: 'averagePumpTime' },
        { field: 'minimumPumpTime' },
        { field: 'maximumPumpTime' },
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
        { label: 'Thủy điện', value: 'thuydien' },
        { label: 'Hồ chứa', value: 'hochua' },
        { label: 'Trạm bơm', value: 'trambom' },
        { label: 'Đập/Hệ thống thủy lợi', value: 'dapthuyloi' },
        { label: 'Cống', value: 'cong' },
        { label: 'Trạm cấp nước', value: 'tramcapnuoc' },
        { label: 'Nhà máy nước', value: 'nhamaynuoc' },
        { label: 'Công trình khác', value: 'congtrinh_nuocmatkhac' },
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

  const columnVisibility = {
    'thuydien': [
      'pumpNumber',
      'flowDesigned',
      'realityFlow',
      'wateringAreaDesigned',
      'realityWateringArea',
      'averagePumpTime',
      'minimumPumpTime',
      'maximumPumpTime',
    ],
    'trambom': [
      'constructionLevel',
      'basinArea',
      'rainAvgForYears',
      'flowAvgForYears',
      'guaranteedPower',
      'damHeight',
      'damWidth',
      'damElevation',
      'maximumFlow',
      'minimumFlow',
      'guaranteedFlow',
      'hmax',
      'hmin',
      'htt',
      'deadWL',
      'riseWL',
      'designFloodLevel',
      'checkFloodWL',
      'totalCapacity',
      'deadCapacity',
      'usefulCapacity',
      'flowDesigned',
      'realityFlow',
    ],
    'tramcapnuoc': [
      'constructionLevel',
      'basinArea',
      'rainAvgForYears',
      'flowAvgForYears',
      'guaranteedPower',
      'damHeight',
      'damWidth',
      'damElevation',
      'maximumFlow',
      'minimumFlow',
      'guaranteedFlow',
      'hmax',
      'hmin',
      'htt',
      'deadWL',
      'riseWL',
      'designFloodLevel',
      'checkFloodWL',
      'totalCapacity',
      'deadCapacity',
      'usefulCapacity',
      'pumpNumber',
      'wateringAreaDesigned',
      'realityWateringArea',
      'averagePumpTime',
      'minimumPumpTime',
      'maximumPumpTime',
    ],
    'CTkhac': [
      'constructionLevel',
      'basinArea',
      'rainAvgForYears',
      'flowAvgForYears',
      'power',
      'guaranteedPower',
      'damHeight',
      'damWidth',
      'damElevation',
      'maximumFlow',
      'minimumFlow',
      'guaranteedFlow',
      'hmax',
      'hmin',
      'htt',
      'deadWL',
      'riseWL',
      'designFloodLevel',
      'checkFloodWL',
      'totalCapacity',
      'deadCapacity',
      'usefulCapacity',
      'pumpNumber',
      'flowDesigned',
      'realityFlow',
      'wateringAreaDesigned',
      'realityWateringArea',
      'averagePumpTime',
      'minimumPumpTime',
      'maximumPumpTime',
    ],

  }

  const [postSuccess, setPostSuccess] = useState(false);
  const { showLoading, hideLoading } = useLoadingContext();
  const [loading, setLoading] = useState(false)
  loading == true ? showLoading() : hideLoading();

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  const [resData, setResData] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const data = await fetchData('Construction/list');
      const filteredData = data.filter((item: { [key: string]: any }) =>
        ['thuydien', 'hochua', 'trambom', 'tramcapnuoc', 'dapthuyloi', 'cong', 'nhamaynuoc', 'congtrinh_nuocmatkhac'].some(keyword =>
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

  useEffect(() => {
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
            columns={columnsTable}
            columnGroupingModel={columnGroup}
            columnVisibility={columnVisibility}
            columnFillter={columnFillter}
            actions={
              <CreateConstruction isEdit={false} setPostSuccess={handlePostSuccess} />
            }
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SurfaceConstruction;
