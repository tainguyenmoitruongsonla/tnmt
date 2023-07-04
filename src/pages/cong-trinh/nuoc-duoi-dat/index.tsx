// ** MUI Imports
import { Grid, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { AutoComplete } from "src/@core/components/field";

// ** Icons Imports

import SearchIcon from '@mui/icons-material/Search';
import MapComponent from 'src/@core/components/map';
import { EditNote } from '@mui/icons-material';
import { Delete } from 'mdi-material-ui';
import TableComponent from 'src/@core/components/table';
import SearchConstruction from 'src/views/construction/Search';
import FormatDate from 'src/@core/components/format-date';
import CreateConstructionGround from 'src/views/construction/form/groundwater';
import discharageData from 'src/views/construction/form/groundwater/data';

// ** Components Imports

const complete1 = [
  { title: "Chọn loại CT", value: 1 },
  { title: "Khai thác", value: 8 },
  { title: "Thăm dò", value: 9 },
  { title: "Hành nghề khoan", value: 10 },
  { title: "Công trình khác", value: 23 },
  { title: "Trám lấp giếng", value: 24 },
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
  { id: 'stt', label: 'STT', rowspan: 2, },
  { id: 'ConstructionName', label: 'Tên công trình', rowspan: 2 },
  { id: 'ConstructionLocation', label: 'Vị trí công trình', rowspan: 2 },
  { id: 'MiningPurpose', label: 'Mục đích khai thác,sử dụng nước', rowspan: 2 },
  { id: 'NumberMiningWells', label: 'Số giếng khai thác', rowspan: 2 },
  { id: 'StartDate', label: 'Năm xây dựng', rowspan: 2 },
  { id: '', label: 'Năm vận hành', rowspan: 2 },
  { id: 'AmountWaterExploited', label: (<span>Q <sub>KT năm</sub><br />(m3/s)</span>), rowspan: 2 },
  { id: 'WellNumber', label: 'Số hiệu', rowspan: 2 },
  { id: 'DrillingDuration', label: 'Thời gian hành nghề khoan', rowspan: 2 },
  {
    id: '#', label: 'Tọa độ', children: [
      { id: 'X', label: 'X', },
      { id: 'Y', label: 'Y', },
    ]
  },
  {
    id: '#', label: 'Chiều sâu đoạn thu nước(m)', children: [
      { id: 'WaterDepthFrom', label: 'Từ', },
      { id: 'WaterDepthTo', label: 'Đến', },
    ]
  },
  {
    id: '#', label: 'Thông số của công trình khai thác', showId: [1, 4, 5, 6, 11], children: [    
      { id: 'WaterSupplyFlow', label: (<span>Q <sub>khai thác</sub><br />(m3/s)</span>), showId: [1, 4, 5] },
      { id: 'WellWL', label: (<span>H <sub>giếng khai thác</sub></span>), showId: [1, 4, 5] },
      { id: 'MonitoringWellWL', label: (<span>H <sub>giếng quan trắc</sub></span>), showId: [1, 4, 5] },
      { id: 'MiningMethod', label: (<span>Chế độ KT <br /> (giờ/ng.đêm)</span>), showId: [1, 4, 5] },
      { id: 'StaticWL', label: (<span>Chiều sâu <br /> MN tĩnh (m)</span>), showId: [1, 4, 5] },
      { id: 'DynamicWL', label: (<span>Chiều sâu <br /> MN động max (m)</span>), showId: [1, 4, 5] },
      { id: 'MiningAquifer', label: (<span>Tầng chứa<br /> nước KT</span>), showId: [1, 4, 5] },
      { id: 'LowWL', label: (<span>Mực nước <br /> hạ thấp</span>), showId: [1, 4, 5] },
    ]
  },
  {
    id: 'License', label: 'Thông tin giấy phép', children: [
      { id: 'LicenseNumber', label: 'Số GP' },
      { id: 'IssueDate', label: 'Ngày cấp', format: (value: any) => FormatDate(value) },
      { id: 'Duration', label: 'Thời hạn'},
    ]
  },
  {
    id: 'LicenseFee', label: 'Tiền cấp quyền', children: [
      { id: 'DecisionNumber', label: 'Số QĐ' },
      { id: 'TotalMoney', label: 'Tổng tiền (VNĐ)', format: (value: any) => formatNum(value) },
    ]
  },
  { id: 'actions', label: 'Thao tác', rowspan: 2 },
];



const GroundWater = () => {
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
    setData(discharageData);
    setColumns(columnsTable);

    // fetchData();
  }, []);
  const EditLicense = (row: any) => {
    console.log('Edit: ' + row.LicenseNumber)
  }

  const DeleteLicense = (row: any) => {
    console.log('Delete: ' + row.LicenseNumber)
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
      <Grid item xs={12} sm={5} md={3}>
          <Typography className='_font12'>
            Tổng số công trình KTSDN  mặt: 100
          </Typography>
          <Typography className='_font12'>
            Số công trình đã cấp phép: 71
          </Typography>
        </Grid>
        <Grid container xs={12} sm={7} md={9} direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={4}>
          <Grid item xs={12} sm={7} md={3}>
            <AutoComplete
            fullWidth
              onChange={(e: any, v: any) => handleChange(v)}
              size="small"
              options={complete1}
              getOptionLabel={(option: any) => option.title}
              label="Chọn loại hình CT"
            />
          </Grid>
          <Grid item xs={12} sm={7} md={3}>
            <AutoComplete
              onChange={(e: any, v: any) => handleChange(v)}
              size="small"
              options={complete2}
              getOptionLabel={(option: any) => option.title}
              label="Chọn loại hình CT"
            />
          </Grid>
          <Grid item xs={12} sm={7} md={2}>
            <SearchConstruction />
          </Grid>
          <Grid item xs={12} sm={7} md={2}>
            <Button size='small' fullWidth startIcon={<SearchIcon />} variant="outlined">Xuất excel</Button>
          </Grid>
          <Grid item xs={12} sm={7} md={2}>
            <CreateConstructionGround isEdit={false} />
          </Grid>
        </Grid>
      <Grid item xs={12} sm={12} md={12}>
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
    </Grid>
  )
}

export default GroundWater
