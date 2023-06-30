import { Grid, Typography } from "@mui/material"
import { TextField } from "src/@core/components/field"

const CreateLake = () => {

  return (

    <fieldset>
      <legend>
        <Typography variant={'subtitle1'} className='legend__title'>THÔNG Số CÔNG TRÌNH</Typography>
      </legend>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }} >
          <TextField size='small' type='text' label='Cấp công trình' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Diện tích lưu vực' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Lượng mưa trung bình nhiều năm' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Lưu lượng trung bình nhiều năm' fullWidth placeholder='' defaultValue='' />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Công suất' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Công suất đảm bảo' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Chiều cao đập' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Lưu lượng tối đa' fullWidth placeholder='' defaultValue='' />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Lưu lượng tối thiểu' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Lưu lượng đảm bảo' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Hmax' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Hmin' fullWidth placeholder='' defaultValue='' />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Htt' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Dung tích toàn bộ' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Dung tích chết' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Dung tích hữu ích' fullWidth placeholder='' defaultValue='' />
        </Grid>
      </Grid>
    </fieldset>
  )
}

export default CreateLake
