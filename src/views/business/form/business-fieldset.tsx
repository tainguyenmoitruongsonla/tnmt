import { Grid, TextField } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';

interface BusinessProps {
    data?: BusinessState; // Thêm prop data để truyền dữ liệu từ ngoài vào
    onChange: (data: BusinessState) => void;
}

interface BusinessState {
    id: number;
    name: string;
    address: string;
    identifierCode: string;
    phone: string;
    fax: string;
    email: string;
    director: string;
    authorityPerson: string;
    legalRepresentative: string;
}

const Business: React.FC<BusinessProps> = ({ data, onChange }) => {
    const [businessData, setBusinessData] = useState<BusinessState>({
        id: data?.id || 0,
        name: data?.name || '',
        address: data?.address || '',
        identifierCode: data?.identifierCode || '',
        phone: data?.phone || '',
        fax: data?.fax || '',
        email: data?.email || '',
        director: data?.director || '',
        authorityPerson: data?.authorityPerson || '',
        legalRepresentative: data?.legalRepresentative || '',
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
                <TextField size='small' type='text' label='Tên doanh nghiệp' fullWidth required placeholder='' defaultValue={businessData?.name} onChange={handleChange('name')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Địa chỉ' fullWidth required defaultValue={businessData?.address} onChange={handleChange('address')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Giám đốc' fullWidth placeholder='' defaultValue={businessData?.director} onChange={handleChange('director')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Đại diện pháp lý' fullWidth placeholder='' defaultValue={businessData?.legalRepresentative} onChange={handleChange('legalRepresentative')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Số điện thoại' fullWidth placeholder='' defaultValue={businessData?.phone} onChange={handleChange('phone')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Số Fax' fullWidth placeholder='' defaultValue={businessData?.fax} onChange={handleChange('fax')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Email' fullWidth placeholder='' defaultValue={businessData?.email} onChange={handleChange('email')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Mã số thuế' fullWidth placeholder='' defaultValue={businessData?.identifierCode} onChange={handleChange('identifierCode')} />
            </Grid>
        </Grid>

    );
};

export default Business;
