import { Box, Typography, Paper, Divider } from '@mui/material';
import { useEffect, useState } from 'react'

const CountLicense = (props: any) => {
    const { data } = props;
    const totalLic = data?.length;
    const [licIsRevoked, setLicIsRevoked] = useState(0);
    const [licExpire, setLicExpire] = useState(0);
    const [licAboutToExpire, setLicAboutToExpire] = useState(0);

    useEffect(() => {
        let countLicIsRevoked = 0;
        let countLicExpire = 0;
        let countLicAboutToExpire = 0;

        if (data) {
            for (const d of data) {
                if (d.licenseValidity === 'da-bi-thu-hoi') {
                    countLicIsRevoked++;
                }
                if (d.licenseValidity === 'het-hieu-luc') {
                    countLicExpire++;
                }
                if (d.licenseValidity === 'sap-het-hieu-luc') {
                    countLicAboutToExpire++;
                }
            }
        }

        setLicIsRevoked(countLicIsRevoked);
        setLicExpire(countLicExpire);
        setLicAboutToExpire(countLicAboutToExpire);
    }, [data]);


    return (
        <Paper elevation={3} sx={{ height: '100%' }}>
            <Box sx={{ width: '100%', px: 5, py: 1 }}>
                <Box sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }} >
                    <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="black">
                            Tổng số giấy phép:
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="red">
                            {totalLic}
                        </Typography>
                    </Box>
                    <Box>
                        <img width={50} height={50} src="/images/licenses/licensing.png" alt="logo" />
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ m: 0 }} />
            <Box sx={{ width: '100%', px: 5, py: 1 }}>
                <Box sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }} >
                    <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="black">
                            Giấy phép sắp hết hiệu lực:
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="red">
                            {licAboutToExpire}/{totalLic}
                        </Typography>
                    </Box>
                    <Box>
                        <img width={50} height={50} src="/images/licenses/licensing-2.png" alt="logo" />
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ m: 0 }} />
            <Box sx={{ width: '100%', px: 5, py: 1 }}>
                <Box sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }} >
                    <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="black">
                            Giấy phép hết hiệu lực:
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="red">
                            {licExpire}/{totalLic}
                        </Typography>
                    </Box>
                    <Box>
                        <img width={50} height={50} src="/images/licenses/licensing-3.png" alt="logo" />
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ m: 0 }} />
            <Box sx={{ width: '100%', px: 5, py: 1 }}>
                <Box sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }} >
                    <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="black">
                            Giấy phép bị thu hồi:
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="red">
                            {licIsRevoked}/{totalLic}
                        </Typography>
                    </Box>
                    <Box>
                        <img width={50} height={50} src="/images/licenses/expire.png" alt="logo" />
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}

export default CountLicense
