import { Paper, Typography, Box } from "@mui/material"
import React, { useState, useEffect, useRef } from 'react';
import { getData } from 'src/api/axios'

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
        "congtrinhkhac_xt"
    ])

    const [resData, setResData] = useState([]);
    const [dataFiltered, setDataFiltered] = useState([]);
    const [loading, setLoading] = useState<boolean>(false)

    const handleConsTypeChange = (data: any) => {
        setInitConstype(data);
    };

    const isMounted = useRef(true);

    const getDataConstruction = async () => {
        setLoading(true);
        getData('cong-trinh/danh-sach', {})
            .then((data) => {
                if (isMounted.current) {
                    setResData(data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    useEffect(() => {
        isMounted.current = true

        return () => {
            isMounted.current = false;
        };
    }, []);


    useEffect(() => {
        getDataConstruction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const filteredData = resData?.filter((item: { [key: string]: any }) =>
            initConsType.some((keyword: any) =>
                item['loaiCT']?.['maLoaiCT']?.toString().toLowerCase().includes(keyword.toLowerCase())
            )
        );
        setDataFiltered(filteredData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initConsType, resData]);



    return (
        <Paper elevation={3} sx={{ position: 'relative', height: 'calc(100vh - 170px)' }}>
            <Paper elevation={3} sx={{ py: 0.5, BorderRadius: 0, textAlign: 'center' }}>
                <Typography variant='overline' sx={{ fontWeight: 'bold' }}>Bản đồ trạng thái công trình</Typography>
            </Paper>
            <Box className="map-legend" sx={{ background: 'white', zIndex: `${loading ? -1 : 999}` }}>
                <MapLegend onChange={handleConsTypeChange} />
            </Box>
            <Map center={mapCenter} zoom={mapZoom} mapData={dataFiltered} loading={loading} />
        </Paper>
    )
}
export default HomeMap