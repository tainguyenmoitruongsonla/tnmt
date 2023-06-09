import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

const RealTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const formatted = currentTime.toLocaleString();
      setFormattedTime(formatted);
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
    
  }, [currentTime]);

  return (
    <Typography variant='body2'>THỐNG KÊ DỮ LIỆU TÀI NGUYÊN NƯỚC ({formattedTime}) </Typography>
  );

};

export default RealTime;
