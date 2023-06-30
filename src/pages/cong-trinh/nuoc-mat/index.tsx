// ** MUI Imports
import { Grid, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { AutoComplete } from "src/@core/components/field";

// ** Icons Imports

import SearchIcon from '@mui/icons-material/Search';
import consData from 'src/api/construction';
import MapComponent from 'src/@core/components/map';
import { EditNote } from '@mui/icons-material';
import { Delete } from 'mdi-material-ui';
import TableComponent from 'src/@core/components/table';
import SearchConstruction from 'src/views/construction/Search';
import FormatDate from 'src/@core/components/format-date';
import CreateConstruction from 'src/views/construction/form';

// ** Components Imports


const complete1 = [
  { title: "Chọn loại CT", value: 1 },
  { title: "Thủy điện", value: 4 },
  { title: "Hồ chứa", value: 5 },
  { title: "Trạm bơm", value: 6 },
  { title: "Đập/Hệ thống thủy lợi", value: 12 },
  { title: "Cống", value: 13 },
  { title: "Trạm cấp nước", value: 11 },
  { title: "Nhà máy nước", value: 14 },
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
  { id: 'ConstructionLocation', label: 'Địa điểm', rowspan: 2 },
  {
    id: '#', label: 'Tọa độ đập chính', children: [
      { id: 'X', label: 'X', },
      { id: 'Y', label: 'Y', },
    ]
  },
  { id: 'ExploitedWS', label: 'Nguồn nước khai thác', rowspan: 2 },
  { id: 'MiningMethod', label: 'Phương thức khai thác', rowspan: 2 },
  { id: 'MiningMode', label: 'Chế độ KT', rowspan: 2 },
  { id: 'MiningPurpose', label: 'Mục đích KT', rowspan: 2 },
  { id: 'BasinName', label: 'Tiểu vùng quy hoạch', showId: [1, 4, 5], rowspan: 2 },

  { id: 'ConstructionTime', label: 'Năm xây dựng', rowspan: 2 },
  { id: 'StartDate', label: 'Năm vận hành', rowspan: 2 },

  {
    id: '#', label: 'Thông số công trình', showId: [1, 4, 5, 6, 11], children: [
      { id: 'ConstructionLeve', label: 'Cấp CT', showId: [1, 4, 5] },
      { id: 'BasinArea', label: (<span>F lưu vực <br />(km2)</span>), showId: [1, 4, 5] },
      { id: 'RainAvgForYears', label: (<span>X <sub>TB năm</sub> <br />(m)</span>), showId: [1, 4, 5] },
      { id: 'FlowAvgForYears', label: (<span>Q <sub>TB năm</sub><br />(m3/s)</span>), showId: [1, 4, 5] },
      { id: 'Power', label: 'CS lắp máy(MW)', showId: [1, 4, 5, 6, 11] },
      { id: 'GuaranteedPower', label: (<span>CS <br /> đảm bảo(MW)</span>), showId: [1, 4, 5] },
      { id: 'DamHeight', label: 'Chiều cao đập (m)', showId: [1, 5] },
      { id: 'DamWidth', label: 'Chiều dài đập (m)', showId: [1, 5] },
      { id: 'DamElevation', label: 'Cao trình đập (m)', showId: [1, 5] },
      { id: 'MaximumFlow', label: (<span>Q<sub>max</sub>(m<sup>3</sup>/s)</span>), showId: [1, 4, 5] },
      { id: 'MinimumFlow', label: (<span>Q<sub>TT</sub>(m<sup>3</sup>/s)</span>), showId: [1, 4, 5] },
      { id: 'GuaranteedFlow', label: (<span>Q<sub>đảm bảo</sub>(m<sup>3</sup>/s)</span>), showId: [1, 4, 5] },
      { id: 'Hmax', label: (<span>H<sub>max</sub> (m) </span>), showId: [1, 4, 5] },
      { id: 'Hmin', label: (<span>H<sub>min</sub> (m)</span>), showId: [1, 4, 5] },
      { id: 'Htt', label: (<span>H<sub>TT</sub></span>), showId: [1, 4, 5] },
      { id: 'DeadWL', label: 'MNC(m)', showId: [1, 4, 5] },
      { id: 'RiseWL', label: 'MNDBT(m)', showId: [1, 4, 5] },
      { id: 'DesignFloodLevel', label: 'MNLTK(m)', showId: [1, 4, 5] },
      { id: 'CheckFloodWL', label: 'MNLKT(m', showId: [1, 4, 5] },
      { id: 'TotalCapacity', label: (<span>W<sub>toàn bộ</sub>(triệu m<sup>3</sup>)</span>), showId: [1, 4, 5] },
      { id: 'DeadCapacity', label: (<span>W<sub> chết </sub>(triệu m<sup>3</sup>)</span>), showId: [1, 4, 5] },
      { id: 'UsefulCapacity', label: (<span>W<sub>hữu ích</sub>(triệu m<sup>3</sup>)</span>), showId: [1, 4, 5] },
      { id: 'PumpNumber', label: 'Số máy bơm', showId: [1, 6] },
      { id: 'FlowDesigned', label: (<span>Q<sub>TK</sub> (m<sup>3</sup>/h)</span>), showId: [1, 11] },
      { id: 'RealityFlow', label: (<span>Q<sub>TT</sub> (m<sup>3</sup>/h)</span>), showId: [1, 11] },
      { id: 'WateringAreaDesigned', label: (<span>F<sub>tưới TK</sub> (ha)</span>), showId: [1, 6] },
      { id: 'RealityWateringArea', label: (<span>F<sub>tưới TT</sub> (ha)</span>), showId: [1, 6] },
      { id: 'AveragePumpTime', label: (<span>T<sub>bơm TB</sub>(h)</span>), showId: [1, 6] },
      { id: 'MinimumPumpTime', label: (<span>T<sub>bơm min</sub>(h)</span>), showId: [1, 6] },
      { id: 'MaximumPumpTime', label: (<span>T<sub>bơm max</sub>(h)</span>), showId: [1, 6] },

    ]
  },
  {
    id: 'License', label: 'Thông tin giấy phép', children: [
      { id: 'LicenseNumber', label: 'Số GP' },
      { id: 'SignDate', label: 'Ngày cấp', format: (value: any) => FormatDate(value) },
      { id: 'IssueDate', label: 'Thời hạn', format: (value: any) => FormatDate(value) },
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
      <Grid item xs={12} sm={12} md={12} className='_row _justifyContentBetween' >
        <Box>
          <Typography className='_font12'>
            Tổng số công trình KTSDN  mặt: 132
          </Typography>
          <Typography className='_font12'>
            Số công trình đã cấp phép: 132
          </Typography>
        </Box>
        <Box className='_search _row'>
          <Box>
            <AutoComplete
              onChange={(e: any, v: any) => handleChange(v)}
              size="small"
              options={complete1}
              getOptionLabel={(option: any) => option.title}
              label="Chọn loại hình CT"
            />
          </Box>
          <Box>
            <AutoComplete
              onChange={(e: any, v: any) => handleChange(v)}
              size="small"
              options={complete2}
              getOptionLabel={(option: any) => option.title}
              label="Chọn loại hình CT"
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

export default SurfaceWater
