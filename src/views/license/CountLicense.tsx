import { Box, Typography, Card, CardContent } from '@mui/material';

const CountLicense = () => {

  return (
    <Card sx={{height: '100%'}}>
        <CardContent sx={{p: 1}}>
        <div style={{ width: '100%' }}>
            <Box
            sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
            >
            <Box sx={{ flexGrow: 1, alignItems: 'center'}}>
                <Typography sx={{fontWeight: 'bold'}} variant="body2" color="black">
                Tổng số giấy phép: 
                </Typography>
                <Typography sx={{fontWeight: 'bold'}} variant="body2" color="red">
                300
                </Typography>
            </Box>
            <Box>
                <img width={50} height={50} src="/images/licenses/licensing.png" alt="logo" />
            </Box>
            </Box>
        </div>
        <div style={{ width: '100%' }}>
            <Box
            sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
            >
            <Box sx={{ flexGrow: 1, alignItems: 'center'}}>
                <Typography sx={{fontWeight: 'bold'}} variant="body2" color="black">
                Giấy phép sắp hết hiệu lực: 
                </Typography>
                <Typography sx={{fontWeight: 'bold'}} variant="body2" color="red">
                80/300
                </Typography>
            </Box>
            <Box>
                <img width={50} height={50} src="/images/licenses/licensing-2.png" alt="logo" />
            </Box>
            </Box>
        </div>
        <div style={{ width: '100%' }}>
            <Box
            sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
            >
            <Box sx={{ flexGrow: 1, alignItems: 'center'}}>
                <Typography sx={{fontWeight: 'bold'}} variant="body2" color="black">
                Giấy phép hết hiệu lực: 
                </Typography>
                <Typography sx={{fontWeight: 'bold'}} variant="body2" color="red">
                100/300
                </Typography>
            </Box>
            <Box>
                <img width={50} height={50} src="/images/licenses/licensing-3.png" alt="logo" />
            </Box>
            </Box>
        </div>
        <div style={{ width: '100%' }}>
            <Box
            sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
            >
            <Box sx={{ flexGrow: 1, alignItems: 'center'}}>
                <Typography sx={{fontWeight: 'bold'}} variant="body2" color="black">
                Giấy phép bị thu hồi: 
                </Typography>
                <Typography sx={{fontWeight: 'bold'}} variant="body2" color="red">
                5/300
                </Typography>
            </Box>
            <Box>
                <img width={50} height={50} src="/images/licenses/expire.png" alt="logo" />
            </Box>
            </Box>
        </div>
        </CardContent>
    </Card>
  )
  
}

export default CountLicense
