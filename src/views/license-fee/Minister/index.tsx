import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid, Typography, Paper, Box, Tooltip, IconButton } from '@mui/material'

// ** Icons Imports
import fetchData from 'src/api/fetch';
import { useLoadingContext } from 'src/@core/theme/loading-provider';
import FormatDate from 'src/@core/components/format-date';
import postData from 'src/api/post'
import FormLicenseFee from 'src/views/license-fee/form'
import DataGridComponent, { columnFillters } from 'src/@core/components/data-grid'
import { GridColDef } from '@mui/x-data-grid'
import { Delete } from 'mdi-material-ui';

const LicenseMinister = () => {

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

  const columns: GridColDef[] = [
    { field: 'id', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'ID', minWidth: 90 },
    { field: 'licenseFeeNumber', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'Quyết định cấp quyền' },
    { field: 'signDate', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'Ngày ký', renderCell: (data: any) => FormatDate(data.row.signDate) },
    { field: 'supplementLicenseFee', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'Quyết định bổ sung', renderCell: (data: any) => (<Box> {data.row.supplementLicenseFee?.licenseFeeNumber} </Box>) },
    { field: 'totalMoney', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'Tổng số tiền cấp quyền(VNĐ)' },
    { field: 'description', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'Ghi chú' },
    { field: 'LicenseNumber', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'Giấy phép' },
    { field: 'ConstructionName', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'Công trình' },

    //Action
    {
      field: 'actions', headerClassName: 'tableHead', headerAlign: 'center', headerName: '#', minWidth: 120, sortable: false,
      renderCell: (data) => (
        <Box>
          <Tooltip title="Chỉnh sửa tiền cấp quyền">
            <IconButton onClick={() => console.log('edit')}>
              <FormLicenseFee isEdit={true} data={data.row} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa tiền cấp quyền">
            <IconButton onClick={() => DeleteLicense(data)}>
              <Delete className='tableActionBtn deleteBtn' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    },
  ]

  const columnFillter: columnFillters[] = [
    {
      label: 'Số QĐ',
      value: 'licenseFeeNumber',
      type: 'text',
    },
    {
      label: 'Từ năm',
      value: 'fromYear',
      type: 'select',
      options: [
        { label: '2021', value: 2021 },
        { label: '2022', value: 2022 },
        { label: '2023', value: 2023 },
      ],
    },
    {
      label: 'Đến năm',
      value: 'toYear',
      type: 'select',
      options: [
        { label: '2021', value: 2021 },
        { label: '2021', value: 2021 },
        { label: '2022', value: 2022 },
        { label: '2023', value: 2023 },
      ],
    },
  ]

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchData('LicenseFee/list');
        setResData(data);
      } catch (error) {
        setResData([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
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
      <Grid item xs={12} sm={12} md={12}>
        <Typography >Tổng số tiền cấp quyền: 426.293.061.000₫</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Paper elevation={3} sx={{ p: 0, height: '100%' }}>
          <DataGridComponent
            rows={resData}
            columns={columns}
            columnFillter={columnFillter}
            actions={
              <FormLicenseFee setPostSuccess={handlePostSuccess} isEdit={false} />
            }
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default LicenseMinister
