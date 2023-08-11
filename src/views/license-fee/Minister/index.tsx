import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid, Box, IconButton, Tooltip, Button, Typography } from '@mui/material'

// ** Icons Imports
import { EditNote, Delete } from '@mui/icons-material'

import TableComponent from 'src/@core/components/table'
import { TextField } from 'src/@core/components/field'
import fetchData from 'src/api/fetch';
import { useLoadingContext } from 'src/@core/theme/loading-provider';
import FormatDate from 'src/@core/components/format-date';
import AutoComplete from 'src/@core/components/field/auto-complete'
import FormLincenseFee from './form'
import postData from 'src/api/post'


// id of columnsTable is parameter to bind ex: get LicseFk.BasinId: id: 'License_Fk.BasinId'
const complete2 = [{ title: 'Đợt 1' }, { title: 'Đợt 2' }, { title: 'Đợt 3' }]

const LicenseMinister = () => {

  const [TypeOfConsId, setTypeOfConsId] = useState([1])
  const handleChange = (e: any) => {
    const val = e == undefined || e == null ? 1 : e.value
    setTypeOfConsId(val)
  }
  const [columns, setColumns] = useState<any[]>([])
  const [postSuccess, setPostSuccess] = useState(false);
  const { showLoading, hideLoading } = useLoadingContext();
  const [loading, setLoading] = useState(false)
  if (loading == true) {
    showLoading();
  } else {
    hideLoading();
  }
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  
  const [resData, setResData] = useState([]);

  const columnsTable = [
    {
      id: 'stt',
      label: 'STT'
    },
    {
      id: 'licenseFeeNumber',
      label: 'Quyết định cấp quyền'
    },
    {
      id: 'signDate',
      label: 'Ngày ký', format: (value: any) => FormatDate(value)
    },
    {
      id: '#',
      label: 'Quyết định bổ sung'
    },
    {
      id: 'totalMoney',
      label: 'Tổng số tiền cấp quyền(VNĐ)'
    },
    {
      id: 'description',
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
    { id: 'actions', label: 'Thao tác', }
  ]

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const data = await fetchData('LicenseFee/list');
        setResData(data);
      } catch (error) {
        setResData([]);
      }
      setLoading(false)
    };

    getData();
    setColumns(columnsTable)
  }, [postSuccess]);


  const DeleteLicense = async (row: any) => {
    console.log(row)
    try {
      await postData('LicenseFee/delete', row)
    } catch (error) {
      console.error(error)
    }
    setPostSuccess(true);
    handlePostSuccess();
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} className='text-center'>
        <Typography className='font-weight-bold ' variant='h4'>
          Thống kê
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          KẾT QUẢ THU TIỀN CẤP QUYỀN KHAI THÁC SỬ DỤNG CỦA BỘ
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
            <FormLincenseFee setPostSuccess={handlePostSuccess} isEdit={false} />
          </Grid>
        </Grid>       
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
          <TableComponent
            columns={columns}
            data={resData}
            show={TypeOfConsId}
            actions={(row: any) => (
              <Box>
                <FormLincenseFee data={row} isEdit={true} setPostSuccess={handlePostSuccess}/>
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

export default LicenseMinister
