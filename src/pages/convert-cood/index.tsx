import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MapLegend from 'src/views/construction/MapLegend';
import dynamic from 'next/dynamic';
import proj4 from 'proj4';
import { getData } from 'src/api/axios';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const Construction = () => {

    const [mapCenter,] = useState([15.012172, 108.676488]);
    const [mapZoom,] = useState(9);

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

    const handleConsTypeChange = (data: any) => {
        setInitConstype(data);
    };



    const N_DEC_WGS84 = 8;

    const converter = (x: any, y: any) => {
        proj4.defs('VN2000_QUANG_NGAI', '+proj=tmerc +lat_0=0 +lon_0=108.000 +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=-191.90441429,-39.30318279,-111.45032835,-0.00928836,0.01975479,-0.00427372,0.252906278 +units=m +no_defs');

        const proj4Src: any = proj4.defs('VN2000_QUANG_NGAI');
        const proj4Dest: any = proj4.defs('EPSG:4326');

        const toMeterSrc: any = proj4Src ? proj4Src.units?.to_meter || 1 : 1;
        const toMeterDest: any = proj4Dest ? proj4Dest.units?.to_meter || 1 : 1;
        const xVal = x / toMeterSrc;
        const yVal = y / toMeterSrc;

        const pj = proj4.toPoint([xVal, yVal]);
        const result: any = proj4(proj4Src, proj4Dest).forward(pj);
        result.x *= toMeterDest.toFixed(N_DEC_WGS84);
        result.y *= toMeterDest.toFixed(N_DEC_WGS84);

        return result;
    }
    const [coodinate, setCoodinate] = useState({ x: 0, y: 0 });



    const handleChange = (prop: any) => (value: any) => {
        setCoodinate({ ...coodinate, [prop]: value })
    }

    useEffect(() => {
        console.log(converter(coodinate.x, coodinate.y));
        const getDataConstruction = async () => {
            try {
                const data = await getData('cong-trinh/danh-sach');
                console.log(initConsType)
                const filteredData = data.filter((item: { [key: string]: any }) =>
                    initConsType.some((keyword: any) =>
                        item['constructionTypeSlug']?.toString().toLowerCase().includes(keyword.toLowerCase())
                    )
                );
                setResData(filteredData);
            } catch (error) {
                setResData([]);
            } finally {
            }
        };
        getDataConstruction();
    }, [coodinate.x, coodinate.y, initConsType]);

    return (

        <Grid container spacing={4}>
            <Grid xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                    size='small'
                    type='text'
                    fullWidth
                    placeholder=''
                    label='X (VN2000)'
                    value={coodinate.x}
                    onChange={(e) => handleChange('x')(e.target.value)}
                />
            </Grid>
            <Grid xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                    size='small'
                    type='text'
                    fullWidth
                    placeholder=''
                    label='Y (VN2000)'
                    value={coodinate.y}
                    onChange={(e) => handleChange('y')(e.target.value)}
                />
            </Grid>
            <Grid xs={12} md={12} sx={{ height: 'calc(100vh - 82px)', overflow: 'hidden' }}>
                <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
                    <Box className="map-legend" sx={{ background: 'white' }}>
                        <MapLegend onChange={handleConsTypeChange} />
                    </Box>
                    <Map center={mapCenter} zoom={mapZoom} mapData={null} mapMarkerData={resData} />
                </Paper>
            </Grid>
        </Grid>

    );
};

export default Construction;
