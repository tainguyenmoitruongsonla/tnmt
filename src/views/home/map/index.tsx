import { Paper, Typography } from "@mui/material"
import { useState } from 'react'
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const HomeMap = () => {
    const [mapCenter] = useState([15.012172, 108.676488]);
    const [mapZoom] = useState(9);

    return (
        <Paper elevation={3} sx={{ position: 'relative', height: 'calc(100vh - 200px)' }}>
            <Paper elevation={3} sx={{ py: 0.5, BorderRadius: 0, textAlign: 'center' }}>
                <Typography variant='overline' sx={{ fontWeight: 'bold' }}>Bản đồ trạng thái công trình</Typography>
            </Paper>
            <Map center={mapCenter} zoom={mapZoom} mapData={null} />
        </Paper>
    )
}
export default HomeMap