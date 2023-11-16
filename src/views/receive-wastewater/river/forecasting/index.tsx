//React Imports
//import React, { useEffect, useState } from 'react'
import { useState } from 'react'
import { Grid, Typography } from '@mui/material'
import RiverForeCastTable from './forecastTable'
import RiverForeCastTForm from './forecastForm'

//import BoxLoading from 'src/@core/components/box-loading'
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const RiverForeCast = () => {
    const [mapCenter] = useState([ 15.012172, 108.676488 ]);
    const [mapZoom] = useState(9);

  //   const route = useRouter()
  //   const [data, setData] = useState<CLNState[]>([])
  //   const [loading, setLoading] = useState(false)
  //   const [postSuccess, setPostSuccess] = useState(false)
  //   const handlePostSuccess = () => {
  //     setPostSuccess(prevState => !prevState)
  //   }

  //   useEffect(() => {
  //     async function getDataReport1() {
  //       setLoading(true)

  //        if (route.pathname.split('/')[2] === 'nguon-nuoc-ao') {
  //       try {
  //         const data = await getData('ThongSoCLNAo/danhsach');
  //         setData(data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     } else if (route.pathname.split('/')[2] === 'nguon-nuoc-song') {
  //       try {
  //         const data = await getData('ThongSoCLNSong/danhsach');
  //         setData(data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }

  //     setLoading(false);
  //   }

  //   getDataReport1();
  // }, [route.pathname, postSuccess]);

  return (
    <Grid container>
      <Grid xs={12} md={12}>
        <Typography textAlign={'center'} variant='h6'>
          Tính Dự Báo Khả Năng Tiếp Nhận Nước Thải
        </Typography>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <RiverForeCastTForm/>
        </Grid>
        <Grid item xs={12} md={8} sm={12} sx={{ my: 2 }}>
        <Map center={mapCenter} zoom={mapZoom} mapData={null} />
        </Grid>
      </Grid>

      {/* {loading
       ? <BoxLoading /> 
       : <SpecCLNTable data={data} setPostSuccess={handlePostSuccess} />} */}
      <RiverForeCastTable />
    </Grid>
  )
}

export default RiverForeCast
