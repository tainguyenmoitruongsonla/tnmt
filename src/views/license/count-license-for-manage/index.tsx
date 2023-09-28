import { Accordion, AccordionSummary, AccordionDetails, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
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
            <Grid xs={12} md={4} sx={{ p: 2 }}>
                <Accordion sx={{ backgroundColor: COLORS[0] }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[0]} : {loading ? <CircularProgress size={20} color='inherit' /> : data.surfaceWaterCount.totalCount}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid xs={12} sm={12} md={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Grid xs={4} sx={{ p: 2 }}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.surfaceWaterCount.totalCount}</Typography>
                                <img src='/images/constructionTypes/surfaceWater.png' alt='license_img' width={65} height={65}></img>
                            </Grid>
                            <Grid xs={8} sx={{ p: 2 }}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: {loading ? <CircularProgress size={20} color='inherit' /> : data.surfaceWaterCount.licenseValidity}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.surfaceWaterCount.licensingAuthorities.minister}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.surfaceWaterCount.licensingAuthorities.province}</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid xs={12} md={4} sx={{ p: 2 }}>
                <Accordion sx={{ backgroundColor: COLORS[1] }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[1]} : {loading ? <CircularProgress size={20} color='inherit' /> : data.exploitGroundWaterCount.totalCount}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid xs={12} sm={12} md={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Grid xs={4} sx={{ p: 2 }}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.exploitGroundWaterCount.totalCount}</Typography>
                                <img src='/images/constructionTypes/probed.png' alt='license_img' width={65} height={65}></img>
                            </Grid>
                            <Grid xs={8} sx={{ p: 2 }}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: {loading ? <CircularProgress size={20} color='inherit' /> : data.exploitGroundWaterCount.licenseValidity}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.exploitGroundWaterCount.licensingAuthorities.minister}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.exploitGroundWaterCount.licensingAuthorities.province}</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid xs={12} md={4} sx={{ p: 2 }}>
                <Accordion sx={{ backgroundColor: COLORS[2] }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[2]} : {loading ? <CircularProgress size={20} color='inherit' /> : data.probedGroundWaterCount.totalCount}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid xs={12} sm={12} md={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Grid xs={4} sx={{ p: 2 }}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.probedGroundWaterCount.totalCount}</Typography>
                                <img src='/images/constructionTypes/probed.png' alt='license_img' width={65} height={65}></img>
                            </Grid>
                            <Grid xs={8} sx={{ p: 2 }}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: {loading ? <CircularProgress size={20} color='inherit' /> : data.probedGroundWaterCount.licenseValidity}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.probedGroundWaterCount.licensingAuthorities.minister}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.probedGroundWaterCount.licensingAuthorities.province}</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid xs={12} md={4} sx={{ p: 2 }}>
                <Accordion sx={{ backgroundColor: COLORS[3] }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[3]} : {loading ? <CircularProgress size={20} color='inherit' /> : data.drillingPracticeCount.totalCount}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid xs={12} sm={12} md={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Grid xs={4} sx={{ p: 2 }}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.drillingPracticeCount.totalCount}</Typography>
                                <img src='/images/constructionTypes/drilling-practice.png' alt='license_img' width={65} height={65}></img>
                            </Grid>
                            <Grid xs={8} sx={{ p: 2 }}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: {loading ? <CircularProgress size={20} color='inherit' /> : data.drillingPracticeCount.licenseValidity}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.drillingPracticeCount.licensingAuthorities.minister}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.drillingPracticeCount.licensingAuthorities.province}</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid xs={12} md={4} sx={{ p: 2 }}>
                <Accordion sx={{ backgroundColor: COLORS[4] }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[4]} : {loading ? <CircularProgress size={20} color='inherit' /> : data.dischargeWaterCount.totalCount}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid xs={12} sm={12} md={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Grid xs={4} sx={{ p: 2 }}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.dischargeWaterCount.totalCount}</Typography>
                                <Recycling sx={{ width: 65, height: 65, color: '#fff' }} />
                            </Grid>
                            <Grid xs={8} sx={{ p: 2 }}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: {loading ? <CircularProgress size={20} color='inherit' /> : data.dischargeWaterCount.licenseValidity}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.dischargeWaterCount.licensingAuthorities.minister}</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: {loading ? <CircularProgress size={20} color='inherit' /> : data.dischargeWaterCount.licensingAuthorities.province}</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    )
}
export default CountLicenseForManage