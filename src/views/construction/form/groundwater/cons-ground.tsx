import { Typography, Grid } from "@mui/material"
import { useState } from "react"
import { AutoComplete, TextField } from "src/@core/components/field";
import ConstructionDetails from "./ground-detail-fieldset";
import CreateExploit from "./ground-exploit";
import CreateProbe from "./ground-probe";
import CreateDrill from "./ground- drillpractice";

const construcsionType = [
  { title: "Khai thác", value: 8 },
  { title: "Thăm dò", value: 9 },
  { title: "Hành nghề khoan", value: 10 },
  { title: "Công trình khác", value: 23 },
  { title: "Trám lấp giếng", value: 24 },
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
             label="Chọn loại công trình"
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
          <Grid item xs={12} md={8} sm={8} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='Địa điểm công trình' placeholder='' />
          </Grid>
          <Grid item xs={12} md={4} sm={4} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Năm bắt đầu vận hành' />
          </Grid>        
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='Năm xây dựng' placeholder='' />
          </Grid>
          <Grid item xs={12} md={2} sm={12} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='X(VN200)' placeholder='' />
          </Grid>
          <Grid item xs={12} md={2} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Y(VN2000)' />
          </Grid>
          <Grid item xs={12} md={2} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='X(WGS84)' />
          </Grid>
          <Grid item xs={12} md={2} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Y(WGS84)' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8} sm={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Mục đích' />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Thời gian hành nghề khoan' />
          </Grid>
        </Grid>
      </fieldset>

      {showForm && (
        <div>
          {TypeOfConsId === 8 &&
            (<CreateExploit/>)}
          {TypeOfConsId === 9 && (
            <CreateProbe/>
          )}
          {TypeOfConsId=== 10 && (
           <CreateDrill/>
          )}
        </div>
      )}
      <ConstructionDetails/>
    </>
    )
}
export default ConstructionField
