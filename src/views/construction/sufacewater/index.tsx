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
import { ConverterCood } from 'src/@core/components/map/convert-coord'
import CreateConstruction from '../form'
import { useRouter } from 'next/router'
import ConstructionToolBar from '../tool-bar'
import { getData } from 'src/api/axios'
import DeleteData from 'src/@core/components/delete-data'
import MapLegend from '../MapLegend'
import GetConstructionTypeId from 'src/@core/components/get-construction-type'

const Map = dynamic(() => import('src/@core/components/map'), { ssr: false })

// eslint-disable-next-line react-hooks/rules-of-hooks
const SurfaceConstruction = () => {
  //Init columnTable
  const columnsTable: GridColDef[] = [
    { field: 'id', headerAlign: 'center', headerName: 'ID', minWidth: 90 },
    {
      field: 'tenCT',
      headerAlign: 'center',
      headerName: 'Tên công trình',
      minWidth: 350,
      renderCell: data => (
        <Typography className='btnShowFilePdf' onClick={() => zoomConstruction(ConverterCood(data.row.y, data.row.x))}>
          {data.row.tenCT}
        </Typography>
      )
    },
    {
      field: 'viTriCT',
      headerAlign: 'center',
      headerName: 'Địa điểm',
      minWidth: 350
    },
    {
      field: 'coordinates',
      headerAlign: 'center',
      headerName: 'Toạ độ đập chính(X,Y)',
      minWidth: 200,
      valueGetter: data => `X: ${data.row.x}, Y: ${data.row.y}`
    },
    {
      field: 'nguonNuocKT',
      headerAlign: 'center',
      headerName: 'Nguồn nước khai thác',
      minWidth: 300
    },
    {
      field: 'phuongThucKT',
      headerAlign: 'center',
      headerName: 'Phương thức khai thác',
      minWidth: 300
    },
    {
      field: 'cheDoKT',
      headerAlign: 'center',
      headerName: 'Chế độ KT',
      minWidth: 300
    },
    {
      field: 'mucDichhKT',
      headerAlign: 'center',
      headerName: 'Mục đích KT',
      minWidth: 300
    },
    {
      field: 'basinName',
      headerAlign: 'center',
      headerName: 'Tiểu vùng quy hoạch',
      minWidth: 200
    },
    {
      field: 'namBatDauVanHanh',
      headerAlign: 'center',
      headerName: 'Năm vận hành',
      minWidth: 100
    },

    //constructionDetails
    {
      field: 'capCT',
      headerAlign: 'center',
      headerName: 'Cấp CT',
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.capCT}</span>
    },
    {
      field: 'dienTichLuuVuc',
      headerAlign: 'center',
      headerName: 'F lưu vực (km2)',
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.dienTichLuuVuc}</span>
    },
    {
      field: 'muaTrungBinhNam',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          X <sub>TB năm</sub> (m)
        </span>
      ),
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.muaTrungBinhNam}</span>
    },
    {
      field: 'qTrungBinhNam',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          Q <sub>TB năm</sub>(m3/s)
        </span>
      ),
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.qTrungBinhNam}</span>
    },
    {
      field: 'congSuatLM',
      headerAlign: 'center',
      headerName: 'CS lắp máy(MW)',
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.congSuatLM}</span>
    },
    {
      field: 'congSuatDamBao',
      headerAlign: 'center',
      headerName: 'CS đảm bảo (MW)',
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.congSuatDamBao}</span>
    },
    {
      field: 'chieuCaoDap',
      headerAlign: 'center',
      headerName: 'Chiều cao đập (m)',
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.chieuCaoDap}</span>
    },
    {
      field: 'chieuDaiDap',
      headerAlign: 'center',
      headerName: 'Chiều dài đập (m)',
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.chieuDaiDap}</span>
    },
    {
      field: 'caoTrinhDap',
      headerAlign: 'center',
      headerName: 'Cao trình đập (m)',
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.caoTrinhDap}</span>
    },
    {
      field: 'qmaxNM',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          Q<sub>max</sub>(m<sup>3</sup>/s)
        </span>
      ),
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.qmaxNM}</span>
    },
    {
      field: 'qtt',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          Q<sub>TT</sub>(m<sup>3</sup>/s)
        </span>
      ),
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.qtt}</span>
    },
    {
      field: 'qDamBao',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          Q<sub>đảm bảo</sub>(m<sup>3</sup>/s)
        </span>
      ),
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.qDamBao}</span>
    },
    {
      field: 'hmax',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          H<sub>max</sub> (m){' '}
        </span>
      ),
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.hmax}</span>
    },
    {
      field: 'hmin',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          H<sub>min</sub> (m)
        </span>
      ),
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.hmin}</span>
    },
    {
      field: 'htoiThieu',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          H<sub>TT</sub>
        </span>
      ),
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.htoiThieu}</span>
    },
    {
      field: 'mnc',
      headerAlign: 'center',
      headerName: 'MNC(m)',
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.mnc}</span>
    },
    {
      field: 'mndbt',
      headerAlign: 'center',
      headerName: 'MNDBT(m)',
      minWidth: 150,
      renderCell: data => <span>{data.row.thongso?.mndbt}</span>
    },
    {
      field: 'mnltk',
      headerAlign: 'center',
      headerName: 'MNLTK(m)',
      minWidth: 150,
      renderCell: data => (
        <span>
          {data.row.thongso?.mnltk}
        </span>
      )
    },
    {
      field: 'mnlkt',
      headerAlign: 'center',
      headerName: 'MNLKT(m)',
      minWidth: 150,
      renderCell: data => (
        <span>
          {data.row.thongso?.mnlkt}
        </span>
      )
    },
    {
      field: 'dungTichToanBo',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          W<sub>toàn bộ</sub>(triệu m<sup>3</sup>)
        </span>
      ),
      minWidth: 150,
      renderCell: data => (
        <span>
          {data.row.thongso?.dungTichToanBo}
        </span>
      )
    },
    {
      field: 'dungTichChet',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          W<sub> chết </sub>(triệu m<sup>3</sup>)
        </span>
      ),
      minWidth: 150,
      renderCell: data => (
        <span>
          {data.row.thongso?.dungTichChet}
        </span>
      )
    },
    {
      field: 'dungTichHuuIch',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          W<sub>hữu ích</sub>(triệu m<sup>3</sup>)
        </span>
      ),
      minWidth: 150,
      renderCell: data => (
        <span>
          {data.row.thongso?.dungTichHuuIch}
        </span>
      )
    },

    {
      field: 'soLuongMayBom',
      headerAlign: 'center',
      headerName: 'Số máy bơm',
      minWidth: 150,
      renderCell: data => (
        <span>
          {data.row.thongso?.soLuongMayBom}
        </span>
      )
    },
    {
      field: 'qThietKe',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          Q<sub>TK</sub> (m<sup>3</sup>/h)
        </span>
      ),
      minWidth: 150,
      renderCell: data => (
        <span>
          {data.row.thongso?.qThietKe}
        </span>
      )
    },
    {
      field: 'qThucTe',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          Q<sub>TT</sub> (m<sup>3</sup>/h)
        </span>
      ),
      minWidth: 150,
      renderCell: data => (
        <span>
          {data.row.thongso?.qThucTe}
        </span>
      )
    },
    {
      field: 'dienTichTuoiThietKe',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          F<sub>tưới TK</sub> (ha)
        </span>
      ),
      minWidth: 150,
      renderCell: data => (
        <span>
          {data.row.thongso?.dienTichTuoiThietKe}
        </span>
      )
    },
    {
      field: 'dienTichTuoiThucTe',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          F<sub>tưới TT</sub> (ha)
        </span>
      ),
      minWidth: 150,
      renderCell: data => (
        <span>
          {data.row.thongso?.dienTichTuoiThucTe}
        </span>
      )
    },
    {
      field: 'thoiGianBomTB',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          T<sub>bơm TB</sub>(h)
        </span>
      ),
      minWidth: 150,
      renderCell: data => (
        <span>
          {data.row.thongso?.thoiGianBomTB}
        </span>
      )
    },
    {
      field: 'thoiGianBomNhoNhat',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          T<sub>bơm min</sub>(h)
        </span>
      ),
      minWidth: 150,
      renderCell: data => (
        <span>
          {data.row.thongso?.thoiGianBomNhoNhat}
        </span>
      )
    },
    {
      field: 'thoiGianBomLonNhat',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          T<sub>bơm max</sub>(h)
        </span>
      ),
      minWidth: 150,
      renderCell: data => (
        <span>
          {data.row.thongso?.thoiGianBomLonNhat}
        </span>
      )
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
            <div key={e.id}>
              {e.thoiHan}
            </div>
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
                  src={`/pdf/tien-cap-quyen/${e.coQuanCP?.toLowerCase()}/${new Date(
                    e?.ngayKy
                  ).getFullYear()}/`}
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
          <DeleteData url={'cong-trinh'} data={data} setPostSuccess={handlePostSuccess} />
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
        { field: 'coordinates' },
        { field: 'nguonNuocKT' },
        { field: 'phuongThucKT' },
        { field: 'cheDoKT' },
        { field: 'mucDichhKT' },
        { field: 'basinName' },
        { field: 'constructionTime' },
        { field: 'namBatDauVanHanh' }
      ]
    },

    {
      groupId: 'Thông số của công trình',
      headerAlign: 'center',
      children: [
        { field: 'capCT' },
        { field: 'dienTichLuuVuc' },
        { field: 'muaTrungBinhNam' },
        { field: 'qTrungBinhNam' },
        { field: 'congSuatLM' },
        { field: 'congSuatDamBao' },
        { field: 'chieuCaoDap' },
        { field: 'chieuDaiDap' },
        { field: 'caoTrinhDap' },
        { field: 'qmaxNM' },
        { field: 'qtt' },
        { field: 'qDamBao' },
        { field: 'hmax' },
        { field: 'hmin' },
        { field: 'htoiThieu' },
        { field: 'mnc' },
        { field: 'mndbt' },
        { field: 'mnltk' },
        { field: 'mnlkt' },
        { field: 'dungTichToanBo' },
        { field: 'dungTichChet' },
        { field: 'dungTichHuuIch' },
        { field: 'soLuongMayBom' },
        { field: 'qThietKe' },
        { field: 'qThucTe' },
        { field: 'dienTichTuoiThietKe' },
        { field: 'dienTichTuoiThucTe' },
        { field: 'thoiGianBomTB' },
        { field: 'thoiGianBomNhoNhat' },
        { field: 'thoiGianBomLonNhat' }
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
  const [columnVisibility, setColumnVisibility] = useState<string[]>()

  const [postSuccess, setPostSuccess] = useState(false)

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  const [resData, setResData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [loading, setLoading] = useState(false)

  const router = useRouter()

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
    "nuocmat",
    "thuydien",
    "hochua",
    "trambom",
    "tramcapnuoc",
    "conglaynuoc",
    "nhamaynuoc"
  ])

  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    switch (paramsFilter.loai_ct) {
      case 1:
        setColumnVisibility([])
        break
      case 4:
        setColumnVisibility([
          'soLuongMayBom',
          'qThietKe',
          'qThucTe',
          'dienTichTuoiThietKe',
          'dienTichTuoiThucTe',
          'thoiGianBomTB',
          'thoiGianBomNhoNhat',
          'thoiGianBomLonNhat'
        ])
        break
      case 5:
        setColumnVisibility([
          'soLuongMayBom',
          'qThietKe',
          'qThucTe',
          'dienTichTuoiThietKe',
          'dienTichTuoiThucTe',
          'thoiGianBomTB',
          'thoiGianBomNhoNhat',
          'thoiGianBomLonNhat'
        ])
        break
      case 6:
        setColumnVisibility([
          'capCT',
          'dienTichLuuVuc',
          'muaTrungBinhNam',
          'qTrungBinhNam',
          'congSuatDamBao',
          'chieuCaoDap',
          'chieuDaiDap',
          'caoTrinhDap',
          'qmaxNM',
          'qtt',
          'qDamBao',
          'hmax',
          'hmin',
          'htoiThieu',
          'mnc',
          'mndbt',
          'mnltk',
          'mnlkt',
          'dungTichToanBo',
          'dungTichChet',
          'dungTichHuuIch',
          'qThietKe',
          'qThucTe'
        ])
        break
      case 10:
        setColumnVisibility([
          'capCT',
          'dienTichLuuVuc',
          'muaTrungBinhNam',
          'qTrungBinhNam',
          'congSuatDamBao',
          'chieuCaoDap',
          'chieuDaiDap',
          'caoTrinhDap',
          'qmaxNM',
          'qtt',
          'qDamBao',
          'hmax',
          'hmin',
          'htoiThieu',
          'mnc',
          'mndbt',
          'mnltk',
          'mnlkt',
          'dungTichToanBo',
          'dungTichChet',
          'dungTichHuuIch',
          'soLuongMayBom',
          'dienTichTuoiThietKe',
          'dienTichTuoiThucTe',
          'thoiGianBomTB',
          'thoiGianBomNhoNhat',
          'thoiGianBomLonNhat'
        ])
        break
      default:
        setColumnVisibility([
          'capCT',
          'dienTichLuuVuc',
          'muaTrungBinhNam',
          'qTrungBinhNam',
          'congSuatLM',
          'congSuatDamBao',
          'chieuCaoDap',
          'chieuDaiDap',
          'caoTrinhDap',
          'qmaxNM',
          'qtt',
          'qDamBao',
          'hmax',
          'hmin',
          'htoiThieu',
          'mnc',
          'mndbt',
          'mnltk',
          'mnlkt',
          'dungTichToanBo',
          'dungTichChet',
          'dungTichHuuIch',
          'soLuongMayBom',
          'qThietKe',
          'qThucTe',
          'dienTichTuoiThietKe',
          'dienTichTuoiThucTe',
          'thoiGianBomTB',
          'thoiGianBomNhoNhat',
          'thoiGianBomLonNhat'
        ])
        break
    }

    const getDataConstructions = async () => {
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
    getDataConstructions()
  }, [postSuccess, paramsFilter])

  useEffect(() => {
    const filteredData = resData.filter((item: { [key: string]: any }) =>
      initConsType.some((keyword: any) =>
        item['loaiCT']?.['maLoaiCT']?.toString().toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setDataFiltered(filteredData)
  }, [initConsType, resData]);

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
    setInitConstype(data);
  };

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
            columnVisibility={columnVisibility}
            actions={<CreateConstruction isEdit={false} setPostSuccess={handlePostSuccess} />}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default SurfaceConstruction
