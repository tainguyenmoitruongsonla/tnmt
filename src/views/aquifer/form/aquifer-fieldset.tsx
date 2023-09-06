import { Grid, TextField } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';

interface AquiferProps {
    data?: AquiferState; // Thêm prop data để truyền dữ liệu từ ngoài vào
    onChange: (data: AquiferState) => void;
}

interface AquiferState {
    id: number;
    name: string;
    aquiferSymbol: string;
}

const AquiferFieldset: React.FC<AquiferProps> = ({ data, onChange }) => {
    const [AquiferData, setAquiferData] = useState<AquiferState>({
        id: data?.id || 0,
        name: data?.name || '',
        aquiferSymbol: data?.aquiferSymbol || '',
    });

    // Sử dụng useEffect để cập nhật dữ liệu khi prop data thay đổi
    useEffect(() => {
        if (data) {
            setAquiferData(data);
        }
    }, [data]);

    const handleChange = (prop: keyof AquiferState) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setAquiferData({ ...AquiferData, [prop]: value });
        onChange({ ...AquiferData, [prop]: value });
    };

    return (
        <Grid container spacing={4} rowSpacing={1}>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Tên tầng chứa nước' fullWidth required placeholder='' defaultValue={AquiferData?.name} onChange={handleChange('name')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Ký hiệu' fullWidth placeholder='' defaultValue={AquiferData?.aquiferSymbol} onChange={handleChange('aquiferSymbol')} />
            </Grid>
        </Grid>

    );
};

export default AquiferFieldset;
