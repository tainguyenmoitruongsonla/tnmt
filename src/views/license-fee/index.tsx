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
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import { Delete } from '@mui/icons-material';
import { formatVndCost } from '../home/count-license-fee';
import { useRouter } from 'next/router';

interface LicenseFeeProps {
  path: string
}

const LicenseFee = (props: LicenseFeeProps) => {

  const { path } = props;

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

  // Hooks
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: 'id', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'ID', minWidth: 90 },
    {
      field: 'licenseFeeNumber', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'Quyết định cấp quyền',
      renderCell: (data: any) => (
        <ShowFilePDF
          name={data.row.licenseFeeNumber}
          src={`${router.pathname.split('/')[1]}/${router.pathname.split('/')[2]}/${new Date(data.row.signDate).getFullYear()}/`}
        />
      ),
    },
    { field: 'signDate', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'Ngày ký', renderCell: (data: any) => FormatDate(data.row.signDate) },
    { field: 'supplementLicenseFee', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'Quyết định bổ sung', renderCell: (data: any) => (<ShowFilePDF name={data.row.supplementLicenseFee?.licenseFeeNumber} src={`/ pdf / licenseFees / ` + data.row.supplementLicenseFee?.licensingAuthorities + ` / ` + data.row.supplementLicenseFee?.filePDF} />) },
    { field: 'totalMoney', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'Tổng số tiền cấp quyền(VNĐ)', type: 'number' },
    { field: 'description', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'Ghi chú' },
    { field: 'LicenseNumber', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'Giấy phép' },
    { field: 'ConstructionName', headerClassName: 'tableHead', headerAlign: 'center', flex: 1, headerName: 'Công trình' },

    //Action
    {
      field: 'actions', headerClassName: 'tableHead', headerAlign: 'center', headerName: '#', minWidth: 120, sortable: false,
      renderCell: (data) => (
        <Box>
          <Tooltip title="Chỉnh sửa tiền cấp quyền">
            <IconButton>
              <FormLicenseFee isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
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
      label: 'Năm',
      value: 'signDate',
      type: 'dateRange',
      options: [
        { label: '2021', value: 2021 },
        { label: '2022', value: 2022 },
        { label: '2023', value: 2023 },
      ],
    }
  ]

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        if (path === 'bo-cap') {
          const data = await fetchData('LicenseFee/list/minister');
          setResData(data);
        } else if (path === 'tinh-cap') {
          const data = await fetchData('LicenseFee/list/province');
          setResData(data);
        }
      } catch (error) {
        setResData([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [path, postSuccess]);

  // Calculate the total of resData.totalMoney
  const totalMoneySum = resData.reduce((sum, item: any) => sum + (item.totalMoney || 0), 0);

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
        <Typography >Tổng số tiền cấp quyền: {formatVndCost(totalMoneySum)}</Typography>
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

export default LicenseFee
