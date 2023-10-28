import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MapLegend from 'src/views/construction/MapLegend';
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import dynamic from 'next/dynamic';
import { getData } from 'src/api/axios';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const Construction = () => {

  const [mapCenter,] = useState([15.012172, 108.676488]);
  const [mapZoom,] = useState(9);

  const [initConsType, setInitConstype] = useState<any>([
    "nuocmat",
    "thuydien",
    "hochua",
    "trambom",
    "tramcapnuoc",
    "cong",
    "nhamaynuoc",
    "nuocduoidat",
    "khaithac",
    "thamdo",
    "congtrinh_nuocduoidatkhac",
    "xathai",
    "khu_cumcn_taptrung",
    "sx_tieuthu_cn",
    "congtrinhkhac_xt"
  ])

  const [resData, setResData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [showLabel, setShowLabel] = useState(false)

  const handleConsTypeChange = (data: any) => {
    setInitConstype(data);
  };

  useEffect(() => {
    const getDataConstruction = async () => {
      try {
        setLoading(true)
        const data = await getData('cong-trinh/danh-sach');
        setResData(data);
      } catch (error) {
        setResData([]);
      } finally {
        setLoading(false)
      }
    };
    getDataConstruction();
  }, []);

  useEffect(() => {
    const filteredData = resData.filter((item: { [key: string]: any }) =>
      initConsType.some((keyword: any) =>
        item['loaiCT']?.['maLoaiCT']?.toString().toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setDataFiltered(filteredData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initConsType, resData]);

  return (

    <Grid xs={12} md={12} sx={{ height: 'calc(100vh - 82px)', overflow: 'hidden' }}>
      <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
        <Box className="map-legend" sx={{ background: 'white', zIndex: `${loading ? -1 : 999}` }}>
          <FormGroup>
            <FormControlLabel
              sx={{ px: 1 }}
              control={<Checkbox onClick={() => setShowLabel(!showLabel)} />}
              label='Hiển thị tên công trình' />
          </FormGroup>
          <MapLegend onChange={handleConsTypeChange} />
        </Box>
        <Map center={mapCenter} zoom={mapZoom} showLabel={showLabel} mapData={dataFiltered} loading={loading} />
      </Paper>
    </Grid>
  );
};

export default Construction;
