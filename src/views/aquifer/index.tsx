import React, { useState, useEffect } from 'react';
import { Box, Paper, Toolbar, Grid } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DataGridComponent from 'src/@core/components/data-grid';
import FormAquifers from './form';
import { getData } from 'src/api/axios';
import DeleteData from 'src/@core/components/delete-data';

const Aquifer = () => {
    const [resData, setResData] = useState([]);
    const [postSuccess, setPostSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState);
    };

    //Init columnTable
    const columnsTable: GridColDef[] = [
        { field: 'id', flex: 1, headerAlign: 'center', headerName: 'ID', minWidth: 90 },
        { field: 'tenTCN', flex: 1, headerAlign: 'center', headerName: 'Tên tầng chứa nước', minWidth: 150 },
        { field: 'kyHieuTCN', flex: 1, headerAlign: 'center', headerName: 'Ký hiệu', minWidth: 150 },

        //Action
        {
            field: 'actions', headerAlign: 'center', headerName: 'Thao tác', minWidth: 120, sortable: false,
            renderCell: (data) => (
                <Box>
                    <FormAquifers isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
                    <DeleteData url={'Aquifer'} data={data} setPostSuccess={handlePostSuccess} />
                </Box>
            )
        },
    ];

    useEffect(() => {
        const getDataAquifer = async () => {
            try {
                setLoading(true);
                const data = await getData('TangChuaNuoc/danh-sach');
                setResData(data);
            } catch (error) {
                setResData([]);
            } finally {
                setLoading(false);
            }
        };
        getDataAquifer();
    }, [postSuccess]);

    return (
        <Paper elevation={3} sx={{ p: 0 }}>
            <Toolbar variant="dense">
                <Grid container justifyContent={'end'} >
                    <Grid item>
                        <FormAquifers setPostSuccess={handlePostSuccess} isEdit={false} />
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

export default Aquifer;
