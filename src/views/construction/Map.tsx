// ** MUI Imports
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';


const Map = () => {

  return (
    <Grid container>
        <Card sx={{ position: 'relative', width: '100%', margin: 0 }}>
            <CardContent sx={{height: 'calc(100vh - 135px)', padding: 0}}>
                <Typography variant='subtitle1'> Pages show map here </Typography>
            </CardContent>
        </Card>
    </Grid>
  );
};

export default Map;
