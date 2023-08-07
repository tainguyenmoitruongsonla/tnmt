import { useState } from 'react';
import { Typography, Grid, Box } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, DatePicker, AutoComplete } from 'src/@core/components/field';

export default function LicenseFieldset(data: any) {

    const d = new Date();
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    const m = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    const y = d.getFullYear();
    const today = `${y}-${m}-${day}`

    const [SignDate, setSignDate] = useState<Dayjs | null>(dayjs(today));
    const [IssueDate, setIssueDate] = useState<Dayjs | null>(dayjs(today));
    const [ExpriteDate, setExpriteDate] = useState<Dayjs | null>(dayjs(today));

    const licensingType = [
        { title: "Cấp mới giấy phép", value: 1 },
        { title: "Cấp lại giấy phép", value: 2 },
        { title: "Gia hạn giấy phép", value: 3 },
        { title: "Điều chỉnh giấy phép", value: 4 },
        { title: "Thu hồi giấy phép", value: 5 },
    ];

    const licensingAuthorities = [
        { title: "BTNMT", value: 0 },
        { title: "UBND Tỉnh", value: 1 },
    ];

    return (
        <fieldset>
            <legend>
                <Typography variant={'subtitle1'} className='legend__title'>THÔNG TIN GIẤY PHÉP</Typography>
            </legend>
            <Grid container spacing={4} rowSpacing={1}>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Số giấy phép' fullWidth placeholder='' defaultValue={data.LicenseNumber} />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày ký"
                            value={SignDate}
                            onChange={(newSignDate: any) => setSignDate(newSignDate)}
                            format="DD/MM/YYYY" />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Tên văn bản' fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày có hiệu lực"
                            value={IssueDate}
                            onChange={(newIssueDate: any) => setIssueDate(newIssueDate)}
                            format="DD/MM/YYYY" />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <Box>
                        <AutoComplete
                            size="small"
                            options={licensingType}
                            getOptionLabel={(option: any) => option.title}
                            label="Chọn loại hình CP"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Thời hạn giấy phép' fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <Box>
                        <AutoComplete
                            size="small"
                            options={licensingAuthorities}
                            getOptionLabel={(option: any) => option.title}
                            label="Chọn cơ quan CP"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Ngày hết hiệu lực"
                            value={ExpriteDate}
                            onChange={(newExpriteDate: any) => setExpriteDate(newExpriteDate)}
                            format="DD/MM/YYYY" />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Thiết bị quan trắc mực nước' fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Thiết bị quan trắc lưu lượng' fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Thiết bị quan trắc dòng chảy tối thiểu' fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Thiết bị quan trắc định kỳ' fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label={<>Q<sub>tt</sub>(m<sup>3</sup>/<sub>s</sub>)</>} fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label={<>H<sub>hồ</sub>(m)</>} fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label={<>Q<sub>qua nhà máy</sub>(m<sup>3</sup>/<sub>s</sub>)</>} fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label={<>Q<sub>qua tràn</sub>(m<sup>3</sup>/<sub>s</sub>)</>} fullWidth placeholder='' defaultValue='' />
                </Grid>
            </Grid>
        </fieldset>
    )
}