import { Grid, TextField } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';

interface ConstructionTypeProps {
    data?: ConstructionTypeState; // Thêm prop data để truyền dữ liệu từ ngoài vào
    onChange: (data: ConstructionTypeState) => void;
}

interface ConstructionTypeState {
    id: number;
    typeName: string;
    typeSlug: string;
    description: string;
}

const ConstructionTypeFieldset: React.FC<ConstructionTypeProps> = ({ data, onChange }) => {
    const [constructionTypeData, setConstructionTypeData] = useState<ConstructionTypeState>({
        id: data?.id || 0,
        typeName: data?.typeName || '',
        typeSlug: data?.typeSlug || '',
        description: data?.description || '',
    });

    // Sử dụng useEffect để cập nhật dữ liệu khi prop data thay đổi
    useEffect(() => {
        if (data) {
            setConstructionTypeData(data);
        }
    }, [data]);

    const handleChange = (prop: keyof ConstructionTypeState) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setConstructionTypeData({ ...constructionTypeData, [prop]: value });
        onChange({ ...constructionTypeData, [prop]: value });
    };

    return (
        <Grid container spacing={4} rowSpacing={1}>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Tên loại công trình' fullWidth required placeholder='' defaultValue={constructionTypeData?.typeName} onChange={handleChange('typeName')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Mã loại công trình' fullWidth required defaultValue={constructionTypeData?.typeSlug} onChange={handleChange('typeSlug')} />
            </Grid>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Ghi chú' fullWidth placeholder='' defaultValue={constructionTypeData?.description} onChange={handleChange('description')} />
            </Grid>
        </Grid>

    );
};

export default ConstructionTypeFieldset;
