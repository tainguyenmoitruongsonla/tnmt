import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid, Box, Button, Card, CardContent, IconButton, Tooltip, Typography } from '@mui/material';

// ** Icons Imports
import SearchIcon from '@mui/icons-material/Search';
import { EditNote, Delete } from "@mui/icons-material";

// ** Components Imports
import TableComponent from 'src/@core/components/table';
import { TextField, AutoComplete } from 'src/@core/components/field';
import sufacemonitoringData from 'src/api/monitoringsystem/nuocmat';
import DisplayOperatingStatus from 'src/@core/components/monitoring-page/check-status';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const constructionType = [
  { title: "Chọn loại CT", value: 1 },
  { title: "Thủy điện", value: 4 },
  { title: "Hồ chứa", value: 5 },
  { title: "Trạm bơm", value: 6 },
  { title: "Cống", value: 13 },
  { title: "Trạm cấp nước", value: 11 },
];

const licensingAuthorities = [
  { title: "BTNMT", value: 0 },
  { title: "UBND Tỉnh", value: 1 },
];


// id of columnsTable is parameter to bind ex: get LicseFk.BasinId: id: 'License_Fk.BasinId'
const columnsTable = [
  { id: 'stt', label: 'STT', rowspan: 2, },
  { id: 'ConstructionName', label: 'Tên công trình', rowspan: 2, },
  { id: '#', label: 'Trạng thái vận hành',rowspan: 2,elm: (row: any) => (<DisplayOperatingStatus data={row} />)  },
  { id: 'DownstreamWLPre', label: (<span>Mực nước <br /> hạ lưu (m)</span>), showId: [1,4,5], rowspan: 2, },
  { id: 'CapacityPre', label: (<span>Dung tích hồ  <br /> (triệu m<sup>3</sup>)</span>), showId: [1,4,5], rowspan: 2, },
  {
    id: '#', label: 'Mưc nước thượng lưu hồ (m)', showId: [1,4,5], children: [
      { id: 'UpstreamWL', label: 'Ngưỡng tràn', },
      { id: 'UpstreamWLPres', label: 'Thực tế ', },
      { id: '', label: 'Chênh lệch (+/-)', },
    ]
  },
  {
    id: '#', label: 'Lưu lượng xả qua tràn  (m3/s)', showId: [1,4,5], children: [
      { id: 'MaximumDischargeFlowPre', label: 'Thực tế' },
      ]
  },
  {
    id: '#', label: 'Lưu lượng lớn nhất (m3/s)',  colspan: 8, children: [
      { id: 'MaximumFlow', label: 'Ngưỡng tràn', },
      { id: 'MaximumFlowPre', label: 'Thực tế ', },
      { id: '', label: 'Chênh lệch (+/-)', },
    ]
  },
  {
    id: '#', label: 'Lưu lượng xả duy trì DCTT (m3/s) ', showId: [1,4,5], colspan: 8, children: [
      { id: 'MinimumFlow', label: 'Ngưỡng tràn', },
      { id: 'MinimumFlowPre', label: 'Thực tế ', },
      { id: '', label: 'Chênh lệch (+/-)', },
    ]
  },
  {
    id: '#', label: 'Lưu lượng về hạ du (m3/s) ', showId: [1,4], colspan: 8, children: [
      { id: '', label: 'Ngưỡng tràn', },
      { id: '', label: 'Thực tế ', },
      { id: '', label: 'Chênh lệch (+/-)', },
    ]
  },
  {
    id: '#', label: 'Chất lượng nước trong quá trình khai thác', showId: [1,5,6,11,13], colspan: 8, children: [
      { id: 'Nhietdo', label: 'Nhiệt độ (°C)', },
      { id: 'pH', label: 'pH ', },
      { id: 'BOD5', label: 'BOD5', },
      { id: 'COD', label: 'COD', },
      { id: 'DO', label: 'DO', },
      { id: 'TSS', label: 'TSS', },
      { id: 'NH4', label: 'NH4+', },
    ]
  },
  { id: 'actions', label: 'Thao tác', rowspan: 2 },
];

const SurfaceWaterMonitoring = () => {
  const [mapCenter] = useState([ 15.012172, 108.676488 ]);
  const [mapZoom] = useState(9);

  const [TypeOfConsId, setTypeOfConsId] = useState([1]);
  const handleChange = (e: any) => {
    const val = (e == undefined || e == null ? 1 : e.value)
    setTypeOfConsId(val)
  }

  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://tnnsl.loc/api/Construction/list?BasinId=0&CommuneId=0&DistrictId=0&Keyword=&LicenseId=-1&LicensingAuthorities=-1&PageIndex=1&PageSize=0&ProvinceId=0&StartDate=-1&Status=true&TypeOfConstructionId=1'); // Thay đổi URL API tùy thuộc vào nguồn dữ liệu của bạn
  //     const jsonData = await response.json();
  //     console.log(jsonData.ListData)
  //     setData(jsonData.ListData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }; 

  useEffect(() => {
    setData(sufacemonitoringData);
    setColumns(columnsTable);

    // fetchData();
  }, []);

  const EditLicense = (row: any) => {
    console.log('Edit: ' + row.LicenseNumber)
  }

  const DeleteLicense = (row: any) => {
    console.log('Delete: ' + row.LicenseNumber)
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 0, height: '100%' }}>
            <Map center={mapCenter} zoom={mapZoom} mapData={null} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={5} md={3}>
       <Typography>Tổng số bản ghi đã tìm thấy:132</Typography>
      </Grid>
      <Grid item xs={12} sm={7} md={9}>
        <Grid className='_search _row'>
          <Grid item xs={12} sm={2} md={2}>
            <AutoComplete
              onChange={(e: any, v: any) => handleChange(v)}
              size="small"
              options={constructionType}
              getOptionLabel={(option: any) => option.title}
              label="Chọn loại hình CP"
            />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <AutoComplete
              onChange={(e: any, v: any) => handleChange(v)}
              size="small"
              options={constructionType}
              getOptionLabel={(option: any) => option.title}
              label="Chọn trạng thái kết nối"
            />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <AutoComplete
              size="small"
              options={licensingAuthorities}
              getOptionLabel={(option: any) => option.title}
              label="Chọn cơ quan CP"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField size='small' type='text' label='Nhập tên CT' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <Button size='small' startIcon={<SearchIcon />} variant="outlined">Tìm kiếm</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TableComponent columns={columns} data={data} show={TypeOfConsId}
          actions={(row: any) => (
            <Box>
              <Tooltip title="Chỉnh sửa giấy phép">
                <IconButton onClick={() => EditLicense(row)}>
                  <EditNote className='tableActionBtn' />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xóa giấy phép">
                <IconButton onClick={() => DeleteLicense(row)}>
                  <Delete className='tableActionBtn deleteBtn' />
                </IconButton>
              </Tooltip>
            </Box>
          )

          } />
      </Grid>
    </Grid>
  )
}

export default SurfaceWaterMonitoring
