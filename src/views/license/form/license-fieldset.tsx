import { useState, FC, useEffect } from 'react';

//MUI Imports
import { Typography, Grid, TextField, Autocomplete, CircularProgress, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

//DatePicker Imports
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers'

//Interface Imports
import { LicenseFieldsetProps, LicenseState } from './license-interface';
import { CloudUpload } from '@mui/icons-material';
import { VisuallyHiddenInput } from 'src/@core/theme/VisuallyHiddenInput';
import { getData } from 'src/api/axios';
import { useRouter } from 'next/router';
import GetConstructionTypeId from 'src/@core/components/get-construction-type';

const LicenseFieldset: FC<LicenseFieldsetProps> = ({ data, onChange }) => {

    const router = useRouter();
    const [listLic, setListLic] = useState([])
    const [oldLic, setOldLic] = useState<any>([])
    const [fetching, setFetching] = useState(false)
    const [fileUpload, setFileUpload] = useState<any>({ licenseFile: null, relatedDocumentFile: null, licenseRequestFile: null })
    const [licenseData, setLicenseData] = useState<LicenseState>({
        id: data?.id || 0,
        childId: data?.childId || 0,
        licensingTypeId: data?.licensingTypeId || 0,
        businessId: data?.businessId || '',
        licenseName: data?.licenseName || '',
        licenseNumber: data?.licenseNumber || '',
        signDate: data?.signDate || null,
        issueDate: data?.issueDate || null,
        expriteDate: data?.expriteDate || null,
        duration: data?.duration || '',
        licenseFile: data?.licenseFile || '',
        licensingAuthorities: data?.licensingAuthorities || '',
        relatedDocumentFile: data?.relatedDocumentFile || '',
        licenseRequestFile: data?.licenseRequestFile || '',
    });


    const getDataForSelect = async () => {
        const paramsFilter = {
            licenseNumber: null,
            licensingAuthorities: null,
            licenseTypeId: 0,
            licenseValidity: null,
            businessId: 0,
            constructionId: 0,
            constructionTypeId: GetConstructionTypeId(router),
            districtId: 0,
            communeId: 0,
            subBasinId: 0,
            pageIndex: 0,
            pageSize: 0
        };
        setFetching(true)
        await getData('giay-phep/danh-sach', paramsFilter).then((data) => {
            setListLic(data);
        }).finally(() => {
            setFetching(false)
        })
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
        getDataForSelect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (prop: keyof LicenseState) => (value: any) => {
        setLicenseData({ ...licenseData, [prop]: value });
        onChange({ ...licenseData, [prop]: value }, fileUpload);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
        const file = event.target.files?.[0] || null;

        // Find the index of the file type in the array and update it
        const updatedFileUpload = { ...fileUpload };
        switch (fileType) {
            case 'licenseFile':
                updatedFileUpload.licenseFile = file;
                break;
            case 'licenseRequestFile':
                updatedFileUpload.licenseRequestFile = file;
                break;
            case 'relatedDocumentFile':
                updatedFileUpload.relatedDocumentFile = file;
                break;
            default:
                break;
        }

        setFileUpload(updatedFileUpload);
        onChange(licenseData, updatedFileUpload);
    };

    return (
        <>
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
                            onChange={(_, value) => handleChange('licensingTypeId')(value?.value || 1)}
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
                            onChange={(_, value) => handleChange('licensingAuthorities')(value?.value || "UBNDT")}
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
                                        value={listLic.find((option: any) => option.id === licenseData.childId) || null}
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
                </Grid>
            </fieldset >
            <fieldset>
                <legend>
                    <Typography variant={'subtitle1'} className='legend__title'>
                        FILE GIẤY PHÉP
                    </Typography>
                </legend>
                <Grid container>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>
                                    File giấy phép
                                </TableCell>
                                <TableCell align='center'>
                                    Đơn xin cấp phép
                                </TableCell>
                                <TableCell align='center'>
                                    Giấy tờ khác có liên quan
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align='center'>
                                    {fileUpload.licenseFile && (<Typography mb={3}>{fileUpload.licenseFile?.name}</Typography>)}
                                    <Button
                                        className="uploadBtn"
                                        component="label"
                                        variant="contained"
                                        startIcon={<CloudUpload />}
                                        href={`#licenseFile`}
                                    >
                                        Upload file
                                        <VisuallyHiddenInput
                                            type="file"
                                            id='licenseFile'
                                            onChange={(event) => handleFileChange(event, 'licenseFile')} // Pass the file type
                                            accept=".pdf"
                                        />
                                    </Button>
                                </TableCell>
                                <TableCell align='center'>
                                    {fileUpload.licenseRequestFile && (<Typography mb={3}>{fileUpload.licenseRequestFile?.name}</Typography>)}
                                    <Button
                                        className="uploadBtn"
                                        component="label"
                                        variant="contained"
                                        startIcon={<CloudUpload />}
                                        href={`#licenseRequestFile`}
                                    >
                                        Upload file
                                        <VisuallyHiddenInput
                                            type="file"
                                            id='licenseRequestFile'
                                            onChange={(event) => handleFileChange(event, 'licenseRequestFile')} // Pass the file type
                                            accept=".pdf"
                                        />
                                    </Button>
                                </TableCell>
                                <TableCell align='center'>
                                    {fileUpload.relatedDocumentFile && (<Typography mb={3}>{fileUpload.relatedDocumentFile?.name}</Typography>)}
                                    <Button
                                        className="uploadBtn"
                                        component="label"
                                        variant="contained"
                                        startIcon={<CloudUpload />}
                                        href={`#relatedDocumentFile`}
                                    >
                                        Upload file
                                        <VisuallyHiddenInput
                                            type="file"
                                            id='relatedDocumentFile'
                                            onChange={(event) => handleFileChange(event, 'relatedDocumentFile')} // Pass the file type
                                            accept=".pdf"
                                        />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
            </fieldset >
        </>
    );
};

export default LicenseFieldset;
