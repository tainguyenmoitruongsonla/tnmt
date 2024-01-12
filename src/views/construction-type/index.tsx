import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Toolbar } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DataGridComponent from 'src/@core/components/data-grid';
import FormConstructionTypes from './form';
import DeleteData from 'src/@core/components/delete-data';
import { getData } from 'src/api/axios';

const ConstructionTypes = () => {
    const [resData, setResData] = useState([]);
    const [postSuccess, setPostSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState);
    };

    //Init columnTable
    const columnsTable: GridColDef[] = [
        { field: 'id', flex: 1, headerAlign: 'center', headerName: 'ID', minWidth: 90 },
        { field: 'tenLoaiCT', flex: 1, headerAlign: 'center', headerName: 'Tên loại công trình', minWidth: 150 },
        { field: 'maLoaiCT', flex: 1, headerAlign: 'center', headerName: 'Mã loại công trình', minWidth: 150 },
        { field: 'chuThich', flex: 1, headerAlign: 'center', headerName: 'Ghi chú', minWidth: 150 },

        //Action
        {
            field: 'actions', headerAlign: 'center', headerName: '#', minWidth: 120, sortable: false,
            renderCell: (data) => (
                <Box>
                    <FormConstructionTypes isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
                    <DeleteData url={'loai-ct'} data={data} setPostSuccess={handlePostSuccess} />
                </Box>
            )
        },
    ];

    useEffect(() => {
        const getDataConstructionTypes = async () => {
            try {
                setLoading(true);
                const data = await getData('loai-ct/danh-sach');
                setResData(data);
            } catch (error) {
                setResData([]);
            } finally {
                setLoading(false);
            }
        };
        getDataConstructionTypes();
    }, [postSuccess]);

    return (
        <Paper elevation={3} sx={{ p: 0 }}>
            <Toolbar variant="dense">
                <Grid container justifyContent={'end'} >
                    <Grid item>
                        <FormConstructionTypes isEdit={false} setPostSuccess={handlePostSuccess} />
                    </Grid>
                </Grid>
            </Toolbar>
            <DataGridComponent
                rows={resData}
                columns={columnsTable}
                loading={loading}
                actions={
                    <FormConstructionTypes isEdit={false} setPostSuccess={handlePostSuccess} />
                }
            />
        </Paper>
    );
};

export default ConstructionTypes;
