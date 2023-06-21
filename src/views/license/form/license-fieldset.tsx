import { useState } from 'react';
import { Typography, Grid, TextField, Box, Autocomplete } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

export default function LicenseFieldset(params: any) {

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
                    <TextField size='small' type='text' label='Số giấy phép' fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField label="Ngày ký"
                            value={SignDate}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                            onChange={(newSignDate) => setSignDate(newSignDate)}
                            format="DD/MM/YYYY" />
                    </LocalizationProvider>

                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Tên văn bản' fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField label="Ngày có hiệu lực"
                            value={IssueDate}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                            onChange={(newIssueDate) => setIssueDate(newIssueDate)}
                            format="DD/MM/YYYY" />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <Box>
                        <Autocomplete size="small"
                            options={licensingType}
                            getOptionLabel={(option) => option.title} renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Chọn loại hình CP"
                                    placeholder=""
                                />
                            )}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Thời hạn giấy phép' fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <Box>
                        <Autocomplete size="small"
                            options={licensingAuthorities}
                            getOptionLabel={(option) => option.title} renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Cơ quan CP"
                                    placeholder=""
                                />
                            )}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField label="Ngày hết hiệu lực"
                            value={ExpriteDate}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                            onChange={(newExpriteDate) => setExpriteDate(newExpriteDate)}
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