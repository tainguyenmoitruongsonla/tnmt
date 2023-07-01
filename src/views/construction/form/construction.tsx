import { Typography, Grid } from "@mui/material"
import CreateHydroelectric from "./create-hydroelectric"
import { useState } from "react"
import { AutoComplete, TextField } from "src/@core/components/field";
import CreateLake from "./create-lake";
import CreatePump from "./create-pump";
import CreateDrain from "./create-drain";
import ConstructionDetails from "./cons-detail-fieldset";

const construcsionType = [
  { title: "Thủy điện", value: 4 },
  { title: "Hồ chứa", value: 5 },
  { title: "Trạm bơm", value: 6 },
  { title: "Đập/Hệ thống thủy lợi", value: 12 },
  { title: "Cống", value: 13 },
  { title: "Trạm cấp nước", value: 11 },
  { title: "Nhà máy nước", value: 14 },
  { title: "Công trình khác", value: 23 },
  ];

const ConstructionField = () =>{
    const [showForm, setShowForm] = useState(false)
    const [TypeOfConsId, setTypeOfConsId] = useState(1);
    const handleChange = (e: any) => {
        const val = (e == undefined || e == null ? 1 : e.value)
        setTypeOfConsId(val)
        setShowForm(true)
    }

    return(  
        <>       
         <fieldset>
        <legend >
          <Typography variant={'subtitle1'} className='legend__title'>THÔNG TIN CÔNG TRÌNH</Typography>
        </legend>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <AutoComplete
            onChange={(e:any, v:any) => handleChange(v)}
             size="small" 
             options={construcsionType}
             getOptionLabel={(option: any) => option.title}
             label="Chọn loại hình CP"
          />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Tên công trình' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            
            <AutoComplete
             size="small" 
             options={construcsionType}
             getOptionLabel={(option: any) => option.title}
             label="Giấy phép"
          />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
           
            <AutoComplete
             size="small" 
             options={construcsionType}
             getOptionLabel={(option: any) => option.title}
             label="Chọn Tỉnh/TP"
          />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <AutoComplete
             size="small" 
             options={construcsionType}
             getOptionLabel={(option: any) => option.title}
             label="Chọn Quận/Huyện"
          />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <AutoComplete
              size="small" 
              options={construcsionType}
              getOptionLabel={(option: any) => option.title}
              label="Chọn Xã/phường"
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='Địa điểm công trình' placeholder='' />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Vĩ độ' />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Kinh độ' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='Năm vận hành' placeholder='' />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Năm xây dựng' />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Tiểu vùng quy hoạch' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <AutoComplete
              size="small" 
              options={construcsionType}
              getOptionLabel={(option: any) => option.title}
              label="Chọn lưu vực sông"
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Nguồn nước khai thác' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue=''
              label='Phương thức khai thác'
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Chế độ khai thác' />
          </Grid>
        </Grid>
      </fieldset>

      {showForm && (
        <div>
          {TypeOfConsId === 4 &&
            (<CreateHydroelectric />)}
          {TypeOfConsId === 5 && (
            <CreateLake/>
          )}
          {TypeOfConsId=== 6 && (
           <CreatePump/>
          )}
           {TypeOfConsId === 13 &&
            (<CreateDrain />)}
        </div>
      )}
      <ConstructionDetails/>
    </>
    )
}
export default ConstructionField
