import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid, Box, IconButton, Tooltip, Button, Typography } from '@mui/material'

// ** Icons Imports
import { EditNote, Delete } from '@mui/icons-material'

import TableComponent from 'src/@core/components/table'
import { TextField } from 'src/@core/components/field'
import licenseFeeMinister from 'src/api/licensefee/bocapquyen'
import FormatDate from 'src/@core/components/format-date';
import AutoComplete from 'src/@core/components/field/auto-complete'


// id of columnsTable is parameter to bind ex: get LicseFk.BasinId: id: 'License_Fk.BasinId'
const complete2 = [{ title: 'Đợt 1' }, { title: 'Đợt 2' }, { title: 'Đợt 3' }]
const columnsTable = [
  {
    id: 'stt',
    label: 'STT'
  },
  {
    id: 'LicenseFeeNumber',
    label: 'Quyết định cấp quyền'
  },
  {
    id: 'SignDate',
    label: 'Ngày ký', format: (value: any) => FormatDate(value)
  },
  {
    id: '#',
    label: 'Quyết định bổ sung'
  },
  {
    id: 'TotalMoney',
    label: 'Tổng số tiền cấp quyền(VNĐ)'
  },
  {
    id: '#',
    label: 'Ghi chú'
  },
  {
    id: 'LicenseNumber',
    label: 'Giấy phép'
  },
  {
    id: 'ConstructionName',
    label: 'Công trình'
  },
  { id: 'actions', label: 'Thao tác' }
]

const LicenseProvince = () => {
  const [data, setData] = useState<any[]>([])
  const [columns, setColumns] = useState<any[]>([])
  const [TypeOfConsId, setTypeOfConsId] = useState([1])
  const handleChange = (e: any) => {
    const val = e == undefined || e == null ? 1 : e.value
    setTypeOfConsId(val)
  }
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
    setData(licenseFeeMinister)
    setColumns(columnsTable)

    // fetchData();
  }, [])

  const EditLicense = (row: any) => {
    console.log('Edit: ' + row.LicenseNumber)
  }

  const DeleteLicense = (row: any) => {
    console.log('Delete: ' + row.LicenseNumber)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} className='text-center'>
        <Typography className='font-weight-bold ' variant='h4'>
          Thống kê
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          KẾT QUẢ THU TIỀN CẤP QUYỀN KHAI THÁC SỬ DỤNG CỦA TỈNH
        </Typography>
      </Grid>
      <Grid item xs={12} sm={5} md={5}>
        <Typography >Tổng số công trình KTSDN mặt: 426.293.061.000₫</Typography>
      </Grid>
      <Grid item xs={12} sm={7} md={7}>
        <Grid container direction='row' justifyContent='flex-end' alignItems='center' spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <TextField label='Nhập số quyết định' size='small' fullWidth></TextField>
          </Grid>
         
          <Grid item xs={12} sm={2} md={2}>
          <AutoComplete
              fullWidth
              onChange={(e: any, v: any) => handleChange(v)}
              size='small'
              options={complete2}
              getOptionLabel={(option: any) => option.title}
              label='Từ:1998'
            />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
          <AutoComplete
              fullWidth
              onChange={(e: any, v: any) => handleChange(v)}
              size='small'
              options={complete2}
              getOptionLabel={(option: any) => option.title}
              label='Đến:2023'
            />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <Button size='small' fullWidth  variant='outlined'>
                Tìm kiếm
              </Button>
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
          <Button size='small' fullWidth  variant='outlined'>
              Thêm mới
            </Button>
          </Grid>
        </Grid>       
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
          <TableComponent
            columns={columns}
            data={data}
            show={TypeOfConsId}
            actions={(row: any) => (
              <Box>
                <Tooltip title='Chỉnh sửa giấy phép'>
                  <IconButton onClick={() => EditLicense(row)}>
                    <EditNote className='tableActionBtn' />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Xóa giấy phép'>
                  <IconButton onClick={() => DeleteLicense(row)}>
                    <Delete className='tableActionBtn deleteBtn' />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />
        </Grid>
    </Grid>
  )
}

export default LicenseProvince
