import { useState, FC, useEffect } from 'react';
import { Typography, Grid, TextField, Autocomplete, CircularProgress } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import fetchData from 'src/api/fetch';

interface LicenseFieldsetProps {
    data?: any;
    onChange: (data: LicenseState) => void;
}

export interface LicenseState {
    id: number;
    childId: number;
    licensingTypeId: number;
    businessId: number;
    licenseName: string | null;
    licenseNumber: string | null;
    signDate: Dayjs | null;
    issueDate: Dayjs | null;
    expriteDate: Dayjs | null;
    duration: string | null;
    licensingAuthorities: string | null;
    relatedDocumentFile: string | null;
    licenseRequestFile: string | null;
}

const LicenseFieldset: FC<LicenseFieldsetProps> = ({ data, onChange }) => {

    const [listLic, setListLic] = useState([])
    const [oldLic, setOldLic] = useState<any>([])
    const [fetching, setFetching] = useState(false)
    const [licenseData, setLicenseData] = useState<LicenseState>({
        id: data?.id || 0,
        childId: data?.childId || 0,
        licensingTypeId: data?.licensingTypeId || 0,
        businessId: data?.businessId || 0,
        licenseName: data?.licenseName || null,
        licenseNumber: data?.licenseNumber || null,
        signDate: dayjs(data?.signDate) || null,
        issueDate: dayjs(data?.issueDate) || null,
        expriteDate: dayjs(data?.expriteDate) || null,
        duration: data?.duration || null,
        licensingAuthorities: data?.licensingAuthorities || null,
        relatedDocumentFile: data?.relatedDocumentFile || null,
        licenseRequestFile: data?.licenseRequestFile || null,
    });

    const getData = async () => {
        try {
            setFetching(true)
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
            setFetching(false)
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
        { title: 'BTNMT', value: 'BTNMT' },
        { title: 'UBND Tỉnh', value: 'UBNDT' },
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
                        value={licenseData.licenseNumber}
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
                        value={licenseData.licenseName}
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
                        value={licensingType.find(option => option.value === licenseData.licensingTypeId) || null}
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
                        value={licenseData.duration}
                        onChange={(event) => handleChange('duration')(event.target.value)} />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <Autocomplete
                        size="small"
                        options={licensingAuthorities}
                        getOptionLabel={(option: any) => option.title}
                        value={licensingAuthorities.find(option => option.value === licenseData.licensingAuthorities) || null}
                        isOptionEqualToValue={(option: any) => option.value}
                        onChange={(_, value) => handleChange('licensingAuthorities')(value?.value || -1)}
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

                {licenseData.licensingTypeId > 1 && licenseData.licensingTypeId <= 5 ?
                    fetching ? (<CircularProgress size={20} />) : (
                        <Grid container spacing={4} rowSpacing={1} ml={0} >
                            <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }} >
                                <Autocomplete
                                    size="small"
                                    options={listLic}
                                    getOptionLabel={(option: any) => option.licenseNumber}
                                    isOptionEqualToValue={(option: any) => option.id}
                                    defaultValue={listLic.find((option: any) => option.id === licenseData.childId) || null}
                                    onChange={(_, value) => { handleChange('childId')(value?.id || 0); setOldLic(value || []) }}
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
                            <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        disabled
                                        label='Ngày ký giấy phép cũ'
                                        value={dayjs(oldLic.signDate) || null}
                                        slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
                                        format='DD/MM/YYYY'
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    ) : ''}

                {/* <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Thiết bị quan trắc mực nước' fullWidth placeholder='' value='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Thiết bị quan trắc lưu lượng' fullWidth placeholder='' value='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Thiết bị quan trắc dòng chảy tối thiểu' fullWidth placeholder='' value='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Thiết bị quan trắc định kỳ' fullWidth placeholder='' value='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label={<>Q<sub>tt</sub>(m<sup>3</sup>/<sub>s</sub>)</>} fullWidth placeholder='' value='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label={<>H<sub>hồ</sub>(m)</>} fullWidth placeholder='' value='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label={<>Q<sub>qua nhà máy</sub>(m<sup>3</sup>/<sub>s</sub>)</>} fullWidth placeholder='' value='' />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label={<>Q<sub>qua tràn</sub>(m<sup>3</sup>/<sub>s</sub>)</>} fullWidth placeholder='' value='' />
                </Grid> */}
            </Grid>
        </fieldset >
    );
};

export default LicenseFieldset;
