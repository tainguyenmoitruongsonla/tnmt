//React Imports
import React, { useState, useEffect } from 'react';

//MUI Imports
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import MapLegend from 'src/views/construction/MapLegend';


import dynamic from 'next/dynamic';
import fetchData from 'src/api/fetch';

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
    "congtrinh_xathaikhac"
  ])

  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false)

  const handleConsTypeChange = (data: any) => {
    setInitConstype(data);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const data = await fetchData('Construction/list');
        const filteredData = data.filter((item: { [key: string]: any }) =>
          initConsType.some((keyword: any) =>
            item['constructionTypeSlug']?.toString().toLowerCase().includes(keyword.toLowerCase())
          )
        );
        setResData(filteredData);
      } catch (error) {
        setResData([]);
      } finally {
        setLoading(false)
      }
    };
    getData();
  }, [initConsType]);

  

  return (

    <Grid xs={12} md={12} sx={{ height: 'calc(100vh - 82px)', overflow: 'hidden' }}>
      <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
        <Box className="map-legend" sx={{ background: 'white', zIndex: `${loading ? -1 : 999 }` }}>
          <MapLegend onChange={handleConsTypeChange} />
        </Box>
        <Map center={mapCenter} zoom={mapZoom} mapData={null} mapMarkerData={resData} loading={loading} />
      </Paper>
    </Grid>
  );
};

export default Construction;
