import { Grid, TextField } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';

interface SubBasinProps {
    data?: SubBasinState; // Thêm prop data để truyền dữ liệu từ ngoài vào
    onChange: (data: SubBasinState) => void;
}

interface SubBasinState {
    id: number;
    idLuuVuc: number;
    tieuVungQuyHoach: string;
    chuGiai: string;
}

const SubBasinFieldset: React.FC<SubBasinProps> = ({ data, onChange }) => {
    const [SubBasinData, setSubBasinData] = useState<SubBasinState>({
        id: data?.id || 0,
        idLuuVuc: data?.idLuuVuc || 0,
        tieuVungQuyHoach: data?.tieuVungQuyHoach || '',
        chuGiai: data?.chuGiai || '',
    });

    // Sử dụng useEffect để cập nhật dữ liệu khi prop data thay đổi
    useEffect(() => {
        if (data) {
            setSubBasinData(data);
        }
    }, [data]);

    const handleChange = (prop: keyof SubBasinState) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setSubBasinData({ ...SubBasinData, [prop]: value });
        onChange({ ...SubBasinData, [prop]: value });
    };

    return (
        <Grid container spacing={4} rowSpacing={1}>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Tên tiểu vùng quy hoạch' fullWidth required placeholder='' defaultValue={SubBasinData?.tieuVungQuyHoach} onChange={handleChange('tieuVungQuyHoach')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Ghi chú' fullWidth placeholder='' defaultValue={SubBasinData?.chuGiai} onChange={handleChange('chuGiai')} />
            </Grid>
        </Grid>

    );
};

export default SubBasinFieldset;
