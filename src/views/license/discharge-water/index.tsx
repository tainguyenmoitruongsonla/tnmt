//React Imports
import React, { useState, useEffect } from 'react'

//MUI Imports
import { Box, Tooltip, IconButton, Typography, Paper, Popover, Alert, ButtonGroup, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid'

//Other Imports
import FormatDate from 'src/@core/components/format-date'
import CheckEffect from 'src/views/license/check-effect'

// import MapComponent from 'src/@core/components/map';
import CountLicense from 'src/views/license/count-license'
import ShowFilePDF from 'src/@core/components/show-file-pdf'
import DataGridComponent from 'src/@core/components/data-grid'
import { Delete } from '@mui/icons-material'
import CreateLicense from '../form'

import dynamic from 'next/dynamic'
import fetchData from 'src/api/fetch'
import post from 'src/api/post'
import ColumnFilters from '../column-filter'
import { useRouter } from 'next/router'

const Map = dynamic(() => import('src/@core/components/map'), { ssr: false })

const DischargewaterLicense = () => {
  const [mapCenter] = useState([15.012172, 108.676488])
  const [mapZoom] = useState(9)

  const [postSuccess, setPostSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }

  const [resData, setResData] = useState([])
  const [deleteConfirmAnchorEl, setDeleteConfirmAnchorEl] = useState<HTMLButtonElement | null>(null)
  const deleteConfirmOpen = Boolean(deleteConfirmAnchorEl)

  const router = useRouter()

  //delete

  const DeleteRowData = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDeleteConfirmAnchorEl(event.currentTarget)
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirmAnchorEl) {
      const rowId = parseInt(deleteConfirmAnchorEl.getAttribute('data-row-id') || '', 10)
      const rowToDelete = resData.find((row: any) => row.id === rowId)
      if (rowToDelete) {
        handleDeleteRowData(rowToDelete)
      }
    }

    setDeleteConfirmAnchorEl(null)
  }

  const handleDeleteCancel = () => {
    setDeleteConfirmAnchorEl(null)
  }

  const handleDeleteRowData = async (data: any) => {
    try {
      setLoading(true)
      const res = await post('License/delete', data)
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

  //Init columnTable
  const columnsTable: GridColDef[] = [
    { field: 'id', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'ID', minWidth: 90 },
    {
      field: 'licenseNumber', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Số GP', minWidth: 150, renderCell: (data) => (
        <ShowFilePDF name={data.row.licenseNumber}
          src={`/pdf/giay-phep/${router.pathname.split('/')[2]}/${data.row.licensingAuthorities}/${data.row.typeSlug}`}
          fileName={data.row.licenseFile}
        />)
    },
    {
      field: 'effect',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Hiệu lực GP',
      minWidth: 150,
      renderCell: data => <CheckEffect data={data.row} />
    },
    {
      field: 'signDate',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Ngày ký',
      minWidth: 150,
      renderCell: data => FormatDate(data.row.signDate)
    },
    {
      field: 'issueDate',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Ngày có hiệu lực',
      minWidth: 150,
      renderCell: data => FormatDate(data.row.issueDate)
    },
    {
      field: 'expriteDate',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Ngày hểt hiệu lực',
      minWidth: 150,
      renderCell: data => FormatDate(data.row.expriteDate)
    },
    {
      field: 'licenseTypeName',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Loại hình',
      minWidth: 120
    },

    //business
    {
      field: 'business.name',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Tên',
      minWidth: 400,
      valueGetter: data => `${data.row.business?.name || ''}`
    },
    {
      field: 'business.address',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Địa chỉ',
      minWidth: 400,
      valueGetter: data => `${data.row.business?.address || ''}`
    },

    //oldLicense
    {
      field: 'oldLicense.licenseNumber', headerClassName: 'tableHead', headerAlign: 'center', headerName: 'Số GP', minWidth: 150, renderCell: (data) => (
        <ShowFilePDF name={data.row.licenseNumber}
          src={`/pdf/giay-phep/${router.pathname.split('/')[2]}/${data.row.oldLicense.licensingAuthorities}/${data.row.oldLicense.typeSlug}`}
          fileName={data.row.licenseFile}
        />)
    },
    {
      field: 'oldLicense.signDate',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Ngày ký',
      minWidth: 150,
      renderCell: data => FormatDate(data.row.oldLicense?.signDate)
    },

    //Construction
    {
      field: 'construction.constructionName',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Tên Công trình',
      minWidth: 200,
      valueGetter: data => `${data.row.construction?.constructionName || ''}`
    },
    {
      field: 'construction.constructionLocation',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Địa điểm Công trình',
      minWidth: 400,
      valueGetter: data => `${data.row.construction?.constructionLocation || ''}`
    },
    {
      field: 'construction.constructionTypeName',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Loại hình Công trình',
      minWidth: 150,
      valueGetter: data => `${data.row.construction?.constructionTypeName || ''}`
    },
    {
      field: 'construction.communeName',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Xã',
      minWidth: 150,
      valueGetter: data => `${data.row.construction?.communeName || ''}`
    },
    {
      field: 'construction.districtName',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Huyện',
      minWidth: 150,
      valueGetter: data => `${data.row.construction?.districtName || ''}`
    },
    {
      field: 'construction.dischargeWS',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Nguồn tiếp nhận',
      minWidth: 150,
      valueGetter: data => `${data.row.construction.constructionItems[0]?.dischargeWS || ''}`
    },
    {
      field: 'construction.riverName',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Thuộc sông',
      minWidth: 250,
      valueGetter: data => `${data.row.construction.riverName || ''}`
    },
    {
      field: 'construction.basinName',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Thuộc LVS',
      minWidth: 250,
      valueGetter: data => `${data.row.construction?.basinName || ''}`
    },
    {
      field: 'construction.maximumWasteWaterFlow',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      renderHeader: () => (
        <span>
          Q<sub>nước thải max</sub>(m<sup>3</sup>/<sub>ngày đêm</sub>){' '}
        </span>
      ),
      minWidth: 250,
      valueGetter: data => `${data.row.construction.constructionItems[0]?.maximumWasteWaterFlow || ''}`
    },
    {
      field: 'construction.dischargeMode',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Chế độ xả nước thải',
      minWidth: 250,
      valueGetter: data => `${data.row.construction.constructionItems[0]?.dischargeMode || ''}`
    },
    {
      field: 'construction.dischargeMethod',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Phương thức xả nước thải',
      minWidth: 250,
      valueGetter: data => `${data.row.construction.constructionItems[0]?.dischargeMethod || ''}`
    },
    {
      field: 'construction.kqKf',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Chất lượng nước thải',
      minWidth: 250,
      valueGetter: data => `${data.row.construction?.kqKf || ''}`
    },
    {
      field: 'construction.length',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Số điểm xả thải',
      minWidth: 250,
      valueGetter: data => `${data.row.construction.constructionItems[0].length || ''}`
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
          {params.row.licenseFees.map((e: any) => (
            <div key={e.id}>
              <ShowFilePDF
                name={e?.licenseFeeNumber || ''}
                src={`/pdf/tien-cap-quyen/${router.pathname.split('/')[2]}/${new Date(e?.signDate).getFullYear()}/`}
                fileName={e?.filePDF || ''}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      field: 'licenseFees.signDate',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Ngày ký',
      minWidth: 150,
      renderCell: params => (
        <div style={{ width: '100%' }}>
          {params.row.licenseFees.map((e: any) => (
            <div key={e.id}>
              <Typography>{FormatDate(e.signDate)}</Typography>
            </div>
          ))}
        </div>
      )
    },
    {
      field: 'licenseFees.TotalMoney',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      headerName: 'Tổng tiền cấp quyền (VNĐ)',
      minWidth: 150,
      type: 'number',
      valueGetter: params => {
        const licenseFees = params.row.licenseFees || []
        let totalMoney = 0

        licenseFees.forEach((e: any) => {
          totalMoney += parseFloat(e.totalMoney) || 0
        })

        return totalMoney
      }
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
          <CreateLicense isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />

          <Tooltip title='Xóa thông tin giấy phép'>
            <>
              <IconButton aria-describedby={data.row.id} onClick={DeleteRowData} data-row-id={data.row.id}>
                <Delete className='tableActionBtn deleteBtn' />
              </IconButton>
              <Popover
                id={deleteConfirmOpen ? data.row.id : undefined}
                open={deleteConfirmOpen}
                anchorEl={deleteConfirmAnchorEl}
                onClose={handleDeleteCancel}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
              >
                <Alert severity='warning'>
                  Xóa bản ghi này ?
                  <Box sx={{ justifyContent: 'center', paddingTop: 4, width: '100%' }}>
                    <ButtonGroup variant='outlined' aria-label='outlined button group'>
                      <Button size='small' onClick={handleDeleteConfirm}>
                        Đúng
                      </Button>
                      <Button color='error' size='small' onClick={handleDeleteCancel}>
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
      groupId: 'Thông tin GP',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'licenseNumber' },
        { field: 'effect' },
        { field: 'signDate' },
        { field: 'issueDate' },
        { field: 'expriteDate' },
        { field: 'licenseTypeName' }
      ]
    },
    {
      groupId: 'Cơ quan/cá nhân được CP',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [{ field: 'business.name' }, { field: 'business.address' }]
    },
    {
      groupId: 'Thông tin GP cũ',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [{ field: 'oldLicense.licenseNumber' }, { field: 'oldLicense.signDate' }]
    },
    {
      groupId: 'Thông tin CT',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'construction.constructionName' },
        { field: 'construction.constructionLocation' },
        { field: 'construction.constructionTypeName' },
        { field: 'construction.communeName' },
        { field: 'construction.districtName' },
        { field: 'construction.dischargeWS' },
        { field: 'construction.riverName' },
        { field: 'construction.basinName' },
        { field: 'construction.maximumWasteWaterFlow' },
        { field: 'construction.dischargeMode' },
        { field: 'construction.dischargeMethod' },
        { field: 'construction.kqKf' },
        { field: 'construction.length' }
      ]
    },
    {
      groupId: 'Tiền cấp quyền',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [
        { field: 'licenseFees.licenseFeeNumber' },
        { field: 'licenseFees.signDate' },
        { field: 'licenseFees.TotalMoney' }
      ]
    },
    {
      groupId: ' ',
      headerClassName: 'tableHead',
      headerAlign: 'center',
      children: [{ field: 'actions' }]
    }
  ]

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      try {
        const data = await fetchData('License/list')
        const filteredData = data.filter((item: { [key: string]: any }) =>
          [
            'khu_cumcn_taptrung',
            'sx_tieuthu_cn',
            'sx_kd_dv',
            'cs_benhvien',
            'khudancu_langnghe',
            'channuoi_ntts',
            'congtrinh_xathaikhac'
          ].some(keyword => item['constructionTypeSlug']?.toString().toLowerCase().includes(keyword.toLowerCase()))
        )
        setResData(filteredData)
      } catch (error) {
        setResData([])
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [postSuccess])

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12}>
        <Paper elevation={3} sx={{ py: 1, px: 3 }}>
          <Typography variant='overline'>Giấy phép/nước mặt</Typography>
        </Paper>
      </Grid>
      <Grid xs={12} md={3}>
        <CountLicense data={resData} />
      </Grid>
      <Grid xs={12} md={9} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Paper elevation={3} sx={{ height: '100%' }}>
          <Map center={mapCenter} zoom={mapZoom} mapData={null} />
        </Paper>
      </Grid>
      <Grid xs={12} md={12}>
        <Paper elevation={3} sx={{ p: 0, height: '100%' }}>
          <DataGridComponent
            rows={resData}
            columns={columnsTable}
            columnGroupingModel={columnGroup}
            columnFillter={ColumnFilters()}
            loading={loading}
            actions={<CreateLicense isEdit={false} setPostSuccess={handlePostSuccess} />}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default DischargewaterLicense
