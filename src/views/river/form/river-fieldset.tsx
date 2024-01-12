import { Grid, TextField } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';

interface RiverProps {
    data?: RiverState; // Thêm prop data để truyền dữ liệu từ ngoài vào
    onChange: (data: RiverState) => void;
}

interface RiverState {
    id: number;
    tenSong: string;
    maSong: string;
    xDauSong: number | undefined;
    yDauSong: number | undefined;
    xCuoiSong: number | undefined;
    yCuoiSong: number | undefined;
    chuGiai: string;
}

const RiverFieldset: React.FC<RiverProps> = ({ data, onChange }) => {
    const [riverData, setRiverData] = useState<RiverState>({
        id: data?.id || 0,
        tenSong: data?.tenSong || '',
        maSong: data?.maSong || '',
        xDauSong: data?.xDauSong || undefined,
        yDauSong: data?.yDauSong || undefined,
        xCuoiSong: data?.xCuoiSong || undefined,
        yCuoiSong: data?.yCuoiSong || undefined,
        chuGiai: data?.chuGiai || '',
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
                <TextField size='small' type='text' label='Tên sông' fullWidth required placeholder='' defaultValue={riverData?.tenSong} onChange={handleChange('tenSong')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Mã sông' fullWidth placeholder='' defaultValue={riverData?.maSong} onChange={handleChange('maSong')} />
            </Grid>
            <Grid item xs={6} md={6} sm={6} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='X đầu sông(VN2000)' fullWidth defaultValue={riverData?.xDauSong} onChange={handleChange('xDauSong')} />
            </Grid>
            <Grid item xs={6} md={6} sm={6} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Y đầu sông(VN2000)' fullWidth defaultValue={riverData?.yDauSong} onChange={handleChange('yDauSong')} />
            </Grid>
            <Grid item xs={6} md={6} sm={6} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='X cuối sông(VN2000)' fullWidth defaultValue={riverData?.xCuoiSong} onChange={handleChange('xCuoiSong')} />
            </Grid>
            <Grid item xs={6} md={6} sm={6} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Y cuối sông(VN2000)' fullWidth defaultValue={riverData?.yCuoiSong} onChange={handleChange('yCuoiSong')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Ghi chú' fullWidth placeholder='' defaultValue={riverData?.chuGiai} onChange={handleChange('chuGiai')} />
            </Grid>
        </Grid>

    );
};

export default RiverFieldset;
