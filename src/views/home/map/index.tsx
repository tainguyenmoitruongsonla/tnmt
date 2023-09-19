import { Paper, Typography, Box } from "@mui/material"
import React, { useState, useEffect } from 'react';
import fetchData from 'src/api/fetch';

import MapLegend from 'src/views/construction/MapLegend';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const HomeMap = () => {
    const [mapCenter] = useState([15.012172, 108.676488]);
    const [mapZoom] = useState(9);

    const [initConsType, setInitConstype] = useState<any>([
        "nuocmat",
        "thuydien",
        "hochua",
        "trambom",
        "tramcapnuoc",
        "cong",
        "nhamaynuoc",
        "nuocduoidat",
        "khaithac",
        "thamdo",
        "congtrinh_nuocduoidatkhac",
        "xathai",
        "khu_cumcn_taptrung",
        "sx_tieuthu_cn",
        "congtrinh_xathaikhac"
    ])

    const [resData, setResData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false)

    const handleConsTypeChange = (data: any) => {
        setInitConstype(data);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true)
                const data = await fetchData('Construction/list');
                const filteredData = data.filter((item: { [key: string]: any }) =>
                    initConsType.some((keyword: any) =>
                        item['constructionTypeSlug']?.toString().toLowerCase().includes(keyword.toLowerCase())
                    )
                );
                setResData(filteredData);
            } catch (error) {
                setResData([]);
            } finally {
                setLoading(false)
            }
        };
        getData();
    }, [initConsType]);

    return (
        <Paper elevation={3} sx={{ position: 'relative', height: 'calc(100vh - 170px)' }}>
            <Paper elevation={3} sx={{ py: 0.5, BorderRadius: 0, textAlign: 'center' }}>
                <Typography variant='overline' sx={{ fontWeight: 'bold' }}>Bản đồ trạng thái công trình</Typography>
            </Paper>
            <Box className="map-legend" sx={{ background: 'white', zIndex: `${loading ? -1 : 999}` }}>
                <MapLegend onChange={handleConsTypeChange} />
            </Box>
            <Map center={mapCenter} zoom={mapZoom} mapData={resData} loading={loading} />
        </Paper>
    )
}
export default HomeMap