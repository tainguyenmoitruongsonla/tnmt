import React, { useState, useEffect } from 'react';
import { Box, Paper, Toolbar, Grid } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DataGridComponent from 'src/@core/components/data-grid';
import FormBusiness from './form';
import { getData } from 'src/api/axios';
import DeleteData from 'src/@core/components/delete-data';

const Business = () => {
    const [resData, setResData] = useState([]);
    const [postSuccess, setPostSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState);
    };

    //Init columnTable
    const columnsTable: GridColDef[] = [
        { field: 'id', flex: 1, headerAlign: 'center', headerName: 'ID', minWidth: 90 },
        { field: 'tenTCCN', flex: 1, headerAlign: 'center', headerName: 'Tên doanh nghiệp', minWidth: 150 },
        { field: 'diaChi', flex: 1, headerAlign: 'center', headerName: 'Địa chỉ', minWidth: 150 },
        { field: 'sdt', flex: 1, headerAlign: 'center', headerName: 'Số điện thoại', minWidth: 150 },
        { field: 'fax', flex: 1, headerAlign: 'center', headerName: 'Số Fax', minWidth: 150 },
        { field: 'email', flex: 1, headerAlign: 'center', headerName: 'Địa chỉ Email', minWidth: 150 },

        //Action
        {
            field: 'actions', headerAlign: 'center', headerName: '#', minWidth: 120, sortable: false,
            renderCell: (data) => (
                <Box>
                    <FormBusiness isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
                    <DeleteData url={'Business'} data={data} setPostSuccess={handlePostSuccess} />
                </Box>
            )
        },
    ];

    useEffect(() => {
        const getDataBusiness = async () => {
            try {
                setLoading(true);
                const data = await getData('to-chuc-ca-nhan/danh-sach');
                setResData(data);
            } catch (error) {
                setResData([]);
            } finally {
                setLoading(false);
            }
        };
        getDataBusiness();
    }, [postSuccess]);

    return (
        <Paper elevation={3} sx={{ p: 0 }}>
            <Toolbar variant="dense">
                <Grid container justifyContent={'end'} >
                    <Grid item>
                        <FormBusiness isEdit={false} setPostSuccess={handlePostSuccess} />
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

export default Business;
