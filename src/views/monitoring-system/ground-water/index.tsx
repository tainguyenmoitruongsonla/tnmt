import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import { Grid, Box, Paper, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

// ** Components Imports
import TableComponent from 'src/@core/components/table';
import DisplayOperatingStatus from 'src/@core/components/monitoring-page/check-status';
import GetConstructionTypeId from 'src/@core/components/get-construction-type';
import { getData } from 'src/api/axios';
import { ConverterCood } from 'src/@core/components/map/convert-coord'
import MonitoringSystemToolBar from '../tool-bar';
import MapLegend from 'src/views/construction/MapLegend';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ViewMonitoringSystemData from '../form';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });


const GroundwaterMonitoring = () => {
  const router = useRouter();
  const [mapCenter, setMapCenter] = useState([15.012172, 108.676488]);
  const [mapZoom, setMapZoom] = useState(9);
  const [showLabel, setShowLabel] = useState(false)
  const [resData, setResData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const [dataFiltered, setDataFiltered] = useState([]);

  const columnsTable = [
    { id: 'stt', label: 'STT', rowspan: 2, },
    {
      id: 'ConstructionName', label: 'Tên công trình', rowspan: 2, elm: (row: any) => (
        <Typography className='btnShowFilePdf' onClick={() => zoomConstruction(ConverterCood(row.y, row.x))}>
          {row.tenCT}
        </Typography>)
    },
    { id: '#', label: 'Trạng thái vận hành', rowspan: 2, elm: (row: any) => (<DisplayOperatingStatus data={row} />) },
    {
      id: '#', label: 'Lưu lượng khai thác của từng giếng khoan', children: [
        { id: 'MaximumFlow', label: 'Yêu cầu', },
        { id: 'MaximumFlowPre', label: 'Thực tế ', },
        { id: '', label: 'Chênh lệch (+/-)', },
      ]
    },
    {
      id: '#', label: 'Mực nước trong giếng khai thác ', children: [
        { id: 'MaximumFlow', label: 'Yêu cầu', },
        { id: 'MaximumFlowPre', label: 'Thực tế ', },
        { id: '', label: 'Chênh lệch (+/-)', },
      ]
    },
    {
      id: '#', label: 'Mực nước trong giếng quan trắc', children: [
        { id: 'MaximumFlow', label: 'Yêu cầu', },
        { id: 'MaximumFlowPre', label: 'Thực tế ', },
        { id: '', label: 'Chênh lệch (+/-)', },
      ]
    },
    {
      id: '#', label: 'Chất lượng nước trong quá trình khai thác', children: [
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
          console.log(data);
          if (isMounted.current) {
            setResData(data);
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
    "khaithac",
    "thamdo",
    "hanhnghekhoan",
    "congtrinhkhac_ndd",
  ])

  const handleFilterChange = (data: any) => {
    setParamsFilter(data);
  };

  useEffect(() => {
    const filteredData: any = resData.filter((item: { [key: string]: any }) =>
      initConsType.some((keyword: any) =>
        item['loaiCT']?.['maLoaiCT']?.toString().toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setDataFiltered(filteredData);
    setTotal(filteredData.length);
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
      <Grid item xs={12} sm={12} md={12}>
        <MonitoringSystemToolBar onChange={handleFilterChange} />
        <TableComponent loading={loading} columns={columns} rows={dataFiltered} pagination={true}
          actions={() => (
            <Box>
              <ViewMonitoringSystemData />
            </Box>
          )

          } />
      </Grid>
    </Grid>
  )
}

export default GroundwaterMonitoring
