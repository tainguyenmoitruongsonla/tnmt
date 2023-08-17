//React Imports
import React, { useState, useEffect } from 'react';

//MUI Imports
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import MapLegend from 'src/views/construction/MapLegend';


import dynamic from 'next/dynamic';
import fetchData from 'src/api/fetch';
import { useLoadingContext } from 'src/@core/theme/loading-provider';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const Construction = () => {

  const [mapCenter, ] = useState([15.012172, 108.676488]);
  const [mapZoom, ] = useState(9);

  const { showLoading, hideLoading } = useLoadingContext();
  const [loading, setLoading] = useState(false)
  loading == true ? showLoading() : hideLoading();

  const [resData, setResData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchData('Construction/list');
        setResData(data);
      } catch (error) {
        setResData([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (

    <Grid xs={12} md={12} sx={{ height: 'calc(100vh - 82px)', overflow: 'hidden' }}>
    <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
        <Box className="map-legend" sx={{ background: 'white' }}>
        <MapLegend />
        </Box>
        <Map center={mapCenter} zoom={mapZoom} mapData={null} mapMarkerData={resData} />
    </Paper>
    </Grid>
  );
};

export default Construction;
