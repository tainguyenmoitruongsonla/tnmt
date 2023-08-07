// ** MUI Imports
import { Grid, Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { AutoComplete } from 'src/@core/components/field'

// ** Icons Imports
import SearchIcon from '@mui/icons-material/Search'
import MapComponent from 'src/@core/components/map'
import { EditNote } from '@mui/icons-material'
import { Delete } from 'mdi-material-ui'
import TableComponent from 'src/@core/components/table'
import SearchConstruction from 'src/views/construction/Search'
import FormatDate from 'src/@core/components/format-date'
import CreateConstruction from 'src/views/construction/form/sufacewater'
import fetchData from 'src/api/fetch'
import { useLoadingContext } from 'src/@core/theme/loading-provider'
import postData from 'src/api/post'

const complete2 = [{ title: 'Đợt 1' }, { title: 'Đợt 2' }, { title: 'Đợt 3' }]
const formatNum = (num: any) => {
  if (typeof Intl === 'undefined' || !Intl.NumberFormat) {
    return 'NaN'
  } else {
    const nf = new Intl.NumberFormat()
    const x = num
    if (num !== undefined) {
      return nf.format(x)
    }
  }
}

// id of columnsTable is parameter to bind ex: get LicseFk.BasinId: id: 'License_Fk.BasinId'
const columnsTable = [
  { id: 'stt', label: 'STT', rowspan: 2 },
  { id: 'constructionName', label: 'Tên công trình', rowspan: 2 },
  { id: 'constructionLocation', label: 'Địa điểm', rowspan: 2 },
  {
    id: '#',
    label: 'Tọa độ đập chính',
    children: [
      { id: 'x', label: 'X' },
      { id: 'y', label: 'Y' }
    ]
  },
  { id: 'exploitedWS', label: 'Nguồn nước khai thác', rowspan: 2 },
  { id: 'miningMethod', label: 'Phương thức khai thác', rowspan: 2 },
  { id: 'miningMode', label: 'Chế độ KT', rowspan: 2 },
  { id: 'miningPurpose', label: 'Mục đích KT', rowspan: 2 },
  { id: 'smallPlanningArea', label: 'Tiểu vùng quy hoạch', showId: [1, 4, 5], rowspan: 2 },

  { id: 'constructionTime', label: 'Năm xây dựng', rowspan: 2 },
  { id: 'startDate', label: 'Năm vận hành', rowspan: 2 },

  {
    id: '#',
    label: 'Thông số công trình',
    showId: [1, 4, 5, 6, 11],
    children: [
      { id: 'constructionLevel', label: 'Cấp CT', showId: [1, 4, 5] },
      {
        id: 'basinArea',
        label: (
          <span>
            F lưu vực <br />
            (km2)
          </span>
        ),
        showId: [1, 4, 5]
      },
      {
        id: 'rainAvgForYears',
        label: (
          <span>
            X <sub>TB năm</sub> <br />
            (m)
          </span>
        ),
        showId: [1, 4, 5]
      },
      {
        id: 'flowAvgForYears',
        label: (
          <span>
            Q <sub>TB năm</sub>
            <br />
            (m3/s)
          </span>
        ),
        showId: [1, 4, 5]
      },
      { id: 'power', label: 'CS lắp máy(MW)', showId: [1, 4, 5, 6, 11] },
      {
        id: 'guaranteedPower',
        label: (
          <span>
            CS <br /> đảm bảo(MW)
          </span>
        ),
        showId: [1, 4, 5]
      },
      { id: 'damHeight', label: 'Chiều cao đập (m)', showId: [1, 5] },
      { id: 'damWidth', label: 'Chiều dài đập (m)', showId: [1, 5] },
      { id: 'damElevation', label: 'Cao trình đập (m)', showId: [1, 5] },
      {
        id: 'maximumFlow',
        label: (
          <span>
            Q<sub>max</sub>(m<sup>3</sup>/s)
          </span>
        ),
        showId: [1, 4, 5]
      },
      {
        id: 'minimumFlow',
        label: (
          <span>
            Q<sub>TT</sub>(m<sup>3</sup>/s)
          </span>
        ),
        showId: [1, 4, 5]
      },
      {
        id: 'guaranteedFlow',
        label: (
          <span>
            Q<sub>đảm bảo</sub>(m<sup>3</sup>/s)
          </span>
        ),
        showId: [1, 4, 5]
      },
      {
        id: 'hmax',
        label: (
          <span>
            H<sub>max</sub> (m){' '}
          </span>
        ),
        showId: [1, 4, 5]
      },
      {
        id: 'hmin',
        label: (
          <span>
            H<sub>min</sub> (m)
          </span>
        ),
        showId: [1, 4, 5]
      },
      {
        id: 'htt',
        label: (
          <span>
            H<sub>TT</sub>
          </span>
        ),
        showId: [1, 4, 5]
      },
      { id: 'deadWL', label: 'MNC(m)', showId: [1, 4, 5] },
      { id: 'riseWL', label: 'MNDBT(m)', showId: [1, 4, 5] },
      { id: 'designFloodLevel', label: 'MNLTK(m)', showId: [1, 4, 5] },
      { id: 'checkFloodWL', label: 'MNLKT(m', showId: [1, 4, 5] },
      {
        id: 'totalCapacity',
        label: (
          <span>
            W<sub>toàn bộ</sub>(triệu m<sup>3</sup>)
          </span>
        ),
        showId: [1, 4, 5]
      },
      {
        id: 'deadCapacity',
        label: (
          <span>
            W<sub> chết </sub>(triệu m<sup>3</sup>)
          </span>
        ),
        showId: [1, 4, 5]
      },
      {
        id: 'usefulCapacity',
        label: (
          <span>
            W<sub>hữu ích</sub>(triệu m<sup>3</sup>)
          </span>
        ),
        showId: [1, 4, 5]
      },
      { id: 'pumpNumber', label: 'Số máy bơm', showId: [1, 6] },
      {
        id: 'flowDesigned',
        label: (
          <span>
            Q<sub>TK</sub> (m<sup>3</sup>/h)
          </span>
        ),
        showId: [1, 11]
      },
      {
        id: 'realityFlow',
        label: (
          <span>
            Q<sub>TT</sub> (m<sup>3</sup>/h)
          </span>
        ),
        showId: [1, 11]
      },
      {
        id: 'wateringAreaDesigned',
        label: (
          <span>
            F<sub>tưới TK</sub> (ha)
          </span>
        ),
        showId: [1, 6]
      },
      {
        id: 'realityWateringArea',
        label: (
          <span>
            F<sub>tưới TT</sub> (ha)
          </span>
        ),
        showId: [1, 6]
      },
      {
        id: 'averagePumpTime',
        label: (
          <span>
            T<sub>bơm TB</sub>(h)
          </span>
        ),
        showId: [1, 6]
      },
      {
        id: 'minimumPumpTime',
        label: (
          <span>
            T<sub>bơm min</sub>(h)
          </span>
        ),
        showId: [1, 6]
      },
      {
        id: 'maximumPumpTime',
        label: (
          <span>
            T<sub>bơm max</sub>(h)
          </span>
        ),
        showId: [1, 6]
      }
    ]
  },
  {
    id: 'license',
    label: 'Thông tin giấy phép',
    children: [
      { id: 'licenseNumber', label: 'Số GP' },
      { id: 'signDate', label: 'Ngày cấp', format: (value: any) => FormatDate(value) },
      { id: 'issueDate', label: 'Thời hạn', format: (value: any) => FormatDate(value) }
    ]
  },
  {
    id: 'licenseFee',
    label: 'Tiền cấp quyền',
    children: [
      { id: 'licenseFeeNumber', label: 'Số QĐ' },
      { id: 'totalMoney', label: 'Tổng tiền (VNĐ)', format: (value: any) => formatNum(value) }
    ]
  },
  { id: 'actions', label: 'Thao tác', rowspan: 2 }
]

const SurfaceConstruction = () => {
  const [TypeOfConsId, setTypeOfConsId] = useState([1])
  const handleChange = (e: any) => {
    const val = e == undefined || e == null ? 1 : e.id
    setTypeOfConsId(val)
  }
  const [columns, setColumns] = useState<any[]>([])
  const [resData, setResData] = useState([])
  const [typeOfConsData, setTypeOfConsData] = useState([])
  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  const { showLoading, hideLoading } = useLoadingContext()
  const [loading, setLoading] = useState(false)
  loading ? showLoading() : hideLoading()

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        setResData(await fetchData('Construction/list'));
        setTypeOfConsData(await fetchData('ConstructionTypes/list'))
      } catch (error) {
        setResData([])
      } finally {
        setLoading(false)
      }
    }

    getData()
    setColumns(columnsTable)
  }, [postSuccess])

  const handleDelete = async (row: any) => {
    console.log(row)
    try {
      await postData('Construction/delete', row)
    } catch (error) {
      console.error(error)
    }
    setPostSuccess(true);
    handlePostSuccess();
  }
  const EditLicense = (row: any) => {
    console.log('Edit: ' + row.LicenseNumber)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <MapComponent />
      </Grid>
      <Grid item xs={12} sm={5} md={3}>
        <Typography className='_font12'>Tổng số công trình KTSDN mặt: 132</Typography>
        <Typography className='_font12'>Số công trình đã cấp phép: 132</Typography>
      </Grid>
      <Grid item xs={12} sm={7} md={9}>
        <Grid container direction='row' justifyContent='flex-end' alignItems='center' spacing={3}>
          <Grid item xs={12} sm={7} md={3}>
            <AutoComplete
              fullWidth
              onChange={(e: any, v: any) => handleChange(v)}
              size='small'
              options={typeOfConsData}
              getOptionLabel={(option: any) => option.typeName}
              label='Chọn loại hình CT'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={3}>
            <AutoComplete
              onChange={(e: any, v: any) => handleChange(v)}
              size='small'
              options={complete2}
              getOptionLabel={(option: any) => option.title}
              label='Chọn loại hình CT'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={2}>
            <SearchConstruction />
          </Grid>
          <Grid item xs={12} sm={7} md={2}>
            <Button size='small' fullWidth startIcon={<SearchIcon />} variant='outlined'>
              Xuất excel
            </Button>
          </Grid>
          <Grid item xs={12} sm={7} md={2}>
            <CreateConstruction isEdit={false} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid item xs={12} sm={12} md={12}>
          <TableComponent
            columns={columns}
            data={resData}
            show={TypeOfConsId}
            actions={(row: any) => (
              <Box>
                <Tooltip title='Chỉnh sửa giấy phép'>
                  <IconButton onClick={() => EditLicense(row)}>
                    <EditNote className='tableActionBtn' />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Xóa giấy phép'>
                  <IconButton onClick={() => handleDelete(row)}>
                    <Delete className='tableActionBtn deleteBtn' />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SurfaceConstruction
