//React Imports
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import SpecCLNTable from './clnTable'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { CLNState } from './clnInterface'
import { getData } from 'src/api/axios'
import BoxLoading from 'src/@core/components/box-loading'

const SpecCLN = () => {
  const route = useRouter()
  const [data, setData] = useState<CLNState[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }

  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)

       if (route.pathname.split('/')[2] === 'nguon-nuoc-ao') {
      try {
        const data = await getData('ThongSoCLNAo/danhsach');
        setData(data);
      } catch (error) {
        console.error(error);
      }
    } else if (route.pathname.split('/')[2] === 'nguon-nuoc-song') {
      try {
        const data = await getData('ThongSoCLNSong/danhsach');
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }

    setLoading(false);
  }

  getDataReport1();
}, [route.pathname, postSuccess]);

  return (
    <Grid container spacing={2} >
      {route.pathname.split('/')[2] == 'nguon-nuoc-ao' ? (
        <Grid xs={12} md={12}>
          <Typography textAlign={'center'} variant='h6'>
            QUY CHUẨN QUỐC GIA VỀ CHẤT LƯỢNG NƯỚC MẶT CHO AO,HỒ
          </Typography>
          <Typography sx={{ mt: 5 }} textAlign={'center'}>
            Giá trị giới hạn các thông số trong nước mặt phục vụ cho việc phân loại chất lượng nước ao,hồ,
            <br />
            đầm và bảo vệ môi trường sông dưới nước
          </Typography>
        </Grid>
      ) : route.pathname.split('/')[2] == 'nguon-nuoc-song' ? (
        <Grid xs={12} md={12}>
          <Typography textAlign={'center'} variant='h6'>
            QUY CHUẨN QUỐC GIA VỀ CHẤT LƯỢNG NƯỚC MẶT CHO SÔNG, SUỐI
          </Typography>
          <Typography sx={{ mt: 5 }} textAlign={'center'}>
            Giá trị giới hạn các thông số trong nước mặt phục vụ cho việc phân loại chất lượng nước sông,suối,
            <br />
            kênh,mương,khe,rạch và bảo vệ môi trường sông dưới nước
          </Typography>
        </Grid>
      ) : (
        ''
      )}
      {loading
       ? <BoxLoading /> 
       : <SpecCLNTable data={data} setPostSuccess={handlePostSuccess} />}
    </Grid>
  )
}

export default SpecCLN
