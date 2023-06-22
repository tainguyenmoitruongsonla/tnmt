import { Typography, Grid } from "@mui/material";
import { TextField } from "src/@core/components/field";

export default function BusinessFieldset(params: any) {

    return (
        <fieldset>
            <legend>
                <Typography variant={'subtitle1'} className="legend__title">THÔNG TIN TỔ CHỨC/CÁ NHÂN</Typography>
            </legend>
            <Grid container spacing={4} rowSpacing={1}>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Tên tổ chức/cá nhân được CP' fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Địa chỉ' fullWidth />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Số điện thoại' fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Email' fullWidth placeholder='' defaultValue='' />
                </Grid>
            </Grid>
        </fieldset>
    )
}