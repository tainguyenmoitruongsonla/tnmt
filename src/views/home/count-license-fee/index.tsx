import { Typography, Paper, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLoadingContext } from 'src/@core/theme/loading-provider';
import fetchData from 'src/api/fetch';

export function formatVndCost(cost: number): string {
  const formattedCost = cost.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formattedCost;
}

const CountLicenseFee = () => {
  const [dataBTNMT, setDataBTNMT] = useState([]);
  const [dataUBND, setDataUBND] = useState([]);
  const { showLoading, hideLoading } = useLoadingContext();
  const [loading, setLoading] = useState(false)
  if (loading == true) {
    showLoading();
  } else {
    hideLoading();
  }

  //Hooks
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const BTNMT = await fetchData('LicenseFee/list/minister');
        setDataBTNMT(BTNMT);
        const UBND = await fetchData('LicenseFee/list/province');
        setDataUBND(UBND);
      } catch (error) {
        setDataBTNMT([]);
        setDataUBND([])
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [router.pathname]);

  // Calculate the total of resData.totalMoney
  const costBTNMT = dataBTNMT.reduce((sum, item: any) => sum + (item.totalMoney || 0), 0);
  const costUBND = dataUBND.reduce((sum, item: any) => sum + (item.totalMoney || 0), 0);

  const totalMoneySum = costBTNMT + costUBND;

  return (
    <Paper elevation={3}>
      <Paper elevation={3} sx={{ py: 0.5, mb: 2, BorderRadius: 0, textAlign: 'center' }}>
        <Typography variant='overline' sx={{ fontWeight: 'bold' }}>Tiền cấp quyền</Typography>
      </Paper>
      <Box px={4} pb={4}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontWeight: 'bold' }}>TỔNG</Typography>
          <Typography sx={{ fontWeight: 'bold' }}> {formatVndCost(totalMoneySum)} </Typography>
        </Box>
        <Typography sx={{ textAlign: 'left' }} variant='subtitle2'>BTNMT: {formatVndCost(costBTNMT)} </Typography>
        <Typography sx={{ textAlign: 'left' }} variant='subtitle2'>UBND: {formatVndCost(costUBND)} </Typography>
      </Box>
    </Paper >
  );

};

export default CountLicenseFee;
