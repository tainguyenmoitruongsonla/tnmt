// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import ConstructionStatus from './cons-status'
import RealTime from './real-time'
import CountLicense from './count-license'
import CountLicenseFee from './count-license-fee'
import HomeMap from './map'
import { useEffect, useState } from 'react'
import fetch from 'src/api/fetch'
import fetchData from 'src/api/axios'

const Home = () => {

  const [lcFee, setLicFee] = useState({ btnmt: [], ubnd: [] })
  const [licData, setLicData] = useState([]);
  const [lic, setLic] = useState({ total: 0, btnmt: 0, ubnd: 0 })
  const [loading, setLoading] = useState(false);

  function getLicense() {
    setLoading(true);

    fetchData('License/list', {
      licenseNumber: null,
      licensingAuthorities: null,
      licenseTypeId: 0,
      licenseValidity: null,
      businessId: 0,
      constructionId: 0,
      constructionTypeId: 0,
      districtId: 0,
      communeId: 0,
      subBasinId: 0,
      pageIndex: 0,
      pageSize: 0
    })
      .then((data) => {
        setLicData(data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setLoading(false);
      })
  }

  const getData = async () => {
    setLoading(true);
    try {
      //license fee
      const BTNMT = await fetch('LicenseFee/list/minister');
      const UBND = await fetch('LicenseFee/list/province');

      setLicFee({ btnmt: BTNMT, ubnd: UBND });
    } catch (error) {
      console.error('Error fetching data:', error);
      setLicFee({ btnmt: [], ubnd: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLicense();
    getData();

    const licBTNMT = licData.filter((item: { [key: string]: any }) => item['licensingAuthorities'].toLowerCase() === 'btnmt');
    const licUBND = licData.filter((item: { [key: string]: any }) => item['licensingAuthorities'].toLowerCase() === 'ubndt');

    setLic({ total: licData.length, btnmt: licBTNMT.length, ubnd: licUBND.length });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


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