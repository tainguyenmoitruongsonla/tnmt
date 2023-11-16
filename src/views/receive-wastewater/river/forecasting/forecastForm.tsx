import { Button, Grid, TextField } from "@mui/material"


const RiverForeCastTForm = () => {

  return (
    <Grid container spacing={4}>
         <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='Tên đoạn sông'
              fullWidth
              placeholder=''
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='pH'
              fullWidth
              placeholder=''
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='BOD5'
              fullWidth
              placeholder=''
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='COD'
              fullWidth
              placeholder=''
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='TOC'
              fullWidth
              placeholder=''
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='TSS'
              fullWidth
              placeholder=''
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='DO'
              fullWidth
              placeholder=''
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='Tổng P'
              fullWidth
              placeholder=''
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='Tổng N'
              fullWidth
              placeholder=''
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='Tổng Caliform'
              fullWidth
              placeholder=''
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='Coliform chịu nhiệt'
              fullWidth
              placeholder=''
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='Amoni NH4+N'
              fullWidth
              placeholder=''
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <Button variant="outlined" fullWidth>Dự đoán</Button>
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='...'
              fullWidth
              placeholder=''
            />
          </Grid>
    </Grid>
  )
}

export default RiverForeCastTForm
