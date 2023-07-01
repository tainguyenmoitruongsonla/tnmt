import { Grid, Typography } from "@mui/material"
import { TextField } from "src/@core/components/field"

const CreateDrain = () => {

  return (
    <fieldset>
      <legend>
        <Typography variant={'subtitle1'} className='legend__title'>THÔNG Số CÔNG TRÌNH</Typography>
      </legend>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }} >
          <TextField size='small' type='text' label='Cao trình cống' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Chiều dài cống' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Đường kính (m)' fullWidth placeholder='' defaultValue='' />
        </Grid>
        <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' label='Kích thước(rộng*cao)' fullWidth placeholder='' defaultValue='' />
        </Grid>
      </Grid>
    </fieldset>
  )
}

export default CreateDrain
