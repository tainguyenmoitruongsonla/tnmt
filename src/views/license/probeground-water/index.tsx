import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid, Box, Button, Card, CardContent, IconButton, Tooltip, Autocomplete, TextField } from '@mui/material';

// ** Icons Imports
import SearchIcon from '@mui/icons-material/Search';
import { EditNote, Delete } from "@mui/icons-material";

// ** Components Imports
import CountLicense from 'src/views/license/count-license';

import FormatDate from 'src/@core/components/format-date';
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import CheckEffect from 'src/views/license/check-effect';
import TableComponent from 'src/@core/components/table';
import CreateLicense from '../form';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const licensingType = [
  { title: "Cấp mới giấy phép", value: 1 },
  { title: "Cấp lại giấy phép", value: 2 },
  { title: "Gia hạn giấy phép", value: 3 },
  { title: "Điều chỉnh giấy phép", value: 4 },
  { title: "Thu hồi giấy phép", value: 5 },
];

const licensingAuthorities = [
  { title: "BTNMT", value: 'BTNMT' },
  { title: "UBND Tỉnh", value: 'UBNDT' },
];


// id of columnsTable is parameter to bind ex: get LicseFk.BasinId: id: 'License_Fk.BasinId'
const columnsTable = [
  {
    id: 'LicenseNumber', label: 'Số GP', showId: [1], rowspan: 2,
    elm: (row: any) => (<ShowFilePDF name={row.LicenseNumber} src={`/pdf/Licenses/` + row.LicensingAuthorities + `/` + row.TypeSlug + `/` + row.LicenseFile} />)
  },
  {
    id: '#', label: 'Thông tin giấy phép', showId: [1], children: [
      { id: 'Effect', label: 'Hiệu lực GP', elm: (row: any) => (<CheckEffect data={row} />) },
      { id: 'SignDate', label: 'Ngày ký', format: (value: any) => FormatDate(value) },
      { id: 'Duration', label: (<span>Thời hạn <br /> giấy phép</span>) },
      { id: 'IssueDate', label: (<span>Ngày bắt đầu <br /> hiệu lực</span>), format: (value: any) => FormatDate(value) },
      { id: 'ExpireDate', label: (<span>Ngày kết thúc <br /> hiệu lực</span>), format: (value: any) => FormatDate(value) },
      { id: 'LicenseHolderName', label: 'Tên chủ giấy phép' },
      { id: 'LicenseHolderAddress', label: 'Địa chỉ chủ giấy phép' },
      { id: 'LicenseTypeName', label: (<span>Loại hình <br /> cấp phép</span>), rowspan: 2 },
    ]
  },
  {
    id: 'OldLicense', label: 'Thông tin GP cũ', showId: [1], children: [
      { id: 'LicenseNumber', label: 'Số GP cũ' },
      { id: 'SignDate', label: (<span>Ngày ký<br /> giấy phép cũ</span>), format: (value: any) => FormatDate(value) },
    ]
  },
  {
    id: 'Construction', label: 'Thông tin CT', showId: [1], children: [
      { id: 'ConstructionName', label: 'Tên Công trình' },
      { id: 'ConstructionLocation', label: 'Địa điểm công trình' },
      { id: 'CommuneName', label: 'Xã' },
      { id: 'DistrictName', label: 'Huyện' },
      { id: 'X', label: 'X' },
      { id: 'Y', label: 'Y' },
      { id: 'ExplorationPurposes', label: 'Mục đích thăm dò' },
      { id: 'DrillingScale', label: 'Quy mô thăm dò' },
      { id: 'WaterSupplyFlow', label: <span>Q<sub>KT</sub> <br /> (m<sup>2</sup>/<sub>ngày đêm</sub>)</span> },
      { id: 'AquiferName', label: 'Tầng chứa nước' },
      { id: 'ConstructionItems.length', label: 'Số điểm tọa độ(x,y)' },
    ]
  },
  { id: 'actions', label: 'Thao tác', showId: [1], rowspan: 2, },
];

const ProbeGroundWaterLicense = () => {
  const [mapCenter] = useState([15.012172, 108.676488]);
  const [mapZoom] = useState(9);

  const [TypeOfConsId, setTypeOfConsId] = useState([1]);
  const handleChange = (e: any) => {
    const val = (e == undefined || e == null ? 1 : e.value)
    setTypeOfConsId(val)
  }

  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    setData([]);
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
    <Grid container spacing={3}>
      <Grid item xs={3} sm={3} md={3}>
        <CountLicense />
      </Grid>
      <Grid item xs={9} sm={9} md={9} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ p: 0, height: '100%' }}>
            <Map center={mapCenter} zoom={mapZoom} mapData={null} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12} className='_row _justifyContentBetween' >
        <Grid className='_search _row'>
          <Grid>
            <Autocomplete
              onChange={(e: any, v: any) => handleChange(v)}
              size="small"
              options={licensingType}
              getOptionLabel={(option: any) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  fullWidth
                  label="Chọn loại hình CP"
                />
              )}
            />
          </Grid>
          <Grid>
            <Autocomplete
              size="small"
              options={licensingAuthorities}
              getOptionLabel={(option: any) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  fullWidth
                  label="Chọn cơ quan CP"
                />
              )}
            />
          </Grid>
          <Grid>
            <TextField size='small' type='text' label='Số GP' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid>
            <Button size='small' startIcon={<SearchIcon />} variant="outlined">Xuất excel</Button>
          </Grid>
          <Grid>
            <CreateLicense isEdit={false} />
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

export default ProbeGroundWaterLicense
