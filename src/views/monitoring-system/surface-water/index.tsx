import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import { Grid, Box, Button, Card, CardContent, IconButton, Tooltip, Typography, Autocomplete, TextField } from '@mui/material';

// ** Icons Imports
import SearchIcon from '@mui/icons-material/Search';
import { EditNote, Delete } from "@mui/icons-material";

// ** Components Imports
import TableComponent from 'src/@core/components/table';
import sufacemonitoringData from 'src/api/monitoringsystem/nuocmat';
import DisplayOperatingStatus from 'src/@core/components/monitoring-page/check-status';

import dynamic from 'next/dynamic';
import { getData } from 'src/api/axios';
import MonitoringSystemToolBar from '../tool-bar';
import { useRouter } from 'next/router'
import { calculateMonitoringData } from 'src/@core/components/calculate-monitoring-data';

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
  { title: "BTNMT", value: 'BTNMT' },
  { title: "UBND Tỉnh", value: 'UBNDT' },
];

// id of columnsTable is parameter to bind ex: get LicseFk.BasinId: id: 'License_Fk.BasinId'
const columnsTable = [
  { id: 'stt', label: 'STT', rowspan: 2, },
  { id: 'tenCT', label: 'Tên công trình', rowspan: 2, },
  { id: 'loi', label: 'Trạng thái vận hành', rowspan: 2, elm: (row: any) => (<DisplayOperatingStatus data={row} />)},
  { id: 'hHaLuuTT', label: (<span>Mực nước <br /> hạ lưu (m)</span>), showId: [1, 4, 5], rowspan: 2, align: 'center' },
  { id: 'dungTichTT', label: (<span>Dung tích hồ  <br /> (triệu m<sup>3</sup>)</span>), showId: [1, 4, 5], rowspan: 2, align: 'center' },
  {
    id: '#', label: 'Mưc nước thượng lưu hồ (m)', showId: [1, 4, 5], children: [
      { id: 'hThuongLuu', label: 'Ngưỡng tràn', elm: (row: any) => (<span>{row.thongso?.hThuongLuu}</span>), align: 'center'},
      { id: 'hThuongLuuTT', label: 'Thực tế ', align: 'center'},
      { id: '', label: 'Chênh lệch (+/-)', elm: (row: any) => (calculateMonitoringData(row.thongso?.hThuongLuu,  row.hThuongLuuTT)), align: 'center'},
    ]
  },
  {
    id: '#', label: (<span>Lưu lượng <br />xả qua tràn  (m3/s)</span>), showId: [1, 4, 5], children: [
      { id: 'qXaTran', label: 'Ngưỡng tràn', elm: (row: any) => (<span>{row.thongso?.hThuongLuu}</span>), align: 'center'},
      { id: 'qXaTranTT', label: 'Thực tế', elm: (row: any) => (<span>{row.thongso?.qXaTran}</span>), align: 'center'},
      { id: '', label: 'Chênh lệch (+/-)', elm: (row: any) => (calculateMonitoringData(row.thongso?.qXaTran,  row.qXaTranTT)), align: 'center'},
    ]
  },
  {
    id: '#', label: 'Lưu lượng lớn nhất (m3/s)', colspan: 8, children: [
      { id: 'qMaxNM', label: 'Ngưỡng tràn', },
      { id: 'qMaxTT', label: 'Thực tế ', },
      { id: '', label: 'Chênh lệch (+/-)', },
    ]
  },
  {
    id: '#', label: 'Lưu lượng xả duy trì DCTT (m3/s) ', showId: [1, 4, 5], colspan: 8, children: [
      { id: 'qTT', label: 'Ngưỡng tràn', },
      { id: 'qMinTT', label: 'Thực tế ', },
      { id: '', label: 'Chênh lệch (+/-)', },
    ]
  },
  {
    id: '#', label: 'Lưu lượng về hạ du (m3/s) ', showId: [1, 4], colspan: 8, children: [
      { id: '', label: 'Ngưỡng tràn', },
      { id: '', label: 'Thực tế ', },
      { id: '', label: 'Chênh lệch (+/-)', },
    ]
  },
  {
    id: '#', label: 'Chất lượng nước trong quá trình khai thác', showId: [1, 5, 6, 11, 13], colspan: 8, children: [
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
  const [mapCenter] = useState([15.012172, 108.676488]);
  const [mapZoom] = useState(9);

  const [TypeOfConsId, setTypeOfConsId] = useState([1]);
  const handleChange = (e: any) => {
    const val = (e == undefined || e == null ? 1 : e.value)
    setTypeOfConsId(val)
  }

  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)

  const isMounted = useRef(true);
    useEffect(() => {
        isMounted.current = true

        return () => {
            isMounted.current = false;
        };
    }, []);
    
  useEffect(() => {
    const getDataConstructions = async () => {
      setLoading(true);
      getData('cong-trinh/danh-sach', paramsFilter)
          .then((data) => {console.log(data);
              if (isMounted.current) {
                setData(data);
              }
          })
          .catch((error) => {
              console.log(error);
          })
          .finally(() => {
              setLoading(false);
          });
    };
    getDataConstructions();

    setColumns(columnsTable);

    // fetchData();
  }, []);

  const router = useRouter();

  const getConstructionTypeId = () => {
    const pathSegments = router.pathname.split('/');
    const section = pathSegments[2];

    switch (section) {
        case "nuoc-mat":
            return 1;
        case "nuoc-duoi-dat":
            return 2;
        case "xa-thai":
            return 3;
        default:
            return 0;
    }
  }

  const [paramsFilter, setParamsFilter] = useState({
    tenct: null,
    loai_ct: getConstructionTypeId(),
    huyen: 0,
    xa: 0,
    song: 0,
    luuvuc: 0,
    tieu_luuvuc: 0,
    tang_chuanuoc: 0,
    tochuc_canhan: 0,
    nguonnuoc_kt: null,
});

  const handleFilterChange = (data: any, postSuccess: boolean | undefined) => {
    setParamsFilter(data);
  };

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
      {/* <Grid item xs={12} sm={7} md={9}>
        <Grid className='_search _row'>
          <Grid item xs={12} sm={2} md={2}>
            <Autocomplete
              onChange={(e: any, v: any) => handleChange(v)}
              size="small"
              options={constructionType}
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
          <Grid item xs={12} sm={2} md={2}>
            <Autocomplete
              onChange={(e: any, v: any) => handleChange(v)}
              size="small"
              options={constructionType}
              getOptionLabel={(option: any) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  fullWidth

                  label="Chọn trạng thái kết nối"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
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
          <Grid item xs={12} sm={4} md={4}>
            <TextField size='small' type='text' label='Nhập tên CT' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <Button size='small' startIcon={<SearchIcon />} variant="outlined">Tìm kiếm</Button>
          </Grid>
        </Grid>
      </Grid> */}
      <Grid item xs={12} sm={12} md={12}>
        <MonitoringSystemToolBar onChange={handleFilterChange} />
        <TableComponent loading={loading} columns={columns} data={data} show={TypeOfConsId} pagination={true}
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
