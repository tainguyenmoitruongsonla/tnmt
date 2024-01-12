import React, { useState, useEffect } from 'react';
import { Box, Paper, Toolbar, Grid } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DataGridComponent from 'src/@core/components/data-grid';
import FormRivers from './form';
import { getData } from 'src/api/axios';
import DeleteData from 'src/@core/components/delete-data';

const Rivers = () => {
    const [resData, setResData] = useState([]);
    const [postSuccess, setPostSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState);
    };

    //Init columnTable
    const columnsTable: GridColDef[] = [
        { field: 'id', flex: 1, headerAlign: 'center', headerName: 'ID', minWidth: 90 },
        { field: 'tenSong', flex: 1, headerAlign: 'center', headerName: 'Tên sông', minWidth: 150 },
        { field: 'xDauSong', flex: 1, headerAlign: 'center', headerName: 'X đầu sông(VN2000)', minWidth: 150 },
        { field: 'yDauSong', flex: 1, headerAlign: 'center', headerName: 'Y đầu sông(VN2000)', minWidth: 150 },
        { field: 'xCuoiSong', flex: 1, headerAlign: 'center', headerName: 'X cuối sông(VN2000)', minWidth: 150 },
        { field: 'yCuoiSong', flex: 1, headerAlign: 'center', headerName: 'Y cuối sông(VN2000)', minWidth: 150 },
        { field: 'chuGiai', flex: 1, headerAlign: 'center', headerName: 'Ghi chú', minWidth: 150 },

        //Action
        {
            field: 'actions', headerAlign: 'center', headerName: '#', minWidth: 120, sortable: false,
            renderCell: (data) => (
                <Box>
                    <FormRivers isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
                    <DeleteData url={'Song'} data={data} setPostSuccess={handlePostSuccess} />
                </Box>
            )
        },
    ];

    useEffect(() => {
        const getDataRiver = async () => {
            try {
                setLoading(true);
                const data = await getData('Song/danh-sach');
                setResData(data);
            } catch (error) {
                setResData([]);
            } finally {
                setLoading(false);
            }
        };
        getDataRiver();
    }, [postSuccess]);

    return (
        <Paper elevation={3} sx={{ p: 0 }}>
            <Toolbar variant="dense">
                <Grid container justifyContent={'end'} >
                    <Grid item>
                        <FormRivers setPostSuccess={handlePostSuccess} isEdit={false} />
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

export default Rivers;
