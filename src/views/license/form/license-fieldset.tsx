import { useState, ChangeEvent, FC, useEffect } from 'react';
import { Typography, Grid, Box, TextField, Autocomplete } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';

interface LicenseFieldsetProps {
    data?: LicenseState; // Thêm prop data để truyền dữ liệu từ ngoài vào
    onChange: (data: LicenseState) => void;
}

interface LicenseState {
    id: number;
    parentId: number;
    licensingTypeId: number;
    businessId: number;
    licenseName: string;
    licenseNumber: string;
    signDate: Dayjs | null;
    issueDate: Dayjs | null;
    expriteDate: Dayjs | null;
    duration: string;
    licensingAuthorities: number;
    relatedDocumentFile: string;
    licenseRequestFile: string;
}

const LicenseFieldset: FC<LicenseFieldsetProps> = ({ data, onChange }) => {
    const d = new Date();
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    const m = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    const y = d.getFullYear();
    const today = `${y}-${m}-${day}`;

    const [licenseData, setLicenseData] = useState<LicenseState>({
        id: 0,
        parentId: 0,
        licensingTypeId: 0,
        businessId: 0,
        licenseName: '',
        licenseNumber: '',
        signDate: dayjs(today),
        issueDate: dayjs(today),
        expriteDate: dayjs(today),
        duration: '',
        licensingAuthorities: 0,
        relatedDocumentFile: '',
        licenseRequestFile: '',
    });

    const licensingType = [
        { title: 'Cấp mới giấy phép', value: 1 },
        { title: 'Cấp lại giấy phép', value: 2 },
        { title: 'Gia hạn giấy phép', value: 3 },
        { title: 'Điều chỉnh giấy phép', value: 4 },
        { title: 'Thu hồi giấy phép', value: 5 },
    ];

    const licensingAuthorities = [
        { title: 'BTNMT', value: 0 },
        { title: 'UBND Tỉnh', value: 1 },
    ];

    useEffect(() => {
        if (data) {
            setLicenseData(data);
        }
    }, [data]);

    const handleChange = (prop: keyof LicenseState) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setLicenseData({ ...licenseData, [prop]: value });
        onChange({ ...licenseData, [prop]: value });
    };

    return (
        <fieldset>
            <legend>
                <Typography variant={'subtitle1'} className='legend__title'>
                    THÔNG TIN GIẤY PHÉP
                </Typography>
            </legend>
            <Grid container spacing={4} rowSpacing={1}>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField
                        required
                        size='small'
                        type='text'
                        label='Số giấy phép'
                        fullWidth
                        placeholder=''
                        defaultValue={licenseData.licenseNumber}
                        onChange={handleChange('licenseNumber')}
                    />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label='Ngày ký'
                            value={licenseData.signDate}
                            onChange={(newSignDate: any) => setLicenseData({ ...licenseData, signDate: newSignDate })}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                            format='DD/MM/YYYY'
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Tên văn bản' fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày có hiệu lực"
                            value={licenseData.issueDate}
                            onChange={(newIssueDate: any) => setLicenseData({ ...licenseData, issueDate: newIssueDate })}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                            format="DD/MM/YYYY" />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <Box>
                        <Autocomplete
                            size="small"
                            options={licensingType}
                            getOptionLabel={(option: any) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant='standard'
                                    fullWidth
                                    label="Chọn loại hình CP"
                                />
                            )}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField required size='small' type='text' label='Thời hạn giấy phép' fullWidth placeholder='' defaultValue='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <Box>
                        <Autocomplete
                            size="small"
                            options={licensingAuthorities}
                            getOptionLabel={(option: any) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant='standard'
                                    fullWidth
                                    label="Chọn cơ quan CP"
                                />
                            )}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Ngày hết hiệu lực"
                            value={licenseData.expriteDate}
                            onChange={(newExpriteDate: any) => setLicenseData({ ...licenseData, expriteDate: newExpriteDate })}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
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
    );
};

export default LicenseFieldset;
