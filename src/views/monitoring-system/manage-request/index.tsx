import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid, Box, IconButton, Tooltip, Button, TextField } from '@mui/material';

// ** Icons Imports
import { EditNote, Delete } from "@mui/icons-material";

import TableComponent from 'src/@core/components/table';
import managerequestData from 'src/api/monitoringsystem/quanli';



// id of columnsTable is parameter to bind ex: get LicseFk.BasinId: id: 'License_Fk.BasinId'
const columnsTable = [
  {
    id: 'stt', label: 'STT', 
  },
  {
    id: 'UserName', label: 'Tài khoản đăng ký giám sát',
  },
  {
    id: 'FTPAddress', label: 'Địa chỉ FTP',
  }, {
    id: 'Password', label: 'Mật khẩu',
  },
  {
    id: 'WorkingDirectory' ,label: 'Thư mục lưu trữ',
  },
  {
    id: 'CameraLink', label: 'Camera',
  },
  {
    id: 'CreatedTime', label: 'Thời gian tạo',
  },
  { id: 'actions', label: 'Thao tác',},
];

const ManageRequestDetails = () => {
 
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    setData(managerequestData);
    setColumns(columnsTable);

    // fetchData();
  }, []);

  const EditLicense = (row: any) => {
    console.log('Edit: ' + row.LicenseNumber)
  }

  const DeleteLicense = (row: any) => {
    console.log('Delete: ' + row.LicenseNumber)
  }

  return (
    <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} sx={{ mt: 5 }} >
            <Grid className='_search _row _flexEnd'>
            <Grid>
                <TextField id="outlined-basic" label="Tìm kiếm" variant="outlined" />
            </Grid>
            <Grid>
                <Button variant="outlined">Tài khoản chưa được duyệt</Button>
            </Grid>
            <Grid>
                <Button variant="outlined">Thêm mới</Button>            
            </Grid>
            </Grid>
         </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TableComponent columns={columns} rows={data} 
          actions={(row: any) => (
            <Box>
              <Tooltip title="Chỉnh sửa giấy phép">
                <IconButton onClick={() => EditLicense(row)}>
                  <EditNote className='tableActionBtn' />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xóa giấy phép">
                <IconButton onClick={() => DeleteLicense(row)}>
                  <Delete className='tableActionBtn deleteBtn' />
                </IconButton>
              </Tooltip>
            </Box>
          )

          } />
      </Grid>
     </Grid> 
  )
}

export default ManageRequestDetails
