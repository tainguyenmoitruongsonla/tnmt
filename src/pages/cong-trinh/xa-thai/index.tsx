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
import FormatDate from 'src/@core/components/format-date';;
import CreateConstructionDisCharge from 'src/views/construction/form/dischargewater';
import dischargeData from 'src/views/construction/form/dischargewater/data';

// ** Components Imports


const complete1 = [
  { title: "Khu/cụm CN tập trung", value: 17 },
  { title: "SX tiểu thủ CN", value: 18 },
  { title: "SX KD dịch vụ", value: 19 },
  { title: "CS bệnh viện", value: 20 },
  { title: "Khu dân cư/Làng nghề", value: 21},
  { title: "Chăn nuôi/NTTS", value: 22 },
  { title: "Công trình khác", value: 23 },
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
  {
    id: '#', label: 'Tọa độ (VN2000, Kinh tuyến trục 104⁰, múi chiếu 3⁰', children: [
      { id: 'X', label: 'X', },
      { id: 'Y', label: 'Y', },
    ]
  },
  { id: 'ConstructionDetailLocation', label: 'Ví trí xả thải', rowspan: 2 },
  { id: 'DischargeWS', label: 'Nguồn tiếp nhận nước thải', rowspan: 2 },
  {
    id: '#', label: 'Phương thức xả nước thải',  children: [    
      { id: 'DischargeMethod', label: 'Phương thức xả nước thải' },
      { id: 'DischargeMode', label: 'Chế độ xả nước thải' },
      { id: 'AverageDischargeFlow', label: (<span>Q<sub>xả trung bình</sub> <br /> (m<sup>3</sup>/ngày đêm) </span>) },
      { id: 'MaximumWasteWaterFlow', label: (<span>Q<sub>xả lớn nhất</sub> <br /> (m<sup>3</sup>/ngày đêm)</span>) },
    ]
  },
  { id: 'KqKf', label: 'Chất lượng nước thải hệ số Kq và Kf', rowspan: 2 },
  {
    id: 'License', label: 'Thông tin giấy phép', children: [
      { id: 'LicenseNumber', label: 'Số GP' },
      { id: 'IssueDate', label: 'Ngày cấp', format: (value: any) => FormatDate(value) },
      { id: 'Duration', label: 'Thời hạn' },
    ]
  },
  {
    id: 'LicenseFee', label: 'Tiền cấp quyền', children: [
      { id: 'LicenseFeeNumber', label: 'Số QĐ' },
      { id: 'TotalMoney', label: 'Tổng tiền (VNĐ)', format: (value: any) => formatNum(value) },
    ]
  },
  { id: 'actions', label: 'Thao tác', rowspan: 2 },
];



const DischargeWater = () => {
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
    setData(dischargeData);
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
            <CreateConstructionDisCharge isEdit={false} />
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

export default DischargeWater
