import DialogsControl from 'src/@core/components/dialog-control';
import { Add, EditNote, Save } from "@mui/icons-material";
import { Grid, Button, DialogActions, FormControl, TextField, FormControlLabel, Checkbox, Autocomplete, CircularProgress } from "@mui/material";
import { ChangeEvent, useEffect, useState } from 'react';

import postData from 'src/api/post';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from 'next/router';
import fetchData from 'src/api/fetch';
import upload from 'src/api/upload-file';

export interface LicenseFeeState {
    id?: number,
    childrenId?: number,
    licenseFeeNumber?: string | null,
    signDate?: Dayjs | null,
    totalMoney?: number | undefined,
    filePdf?: File | null | undefined,
    description?: string | null,
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {

    const [values, setValues] = useState<LicenseFeeState>({
        id: data?.id || 0,
        childrenId: data?.childrenId || 0,
        licenseFeeNumber: data?.licenseFeeNumber || null,
        signDate: dayjs(data?.signDate) || null,
        totalMoney: data?.totalMoney || null,
        filePdf: data?.filePdf || null,
        description: data?.description || null,
    });

    const [fileUpload, setFileUpload] = useState<any>()
    const [supplementLicenseFee, setSupplementLicenseFee] = useState(false)
    const [listLicFee, setListLicFee] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [saving, setSaving] = useState(false);


    // Hooks
    const router = useRouter();

    const handleChange = (prop: keyof LicenseFeeState) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setValues({ ...values, [prop]: value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setFileUpload(file);
    };

    useEffect(() => {
        const getData = async () => {
            setFetching(true)
            try {
                if (router.pathname.split('/')[2] == 'bo-cap') {
                    const data = await fetchData('LicenseFee/list/minister');
                    setListLicFee(data);
                } else {
                    const data = await fetchData('LicenseFee/list/province');
                    setListLicFee(data);
                }
            } catch (error) {
                setListLicFee([]);
            } finally {
                setFetching(false)
            }
        };
        getData();
    }, [router.pathname]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const handleApiCall = async () => {
            let licAuthorities: string;

            if (router.pathname.split('/')[2] == 'bo-cap') {
                licAuthorities = 'BTNMT';
            } else {
                licAuthorities = 'UBNDT';
            }

            const newVal = {
                ...values,
                licensingAuthorities: licAuthorities,
                signDate: values.signDate?.toDate(),
                filePdf: `${values.licenseFeeNumber?.toLowerCase()}.pdf`
            }

            const newFile = {
                filePath: `${router.pathname.split('/')[1]}/${router.pathname.split('/')[2]}/${newVal.signDate?.getFullYear()}`,
                fileName: `${newVal.licenseFeeNumber?.toLowerCase()}.pdf`,
                file: fileUpload
            }

            setSaving(true)
            try {
                const res = await postData('LicenseFee/save', newVal);
                if (res) {
                    await upload(newFile)

                    // Reset form fields
                    setValues({});

                    typeof (setPostSuccess) === 'function' ? setPostSuccess(true) : '';
                    closeDialogs();
                }
            } catch (error) {
                console.log(error)
            } finally {
                setSaving(false)
            }
        };

        // Call the function
        handleApiCall();
    };

    const handleClose = () => {
        setValues({});
        closeDialogs();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} md={12} sx={{ my: 2 }}>
                    <FormControlLabel
                        label="Quyết định bổ xung"
                        onChange={() => (setSupplementLicenseFee(!supplementLicenseFee))}
                        control={<Checkbox checked={supplementLicenseFee} />}
                    />
                </Grid>
                {supplementLicenseFee ? (
                    <Grid xs={12} md={12} sx={{ my: 2 }}>
                        {fetching ? (
                            <CircularProgress size={20} />
                        ) : (
                            <Autocomplete
                                onChange={(e: any, v: any) => setValues({ ...values, childrenId: v.id })}
                                size="small"
                                options={listLicFee}
                                getOptionLabel={(option: any) => option.licenseFeeNumber}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        label="Chọn quyết định TCQ cần bổ xung"
                                    />
                                )}
                            />
                        )}

                    </Grid>
                ) : ''}

                <Grid item xs={12} md={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' fullWidth label='Số quyết định' placeholder='' value={values?.licenseFeeNumber} onChange={handleChange('licenseFeeNumber')} />
                </Grid>
                <Grid item xs={12} md={12} sx={{ my: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày ký"
                            value={values.signDate}
                            onChange={(newSignDate: any) => setValues({ ...values, signDate: newSignDate })}
                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                            format="DD/MM/YYYY" />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' fullWidth label='Tổng tiền' placeholder='' value={values?.totalMoney} onChange={handleChange('totalMoney')} />
                </Grid>
                <Grid item xs={12} md={12} sx={{ my: 2 }}>
                    <FormControl fullWidth>
                        <TextField
                            id="file-input"
                            type="file"
                            size='small'
                            fullWidth
                            onChange={handleFileChange}
                            inputProps={{
                                accept: '.pdf', // Specify the accepted file types
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' fullWidth label='Ghi chú' placeholder='' value={values?.description} onChange={handleChange('description')} />
                </Grid>
            </Grid>
            <DialogActions sx={{ p: 0 }}>
                <Button onClick={() => handleClose()} className='btn cancleBtn'>Hủy</Button>
                <Button type="submit" disabled={saving} className='btn saveBtn'> {saving ? <CircularProgress color='inherit' size={20} /> : <Save />} &nbsp; Lưu </Button>
            </DialogActions>
        </form>
    );
};

const FormLicenseFee = ({ data, isEdit, setPostSuccess }: any) => {
    const formTitle = isEdit ? 'Thay đổi thông tin tiền cấp quyền' : 'Thêm tiền cấp quyền';

    return (
        <DialogsControl>
            {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
                <>
                    {
                        isEdit ? (
                            <EditNote className='tableActionBtn' onClick={() => openDialogs(<Form data={data} setPostSuccess={setPostSuccess} isEdit={isEdit} closeDialogs={closeDialogs} />, formTitle)} />
                        ) : (
                            <Button
                                size="small" startIcon={<Add />}
                                onClick={() => openDialogs(
                                    <Form data={data} setPostSuccess={setPostSuccess} isEdit={isEdit} closeDialogs={closeDialogs} />, formTitle
                                )}
                            >
                                Thêm mới
                            </Button>
                        )
                    }
                </>
            )}
        </DialogsControl>
    );
};

export default FormLicenseFee;
