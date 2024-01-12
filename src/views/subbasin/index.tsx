import React, { useState, useEffect } from 'react';
import { Box, Paper, Toolbar, Grid } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DataGridComponent from 'src/@core/components/data-grid';
import FormSubBasins from './form';
import { getData } from 'src/api/axios'
import DeleteData from 'src/@core/components/delete-data';

const SubBasin = () => {
    const [resData, setResData] = useState([]);
    const [postSuccess, setPostSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState);
    };

    //Init columnTable
    const columnsTable: GridColDef[] = [
        { field: 'id', flex: 1, headerAlign: 'center', headerName: 'ID', minWidth: 90 },
        { field: 'tieuVungQuyHoach', flex: 1, headerAlign: 'center', headerName: 'Tên tiểu vùng quy hoạch', minWidth: 150 },
        { field: 'chuGiai', flex: 1, headerAlign: 'center', headerName: 'Ghi chú', minWidth: 150 },

        //Action
        {
            field: 'actions', headerAlign: 'center', headerName: 'Thao tác', minWidth: 120, sortable: false,
            renderCell: (data) => (
                <Box>
                    <FormSubBasins isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
                    <DeleteData url={'TieuVungLuuVuc'} data={data} setPostSuccess={handlePostSuccess} />
                </Box>
            )
        },
    ];

    useEffect(() => {
        const getDataSubBasin = async () => {
            try {
                setLoading(true);
                const data = await getData('TieuVungLuuVuc/danh-sach');
                setResData(data);
            } catch (error) {
                setResData([]);
            } finally {
                setLoading(false);
            }
        };
        getDataSubBasin();
    }, [postSuccess]);

    return (
        <Paper elevation={3} sx={{ p: 0 }}>
            <Toolbar variant="dense">
                <Grid container justifyContent={'end'} >
                    <Grid item>
                        <FormSubBasins setPostSuccess={handlePostSuccess} isEdit={false} />
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

export default SubBasin;
