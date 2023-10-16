import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import ConstructionStatus from './cons-status';
import RealTime from './real-time';
import CountLicense from './count-license';
import CountLicenseFee from './count-license-fee';
import HomeMap from './map';
import { getData } from 'src/api/axios';

const Home = () => {
    const [lcFee, setLicFee] = useState({ btnmt: [], ubnd: [] });
    const [lic, setLic] = useState({ total: 0, btnmt: 0, ubnd: 0 });
    const [loading, setLoading] = useState(false);

    const isMounted = useRef(true);

    const getDataLicenseFees = async () => {
        setLoading(true);
        try {
            const btnmtData = await getData('tien-cap-quyen/danh-sach/bo-cap');
            const ubndData = await getData('tien-cap-quyen/danh-sach/tinh-cap');

            if (isMounted.current) {
                setLicFee({ btnmt: btnmtData, ubnd: ubndData });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getDataLicenses = async () => {
        try {
            const data = await getData('giay-phep/dem-theo-co-quan-cp');
            if (isMounted.current) {
                setLic({ total: data.total, btnmt: data.btnmt, ubnd: data.ubndt });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        getDataLicenseFees();
        getDataLicenses();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
                <RealTime />
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid item xs={12} md={12}>
                    <ConstructionStatus />
                </Grid>
                <Grid item xs={12} md={12} sx={{ marginTop: 5 }}>
                    <CountLicense data={lic} loading={loading} />
                </Grid>
                <Grid item xs={12} md={12} sx={{ marginTop: 5 }}>
                    <CountLicenseFee data={lcFee} loading={loading} />
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                <HomeMap />
            </Grid>
        </Grid>
    );
};

export default Home;
