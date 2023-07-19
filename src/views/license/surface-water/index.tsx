import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid, Box, Button, Card, CardContent, IconButton, Tooltip } from '@mui/material';

// ** Icons Imports
import SearchIcon from '@mui/icons-material/Search';
import { EditNote, Delete } from "@mui/icons-material";

// ** Components Imports
import SearchLicense from 'src/views/license/Search';
import CountLicense from 'src/@core/components/license-page/count-license';

import FormatDate from 'src/@core/components/format-date';
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import CheckEffect from 'src/@core/components/license-page/check-effect';
import TableComponent from 'src/@core/components/table';
import MapComponent from 'src/@core/components/map';
import CreateLicense from '../form';
import { TextField, AutoComplete } from 'src/@core/components/field';
import licenseSFData from 'src/api/license/nuocmat';

const licensingType = [
  { title: "Chọn loại CT", value: 1 },
  { title: "Thủy điện", value: 2 },
  { title: "Hồ chứa", value: 3 },
  { title: "Điều chỉnh giấy phép", value: 4 },
  { title: "Thu hồi giấy phép", value: 5 },
];

const licensingAuthorities = [
  { title: "BTNMT", value: 0 },
  { title: "UBND Tỉnh", value: 1 },
];


const formatNum = (num: any) => {
  if (typeof Intl === "undefined" || !Intl.NumberFormat) {
    return "NaN"
  } else {
    const nf = new Intl.NumberFormat();
    const x = num;
    if (num !== undefined) {
      return nf.format(x)
    }
  }
}

// id of columnsTable is parameter to bind ex: get LicseFk.BasinId: id: 'License_Fk.BasinId'
const columnsTable = [
  {
    id: 'LicenseNumber', label: 'Số GP', showId: [1], rowspan: 2,
    elm: (row: any) => (<ShowFilePDF name={row.LicenseNumber} src={`/pdf/Licenses/` + row.LicensingAuthorities + `/` + row.TypeSlug + `/` + row.LicenseFile} />)
  },
  { id: 'Effect', label: 'Hiệu lực GP', showId: [1], rowspan: 2, elm: (row: any) => (<CheckEffect data={row} />) },
  { id: 'SignDate', label: 'Ngày ký', showId: [1], rowspan: 2, format: (value: any) => FormatDate(value) },
  { id: 'IssueDate', label: 'Ngày có hiệu lực', showId: [1], rowspan: 2, format: (value: any) => FormatDate(value) },
  { id: 'LicenseTypeName', label: 'Loại hình', showId: [1], rowspan: 2 },
  {
    id: 'Business', label: 'Cơ quan/cá nhân được CP', showId: [1], colspan: 2, children: [
      { id: 'Name', label: 'Tên', },
      { id: 'Address', label: 'Địa chỉ', },
    ]
  },
  {
    id: 'OldLicense', label: 'Thông tin GP cũ', showId: [1], colspan: 2, children: [
      { id: 'LicenseNumber', label: 'Số GP' },
      { id: 'SignDate', label: 'Ngày ký', format: (value: any) => FormatDate(value) },
    ]
  },
  {
    id: 'Construction', label: 'Thông tin CT', showId: [1], colspan: 8, children: [
      { id: 'ConstructionName', label: 'Tên Công trình' },
      { id: 'ConstructionLocation', label: 'Địa điểm' },
      { id: 'ConstructionTypeName', label: 'Loại hình' },
      { id: '', label: 'Xã' },
      { id: '', label: 'Huyện' },
      { id: 'ExploitedWS', label: 'Nguồn nước khai thác' },
      { id: 'RiverName', label: 'Lưu vực' },
      { id: 'BasinName', label: 'Tiểu vùng quy hoạch' },
    ]
  },
  {
    id: 'LicenseFee', label: 'Tiền cấp quyền', showId: [1], colspan: 3, children: [
      { id: 'LicenseFeeNumber', label: 'Số QĐ', elm: (row: any) => (<ShowFilePDF name={row?.LicenseFeeNumber} src={`/pdf/LicenseFees/` + row?.LicensingAuthorities + `/` + row?.FilePDF} />) },
      { id: 'SignDate', label: 'Ngày ký', format: (value: any) => FormatDate(value) },
      { id: 'TotalMoney', label: 'Tổng tiền (VNĐ)', format: (value: any) => formatNum(value) },
    ]
  },
  { id: 'actions', label: '#', showId: [1], rowspan: 2 },
];

const SurfaceWaterLicense = () => {
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
    setData(licenseSFData);
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
            <MapComponent />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12} className='_row _justifyContentBetween' >
        <Grid className='_search _row'>
          <Grid>
            <AutoComplete
              onChange={(e: any, v: any) => handleChange(v)}
              size="small"
              options={licensingType}
              getOptionLabel={(option: any) => option.title}
              label="Chọn loại hình CP"
            />
          </Grid>
          <Grid>
            <AutoComplete
              size="small"
              options={licensingAuthorities}
              getOptionLabel={(option: any) => option.title}
              label="Chọn cơ quan CP"
            />
          </Grid>
          <Grid>
            <TextField size='small' type='text' label='Số GP' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid>
            <SearchLicense />
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

export default SurfaceWaterLicense
