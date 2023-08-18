import { useState, FC, useEffect } from 'react';
import { Typography, Grid, TextField, Autocomplete } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import fetchData from 'src/api/fetch';

interface LicenseFieldsetProps {
    data?: any;
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

    const [listLic, setListLic] = useState([])

    const [oldLic, setOldLic] = useState<any>([])

    const [licenseData, setLicenseData] = useState<LicenseState>({
        id: data?.id || 0,
        parentId: data?.parentId || 0,
        licensingTypeId: data?.licensingTypeId || 0,
        businessId: data?.businessId || 0,
        licenseName: data?.licenseName || '',
        licenseNumber: data?.licenseNumber || '',
        signDate: dayjs(data?.signDate) || dayjs(today),
        issueDate: dayjs(data?.issueDate) || dayjs(today),
        expriteDate: dayjs(data?.expriteDate) || dayjs(today),
        duration: data?.duration || '',
        licensingAuthorities: data?.licensingAuthorities || 0,
        relatedDocumentFile: data?.relatedDocumentFile || '',
        licenseRequestFile: data?.licenseRequestFile || '',
    });

    const getData = async () => {
        try {
            const dataLic = await fetchData('License/list')
            const newData = dataLic.filter((item: { [key: string]: any }) =>
                ['thuydien', 'hochua', 'trambom', 'tramcapnuoc', 'dapthuyloi', 'cong', 'nhamaynuoc', 'congtrinh_nuocmatkhac'].some(keyword =>
                    item['constructionTypeSlug']?.toString().toLowerCase().includes(keyword.toLowerCase())
                )
            );
            setListLic(newData);
        } catch (error) {
            setListLic([]);
        } finally {
        }
    };

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
        getData();
        if (data) {
            setLicenseData(data);
        }
    }, [data]);

    const handleChange = (prop: keyof LicenseState) => (value: any) => {
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
                        onChange={(event) => handleChange('licenseNumber')(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label='Ngày ký'
                            value={dayjs(licenseData.signDate)}
                            onChange={(newSignDate: any) => handleChange('signDate')(newSignDate.toDate())}
                            slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
                            format='DD/MM/YYYY'
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField
                        size='small'
                        type='text'
                        label='Tên văn bản'
                        fullWidth
                        placeholder=''
                        defaultValue={licenseData.licenseName}
                        onChange={(event) => handleChange('licenseName')(event.target.value)} />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày có hiệu lực"
                            value={dayjs(licenseData.issueDate)}
                            onChange={(newIssueDate: any) => handleChange('issueDate')(newIssueDate.toDate())}
                            slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
                            format="DD/MM/YYYY" />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <Autocomplete
                        size="small"
                        options={licensingType}
                        getOptionLabel={(option: any) => option.title}
                        defaultValue={licensingType.find(option => option.value === licenseData.licensingTypeId) || null}
                        isOptionEqualToValue={(option: any) => option.value}
                        onChange={(_, value) => handleChange('licensingTypeId')(value?.value || 0)}
                        renderInput={(params) => (
                            <TextField
                                required
                                {...params}
                                fullWidth
                                label="Chọn loại hình CP"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField
                        size='small'
                        type='text'
                        label='Thời hạn giấy phép'
                        fullWidth
                        placeholder=''
                        defaultValue={licenseData.duration}
                        onChange={(event) => handleChange('duration')(event.target.value)} />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <Autocomplete
                        size="small"
                        options={licensingAuthorities}
                        getOptionLabel={(option: any) => option.title}
                        defaultValue={licensingAuthorities.find(option => option.value === licenseData.licensingAuthorities) || null}
                        isOptionEqualToValue={(option: any) => option.value}
                        onChange={(_, value) => handleChange('licensingAuthorities')(value?.value || 0)}
                        renderInput={(params) => (
                            <TextField
                                required
                                {...params}
                                fullWidth
                                label="Chọn cơ quan CP"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Ngày hết hiệu lực"
                            value={dayjs(licenseData.expriteDate)}
                            onChange={(newExpriteDate: any) => handleChange('expriteDate')(newExpriteDate.toDate())}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    fullWidth: true,
                                    required: licenseData.licensingTypeId == 5 ? false : true
                                }
                            }}
                            format="DD/MM/YYYY" />
                    </LocalizationProvider>
                </Grid>

                {licenseData.licensingTypeId > 1 && licenseData.licensingTypeId <= 5 ? (
                    <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                        <Autocomplete
                            size="small"
                            options={listLic}
                            getOptionLabel={(option: any) => option.licenseNumber}
                            isOptionEqualToValue={(option: any) => option.id}
                            defaultValue={listLic.find((option: any) => option.parentId === licenseData.id) || null}
                            onChange={(_, value) => { handleChange('parentId')(value?.value || 0); setOldLic(value || []) }}
                            renderInput={(params) => (
                                <TextField
                                    required
                                    {...params}
                                    fullWidth
                                    label="Số giấy phép cũ"
                                />
                            )}
                        />
                    </Grid>
                ) : ''}
                {licenseData.licensingTypeId > 1 && licenseData.licensingTypeId <= 5 ? (
                    <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                disabled
                                label='Ngày ký giấy phép cũ'
                                value={dayjs(oldLic.signDate)}
                                slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
                                format='DD/MM/YYYY'
                            />
                        </LocalizationProvider>
                    </Grid>

                ) : ''}


                {/* <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
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
                </Grid> */}
            </Grid>
        </fieldset>
    );
};

export default LicenseFieldset;
