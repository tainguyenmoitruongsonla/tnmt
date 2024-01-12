import React, { useState, useEffect } from 'react';
import { Box, Paper, Toolbar, Grid } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DataGridComponent from 'src/@core/components/data-grid';
import FormLicenseTypes from './form';
import { getData } from 'src/api/axios';
import DeleteData from 'src/@core/components/delete-data';

const LicenseTypes = () => {
    const [resData, setResData] = useState([]);
    const [postSuccess, setPostSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState);
    };

    //Init columnTable
    const columnsTable: GridColDef[] = [
        { field: 'id', flex: 1, headerAlign: 'center', headerName: 'ID', minWidth: 90 },
        { field: 'tenLoaiGP', flex: 1, headerAlign: 'center', headerName: 'Tên loại giấy phép', minWidth: 150 },
        { field: 'ghiChu', flex: 1, headerAlign: 'center', headerName: 'Ghi chú', minWidth: 150 },

        //Action
        {
            field: 'actions', headerAlign: 'center', headerName: '#', minWidth: 120, sortable: false,
            renderCell: (data) => (
                <Box>
                    <FormLicenseTypes isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
                    <DeleteData url={'loai-gp'} data={data} setPostSuccess={handlePostSuccess} />
                </Box>
            )
        },
    ];

    useEffect(() => {
        const getDataLicenseTypes = async () => {
            try {
                setLoading(true);
                const data = await getData('loai-gp/danh-sach');
                setResData(data);
            } catch (error) {
                setResData([]);
            } finally {
                setLoading(false);
            }
        };
        getDataLicenseTypes();
    }, [postSuccess]);

    return (
        <Paper elevation={3} sx={{ p: 0 }}>
            <Toolbar variant="dense">
                <Grid container justifyContent={'end'} >
                    <Grid item>
                        <FormLicenseTypes setPostSuccess={handlePostSuccess} isEdit={false} />
                    </Grid>
                </Grid>
            </Toolbar>
            <DataGridComponent
                rows={resData}
                columns={columnsTable}
                loading={loading}
            />
        </Paper>
    );
};

export default LicenseTypes;
