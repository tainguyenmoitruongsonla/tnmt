// ** MUI Imports
import { Grid, Box, Button, Autocomplete, TextField,IconButton, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react'

// ** Icons Imports

import SearchIcon from '@mui/icons-material/Search';
import consData from 'src/api/construction';
import MapComponent from 'src/@core/components/map';
import { EditNote } from '@mui/icons-material';
import { Delete } from 'mdi-material-ui';
import TableComponent from 'src/@core/components/table';
import CreateConstruction from 'src/views/construction/CreateConstruction';
import SearchConstruction from 'src/views/construction/Search';
import FormatDate from 'src/@core/components/format-date';

// ** Components Imports


const complete1 = [
  { title: "Khóa 1", value: 1 },
  { title: "Khóa 2", value: 2 },
  { title: "Khóa 3", value: 3 },
];
const complete2 = [
  { title: "Đợt 1" },
  { title: "Đợt 2" },
  { title: "Đợt 3" },
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
  { id: '#', label: 'STT', showId: [1], rowspan: 2, },
  { id: 'ConstructionName', label: 'Tên công trình', showId: [1], rowspan: 2 },
  { id: 'ConstructionLocation', label: 'Địa điểm', showId: [1], rowspan: 2},
  {
    id: '#', label: 'Tọa độ đập chính', showId: [1], colspan: 2, children: [
      { id: 'X', label: 'X', },
      { id: 'Y', label: 'Y', },
    ]
  },
  { id: 'ExploitedWS', label: 'Nguồn nước khai thác', showId: [1], rowspan: 2},
  { id: 'MiningMethod', label: 'Phương thức khai thác', showId: [1], rowspan: 2},
  { id: 'MiningMode', label: 'Chế độ KT', showId: [1], rowspan: 2},
  { id: 'MiningPurpose', label: 'Mục đích KT', showId: [1], rowspan: 2},
  { id: 'BasinName', label: 'Tiểu vùng quy hoạch', showId: [1], rowspan: 2},

  { id: 'ConstructionTime', label: 'Năm xây dựng', showId: [1], rowspan: 2 },
  { id: 'StartDate', label: 'Năm vận hành', showId: [1], rowspan: 2 },

  {
    id: '#', label: 'Thông số công trình', showId: [1], colspan: 19, children: [
      { id: 'ConstructionName', label: 'Cấp CT' },
      { id: 'ConstructionLocation', label: 'F lưu vực(km2)' },
      { id: 'ConstructionTypeName', label: 'XTB năm(m)' },
      { id: '', label: 'QTB năm(m)' },
      { id: '', label: 'CS lắp máy(MW)' },
      { id: 'ExploitedWS', label: 'CS đảm bảo(MW' },
      { id: '', label: 'Chiều cao đập (m)' },
      { id: '', label: 'Chiều dài đập (m)' },
      { id: '', label: 'Cao trình đập (m)' },
      { id: '', label: 'Qmax' },
      { id: '', label: 'Qtt' },
      { id: '', label: 'Q đảm bảo' },
      { id: '', label: 'Hmax' },
      { id: '', label: 'Hmin' },
      { id: '', label: 'Htt' },
      { id: '', label: 'MNC(m)' },
      { id: '', label: 'MNDBT(m)' },
      { id: '', label: 'MNLKT(m)' },
      { id: '', label: 'MNLKT(m)' },
    ]
  },
  {
    id: 'License', label: 'Thông tin giấy phép', showId: [1], colspan: 3, children: [
      { id: 'LicenseNumber', label: 'Số GP'},
      { id: 'SignDate', label: 'Ngày cấp', format: (value: any) => FormatDate(value) },
      { id: 'IssueDate', label: 'Thời hạn', format: (value: any) => FormatDate(value) },
    ]
  },
  {
    id: 'LicenseFee', label: 'Tiền cấp quyền', showId: [1], colspan: 2, children: [
      { id: 'LicenseFeeNumber', label: 'Số QĐ'},
      { id: 'TotalMoney', label: 'Tổng tiền (VNĐ)', format: (value: any) => formatNum(value) },
    ]
  },
  { id: 'actions', label: 'Thao tác', showId: [1], rowspan: 2 },
];



const SurfaceWater = () => {
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
    setData(consData);
    setColumns(columnsTable);

    // fetchData();
  }, []);
  const EditLicense = (row:any) => {
    console.log('Edit: '+row.LicenseNumber)
  }

  const DeleteLicense = (row:any) => {
    console.log('Delete: '+row.LicenseNumber)
  }

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <MapComponent />
      </Grid>
      <Grid item xs={12} sm={12} md={12} className='_row _justifyContentBetween' >
        <Box>
          <Typography className='_font12'>
            Tổng số công trình KTSDN  mặt: 132
          </Typography>
          <Typography className='_font12'>
            Số công trình đã cấp phép: 132
          </Typography>
        </Box>
        <Box className='_search'>
          <Box>
            <Autocomplete
            onChange={(e, v) => handleChange(v)}
            size="small" options={complete1} getOptionLabel={(option) => option.title} renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Chọn loại hình CP"
                placeholder=""
              />
            )}
            />
          </Box>
          <Box>
            <Autocomplete size="small" options={complete2} getOptionLabel={(option) => option.title} renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Chọn cơ quan CP"
                placeholder=""
              />
            )}
            />
          </Box>
          <Box>
            <SearchConstruction />
          </Box>
          <Box>
            <Button size='small' startIcon={<SearchIcon />} variant="outlined">Xuất excel</Button>
          </Box>
          <Box>
            <CreateConstruction isEdit={false} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
      <Grid item xs={12} sm={12} md={12}>
        <TableComponent columns={columns} data={data} TypeOfConsId={TypeOfConsId}
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
    </Grid>
  )
}

export default SurfaceWater
