import { Grid, TextField, Typography } from "@mui/material"

const CreateHydroelectric = () => {

  return (
    <fieldset>
        <legend>
          <Typography variant={'h6'}>THÔNG Số CÔNG TRÌNH</Typography>
        </legend>
        <Grid container spacing={4}>
            <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>  
                <TextField size='small' type='text' label='Cấp công trình' fullWidth placeholder='' defaultValue='' />
            </Grid>
        </Grid>
      </fieldset>
  )
}

export default CreateHydroelectric
