import { Grid, Typography } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { TextField } from 'src/@core/components/field';

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
        id: 0,
        name: '',
        address: '',
        identifierCode: '',
        phone: '',
        fax: '',
        email: '',
        director: '',
        authorityPerson: '',
        legalRepresentative: '',
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
        <fieldset>
            <legend>
                <Typography variant={'subtitle1'} className="legend__title">THÔNG TIN TỔ CHỨC/CÁ NHÂN</Typography>
            </legend>
            <Grid container spacing={4} rowSpacing={1}>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Tên tổ chức/cá nhân được CP' fullWidth required placeholder='' value={businessData?.name} onChange={handleChange('name')} />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Địa chỉ' fullWidth required value={businessData?.address} onChange={handleChange('address')} />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Số điện thoại' fullWidth placeholder='' value={businessData?.phone} onChange={handleChange('phone')} />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                    <TextField size='small' type='text' label='Email' fullWidth placeholder='' value={businessData?.email} onChange={handleChange('email')} />
                </Grid>
            </Grid>
        </fieldset>
    );
};

export default Business;
