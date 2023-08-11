import { Box, Typography, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react'

const CountLicense = (props: any) => {

    const { data } = props;

    const totalLic = data.length;
    const [licIsRevoked, setLicIsRevoked] = useState(0);
    const [licExpire, setLicExpire] = useState(0);
    const [licAboutToExpire, setLicAboutToExpire] = useState(0);

    useEffect(() => {
        // Đoạn mã kiểm tra và cập nhật count
        const today = new Date();
        const expireDateThreshold = new Date();
        expireDateThreshold.setDate(today.getDate() + 180);

        let countLicIsRevoked = 0;
        let countLicExpire = 0;
        let countLicAboutToExpire = 0;

        for (const d of data) {
            const dExpireDate = new Date(d.ExpireDate); // Chuyển đổi d.ExpireDate thành đối tượng Date

            if (d.IsRevoked == true) {
                countLicIsRevoked++;
            } else {
                if (dExpireDate < today && d.LicensingTypeId !== 5) {
                    countLicExpire++;
                }
                if (dExpireDate < expireDateThreshold && d.LicensingTypeId !== 5) {
                    countLicAboutToExpire++;
                }
            }
        }

        setLicIsRevoked(countLicIsRevoked);
        setLicExpire(countLicExpire);
        setLicAboutToExpire(countLicAboutToExpire);
    }, [data]);


    return (
        <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 1 }}>
                <div style={{ width: '100%' }}>
                    <Box
                        sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
                    >
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
                </div>
                <div style={{ width: '100%' }}>
                    <Box
                        sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
                    >
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
                </div>
                <div style={{ width: '100%' }}>
                    <Box
                        sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
                    >
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
                </div>
                <div style={{ width: '100%' }}>
                    <Box
                        sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
                    >
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
                </div>
            </CardContent>
        </Card>
    )

}

export default CountLicense
