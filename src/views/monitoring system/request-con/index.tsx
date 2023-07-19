import { Grid } from "@mui/material"
import MapComponent from "src/@core/components/map"
import RequestDetails from "./request-fieldset"
import RequestTableDetails from "./table-detail"
import SearchRequest from "./search"


const RequestCon = () => {

    return (
    <Grid container spacing={2}>
        <Grid item xs={8}>
            <SearchRequest/>
            <RequestDetails />
            <RequestTableDetails />
        </Grid>
        <Grid item xs={4} sx={{width:'100%',height:'calc( 100vh - 120px )'}}>
            <MapComponent />
        </Grid>
    </Grid>
    )
}

export default RequestCon
