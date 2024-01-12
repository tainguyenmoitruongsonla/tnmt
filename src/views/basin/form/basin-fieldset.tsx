import { Grid, TextField } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';

interface BasinProps {
    data?: BasinState; // Thêm prop data để truyền dữ liệu từ ngoài vào
    onChange: (data: BasinState) => void;
}

interface BasinState {
    id: number;
    tenLVS: string;
    chuGiai: string;
}

const BasinFieldset: React.FC<BasinProps> = ({ data, onChange }) => {
    const [BasinData, setBasinData] = useState<BasinState>({
        id: data?.id || 0,
        tenLVS: data?.tenLVS || '',
        chuGiai: data?.chuGiai || '',
    });

    // Sử dụng useEffect để cập nhật dữ liệu khi prop data thay đổi
    useEffect(() => {
        if (data) {
            setBasinData(data);
        }
    }, [data]);

    const handleChange = (prop: keyof BasinState) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setBasinData({ ...BasinData, [prop]: value });
        onChange({ ...BasinData, [prop]: value });
    };

    return (
        <Grid container spacing={4} rowSpacing={1}>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Tên lưu vực' fullWidth required placeholder='' defaultValue={BasinData?.tenLVS} onChange={handleChange('tenLVS')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Ghi chú' fullWidth placeholder='' defaultValue={BasinData?.chuGiai} onChange={handleChange('chuGiai')} />
            </Grid>
        </Grid>

    );
};

export default BasinFieldset;
