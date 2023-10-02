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
import React from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import HeaderReport from './HeaderReport'
import FooterReport from './FooterReport'
import { getData } from 'src/api/axios'



const FormContruction = () => {
  const [bieuMa11, setBieuMa11] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function getDataLocations() {
      try {
        setLoading(true)
        const districtData = await getData('Locations/list/distric/51')

        const consData = await getData('Construction/list')

        const newBieuMa11 = []; // tao mang moi de luu tru du lieu moi

        for (const row of districtData) {
          // Lấy dữ liệu về nuocmat

          const hydroelectricItems = consData.filter(
            (item: any) =>
              item.constructionTypeSlug === 'thuydien' && item.districtId?.toString() === row.districtId?.toString()
          ).length
          const reservoirItems = consData.filter(
            (item: any) =>
              item.constructionTypeSlug === 'hochua' && item.districtId?.toString() === row.districtId?.toString()
          ).length
          const irrigationDamItems = consData.filter(
            (item: any) =>
              item.constructionTypeSlug === 'dapthuyloi' && item.districtId?.toString() === row.districtId?.toString()
          ).length
          const drainItems = consData.filter(
            (item: any) =>
              item.constructionTypeSlug === 'cong' && item.districtId?.toString() === row.districtId?.toString()
          ).length
          const pumpStationItems = consData.filter(
            (item: any) =>
              item.constructionTypeSlug === 'trambom' && item.districtId?.toString() === row.districtId?.toString()
          ).length
          const conSufaceOther = consData.filter(
            (item: any) =>
              item.constructionTypeSlug === 'congtrinh_nuocmatkhac' && item.districtId?.toString() === row.districtId?.toString()
          ).length

          const drilledWellItems = consData.filter(
            (item: any) =>
              item.constructionTypeSlug === 'khaithac' && item.districtId?.toString() === row.districtId?.toString()
          ).length
          const conGroundOther = consData.filter(
            (item: any) =>
              item.constructionTypeSlug === 'congtrinh_nuocduoidatkhac' && item.districtId?.toString() === row.districtId?.toString()
          ).length


          const itemBieuMa11: any = {
            district: row.districtName,
            allCons: 0,
            hydroelectric: hydroelectricItems,
            reservoir: reservoirItems,
            irrigationDam: irrigationDamItems,
            drain: drainItems,
            pumpStation: pumpStationItems,
            conSuface: conSufaceOther,
            drilledWell: drilledWellItems,
            conGround: conGroundOther,

          }
          newBieuMa11.push(itemBieuMa11);
        }
        setBieuMa11(newBieuMa11)

      } catch (error) {
        console.error(error)
      }
      finally {
        setLoading(false)
      }
    }

    getDataLocations()
  }, [])

  return (
    <Paper sx={{ p: 8 }}>
      {/* dautrang */}

      <Grid container>
        <Grid md={11}>
          <Typography variant='h5'>Biểu mẫu số 11.Số lượng công trình khai thác phân theo loại hình công trình khai thác </Typography>
        </Grid>
        <Grid md={1}>
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </Grid>
      </Grid>
      <HeaderReport />
      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h4'>
          BÁO CÁO
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          Số lượng công trình khai thác phân theo loại hình công trình khai thác
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>
      {loading ? (
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
                  <TableCell size='small' align='center' rowSpan={3}>
                    Huyện
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={3}>
                    Tổng số công trình
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={8}>
                    Số lượng công trình phân loại theo loại hình
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell size='small' align='center' colSpan={6}>
                    Khai thác nước mặt
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={2}>
                    Khai thác nước dưới đất
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell size='small' align='center' >
                    Hồ chứa thủy điện
                  </TableCell>
                  <TableCell size='small' align='center' >
                    Hồ chứa thủy lợi
                  </TableCell>
                  <TableCell size='small' align='center' >
                    Đập dâng
                  </TableCell>
                  <TableCell size='small' align='center' >
                    Cống
                  </TableCell>
                  <TableCell size='small' align='center' >
                    Trạm bơm
                  </TableCell>
                  <TableCell size='small' align='center' >
                    Khác
                  </TableCell>

                  <TableCell size='small' align='center' >
                    Giếng khoan
                  </TableCell>
                  <TableCell size='small' align='center' >
                    Khác
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
                    (4)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (5)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (6)
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (7)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (8)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (9)
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (10)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className='tableBody'>
                {bieuMa11.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center  size='small' align-middle font-13">{index + 1}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.district}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.allCons}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.hydroelectric}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.reservoir}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.irrigationDam}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.drain}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.pumpStation}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.conSuface}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.drilledWell}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{item.conGround}</TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
      <FooterReport />
    </Paper>
  )
}

const Bieuma11 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 10'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 11</Typography>
              <Typography className='text-success text-weight-bold _font12'>Số lượng CTKT phân theo loại hình</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU11.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieuma11
