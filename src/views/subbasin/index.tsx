//React Imports
import React, { useState, useEffect } from 'react';

//MUI Imports
import { Box, Tooltip, IconButton, Paper } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

//Other Imports

// import MapComponent from 'src/@core/components/map';
import DataGridComponent from 'src/@core/components/data-grid';
import { Delete } from '@mui/icons-material';
import fetchData from 'src/api/fetch';
import FormSubBasins from './form';
import post from 'src/api/post';

const SubBasin = () => {
    const [resData, setResData] = useState([]);
    const [postSuccess, setPostSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState);
    };

    //Init columnTable
    const columnsTable: GridColDef[] = [
        { field: 'id', flex: 1,  headerAlign: 'center', headerName: 'ID', minWidth: 90 },
        { field: 'name', flex: 1,  headerAlign: 'center', headerName: 'Tên tiểu vùng quy hoạch', minWidth: 150 },
        { field: 'description', flex: 1,  headerAlign: 'center', headerName: 'Ghi chú', minWidth: 150 },

        //Action
        {
            field: 'actions',  headerAlign: 'center', headerName: 'Thao tác', minWidth: 120, sortable: false,
            renderCell: (data) => (
                <Box>
                    <Tooltip title="Chỉnh sửa tiểu vùng quy hoạch">
                        <IconButton>
                            <FormSubBasins isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa tiểu vùng quy hoạch">
                        <IconButton onClick={() => DeleteRowData(data)}>
                            <Delete className='tableActionBtn deleteBtn' />
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        },
    ];

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const data = await fetchData('SubBasin/list');
                setResData(data);
            } catch (error) {
                setResData([]);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [postSuccess]);

    const DeleteRowData = async (data: any) => {
        const confirmed = window.confirm(`Bạn muốn xóa:  ${data.row?.name} chứ?`);
        if (!confirmed) {
            return;
        }

        try {
            setLoading(true);
            const res = await post('SubBasin/delete', data.row);
            if (res) {
                setResData(prevData => prevData.filter((item: any) => item.id !== data.row.id));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 0 }}>
            <DataGridComponent
                rows={resData}
                columns={columnsTable}
                loading={loading}
                actions={
                    <FormSubBasins isEdit={false} setPostSuccess={handlePostSuccess} />
                }
            />
        </Paper>
    );
};

export default SubBasin;
