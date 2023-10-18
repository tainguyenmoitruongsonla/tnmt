import { useEffect, useRef, useState } from 'react';

// ** MUI Imports
import { Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

// ** Icons Imports

// ** Components Imports
import CountLicenseForManage from 'src/views/license/count-license-for-manage';
import ApexChartLicense, { ApexChartLicenseProps } from 'src/views/license/license-bar-chart';
import { getData } from 'src/api/axios';
import BoxLoading from 'src/@core/components/box-loading';
import LicenseToolBar from '../tool-bar';


const ManageLicense = () => {
    const [dataFolowConsTypes, setDataFolowConsTypes] = useState([]);
    const [dataForChart, setDataForChart] = useState<ApexChartLicenseProps>({ series: [], year: [], color: [] });
    const [loading, setLoading] = useState(false)

    const [paramsFilter, setParamsFilter] = useState({
        so_gp: null,
        cong_trinh: 0,
        coquan_cp: null,
        loaihinh_cp: 0,
        hieuluc_gp: null,
        loai_ct: 0,
        tang_chuanuoc: 0,
        huyen: 0,
        xa: 0,
        tieuvung_qh: 0,
        tochuc_canhan: 0,
        tu_nam: new Date().getFullYear() - 5,
        den_nam: new Date().getFullYear(),
    });

    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true

        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        const getDataLicense = async () => {
            setLoading(true)
            const DataFolowConsTypes = await getData('giay-phep/dem-theo-loai-ct');
            setDataFolowConsTypes(DataFolowConsTypes)

            const DataForChart = await getData('giay-phep/thong-ke-gp', paramsFilter)
            .catch((e)=>{
                console.error(e)
            }).finally(() => {
                setLoading(false)
            });
            setDataForChart(DataForChart)
        };
        getDataLicense();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsFilter]);

    const handleFilterChange = (data: any) => {
        setParamsFilter(data);
    };

    return (
        <Grid container rowSpacing={5} pt={3} px={2}>
            <CountLicenseForManage data={dataFolowConsTypes} />
            <Grid xs={12} sm={12} md={12}>
                <Paper elevation={3}>
                    <LicenseToolBar onChange={handleFilterChange} />
                    {loading ? <BoxLoading /> : <ApexChartLicense series={dataForChart.series} year={dataForChart.year} color={dataForChart.color} />}
                </Paper>
            </Grid>
        </Grid >
    )
}

export default ManageLicense
