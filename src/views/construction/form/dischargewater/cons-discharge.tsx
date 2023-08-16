import { Typography, Grid, TextField, Autocomplete } from "@mui/material"
import ConstructionDetails from "./cons-detail-fieldset";

const construcsionType = [
  { title: "Khu/cụm CN tập trung", value: 4 },
  { title: "SX tiểu thủ CN", value: 5 },
  { title: "SX KD dịch vụ", value: 6 },
  { title: "CS bệnh viện", value: 12 },
  { title: "Khu dân cư/Làng nghề", value: 13 },
  { title: "Chăn nuôi/NTTS", value: 11 },
  { title: "Công trình khác", value: 23 },
];

const ConstructionField = () => {

  return (
    <>
      <fieldset>
        <legend >
          <Typography variant={'subtitle1'} className='legend__title'>THÔNG TIN CÔNG TRÌNH</Typography>
        </legend>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              size="small"
              options={construcsionType}
              getOptionLabel={(option: any) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  fullWidth
                  label={'Chọn loại công trình'}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Tên công trình' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>

            <Autocomplete
              size="small"
              options={construcsionType}
              getOptionLabel={(option: any) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  fullWidth
                  label={'Giấy phép'}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>

            <Autocomplete
              size="small"
              options={construcsionType}
              getOptionLabel={(option: any) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  fullWidth
                  label={'Chọn Tỉnh/TP'}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              size="small"
              options={construcsionType}
              getOptionLabel={(option: any) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  fullWidth
                  label={'Chọn Quận/Huyện'}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              size="small"
              options={construcsionType}
              getOptionLabel={(option: any) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  fullWidth
                  label={'Chọn Xã/phường'}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='Địa điểm công trình' placeholder='' />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Năm bắt đầu vận hành' />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Vĩ độ' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='Kinh độ' placeholder='' />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Ví trí xả thải' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='Nguồn tiếp nhận nước thải' placeholder='' />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Phương thức xả nước thải' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='Chế độ xả nước thải' placeholder='' />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Lưu lượng xả trung bình(m3/ngày đêm)' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='Lưu lương xả lớn nhất(m3/ngày đêm)' placeholder='' />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Chất lượng nước thải, hệ số Kq và Kf' />
          </Grid>
        </Grid>

      </fieldset>

      <ConstructionDetails />
    </>
  )
}
export default ConstructionField
