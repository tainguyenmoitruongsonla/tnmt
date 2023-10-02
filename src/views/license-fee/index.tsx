import { useState, useEffect } from 'react'
import { Grid, Typography, Paper, Box, Toolbar } from '@mui/material'
import FormatDate from 'src/@core/components/format-date';
import FormLicenseFee from 'src/views/license-fee/form'
import DataGridComponent from 'src/@core/components/data-grid'
import { GridColDef } from '@mui/x-data-grid'
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import { formatVndCost } from '../home/count-license-fee';
import DeleteData from 'src/@core/components/delete-data';
import { getData } from 'src/api/axios';

interface LicenseFeeProps {
  path: string
}

const LicenseFee = (props: LicenseFeeProps) => {

  const { path } = props;
  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(false)

  const columns: GridColDef[] = [
    { field: 'id', headerAlign: 'center', headerName: 'ID', minWidth: 90 },
    {
      field: 'licenseFeeNumber', headerAlign: 'center', headerName: 'Quyết định cấp quyền', minWidth: 180,
      renderCell: (data: any) => (
        <ShowFilePDF
          name={data.row.licenseFeeNumber || ''}
          src={`pdf/tien-cap-quyen/${data.row.licensingAuthorities}/${new Date(data.row.signDate).getFullYear()}/`}
          fileName={data.row.filePDF || ''}
        />
      ),
    },
    { field: 'signDate', headerAlign: 'center', headerName: 'Ngày ký', minWidth: 180, renderCell: (data: any) => FormatDate(data.row.signDate) },
    {
      field: 'supplementLicenseFee', headerAlign: 'center', headerName: 'Quyết định bổ sung', minWidth: 180, renderCell: (data: any) => (
        <ShowFilePDF
          name={data.row.supplementLicenseFee?.licenseFeeNumber || ''}
          src={`pdf/tien-cap-quyen/${data.row.licensingAuthorities}/${new Date(data.row.supplementLicenseFee?.signDate).getFullYear()}/`}
          fileName={data.row.supplementLicenseFee?.filePDF || ''}
        />
      )
    },
    { field: 'totalMoney', headerAlign: 'center', headerName: 'Tổng số tiền cấp quyền(VNĐ)', minWidth: 180, type: 'number' },
    { field: 'description', headerAlign: 'center', flex: 1, minWidth: 280, headerName: 'Ghi chú' },
    { field: 'LicenseNumber', headerAlign: 'center', headerName: 'Giấy phép', minWidth: 180 },
    { field: 'ConstructionName', headerAlign: 'center', headerName: 'Công trình', minWidth: 180 },

    //Action
    {
      field: 'actions', headerAlign: 'center', headerName: '#', minWidth: 120, sortable: false,
      renderCell: (data) => (
        <Box>
          <FormLicenseFee isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
          <DeleteData url={'LicenseFee'} data={data} setPostSuccess={handlePostSuccess} />
        </Box>
      )
    },
  ]

  useEffect(() => {
    const getDataLicenseFee = async () => {
      setLoading(true)
      try {
        if (path === 'bo-cap') {
          const data = await getData('LicenseFee/list/minister');
          setResData(data);
        } else if (path === 'tinh-cap') {
          const data = await getData('LicenseFee/list/province');
          setResData(data);
        }
      } catch (error) {
        setResData([]);
      } finally {
        setLoading(false)
      }
    };
    getDataLicenseFee();
  }, [path, postSuccess]);

  // Calculate the total of resData.totalMoney
  const totalMoneySum = resData.reduce((sum, item: any) => sum + (item.totalMoney || 0), 0);

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

          <Toolbar variant="dense">
            <Grid container justifyContent={'end'} >
              <Grid item>
                <FormLicenseFee setPostSuccess={handlePostSuccess} isEdit={false} />
              </Grid>
            </Grid>
          </Toolbar>
          <DataGridComponent
            rows={resData}
            columns={columns}
            loading={loading}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default LicenseFee
