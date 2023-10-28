import { Grid, TextField } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';

interface BusinessProps {
    data?: BusinessState; // Thêm prop data để truyền dữ liệu từ ngoài vào
    onChange: (data: BusinessState) => void;
}

interface BusinessState {
    id: number | null
    tenTCCN: string | null
    diaChi: string | null
    maSoThue: string | null
    sdt: string | null
    fax: string | null
    email: string | null
    giamDoc: string | null
    nguoiDuocUyQuyen: string | null
    nguoiDaiDienPhapLuat: string | null
}

const Business: React.FC<BusinessProps> = ({ data, onChange }) => {
    const [businessData, setBusinessData] = useState<BusinessState>({
        id: null,
        tenTCCN: null,
        diaChi: null,
        maSoThue: null,
        sdt: null,
        fax: null,
        email: null,
        giamDoc: null,
        nguoiDuocUyQuyen: null,
        nguoiDaiDienPhapLuat: null,
    });

    // Sử dụng useEffect để cập nhật dữ liệu khi prop data thay đổi
    useEffect(() => {
        if (data) {
            setBusinessData(data);
        }
    }, [data]);

    const handleChange = (prop: keyof BusinessState) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setBusinessData({ ...businessData, [prop]: value });
        onChange({ ...businessData, [prop]: value });
    };

    return (
        <Grid container spacing={4} rowSpacing={1}>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Tên doanh nghiệp' fullWidth required placeholder='' defaultValue={businessData?.tenTCCN} onChange={handleChange('tenTCCN')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Địa chỉ' fullWidth required defaultValue={businessData?.diaChi} onChange={handleChange('diaChi')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Giám đốc' fullWidth placeholder='' defaultValue={businessData?.giamDoc} onChange={handleChange('giamDoc')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Đại diện pháp lý' fullWidth placeholder='' defaultValue={businessData?.nguoiDaiDienPhapLuat} onChange={handleChange('nguoiDaiDienPhapLuat')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Số điện thoại' fullWidth placeholder='' defaultValue={businessData?.sdt} onChange={handleChange('sdt')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Số Fax' fullWidth placeholder='' defaultValue={businessData?.fax} onChange={handleChange('fax')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Email' fullWidth placeholder='' defaultValue={businessData?.email} onChange={handleChange('email')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Mã số thuế' fullWidth placeholder='' defaultValue={businessData?.maSoThue} onChange={handleChange('maSoThue')} />
            </Grid>
        </Grid>

    );
};

export default Business;
