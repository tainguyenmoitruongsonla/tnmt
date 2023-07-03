import { Grid, Typography } from "@mui/material"
import { TextField } from "src/@core/components/field"

const CreatePump = () => {

  return (
    <fieldset>
      <legend>
        <Typography variant={'subtitle1'} className='legend__title'>THÔNG Số CÔNG TRÌNH</Typography>
      </legend>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }} >
          <TextField size='small' type='text' label='Số máy bơm' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Diện tích tưới thiết kế' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Lượng mưa tưới thực tế' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Lưu lượng thiết kế' fullWidth placeholder='' defaultValue='' />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Lưu lượng thực tế' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label={<>Q<sub>tk</sub>(m<sup>3</sup>/<sub>ngày đêm</sub>)</>} fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label={<>Q<sub>max</sub>(m<sup>3</sup>/<sub>ngày đêm</sub>)</>} fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Mực nước bể hút' fullWidth placeholder='' defaultValue='' />
        </Grid>
      </Grid>

    </fieldset>
  )
}

export default CreatePump
