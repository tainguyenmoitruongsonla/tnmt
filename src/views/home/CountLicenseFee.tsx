import {Card, Typography, CardHeader, CardContent, Grid} from '@mui/material';

const TotalLicenseFee = 3000000000000;
const BTNMT = 2904600000000;
const UBND = 954000000000;

const formattedTotal = getNumberWithCommas(TotalLicenseFee);
const formattedBTNMT = getNumberWithCommas(BTNMT);
const formattedUBND = getNumberWithCommas(UBND);

function formatVndCost(cost: number): string {
  const formattedCost = cost.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formattedCost;
}

// const costTotal = formatVndCost(TotalLicenseFee);

const costBTNMT = formatVndCost(BTNMT);
const costUBND = formatVndCost(UBND);

function getNumberWithCommas(num: any) {
  if (num == null || num == 0)

      return '0 ₫'

  const len = num.toLocaleString('en-US').split(',').length
  if (len == 1)

      return  round(num) + " ₫";

  else if (len == 2)

      return  round(num / 1000) + " ngàn";

  else if (len == 3)

      return  round(num / 1000000) + " triệu đ";

  else if (len == 4)

      return  round(num / 1000000000) + " tỷ";

  else

      return  round(num / 1000000000000) + " nghìn tỷ";
}

function round(num: any) {
  return (Math.round(num * 100) / 100).toLocaleString('tr-TR');
}

  
const CountLicenseFee = () => {

  return (
    <Card sx={{ position: 'relative' }}>
      <CardHeader
        title={`TIỀN CẤP QUYỀN: ${formattedTotal}`}
        sx={{padding: 0}}
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            textAlign: 'center',
            fontSize: '18px !important',
            fontWeight: 600,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important',
            borderBottom: '1px solid gray',
          }
        }}
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Typography sx={{textAlign: 'left'}} variant='subtitle2'>BTNMT: {costBTNMT} ({formattedBTNMT})</Typography>
            <Typography sx={{textAlign: 'left'}} variant='subtitle2'>UBND: {costUBND} ({formattedUBND})</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

};

export default CountLicenseFee;
