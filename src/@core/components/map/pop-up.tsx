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
            <TableContainer component={Paper} sx={{height: 215, overFlowY: 'scroll'}}>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow >
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Vĩ độ: {popupData.lat}</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Kinh độ: {popupData.lng}</Typography>
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
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Chế độ khai thác <br/> (<sub>giờ / ngày đêm</sub>)</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Q <sub>max khai thác</sub></Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Q <sub>tối thiểu</sub></Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Q <sub>max qua nhà máy</sub></Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Nguồn nước khai thác</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Phương thức khai thác</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Công suất lắp máy</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Chiều cao đập</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Chiều dài đập</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Mực nước dâng bình thường</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Mực nước chết</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Mực nước lớn nhất trước lũ</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
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
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Mực nước hạ lưu</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Mực nước lũ thiết kế</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Mực nước lũ kiểm tra</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Dung tích hữu ích</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>Dung tích toàn bộ</Typography>
                            </TableCell>
                            <TableCell align='left' sx={{p: '0 !important'}}>
                                <Typography sx={{fontSize: 12, my: '5px !important'}}>{popupData.startDate}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default MapPopup;