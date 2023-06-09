import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const COLORS = ['rgb(106, 179, 230)', 'rgb(0, 61, 126)', 'rgb(125, 95, 58)', 'rgb(0, 178, 151)', 'rgb(244, 153, 23)'];
const CHARTS_LEGEND = ['KTSD nước mặt', 'KTSD nước dưới đất', 'Thăm dò nước dưới đất', 'Hành nghề khoan', 'Xả thải vào nguồn nước'];

const CountLicenseForManage = () => {
    
    return(
        <Grid item xs={12} sm={12} md={12} sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            <Grid item xs={12} md={4} sx={{p:2}}>
                <Accordion sx={{backgroundColor: COLORS[0]}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: '#fff'}} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[0]} : 123</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12} sm={12} md={12} sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                            <Grid item xs={4} sx={{p:2}}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: 123</Typography>
                                <img src='/images/licenses/expire.png' width={65} height={65}></img>
                            </Grid>
                            <Grid item xs={8} sx={{p:2}}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: 111</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: 69</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: 42</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12} md={4} sx={{p:2}}>
               <Accordion sx={{backgroundColor: COLORS[1]}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: '#fff'}} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[1]} : 123</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12} sm={12} md={12} sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                            <Grid item xs={4} sx={{p:2}}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: 123</Typography>
                                <img src='/images/licenses/expire.png' width={65} height={65}></img>
                            </Grid>
                            <Grid item xs={8} sx={{p:2}}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: 111</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: 69</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: 42</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12} md={4} sx={{p:2}}>
               <Accordion sx={{backgroundColor: COLORS[2]}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: '#fff'}} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[2]} : 123</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12} sm={12} md={12} sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                            <Grid item xs={4} sx={{p:2}}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: 123</Typography>
                                <img src='/images/licenses/expire.png' width={65} height={65}></img>
                            </Grid>
                            <Grid item xs={8} sx={{p:2}}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: 111</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: 69</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: 42</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12} md={4} sx={{p:2}}>
               <Accordion sx={{backgroundColor: COLORS[3]}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: '#fff'}} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[3]} : 123</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12} sm={12} md={12} sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                            <Grid item xs={4} sx={{p:2}}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: 123</Typography>
                                <img src='/images/licenses/expire.png' width={65} height={65}></img>
                            </Grid>
                            <Grid item xs={8} sx={{p:2}}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: 111</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: 69</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: 42</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12} md={4} sx={{p:2}}>
               <Accordion sx={{backgroundColor: COLORS[4]}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: '#fff'}} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography fontWeight={'bold'} color={'#fff'}>{CHARTS_LEGEND[4]} : 123</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid item xs={12} sm={12} md={12} sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                            <Grid item xs={4} sx={{p:2}}>
                                <Typography variant='body2' pt={1} pb={3} fontWeight={'bold'} color={'#fff'}>Đã cấp: 123</Typography>
                                <img src='/images/licenses/expire.png' width={65} height={65}></img>
                            </Grid>
                            <Grid item xs={8} sx={{p:2}}>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>Còn hiệu lực: 111</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>BTNMT cấp: 69</Typography>
                                <Typography variant='body2' py={1} fontWeight={'bold'} color={'#fff'}>UBND Tỉnh cấp: 42</Typography>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    )
}
export default CountLicenseForManage