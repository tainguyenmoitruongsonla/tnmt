import React, { useState } from 'react';
import { Add, EditNote, Save } from '@mui/icons-material';
import { Button, CircularProgress, DialogActions, Grid, IconButton } from '@mui/material';

import DialogsControl from 'src/@core/components/dialog-control';
import BusinessFieldset from 'src/views/business/form/business-fieldset';
import { saveData } from 'src/api/axios';

interface FormProps {
    data: any;
    closeDialogs: () => void;
    setPostSuccess?: (value: boolean) => void;
}

const Form: React.FC<FormProps> = ({ data, closeDialogs, setPostSuccess }) => {

    //Business
    const [businessData, setBusinessData] = useState<any>(data);
    const [saving, setSaving] = useState(false);

    const handleBusinessChange = (data: any) => {
        setBusinessData(data);
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const handleApiCall = async () => {
            try {
                setSaving(true)
                const res = await saveData('to-chuc-ca-nhan/luu', businessData);
                if (res) {
                    // Reset form fields
                    setBusinessData({});
                    typeof (setPostSuccess) === 'function' ? setPostSuccess(true) : '';
                }
            } catch (error) {
            } finally {
                setSaving(false)
                closeDialogs();
            }
        };

        // Call the function
        handleApiCall();
    };

    const handleClose = () => {
        closeDialogs();
    };

    return (
        <form>
            <Grid container gap={3}>
                <Grid item xs={12}>
                    <BusinessFieldset data={data} onChange={handleBusinessChange} />
                </Grid>
            </Grid>

            <DialogActions sx={{ p: 0, mt: 5 }}>
                <Button size='small' onClick={handleClose} className='btn cancleBtn'> Hủy </Button>
                <Button onClick={handleSubmit} disabled={saving} className='btn saveBtn'> {saving ? <CircularProgress color='inherit' size={20} /> : <Save />} &nbsp; Lưu </Button>
            </DialogActions>
        </form>
    );
};

interface FormBusinessProps {
    isEdit: boolean;
    data?: any;
    setPostSuccess?: (value: boolean) => void;
}

const FormBusiness: React.FC<FormBusinessProps> = ({ isEdit, data, setPostSuccess }) => {
    const formTitle = isEdit ? 'Sửa thông tin doanh nghiệp' : 'Thêm mới thông tin doanh nghiệp';

    return (
        <DialogsControl>
            {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
                <>
                    {isEdit ? (
                        <IconButton onClick={() =>
                            openDialogs(<Form data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
                        }>
                            <EditNote
                                className='tableActionBtn'

                            />
                        </IconButton>
                    ) : (
                        <Button
                            size="small"
                            variant='outlined'
                            sx={{ borderRadius: 0 }}
                            startIcon={<Add />}
                            onClick={() =>
                                openDialogs(<Form data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
                            }
                        >
                            Thêm mới
                        </Button>
                    )}
                </>
            )}
        </DialogsControl>
    );
};

export default FormBusiness;
