//React Imports
import React, { useState, useEffect } from 'react'

//MUI Imports
import { Box, Tooltip, IconButton, Typography, Paper, Popover, Alert, ButtonGroup, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid'

//Other Imports
import FormatDate from 'src/@core/components/format-date'
import ShowFilePDF from 'src/@core/components/show-file-pdf'
import DataGridComponent, { columnFillters } from 'src/@core/components/data-grid'
import { Delete } from '@mui/icons-material'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import dynamic from 'next/dynamic'
import fetchData from 'src/api/fetch'
import post from 'src/api/post'
import CreateConstruction from '../form'


const Map = dynamic(() => import('src/@core/components/map'), { ssr: false })

// eslint-disable-next-line react-hooks/rules-of-hooks
const DischargeConstruction = () => {

  //Init columnTable
  const columnsTable: GridColDef[] = [
    { field: 'id', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'ID', minWidth: 90 },
    {
      field: 'constructionName', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tên công trình', minWidth: 250, renderCell: (data) => (<Typography
        className='btnShowFilePdf' onClick={() => zoomConstruction([data.row.lat, data.row.lng])}>{data.row.constructionName}</Typography>)
    },
    { field: 'constructionLocation', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Vị trí công trình', minWidth: 150, },
    { field: 'WasteDischargeLocation', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Ví trí xả thải', minWidth: 150, valueGetter: (data) => (`${data.row.x},${data.row.y}`) },
    { field: 'dischargeWS', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Nguồn tiếp nhận nước thải', minWidth: 150, },

    //coordinates
    { field: 'x', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'X', minWidth: 150, },
    { field: 'y', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Y', minWidth: 150, },


    //constructionDetails
    { field: 'dischargeMethod', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Phương thức xả nước thải', minWidth: 150, },
    { field: 'dischargeMode', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Chế độ xả nước thải', minWidth: 150, },
    { field: 'averageDischargeFlow', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>Q<sub>xả trung bình</sub>  (m<sup>3</sup>/ngày đêm) </span>), minWidth: 150, },
    { field: 'maximumWasteWaterFlow', headerClassName: 'tableHead', headerAlign: 'center', renderHeader: () => (<span>Q<sub>xả lớn nhất</sub> (m<sup>3</sup>/ngày đêm)</span>), minWidth: 150, },
    { field: 'kqKf', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Chất lượng nước thải (hệ số Kq và Kf)', minWidth: 150, },

     //license
     {
      field: 'license.LicenseNumber',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Số GP',
      minWidth: 150,
      renderCell: (params) => (
        <div style={{ width: '100%' }}>
          {params.row.licenses?.map((e: any) => (
            <div key={e.id}>
              <Typography>
                <ShowFilePDF name={e.licenseNumber} src={`/pdf/giay-pheps`} />
              </Typography>
            </div>
          ))}
        </div>
      ),
    },
    {
      field: 'license.IssueDate',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Hiệu lực GP',
      minWidth: 150,
      renderCell: (params) => (
        <div style={{ width: '100%' }}>
          {params.row.licenses?.map((e: any) => (
            <div key={e.id}>
              <Typography>
                {FormatDate(e.issueDate)}
              </Typography>
            </div>
          ))}
        </div>
      ),
    },
    {
      field: 'license.SignDate',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Ngày ký',
      minWidth: 150,
      renderCell: (params) => (
        <div style={{ width: '100%' }}>
          {params.row.licenses?.map((e: any) => (
            <div key={e.id}>
              <Typography>
                {FormatDate(e.signDate)}
              </Typography>
            </div>
          ))}
        </div>
      ),
    },

       //licenseFee
       {
        field: 'licenseFees.licenseFeeNumber',
        headerClassName: 'tableHead',
        headerAlign: 'center',
        headerName: 'Số QĐ',
        minWidth: 150,
        renderCell: (params) => (
          <div style={{ width: '100%' }}>
            {params.row.licenses.licenseFees?.map((e: any) => (
              <div key={e.id}>
                <Typography>
                  <ShowFilePDF name={e.licenseFeeNumber} src={`/pdf/giay-pheps`} />
                </Typography>
              </div>
            ))}
          </div>
        ),
      },
      {
        field: 'licenseFees.TotalMoney', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Tổng tiền cấp quyền (VNĐ)', minWidth: 150, type: 'number', valueGetter: (params) => {
          const licenseFees = params.row.licenseFees || [];
          let totalMoney = 0;
  
          licenseFees.forEach((e: any) => {
            totalMoney += parseFloat(e.totalMoney) || 0;
          });
  
          return totalMoney;
        },
      },

    //Action
    {
      field: 'actions',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: '#',
      minWidth: 120,
      sortable: false,
      renderCell: data => (
        <Box>
          <CreateConstruction isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
          <Tooltip title='Xóa thông tin công trình'>
            <>
              <IconButton aria-describedby={data.row.id} onClick={DeleteRowData} data-row-id={data.row.id} >
                <Delete className='tableActionBtn deleteBtn' />
              </IconButton>
              <Popover
                id={deleteConfirmOpen ? data.row.id : undefined}
                open={deleteConfirmOpen}
                anchorEl={deleteConfirmAnchorEl}
                onClose={handleDeleteCancel}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Alert severity="warning">
                  Xóa bản ghi này ?
                  <Box sx={{ justifyContent: 'center', paddingTop: 4, width: '100%' }}>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                      <Button size="small" onClick={handleDeleteConfirm}>
                        Đúng
                      </Button>
                      <Button color='error' size="small" onClick={handleDeleteCancel}>
                        Hủy
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Alert>
              </Popover>
            </>
          </Tooltip>
        </Box>
      )
    }
  ]

  //Grouping Column
 const columnGroup: GridColumnGroupingModel = [
    {
      groupId: 'Thông tin công trình',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'constructionName' },
        { field: 'constructionLocation' },
        { field: 'WasteDischargeLocation' },
        { field: 'dischargeWS' },
      ],
    },

    {
      groupId: 'Tọa độ (VN2000, Kinh tuyến trục 104⁰, múi chiếu 3⁰)',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'x' },
        { field: 'y' },
      ]
    },

    {
      groupId: 'Phương thức xả thải',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'dischargeMethod' },
        { field: 'dischargeMode' },
        { field: 'averageDischargeFlow' },
        { field: 'maximumWasteWaterFlow' },
        { field: 'kqKf' },
      ]
    },
    {
      groupId: 'Thông tin giấy phép',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'license.LicenseNumber' },
        { field: 'license.SignDate' },
        { field: 'license.IssueDate' },
       ]
    },

    {
      groupId: 'Tiền cấp quyền',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'licenseFees.licenseFeeNumber' },
        { field: 'licenseFees.TotalMoney' }
      ]
    },
    {
      groupId: ' ',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'actions' }
      ],
    }
  ];


  const columnFillter: columnFillters[] = [
    {
      label: 'Loại công trình',
      value: 'constructionTypeSlug',
      type: 'select',
      options: [
        { label: 'Thủy điện', value: 'thuydien' },
        { label: 'Hồ chứa', value: 'hochua' },
        { label: 'Trạm bơm', value: 'trambom' },
        { label: 'Đập/Hệ thống thủy lợi', value: 'dapthuyloi' },
        { label: 'Cống', value: 'cong' },
        { label: 'Trạm cấp nước', value: 'tramcapnuoc' },
        { label: 'Nhà máy nước', value: 'nhamaynuoc' },
        { label: 'Công trình khác', value: 'congtrinh_nuocmatkhac' }
      ]
    },
    {
      label: 'Cơ quan cấp phép',
      value: 'licensingAuthorities',
      type: 'select',
      options: [
        { label: 'BTNMT', value: 'BTNMT' },
        { label: 'UBND Tỉnh', value: 'UBNDT' },
      ],
    },
    {
      label: 'Tiểu vùng quy hoạch',
      value: 'basinId',
      type: 'select',
      options: [
        { label: 'Tiểu vùng quy hoạch 1', value: 1 },
        { label: 'Tiểu vùng quy hoạch 2', value: 2 },
        { label: 'Tiểu vùng quy hoạch 3', value: 3 },
        { label: '...', value: 4 }
      ]
    },
    {
      label: 'Huyện',
      value: 'districtId',
      type: 'select',
      options: [
        { label: 'Huyện 1', value: 1 },
        { label: 'Huyện 2', value: 2 },
        { label: 'Huyện 3', value: 3 },
        { label: '...', value: 4 }
      ]
    },
    {
      label: ' Nhập tên công trình',
      value: 'constructionName',
      type: 'text'
    },
    {
      label: ' Nhập số GP',
      value: 'licenseName',
      type: 'text'
    }
  ]

  const [mapCenter, setMapCenter] = useState([15.012172, 108.676488])
  const [mapZoom, setMapZoom] = useState(9)
  const [showLabel, setShowLabel] = useState(false)

  const [postSuccess, setPostSuccess] = useState(false)

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  const [resData, setResData] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    try {
      setLoading(true)
      const data = await fetchData('Construction/list')
      const filteredData = data.filter((item: { [key: string]: any }) =>
          ['khu_cumcn_taptrung', 'sx_tieuthu_cn', 'sx_kd_dv', 'cs_benhvien', 'khudancu_langnghe', 'channuoi_ntts', 'congtrinh_xathaikhac'].some(keyword =>
            item['constructionTypeSlug']?.toString().toLowerCase().includes(keyword.toLowerCase())
          )
        );
      setResData(filteredData)
    } catch (error) {
      setResData([])
    } finally {
      setLoading(false)
    }
  }

  //delete
  const [deleteConfirmAnchorEl, setDeleteConfirmAnchorEl] = useState<HTMLButtonElement | null>(null);
  const deleteConfirmOpen = Boolean(deleteConfirmAnchorEl);
  const DeleteRowData = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDeleteConfirmAnchorEl(event.currentTarget);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmAnchorEl) {
      const rowId = parseInt(deleteConfirmAnchorEl.getAttribute('data-row-id') || '', 10);
      const rowToDelete = resData.find((row: any) => row.id === rowId);
      if (rowToDelete) {
        handleDeleteRowData(rowToDelete);
      }
    }

    setDeleteConfirmAnchorEl(null);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmAnchorEl(null);
  };

  const handleDeleteRowData = async (data: any) => {
    try {
      setLoading(true)
      const res = await post('Construction/delete', data)
      if (res) {
        setResData(prevData => prevData.filter((item: any) => item.id !== data.id))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      setDeleteConfirmAnchorEl(null)
    }
  }

  useEffect(() => {
    getData()
  }, [postSuccess])

  const zoomConstruction = (coords: any) => {
    setMapCenter(coords)
    setMapZoom(13)
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
          <Box className="map-legend" sx={{ background: 'white', pl: 2 }}>
            <FormGroup>
              <FormControlLabel control={<Checkbox onClick={() => setShowLabel(!showLabel)} />} label="Hiển thị tên công trình" />
            </FormGroup>
          </Box>
          <Map center={mapCenter} zoom={mapZoom} showLabel={showLabel} mapMarkerData={resData} />
        </Paper>
      </Grid>
      <Grid xs={12} md={12}>
        <Paper elevation={3} sx={{ p: 0, height: '100%' }}>
          <DataGridComponent
            rows={resData}
            loading={loading}
            columns={columnsTable}
            columnGroupingModel={columnGroup}
            columnFillter={columnFillter}
            actions={<CreateConstruction isEdit={false} setPostSuccess={handlePostSuccess} />}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default DischargeConstruction
