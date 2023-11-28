//React Imports
import React, { useState, useEffect, useRef } from 'react'

//MUI Imports
import { Box, Typography, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid'

//Other Imports
import ShowFilePDF from 'src/@core/components/show-file-pdf'
import DataGridComponent from 'src/@core/components/data-grid'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import dynamic from 'next/dynamic'
import { getData } from 'src/api/axios'
import CreateConstruction from '../form'
import ConstructionToolBar from '../tool-bar'
import { useRouter } from 'next/router'
import DeleteData from 'src/@core/components/delete-data'
import MapLegend from '../MapLegend'
import GetConstructionTypeId from 'src/@core/components/get-construction-type'
import { ConverterCood } from 'src/@core/components/map/convert-coord'

const Map = dynamic(() => import('src/@core/components/map'), { ssr: false })

// eslint-disable-next-line react-hooks/rules-of-hooks
const DischargeConstruction = () => {
  //Init columnTable
  const columnsTable: GridColDef[] = [
    { field: 'id', headerAlign: 'center', sortable: false, headerName: 'ID', minWidth: 90 },
    {
      field: 'tenCT',
      headerAlign: 'center',
      sortable: false,
      headerName: 'Tên công trình',
      minWidth: 350,
      renderCell: data => (
        <Typography className='btnShowFilePdf' onClick={() => zoomConstruction(ConverterCood(data.row.y, data.row.x))}>
          {data.row.tenCT}
        </Typography>
      )
    },
    { field: 'viTriCT', headerAlign: 'center', sortable: false, headerName: 'Vị trí công trình', minWidth: 350 },
    { field: 'viTriXT', headerAlign: 'center', sortable: false, headerName: 'Ví trí xả thải', minWidth: 250 },
    {
      field: 'nguonNuocXT',
      headerAlign: 'center',
      sortable: false,
      headerName: 'Nguồn tiếp nhận nước thải',
      minWidth: 250
    },

    //coordinates
    { field: 'x', headerAlign: 'center', sortable: false, headerName: 'X', minWidth: 150 },
    { field: 'y', headerAlign: 'center', sortable: false, headerName: 'Y', minWidth: 150 },

    //constructionDetails
    {
      field: 'phuongThucXT',
      headerAlign: 'center',
      sortable: false,
      headerName: 'Phương thức xả nước thải',
      minWidth: 150
    },
    { field: 'cHeDoXT', headerAlign: 'center', sortable: false, headerName: 'Chế độ xả nước thải', minWidth: 150 },
    {
      field: 'qXaThaiTB',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          Q<sub>xả trung bình</sub> (m<sup>3</sup>/ngày đêm){' '}
        </span>
      ),
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.qXaThaiTB}</span>
    },
    {
      field: 'qXaThaiLonNhat',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          Q<sub>xả lớn nhất</sub> (m<sup>3</sup>/ngày đêm)
        </span>
      ),
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.qXaThaiLonNhat}</span>
    },
    {
      field: 'kqKf',
      headerAlign: 'center',
      sortable: false,
      headerName: 'Chất lượng nước thải (hệ số Kq và Kf)',
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.kqKf}</span>
    },

    //license
    {
      field: 'so_gp',
      headerAlign: 'center',
      sortable: false,
      headerName: 'Số GP',
      minWidth: 150,
      renderCell: params => (
        <div style={{ width: '100%' }}>
          {params.row.giayphep?.map((e: any) => (
            <div key={e.id}>
              <ShowFilePDF name={e?.soGP} src={e?.fileGiayPhep} />
            </div>
          ))}
        </div>
      )
    },
    {
      field: 'ngaycap_gp',
      headerAlign: 'center',
      sortable: false,
      headerName: 'Thời hạn',
      minWidth: 150,
      renderCell: params => (
        <div style={{ width: '100%' }}>
          {params.row.giayphep?.map((e: any) => (
            <div key={e.id}>{e.thoiHan}</div>
          ))}
        </div>
      )
    },

    //licenseFee
    {
      field: 'qd_tcq',
      headerAlign: 'center',
      sortable: false,
      headerName: 'Số QĐ',
      minWidth: 150,
      renderCell: params => (
        <div style={{ width: '100%' }}>
          {params.row.giayphep?.map((e: any) =>
            e?.tiencq.map((e: any) => (
              <div key={e.id}>
                <ShowFilePDF name={e?.soQDTCQ} src={e?.filePDF} />
              </div>
            ))
          )}
        </div>
      )
    },
    {
      field: 'tong_tcq',
      headerAlign: 'center',
      sortable: false,
      headerName: 'Tổng tiền cấp quyền (VNĐ)',
      minWidth: 150,
      type: 'number',
      renderCell: params => (
        <div style={{ width: '100%' }}>
          {params.row.giayphep?.map((e: any) =>
            e?.tiencq.map((e: any) => (
              <div key={e.id}>
                {e.tongTienCQ.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                })}
              </div>
            ))
          )}
        </div>
      )
    },

    //Action
    {
      field: 'actions',
      headerAlign: 'center',
      sortable: false,
      headerName: '#',
      minWidth: 120,
      renderCell: data => (
        <Box>
          <CreateConstruction isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
          <DeleteData url={'Construction'} data={data} setPostSuccess={handlePostSuccess} />
        </Box>
      )
    }
  ]

  //Grouping Column
  const columnGroup: GridColumnGroupingModel = [
    {
      groupId: 'Thông tin công trình',

      headerAlign: 'center',
      children: [{ field: 'tenCT' }, { field: 'viTriCT' }, { field: 'viTriXT' }, { field: 'nguonNuocXT' }]
    },

    {
      groupId: 'Tọa độ (VN2000, Kinh tuyến trục 104⁰, múi chiếu 3⁰)',

      headerAlign: 'center',
      children: [{ field: 'x' }, { field: 'y' }]
    },

    {
      groupId: 'Phương thức xả thải',

      headerAlign: 'center',
      children: [
        { field: 'phuongThucXT' },
        { field: 'cHeDoXT' },
        { field: 'qXaThaiTB' },
        { field: 'qXaThaiLonNhat' },
        { field: 'kqKf' }
      ]
    },
    {
      groupId: 'Thông tin giấy phép',
      headerAlign: 'center',
      children: [{ field: 'so_gp' }, { field: 'ngaycap_gp' }, { field: 'hieuluc_gp' }]
    },

    {
      groupId: 'Tiền cấp quyền',
      headerAlign: 'center',
      children: [{ field: 'qd_tcq' }, { field: 'tong_tcq' }]
    },
    {
      groupId: ' ',

      headerAlign: 'center',
      children: [{ field: 'actions' }]
    }
  ]

  const [mapCenter, setMapCenter] = useState([15.012172, 108.676488])
  const [mapZoom, setMapZoom] = useState(9)
  const [showLabel, setShowLabel] = useState(false)
  const [resData, setResData] = useState([])
  const [dataFiltered, setDataFiltered] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [postSuccess, setPostSuccess] = useState(false)

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }

  const [paramsFilter, setParamsFilter] = useState({
    tenct: null,
    loai_ct: GetConstructionTypeId(router),
    huyen: 0,
    xa: 0,
    song: 0,
    luuvuc: 0,
    tieu_luuvuc: 0,
    tang_chuanuoc: 0,
    tochuc_canhan: 0,
    nguonnuoc_kt: null
  })

  const [initConsType, setInitConstype] = useState<any>([
    'xathai',
    'khu_cumcn_taptrung',
    'sx_tieuthu_cn',
    'sx_kd_dichvu',
    'cs_benhvien',
    'khudancu_langnghe',
    'channuoi_ntts',
    'congtrinhkhac_xt'
  ])

  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    const getDataConstruction = async () => {
      setLoading(true)
      getData('cong-trinh/danh-sach', paramsFilter)
        .then(data => {
          if (isMounted.current) {
            setResData(data)
          }
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    getDataConstruction()
  }, [postSuccess, paramsFilter])

  useEffect(() => {
    const filteredData = resData.filter((item: { [key: string]: any }) =>
      initConsType.some((keyword: any) => item['loaiCT']?.['maLoaiCT']?.toLowerCase().includes(keyword.toLowerCase()))
    )
    setDataFiltered(filteredData)
  }, [initConsType, resData])

  const handleFilterChange = (data: any, postSuccess: boolean | undefined) => {
    setParamsFilter(data)
    if (postSuccess !== undefined) {
      setPostSuccess(postSuccess)
    }
  }

  const zoomConstruction = (coords: any) => {
    setMapCenter(coords)
    setMapZoom(13)
  }

  const handleConsTypeChange = (data: any) => {
    setInitConstype(data)
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
          <Box className='map-legend' sx={{ background: 'white', pl: 2 }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onClick={() => setShowLabel(!showLabel)} />}
                label='Hiển thị tên công trình'
              />
            </FormGroup>
            <MapLegend onChange={handleConsTypeChange} />
          </Box>
          <Map center={mapCenter} zoom={mapZoom} showLabel={showLabel} mapData={dataFiltered} loading={false} />
        </Paper>
      </Grid>
      <Grid xs={12} md={12}>
        <Paper elevation={3} sx={{ p: 0, height: '100%' }}>
          <ConstructionToolBar onChange={handleFilterChange} />
          <DataGridComponent
            rows={dataFiltered}
            loading={loading}
            columns={columnsTable}
            columnGroupingModel={columnGroup}
            actions={<CreateConstruction isEdit={false} setPostSuccess={handlePostSuccess} />}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default DischargeConstruction
