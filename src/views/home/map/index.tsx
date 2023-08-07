import { Card, CardContent, CardHeader } from "@mui/material"
import { useState } from 'react'
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const HomeMap = () => {
    const [mapCenter] = useState([ 15.012172, 108.676488 ]);
    const [mapZoom] = useState(9);

    return (
        <Card sx={{ position: 'relative' }}>
            <CardHeader
                title="BẢN ĐỒ TRANG THÁI VẬN HÀNH CÔNG TRÌNH"
                sx={{ padding: 0 }}
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
            <CardContent sx={{ height: 'calc(100vh - 200px)' }}>
                <Map center={mapCenter} zoom={mapZoom} mapData={null} />
            </CardContent>
        </Card>
    )
}
export default HomeMap