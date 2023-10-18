import { Accordion, AccordionSummary, AccordionDetails, Typography, CircularProgress, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Recycling } from '@mui/icons-material';

const COLORS = ['rgb(106, 179, 230)', 'rgb(0, 61, 126)', 'rgb(125, 95, 58)', 'rgb(0, 178, 151)', 'rgb(244, 153, 23)'];
const CHARTS_LEGEND = ['KTSD nước mặt', 'KTSD nước dưới đất', 'Thăm dò nước dưới đất', 'Hành nghề khoan', 'Xả thải vào nguồn nước'];

interface CountLicenseForManageProps {
    data?: any
    loading?: boolean
}

const CountLicenseForManage = (props: CountLicenseForManageProps) => {

    const { data, loading } = props;

    return (
        <Grid container>
            <Grid item xs={12} md={4} sx={{ p: 2 }}>
                <Accordion sx={{ backgroundColor: COLORS[0] }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[0]} : {loading ? <CircularProgress size={20} color='inherit' /> : data.ktsd_nm?.total}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Grid item xs={4} sx={{ p: 2 }}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.ktsd_nm?.total}</Typography>
                                <img src='/images/constructionTypes/surfaceWater.png' alt='license_img' width={65} height={65}></img>
                            </Grid>
                            <Grid item xs={8} sx={{ p: 2 }}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: {loading ? <CircularProgress size={20} color='inherit' /> : data.ktsd_nm?.con_hieuluc}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.ktsd_nm?.bo_cap}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.ktsd_nm?.tinh_cap}</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12} md={4} sx={{ p: 2 }}>
                <Accordion sx={{ backgroundColor: COLORS[1] }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[1]} : {loading ? <CircularProgress size={20} color='inherit' /> : data.ktsd_ndd?.total}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Grid item xs={4} sx={{ p: 2 }}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.ktsd_ndd?.total}</Typography>
                                <img src='/images/constructionTypes/probed.png' alt='license_img' width={65} height={65}></img>
                            </Grid>
                            <Grid item xs={8} sx={{ p: 2 }}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: {loading ? <CircularProgress size={20} color='inherit' /> : data.ktsd_ndd?.con_hieuluc}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.ktsd_ndd?.bo_cap}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.ktsd_ndd?.tinh_cap}</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12} md={4} sx={{ p: 2 }}>
                <Accordion sx={{ backgroundColor: COLORS[2] }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[2]} : {loading ? <CircularProgress size={20} color='inherit' /> : data.thamdo_ndd?.total}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Grid item xs={4} sx={{ p: 2 }}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.thamdo_ndd?.total}</Typography>
                                <img src='/images/constructionTypes/probed.png' alt='license_img' width={65} height={65}></img>
                            </Grid>
                            <Grid item xs={8} sx={{ p: 2 }}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: {loading ? <CircularProgress size={20} color='inherit' /> : data.thamdo_ndd?.con_hieuluc}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.thamdo_ndd?.bo_cap}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.thamdo_ndd?.tinh_cap}</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12} md={4} sx={{ p: 2 }}>
                <Accordion sx={{ backgroundColor: COLORS[3] }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[3]} : {loading ? <CircularProgress size={20} color='inherit' /> : data.hnk_ndd?.total}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Grid item xs={4} sx={{ p: 2 }}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.hnk_ndd?.total}</Typography>
                                <img src='/images/constructionTypes/drilling-practice.png' alt='license_img' width={65} height={65}></img>
                            </Grid>
                            <Grid item xs={8} sx={{ p: 2 }}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: {loading ? <CircularProgress size={20} color='inherit' /> : data.hnk_ndd?.con_hieuluc}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.hnk_ndd?.bo_cap}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.hnk_ndd?.tinh_cap}</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12} md={4} sx={{ p: 2 }}>
                <Accordion sx={{ backgroundColor: COLORS[4] }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[4]} : {loading ? <CircularProgress size={20} color='inherit' /> : data.xathai?.total}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Grid item xs={4} sx={{ p: 2 }}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.xathai?.total}</Typography>
                                <Recycling sx={{ width: 65, height: 65, color: '#fff' }} />
                            </Grid>
                            <Grid item xs={8} sx={{ p: 2 }}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: {loading ? <CircularProgress size={20} color='inherit' /> : data.xathai?.con_hieuluc}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.xathai?.bo_cap}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.xathai?.tinh_cap}</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    )
}
export default CountLicenseForManage