import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid, Box, IconButton, Tooltip, Button } from '@mui/material';

// ** Icons Imports
import { EditNote, Delete } from "@mui/icons-material";

import TableComponent from 'src/@core/components/table';
import { TextField} from 'src/@core/components/field';
import managerequestData from 'src/api/monitoringsystem/quanli';



// id of columnsTable is parameter to bind ex: get LicseFk.BasinId: id: 'License_Fk.BasinId'
const columnsTable = [
  {
    id: 'stt', label: 'STT', 
  },
  {
    id: 'UserName', label: 'Quyết định cấp quyền',
  },
  {
    id: 'FTPAddress', label: 'Ngày ký',
  }, {
    id: 'Password', label: 'Quyết định bổ sung',
  },
  {
    id: 'WorkingDirectory' ,label: 'Tổng số tiền cấp quyền(VNĐ)',
  },
  {
    id: 'CameraLink', label: 'Ghi chú',
  },
  {
    id: 'CreatedTime', label: 'Giấy phép',
  },
  {
    id: 'CreatedTime', label: 'Công trình',
  },
  { id: 'actions', label: 'Thao tác',},
];

const LicenseMinister = () => {
 
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://tnnsl.loc/api/Construction/list?BasinId=0&CommuneId=0&DistrictId=0&Keyword=&LicenseId=-1&LicensingAuthorities=-1&PageIndex=1&PageSize=0&ProvinceId=0&StartDate=-1&Status=true&TypeOfConstructionId=1'); // Thay đổi URL API tùy thuộc vào nguồn dữ liệu của bạn
  //     const jsonData = await response.json();
  //     console.log(jsonData.ListData)
  //     setData(jsonData.ListData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }; 

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
                <TextField id="outlined-basic" label="Nhập số quyết định" variant="outlined" />
            </Grid>
            <Grid>
                <Button variant="outlined">Tài khoản chưa được duyệt</Button>
            </Grid>
            <Grid>
                <Button variant="outlined">Tìm kiếm</Button>            
            </Grid>
            <Grid>
                <Button variant="outlined">Thêm mới</Button>            
            </Grid>
            </Grid>
         </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TableComponent columns={columns} data={data} 
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

export default LicenseMinister
