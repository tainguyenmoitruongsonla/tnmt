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

interface LicenseData {
  [key: string]: {
    thisPeriod: any // Thay any bằng kiểu dữ liệu phù hợp
    previousPeriod: any // Thay any bằng kiểu dữ liệu phù hợp
  }
}

const FormContruction = () => {
  const [dataCountered, setDataCountered] = useState<any>({})
  const [loading, setLoading] = useState(false)
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

  const licExploitGroundWater = ['khaithac']
  const licProbedGroundWater = ['thamdo']
  const licDrillingPractice = ['hanhnghekhoan']
  const dischargeWaterCons = [
    'khu_cumcn_taptrung',
    'sx_tieuthu_cn',
    'sx_kd_dv',
    'cs_benhvien',
    'khudancu_langnghe',
    'channuoi_ntts',
    'congtrinh_xathaikhac'
  ]

  const countLicense = (data: any, constructionTypeArray: string[]) => {
    return data.reduce(
      (count: any, item: any) => {
        if (constructionTypeArray.includes(item.constructionTypeSlug)) {
          // Licensing Authorities
          let ministerCount = count.minister
          let provinceCount = count.province
          if (item.licensingAuthorities === 'BTNMT') {
            ministerCount++
          } else if (item.licensingAuthorities === 'UBNDT') {
            provinceCount++
          }

          return {
            total: count.total + 1,
            minister: ministerCount,
            province: provinceCount
          }
        }

        return count
      },
      { total: 0, minister: 0, province: 0 }
    )
  }


  useEffect(() => {
    const getDataLicense = async () => {
      try {
        setLoading(true)
        const data = await getData('License/list')

        const licenseTypes = [
          { name: 'Khai thác nước mặt', types: licSurfaceWater },
          { name: 'Khai thác nước dưới đất', types: licExploitGroundWater },
          { name: 'Thăm dò nước dưới đất', types: licProbedGroundWater },
          { name: '	Hành nghề khoan nước dưới đất', types: licDrillingPractice },
          { name: '	Xả nước thải vào nguồn nước', types: dischargeWaterCons }
        ]

        const today = new Date()
        const previousYearStart = new Date(today.getFullYear() - 1, 0, 1)

        const licenseData: LicenseData = {}

        for (const { name, types } of licenseTypes) {
          const thisPeriodData = countLicense(data, types)

          const dataPreviousYear = data.filter((item: any) => {
            const itemDate = new Date(item.signDate)

            return itemDate >= previousYearStart && itemDate < today
          })

          const previousPeriodData = countLicense(dataPreviousYear, types)

          licenseData[name] = {
            thisPeriod: thisPeriodData,
            previousPeriod: previousPeriodData
          }
        }

        setDataCountered((prevState: any) => ({
          ...prevState,
          ...licenseData
        }))
      } catch (e) {
        // Xử lý lỗi
      }
      finally {
        setLoading(false)
      }
    }
    getDataLicense()
  })

  return (
    <Paper sx={{ p: 8 }}>
      {/* dautrang */}

      <Grid container>
        <Grid md={11}>
          <Typography variant='h5'>Biểu mẫu số 16. Tổng hợp số lượng giấy phép tài nguyên nước đã được cấp</Typography>
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
          Tổng hợp số lượng giấy phép tài nguyên nước đã được cấp
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
                  <TableCell size='small' align='center' rowSpan={4}>
                    Loại giấy phép
                  </TableCell>
                  <TableCell size='small' align='center' rowSpan={2} colSpan={3}>
                    Tổng số giấy phép đã cấp
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={6}>
                    Tổng số giấy phép cấp phân theo thẩm quyền
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell size='small' align='center' colSpan={3}>
                    Bộ TNMT cấp
                  </TableCell>
                  <TableCell size='small' align='center' colSpan={3}>
                    Địa phương cấp
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
                    (3)= (2)-(1)
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (4)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (5)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (6)=(5)-(4)
                  </TableCell>

                  <TableCell size='small' align='center'>
                    (7)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (8)&nbsp;
                  </TableCell>
                  <TableCell size='small' align='center'>
                    (9)=(8)-(7)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className='tableBody'>
                {Object.entries(dataCountered).map(([index, value]: [string, any], rowIndex: number) => (
                  <TableRow key={index}>
                    <TableCell className="text-center  size='small' align-middle font-13">{rowIndex + 1}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">{index}</TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {value.previousPeriod.total}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {value.thisPeriod.total}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {' '}
                      {`${value.thisPeriod.total - value.previousPeriod.total}`}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {value.previousPeriod.minister}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {value.thisPeriod.minister}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {' '}
                      {`${value.thisPeriod.minister - value.previousPeriod.minister}`}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {value.previousPeriod.province}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {value.thisPeriod.province}
                    </TableCell>
                    <TableCell className="text-center  size='small' align-middle font-13">
                      {' '}
                      {`${value.thisPeriod.province - value.previousPeriod.province}`}
                    </TableCell>
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

const Bieumau16 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 16'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 16</Typography>
              <Typography className='text-success text-weight-bold _font12'>Số lượng giấy phép TNN đã cấp</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU16.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau16
