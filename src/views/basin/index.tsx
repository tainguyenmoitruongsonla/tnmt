import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Toolbar } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DataGridComponent from 'src/@core/components/data-grid';
import FormBasins from './form';
import DeleteData from 'src/@core/components/delete-data';
import { getData } from 'src/api/axios';

const Basin = () => {
    const [resData, setResData] = useState([]);
    const [postSuccess, setPostSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState);
    };

    //Init columnTable
    const columnsTable: GridColDef[] = [
        { field: 'id', flex: 1, headerAlign: 'center', headerName: 'ID', minWidth: 90 },
        { field: 'tenLVS', flex: 1, headerAlign: 'center', headerName: 'Tên lưu vực', minWidth: 150 },
        { field: 'chuGiai', flex: 1, headerAlign: 'center', headerName: 'Ghi chú', minWidth: 150 },

        //Action
        {
            field: 'actions', headerAlign: 'center', headerName: 'Thao tác', minWidth: 120, sortable: false,
            renderCell: (data) => (
                <Box>
                    <FormBasins isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
                    <DeleteData url={'LuuVucSong'} data={data} setPostSuccess={handlePostSuccess} />
                </Box>
            )
        },
    ];

    useEffect(() => {
        const getDataBasin = async () => {
            try {
                setLoading(true);
                const data = await getData('LuuVucSong/danh-sach');
                setResData(data);
            } catch (error) {
                setResData([]);
            } finally {
                setLoading(false);
            }
        };
        getDataBasin();
    }, [postSuccess]);

    return (
        <Paper elevation={3} sx={{ p: 0 }}>
            <Toolbar variant="dense">
                <Grid container justifyContent={'end'} >
                    <Grid item>
                        <FormBasins setPostSuccess={handlePostSuccess} isEdit={false} />
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

export default Basin;
