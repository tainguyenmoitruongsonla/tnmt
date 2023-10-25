import { useState, useEffect } from 'react';
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
  } from '@mui/material'

  const MonitoringSFData = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);

      return () => clearInterval(interval);
    }, []);
    
    return (
      <Grid>
        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center' }}><img src='/images/icon/live.gif' width={25} height={20} alt="live" />&nbsp;Thời gian hiện tại: {time.toLocaleString('zh-HK', { hour12: false})}</Typography>
        <TableContainer component={Paper} sx={{ mt: 5 }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell size='small' align='center' rowSpan={2}>
                  STT
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Thời gian
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Lượng mưa <br/>(mm)
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Mực nước <br/> hạ lưu (m)
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Dung tích hồ <br/> (triệu m<sup>3</sup>)
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Q đến hồ<br/> (m<sup>3</sup>/s)
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Mực nước thượng lưu hồ (m)
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Q xả qua tràn (m<sup>3</sup>/s)
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Q xả qua nhà máy (m<sup>3</sup>/s)
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Q xả DCTT (m<sup>3</sup>/s)
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Q về hạ du (m<sup>3</sup>/s)
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Dự kiến Q về hạ du <br/> trong 12h tới(m<sup>3</sup>/s)
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                Mực nước hồ <br/>dự kiến 12h tới (m)
                </TableCell>
              </TableRow>
  
              <TableRow>
                <TableCell size='small' align='center'>Yêu cầu</TableCell>
                <TableCell size='small' align='center'>Thực tế</TableCell>
                <TableCell size='small' align='center'>Chênh lệch</TableCell>
                <TableCell size='small' align='center'>Yêu cầu</TableCell>
                <TableCell size='small' align='center'>Thực tế</TableCell>
                <TableCell size='small' align='center'>Chênh lệch</TableCell>
                <TableCell size='small' align='center'>Yêu cầu</TableCell>
                <TableCell size='small' align='center'>Thực tế</TableCell>
                <TableCell size='small' align='center'>Chênh lệch</TableCell>
                <TableCell size='small' align='center'>Yêu cầu</TableCell>
                <TableCell size='small' align='center'>Thực tế</TableCell>
                <TableCell size='small' align='center'>Chênh lệch</TableCell>
                <TableCell size='small' align='center'>Yêu cầu</TableCell>
                <TableCell size='small' align='center'>Thực tế</TableCell>
                <TableCell size='small' align='center'>Chênh lệch</TableCell>
              </TableRow>
            </TableHead>
  
            <TableBody className='tableBody'>
              <TableRow>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">24/10/2023 15:15:00</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">25</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">15.7</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">3.2</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">4</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">12</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">11</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">4.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">6.9</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">8.4</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1.5</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">11</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">4</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">4.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">6.9</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">8.4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center  size='small' align-middle font-13">2</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">24/10/2023 15:20:00</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">25.2</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">16.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">3.2</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5.1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">11</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">3</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5.9</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">4.8</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">6.9</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">9.1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1.5</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">11</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">4</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">4.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">6.9</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">8.4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center  size='small' align-middle font-13">3</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">24/10/2023 15:25:05</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">25</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">16.1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">3.2</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">11</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">10</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5.0</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">8.4</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1.5</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">11</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">4</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">4.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">6.9</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">8.4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center  size='small' align-middle font-13">4</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">24/10/2023 15:30:05</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">25</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">16.1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">3.2</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">11</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">10</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5.0</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">8.4</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1.5</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">11</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">4</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">4.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">6.9</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">8.4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center  size='small' align-middle font-13">5</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">24/10/2023 15:35:05</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">23.9</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">14.9</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">3.2</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">2</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">11</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5.0</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">8.4</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1.5</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">11</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">4</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">5.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">4.6</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">6.9</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">8.4</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    )
  }
  
  export default MonitoringSFData
  