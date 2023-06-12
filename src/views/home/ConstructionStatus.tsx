import { useState, useEffect } from "react";

// ** MUI Imports

import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const IsConnectedProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: `${theme.palette.success.main}`,
  },
}));

const LossConnectProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: `${theme.palette.warning.main}`,
  },
}));

const ErrorConnectProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: `${theme.palette.error.main}`,
  },
}));

const ConstructionStatus = () => {

  //initialize state with counter variable and set it to 0

const [counterConnected, setCounterConnected] = useState(0);
const [counterLossConnect, setCounterLossConnect] = useState(0);
const [counterErrorConnect, setCounterErrorConnect] = useState(0);
const totalConst = 74;
const Connected = 15;
const ErrorConnect = 7;
const LossConect = totalConst - Connected;

//calculate percentage and update state with result

useEffect(() => {

  //Counter Connected

  const percentConnected = (Connected / totalConst) * 100;
  setCounterConnected(percentConnected);

  //Counter LossConnect

  const percentLossConnect = (LossConect / totalConst) * 100;
  setCounterLossConnect(percentLossConnect)

  //Counter ErrorConnect

  const percentErrorConnect = (ErrorConnect / totalConst) * 100;
  setCounterErrorConnect(percentErrorConnect)

}, [ErrorConnect, LossConect, Connected, totalConst]);

  return (
    <Card sx={{ position: 'relative' }}>
      <CardHeader
        title='TRẠNG THÁI CÔNG TRÌNH'
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
        <Typography>Tổng số: {totalConst} </Typography>
        <Box sx={{paddingTop: 3}}>
          <Typography>Trạm kết nối bình thường: {Connected} </Typography>
          <IsConnectedProgress variant="determinate" value={counterConnected} />
        </Box>
        <Box sx={{paddingTop: 3}}>
          <Typography>Trạm mất kết nối: {LossConect} </Typography>
          <LossConnectProgress variant="determinate" value={counterLossConnect} />
        </Box>
        <Box sx={{paddingTop: 3}}>
          <Typography>Trạm vận hành chưa đúng: {ErrorConnect} </Typography>
          <ErrorConnectProgress variant="determinate" value={counterErrorConnect} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConstructionStatus;
