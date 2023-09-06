import { Grid, TextField } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';

interface RiverProps {
    data?: RiverState; // Thêm prop data để truyền dữ liệu từ ngoài vào
    onChange: (data: RiverState) => void;
}

interface RiverState {
    id: number;
    name: string;
    x: number
    y: number
    description: string;
}

const RiverFieldset: React.FC<RiverProps> = ({ data, onChange }) => {
    const [riverData, setRiverData] = useState<RiverState>({
        id: data?.id || 0,
        name: data?.name || '',
        x: data?.x || 0,
        y: data?.x || 0,
        description: data?.description || '',
    });

    // Sử dụng useEffect để cập nhật dữ liệu khi prop data thay đổi
    useEffect(() => {
        if (data) {
            setRiverData(data);
        }
    }, [data]);

    const handleChange = (prop: keyof RiverState) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setRiverData({ ...riverData, [prop]: value });
        onChange({ ...riverData, [prop]: value });
    };

    return (
        <Grid container spacing={4} rowSpacing={1}>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Tên lưu vực' fullWidth required placeholder='' defaultValue={riverData?.name} onChange={handleChange('name')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Ghi chú' fullWidth placeholder='' defaultValue={riverData?.description} onChange={handleChange('description')} />
            </Grid>
        </Grid>

    );
};

export default RiverFieldset;
