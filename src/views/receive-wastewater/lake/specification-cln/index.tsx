//React Imports
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import SpecCLNTable from './clnTable'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'

const SpecCLN = () => {
  const route = useRouter()

  return (
    <Grid container spacing={2}>
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

      <Grid xs={12} md={12} sx={{ mt: 5 }}>
        <SpecCLNTable />
      </Grid>
    </Grid>
  )
}

export default SpecCLN
