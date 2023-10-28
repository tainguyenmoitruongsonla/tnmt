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

const Map = dynamic(() => import('src/@core/components/map'), { ssr: false })

// eslint-disable-next-line react-hooks/rules-of-hooks
const GroundConstruction = () => {
  //Init columnTable
  const columnsTable: GridColDef[] = [
    { field: 'id', headerAlign: 'center', headerName: 'ID', minWidth: 90 },
    {
      field: 'tenCT',
      headerAlign: 'center',
      headerName: 'Tên công trình',
      minWidth: 350,
      renderCell: data => (
        <Typography className='btnShowFilePdf' onClick={() => zoomConstruction([data.row.lat, data.row.lng])}>
          {data.row.tenCT}
        </Typography>
      )
    },
    { field: 'viTriCT', headerAlign: 'center', headerName: 'Ví trí công trình', minWidth: 350 },
    { field: 'mucDichhKT', headerAlign: 'center', headerName: 'Mục đích khai thác,sử dụng nước', minWidth: 250 },
    { field: 'soLuongGiengKT', headerAlign: 'center', headerName: 'Số giếng khai thác', minWidth: 150 },
    { field: 'namBatDauVanHanh', headerAlign: 'center', headerName: 'Năm vận hành', minWidth: 100 },
    {
      field: 'sohieu',
      headerAlign: 'center',
      headerName: 'Số hiệu',
      minWidth: 150,
      renderCell: data => <span>{data.row.hangmuc?.tenHangMuc}</span>
    },
    {
      field: 'thoiGianHNK',
      headerAlign: 'center',
      headerName: 'Thời gian hành nghề khoan',
      minWidth: 150
    },

    //coordinates
    { field: 'x', headerAlign: 'center', headerName: 'X', minWidth: 150 },
    { field: 'y', headerAlign: 'center', headerName: 'Y', minWidth: 150 },

    //
    {
      field: 'Chieusauthunuoctu',
      headerAlign: 'center',
      headerName: 'Từ ',
      minWidth: 150,
      renderCell: data => <span>{data.row.hangmuc.thongso?.chieuSauDoanThuNuocTu}</span>
    },
    {
      field: 'Chieusauthunuocden',
      headerAlign: 'center',
      headerName: 'Đến',
      minWidth: 150,
      renderCell: data => <span>{data.row.hangmuc.thongso?.chieuSauDoanThuNuocDen}</span>
    },

    //constructionDetails
    {
      field: 'waterSupplyFlow',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          Q<sub>khai thác</sub> (m<sup>3</sup>/ng.đêm)
        </span>
      ),
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.qKhaiThac}</span>
    },
    {
      field: 'wellWL',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          {' '}
          H<sub>giếng khai thác</sub>
        </span>
      ),
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.hGiengKT}</span>
    },
    {
      field: 'monitoringWellWL',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          {' '}
          H<sub>giếng quan trắc</sub>
        </span>
      ),
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.hgieng}</span>
    },
    {
      field: 'exploitMethod',
      headerAlign: 'center',
      headerName: 'Chế độ KT (giờ/ng.đêm)',
      minWidth: 150,
      renderCell: data => <span>{data.row?.cheDoKT}</span>
    },
    {
      field: 'staticWL',
      headerAlign: 'center',
      headerName: 'Chiều sâu MN tĩnh(m)',
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.mucNuocTinh}</span>
    },
    {
      field: 'dynamicWL',
      headerAlign: 'center',
      headerName: 'Chiều sâu MN động max(m)',
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.mucNuocDong}</span>
    },
    {
      field: 'exploitAquifer',
      headerAlign: 'center',
      headerName: 'Tầng chứa nước KT',
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.tangChuaNuocKT}</span>
    },
    {
      field: 'lowWL',
      headerAlign: 'center',
      headerName: 'Mực nước hạ thấp',
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.hHaThap}</span>
    },

    //license
    {
      field: 'so_gp',
      headerAlign: 'center',
      headerName: 'Số GP',
      minWidth: 150,
      renderCell: params => (
        <div style={{ width: '100%' }}>
          {params.row.giayphep?.map((e: any) => (
            <div key={e.id}>
              <ShowFilePDF
                name={e?.soGP || ''}
                src={`/pdf/giay-phep/${e.coQuanCapPhep?.toLowerCase()}/${new Date(e?.ngayKy).getFullYear()}/`}
                fileName={e?.filePDF || ''}
              />
            </div>
          ))}
        </div>
      )
    },
    {
      field: 'ngaycap_gp',
      headerAlign: 'center',
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
      headerName: 'Số QĐ',
      minWidth: 150,
      renderCell: params => (
        <div style={{ width: '100%' }}>
          {params.row.giayphep?.map((e: any) =>
            e?.tiencq.map((e: any) => (
              <div key={e.id}>
                <ShowFilePDF
                  name={e?.soQDTCQ || ''}
                  src={`/pdf/tien-cap-quyen/${e.coQuanCP?.toLowerCase()}/${new Date(e?.ngayKy).getFullYear()}/`}
                  fileName={e?.filePDF || ''}
                />
              </div>
            ))
          )}
        </div>
      )
    },
    {
      field: 'tong_tcq',
      headerAlign: 'center',
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
      headerName: '#',
      minWidth: 120,
      sortable: false,
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
      children: [
        { field: 'tenCT' },
        { field: 'viTriCT' },
        { field: 'mucDichhKT' },
        { field: 'soLuongGiengKT' },
        { field: 'thoiGianHNK' },
        { field: 'namBatDauVanHanh' },
        { field: 'sohieu' }
      ]
    },
    {
      groupId: 'Tọa độ',

      headerAlign: 'center',
      children: [{ field: 'x' }, { field: 'y' }]
    },
    {
      groupId: 'Chiều sâu đoạn thu nước(m)',

      headerAlign: 'center',
      children: [{ field: 'Chieusauthunuoctu' }, { field: 'Chieusauthunuocden' }]
    },
    {
      groupId: 'Thông số của công trình',

      headerAlign: 'center',
      children: [
        { field: 'waterSupplyFlow' },
        { field: 'wellWL' },
        { field: 'monitoringWellWL' },
        { field: 'exploitMethod' },
        { field: 'staticWL' },
        { field: 'dynamicWL' },
        { field: 'exploitAquifer' },
        { field: 'lowWL' }
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
    'nuocduoidat',
    'khaithac',
    'thamdo',
    'congtrinh_nuocduoidatkhac'
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
          console.log(data)
        })

        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    getDataConstruction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postSuccess, paramsFilter])

  useEffect(() => {
    const filteredData = resData.filter((item: { [key: string]: any }) =>
      initConsType.some((keyword: any) =>
        item['loaiCT']?.['maLoaiCT']?.toString().toLowerCase().includes(keyword.toLowerCase())
      )
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
          <Map center={mapCenter} zoom={mapZoom} showLabel={showLabel} mapMarkerData={dataFiltered} />
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

export default GroundConstruction
