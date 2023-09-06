// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ConstructionStatus from './cons-status'
import RealTime from './real-time'
import CountLicense from './count-license'
import CountLicenseFee from './count-license-fee'
import HomeMap from './map'
import { useEffect, useState } from 'react'
import fetchData from 'src/api/fetch'

const Home = () => {

  const [lcFee, setLicFee] = useState({ btnmt: [], ubnd: [] })
  const [lic, setLic] = useState({ total: 0, btnmt: 0, ubnd: 0 })
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    let isMounted = true; // A flag to check if the component is mounted

    const getData = async () => {
      setLoading(true);
      try {
        //license fee
        const BTNMT = await fetchData('LicenseFee/list/minister');
        const UBND = await fetchData('LicenseFee/list/province');

        setLicFee({ btnmt: BTNMT, ubnd: UBND }); // Corrected syntax here

        //license
        const lic = await fetchData('License/list');
        const licBTNMT = lic.filter((item: { [key: string]: any }) => item['licensingAuthorities'] === 'BTNMT');
        const licUBND = lic.filter((item: { [key: string]: any }) => item['licensingAuthorities'] === 'UBNDT');

        if (isMounted) {
          // Only update the state if the component is still mounted
          setLicFee({ btnmt: BTNMT, ubnd: UBND });
          setLic({ total: lic.length, btnmt: licBTNMT.length, ubnd: licUBND.length });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (isMounted) {
          // Only update the state if the component is still mounted
          setLicFee({ btnmt: [], ubnd: [] });
        }
      } finally {
        if (isMounted) {
          // Only update the state if the component is still mounted
          setLoading(false);
        }
      }
    };

    getData();

    // Cleanup function to cancel any asynchronous tasks when the component is unmounted
    return () => {
      isMounted = false;
    };
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
  )
}

export default Home