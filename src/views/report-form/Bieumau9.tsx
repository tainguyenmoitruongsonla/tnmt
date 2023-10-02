import Paper from '@mui/material/Paper'
import {
  Grid,
  TextField,
  Typography,
  Link,
  Box,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import DialogControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import { useState, useEffect } from 'react'
import fetchData from 'src/api/fetch'
import React from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import HeaderReport from './HeaderReport'



const FormContruction = () => {
  const [bieuMau9, setBieuMau9] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true)
        const districtData = await fetchData('Locations/list/distric/51')

        const consData = await fetchData('Construction/list')

        const newBieuMau9 = []; // tao mang moi de luu tru du lieu moi

        for (const row of districtData) {
          // Lấy dữ liệu về nuocmat
          const licSurfaceWater = [
            'thuydien',
            'hochua',
            'trambom',
            'tramcapnuoc',
            'dapthuyloi',
            'cong',
            'nhamaynuoc',
            'congtrinh_nuocmatkhac'
          ]
          const sufaceWaterItem = consData.filter((item: any) =>
          licSurfaceWater.includes(item.constructionTypeSlug) &&
          item.districtId?.toString() === row.districtId?.toString()
          ).length
        
          const  sufaceWaterPrevPeriodItems = consData.filter(
            (item: any) =>
              licSurfaceWater.includes(item.constructionTypeSlug) &&
              item.startDate < new Date().getFullYear() &&
              item.districtId?.toString() === row.districtId?.toString()
          ).length

          const groundWaterItems = consData.filter(
            (item: any) =>
              item.constructionTypeSlug === 'khaithac' && item.districtId?.toString() === row.districtId?.toString()
          ).length
          
          const groundWaterPrevPeriodItems = consData.filter(
            (item: any) =>
              item.constructionTypeSlug === 'khaithac' &&
              item.startDate < new Date().getFullYear() &&
              item.districtId?.toString() === row.districtId?.toString()
          ).length

          const itemBieuMau9: any = {
            district: row.districtName,
            allConsPrevPeriod: 0,
            allConsThisPeriod: 0,
            allConsChange: 0,
            surfaceWaterConsPrevPeriod: sufaceWaterPrevPeriodItems,
            surfaceWaterConsThisPeriod: sufaceWaterItem,
            surfaceWaterConsChange: (sufaceWaterItem - sufaceWaterPrevPeriodItems),
            exploitGrountWaterPrevPeriod: groundWaterPrevPeriodItems,
            exploitGrountWaterThisPeriod: groundWaterItems,
            exploitGrountWaterChange: (groundWaterItems - groundWaterPrevPeriodItems)
          }
          newBieuMau9.push(itemBieuMau9);
        }
        setBieuMau9(newBieuMau9)

      } catch (error) {
        console.error(error)
      }
      finally{
        setLoading(false)
      }
    }

    getData()
  }, [])

  return (
    <Paper sx={{ p: 8 }}>
      {/* dautrang */}

      <Grid container>
        <Grid md={11}>
          <Typography variant='h5'>Biểu mẫu số 9. Số lượng công trình khai thác phân theo nguồn nước</Typography>
        </Grid>
        <Grid md={1}>
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </Grid>
      </Grid>
      <HeaderReport/>

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h4'>
          BÁO CÁO
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
        Số lượng công trình khai thác phân theo nguồn nước
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      {loading? (
              <BoxLoading />
          ) : (
            <Grid className='_text_center' sx={{ mt: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell size='small' align='center' rowSpan={4}>
                  STT
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Huyện
                </TableCell>
                <TableCell size='small' align='center'  colSpan={3}>
                  Tổng số công trình
                </TableCell>
                <TableCell size='small' align='center'  colSpan={3}>
                Số lượng công trình khai thác nước mặt
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                Số lượng công trình khai thác nước dưới đất
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  Lũy kế đến kỳ trước
                </TableCell>
                <TableCell size='small' align='center'>
                  Lũy kế đến kỳ báo cáo
                </TableCell>
                <TableCell size='small' align='center'>
                  Thay đổi
                </TableCell>

                <TableCell size='small' align='center'>
                  Lũy kế đến kỳ trước
                </TableCell>
                <TableCell size='small' align='center'>
                  Lũy kế đến kỳ báo cáo
                </TableCell>
                <TableCell size='small' align='center'>
                  Thay đổi
                </TableCell>

                <TableCell size='small' align='center'>
                  Lũy kế đến kỳ trước
                </TableCell>
                <TableCell size='small' align='center'>
                  Lũy kế đến kỳ báo cáo
                </TableCell>
                <TableCell size='small' align='center'>
                  Thay đổi
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  (1)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (2)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (3)
                </TableCell>

                <TableCell size='small' align='center'>
                  (4)= (3)-(2)
                </TableCell>
                <TableCell size='small' align='center'>
                  (5)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (6)
                </TableCell>

                <TableCell size='small' align='center'>
                  (7)=(6)-(5)
                </TableCell>
                <TableCell size='small' align='center'>
                  (8)&nbsp;
                </TableCell>
                <TableCell size='small' align='center'>
                  (9)
                </TableCell>
                <TableCell size='small' align='center'>
                (10)=(9)-(8)
                </TableCell>
              </TableRow>
            </TableHead>
               <TableBody className='tableBody'>
               {bieuMau9.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center  size='small' align-middle font-13">{index + 1}</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">{item.district}</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">{item.allConsPrevPeriod}</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">{item.allConsThisPeriod}</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">{item.allConsChange}</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">{item.surfaceWaterConsPrevPeriod}</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">{item.surfaceWaterConsThisPeriod}</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">{item.surfaceWaterConsChange}</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">{item.exploitGrountWaterPrevPeriod}</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">{item.exploitGrountWaterThisPeriod}</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">{item.exploitGrountWaterChange}</TableCell>
              </TableRow>
            ))}
          
             </TableBody>
          </Table>
        </TableContainer>
      </Grid>
          )}
      <Grid className='_space_between' sx={{ mt: 5 }}>
        <Grid>
          <Typography>Nơi nhận</Typography>
          <Typography>- Ban Giám đốc sở</Typography>
          <Typography>- Lưu:VT; TNN, KS&KTTV; VP, 10b</Typography>
        </Grid>

        <Grid>
          <Typography className='font-weight-bold' variant='h6'>
            Người thống kê
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

const Bieumau9 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 9'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 9</Typography>
              <Typography className='text-success text-weight-bold _font12'>Số lượng CTKT theo nguồn nước</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU9.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau9
