// ** MUI Imports
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent';


const CountLicense = () => {

  return (
    <Card sx={{ position: 'relative' }}>
      <CardHeader
        title='Trạng thái công trình thủy điện'
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            fontSize: '18px !important',
            fontWeight: 600,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent>
        <Typography variant='subtitle1'> Content</Typography>
      </CardContent>
    </Card>
  );
};

export default CountLicense;
