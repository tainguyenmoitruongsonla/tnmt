// import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const MapPopup = ({ popupData }: any) => {

    return (
        <Box>
            <TableContainer component={Paper} sx={{height: 200, overFlowY: 'scroll'}}>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow >
                            <TableCell align='left' sx={{p: '0 !important', width: 80}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Y: {popupData.y}</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>X: {popupData.x}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Năm bắt đầu vận hành:</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Chế độ KT <br/> (<sub>giờ / ngày đêm</sub>)</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.exploitMode}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Q <sub>max khai thác</sub></Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.exploitMaxFlow}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Q <sub>tối thiểu</sub></Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.minimumFlow}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Q <sub>max qua NM</sub></Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.maximumFlow}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Nguồn nước khai thác</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.exploitedWS}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Phương thức khai thác</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.exploitMethod}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Công suất lắp máy</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.power}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Chiều cao đập</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.damHeight}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Chiều dài đập</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.damWidth}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Mực nước dâng bình thường</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.riseWL}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Mực nước chết</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.deadWL}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Mực nước lớn nhất trước lũ</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.preFlootMaxWL}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Mực nước đón lũ</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Mực nước thượng lưu</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.upstreamWL}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Mực nước hạ lưu</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.downstreamWL}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Mực nước lũ thiết kế</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.designFloodLevel}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Mực nước lũ kiểm tra</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.checkFloodWL}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Dung tích hữu ích</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.usefulCapacity}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Dung tích toàn bộ</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.totalCapacity}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default MapPopup;