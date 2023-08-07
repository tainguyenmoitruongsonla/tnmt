import { useState } from 'react'
import { Grid } from "@mui/material"
import RequestDetails from "./request-fieldset"
import RequestTableDetails from "./table-detail"
import SearchRequest from "./search"
import dynamic from 'next/dynamic';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const RequestCon = () => {
    const [mapCenter] = useState([ 15.012172, 108.676488 ]);
    const [mapZoom] = useState(9);

    return (
    <Grid container spacing={2}>
        <Grid item xs={8}>
            <SearchRequest/>
            <RequestDetails />
            <RequestTableDetails />
        </Grid>
        <Grid item xs={4} sx={{width:'100%',height:'calc( 100vh - 120px )'}}>
            <Map center={mapCenter} zoom={mapZoom} mapData={null} />
        </Grid>
    </Grid>
    )
}

export default RequestCon
