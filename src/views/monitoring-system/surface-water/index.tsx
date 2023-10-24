import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import { Grid, Box, Paper, IconButton, Tooltip, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

// ** Icons Imports
import { EditNote, Delete } from "@mui/icons-material";

// ** Components Imports
import TableComponent from 'src/@core/components/table';
import DisplayOperatingStatus from 'src/@core/components/monitoring-page/check-status';

import dynamic from 'next/dynamic';
import { getData } from 'src/api/axios';
import MonitoringSystemToolBar from '../tool-bar';
import { useRouter } from 'next/router'
import { calculateMonitoringData } from 'src/@core/components/calculate-monitoring-data';
import GetConstructionTypeId from 'src/@core/components/get-construction-type';
import { ConverterCood } from 'src/@core/components/map/convert-coord'
import MapLegend from 'src/views/construction/MapLegend';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

// const constructionType = [
//   { title: "Chọn loại CT", value: 1 },
//   { title: "Thủy điện", value: 4 },
//   { title: "Hồ chứa", value: 5 },
//   { title: "Trạm bơm", value: 6 },
//   { title: "Cống", value: 13 },
//   { title: "Trạm cấp nước", value: 11 },
// ];

// const licensingAuthorities = [
//   { title: "BTNMT", value: 'BTNMT' },
//   { title: "UBND Tỉnh", value: 'UBNDT' },
// ];


const SurfaceWaterMonitoring = () => {
  const [mapCenter, setMapCenter] = useState([15.012172, 108.676488]);
  const [mapZoom, setMapZoom] = useState(9);
  const [showLabel, setShowLabel] = useState(false)

  const [TypeOfConsId] = useState([1]);

  const [resData, setResData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const [dataFiltered, setDataFiltered] = useState([]);

  // id of columnsTable is parameter to bind ex: get LicseFk.BasinId: id: 'License_Fk.BasinId'
  const columnsTable = [
    { id: 'stt', label: 'STT', rowspan: 2, },
    {
      id: 'tenCT', label: 'Tên công trình', rowspan: 2, elm: (row: any) => (
        <Typography className='btnShowFilePdf' onClick={() => zoomConstruction(ConverterCood(row.y, row.x))}>
          {row.tenCT}
        </Typography>)
    },
    { id: 'loi', label: 'Trạng thái vận hành', rowspan: 2, elm: (row: any) => (<DisplayOperatingStatus data={row} />) },
    { id: 'hHaLuuTT', label: (<span>Mực nước <br /> hạ lưu (m)</span>), showId: [1, 4, 5], rowspan: 2, align: 'center' },
    { id: 'dungTichTT', label: (<span>Dung tích hồ  <br /> (triệu m<sup>3</sup>)</span>), showId: [1, 4, 5], rowspan: 2, align: 'center' },
    {
      id: '#', label: 'Mực nước thượng lưu hồ (m)', showId: [1, 4, 5], children: [
        { id: 'hThuongLuu', label: 'Ngưỡng tràn', elm: (row: any) => (<span>{row.thongso?.hThuongLuu}</span>), align: 'center' },
        { id: 'hThuongLuuTT', label: 'Thực tế ', align: 'center' },
        { id: '', label: 'Chênh lệch (+/-)', elm: (row: any) => (calculateMonitoringData(row.thongso?.hThuongLuu, row.hThuongLuuTT)), align: 'center' },
      ]
    },
    {
      id: '#', label: 'Lưu lượng xả nhà máy (m3/s)', showId: [1, 4, 5], children: [
        { id: 'qmaxNM', label: 'Ngưỡng tràn', elm: (row: any) => (<span>{row.thongso?.qmaxNM}</span>), align: 'center' },
        { id: 'qMaxTT', label: 'Thực tế', align: 'center' },
        { id: '', label: 'Chênh lệch (+/-)', elm: (row: any) => (calculateMonitoringData(row.thongso?.qmaxNM, row.qMaxTT)), align: 'center' },
      ]
    },
    {
      id: '#', label: (<span>Lưu lượng <br />xả qua tràn  (m3/s)</span>), showId: [1, 4, 5], children: [
        { id: 'qXaTran', label: 'Ngưỡng tràn', elm: (row: any) => (<span>{row.thongso?.qXaTran}</span>), align: 'center' },
        { id: 'qXaTranTT', label: 'Thực tế', align: 'center' },
        { id: '', label: 'Chênh lệch (+/-)', elm: (row: any) => (calculateMonitoringData(row.thongso?.qXaTran, row.qXaTranTT)), align: 'center' },
      ]
    },
    {
      id: '#', label: 'Lưu lượng xả duy trì DCTT (m3/s) ', showId: [1, 4, 5], colspan: 8, children: [
        { id: 'qtt', label: 'Ngưỡng tràn', elm: (row: any) => (<span>{row.thongso?.qtt}</span>), align: 'center' },
        { id: 'qMinTT', label: 'Thực tế ', },
        { id: '', label: 'Chênh lệch (+/-)', elm: (row: any) => (calculateMonitoringData(row.thongso?.qtt, row.qMinTT)), align: 'center' },
      ]
    },
    {
      id: '#', label: 'Lưu lượng về hạ du (m3/s) ', showId: [1, 4], rowspan: 2, elm: (row: any) => (calculateSumFlow(row.qMaxTT, row.qXaTranTT, row.qMinTT)), align: 'center' 
    },
    {
      id: '#', label: 'Lưu lượng khai thác (m3/s) ', showId: [1, 4], colspan: 8, children: [
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

  const calculateSumFlow = (value1:any, value2:any, value3:any) => {
    value1 = value1 == null ? 0 : value1
    value2 = value2 == null ? 0 : value2
    value3 = value3 == null ? 0 : value3
    
    return parseFloat(value1).toFixed(2) + parseFloat(value2).toFixed(2) + parseFloat(value3).toFixed(2)
  }

  const zoomConstruction = (coords: any) => {
    setMapCenter(coords)
    setMapZoom(13)
  }

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
        .then((data) => {
          if (isMounted.current) {
            setResData(data);
            setTotal(data.length);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const [paramsFilter, setParamsFilter] = useState({
    tenct: null,
    loai_ct: GetConstructionTypeId(router),
    huyen: 0,
    xa: 0,
    song: 0,
    luuvuc: 0,
    tieu_luuvuc: 0,
    tang_chuanuoc: 0,
    tochuc_canhan: 0,
    nguonnuoc_kt: null,
  });

  const [initConsType, setInitConstype] = useState<any>([
    "nuocmat",
    "thuydien",
    "hochua",
    "trambom",
    "tramcapnuoc",
    "conglaynuoc",
    "nhamaynuoc"
  ])

  const handleFilterChange = (data: any) => {
    setParamsFilter(data);
  };

  const EditLicense = (row: any) => {
    console.log('Edit: ' + row.LicenseNumber)
  }

  const DeleteLicense = (row: any) => {
    console.log('Delete: ' + row.LicenseNumber)
  }

  useEffect(() => {
    const filteredData: any = resData.filter((item: { [key: string]: any }) =>
      initConsType.some((keyword: any) =>
        item['loaiCT']?.['maLoaiCT']?.toString().toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setDataFiltered(filteredData)
  }, [initConsType, resData]);

  const handleConsTypeChange = (data: any) => {
    setInitConstype(data);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
          <Box className='map-legend' sx={{ background: 'white', pl: 2 }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onClick={() => setShowLabel(!showLabel)} />}
                label='Hiển thị tên công trình'
              />
            </FormGroup>
            <MapLegend onChange={handleConsTypeChange} />
          </Box>
          <Map center={mapCenter} zoom={mapZoom} showLabel={showLabel} mapData={dataFiltered} loading={false} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={5} md={3}>
        <Typography>Tổng số bản ghi đã tìm thấy: {total}</Typography>
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
        <TableComponent loading={loading} columns={columns} data={resData} show={TypeOfConsId} pagination={true}
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
