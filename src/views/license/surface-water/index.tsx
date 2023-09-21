//React Imports
import React, { useState, useEffect, useRef } from 'react';

//MUI Imports
import { Box, Tooltip, IconButton, Typography, Paper, Popover, Alert, ButtonGroup, Button, Grid } from '@mui/material';
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';


//Other Imports
import FormatDate from 'src/@core/components/format-date';
import CheckEffect from 'src/views/license/check-effect';

// import MapComponent from 'src/@core/components/map';
import CountLicense from 'src/views/license/count-license';
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import DataGridComponent from 'src/@core/components/data-grid';
import { Delete } from '@mui/icons-material';
import CreateLicense from '../form';

import dynamic from 'next/dynamic';
import fetchData from 'src/api/license';
import post from 'src/api/post';
import ColumnFilters from '../column-filter';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import LicenseToolBar from '../tool-bar';


const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const SurfaceWaterLicense = () => {
  const [mapCenter] = useState([15.012172, 108.676488]);
  const [mapZoom] = useState(9);

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  const [loading, setLoading] = useState(false);

  const [resData, setResData] = useState([]);
  const [deleteConfirmAnchorEl, setDeleteConfirmAnchorEl] = useState<HTMLButtonElement | null>(null);
  const deleteConfirmOpen = Boolean(deleteConfirmAnchorEl);


  //delete

  const router = useRouter();

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
    { field: 'id', headerAlign: 'center', headerName: 'ID', minWidth: 90 },
    {
      field: 'licenseNumber', headerAlign: 'center', headerName: 'Số GP', minWidth: 150, renderCell: (data) => (
        <ShowFilePDF name={data.row.licenseNumber}
          src={`pdf/giay-phep/${data.row?.licensingAuthorities?.toLowerCase()}/${router.pathname.split('/')[2]}/${dayjs(data.row?.signDate).year()}/${data.row?.licenseNumber?.replace(/\//g, "_").toLowerCase()}`}
          fileName={data.row.licenseFile}
        />)
    },
    { field: 'effect', headerAlign: 'center', headerName: 'Hiệu lực GP', minWidth: 150, renderCell: (data) => (<CheckEffect data={data.row} />) },
    { field: 'signDate', headerAlign: 'center', headerName: 'Ngày ký', minWidth: 150, renderCell: (data) => (FormatDate(data.row.signDate)) },
    { field: 'issueDate', headerAlign: 'center', headerName: 'Ngày có hiệu lực', minWidth: 150, renderCell: (data) => (FormatDate(data.row.issueDate)) },
    { field: 'expriteDate', headerAlign: 'center', headerName: 'Ngày hểt hiệu lực', minWidth: 150, renderCell: (data) => (FormatDate(data.row.expriteDate)) },
    { field: 'licenseTypeName', headerAlign: 'center', headerName: 'Loại hình', minWidth: 200 },

    //business
    { field: 'business.name', headerAlign: 'center', headerName: 'Tên', minWidth: 400, valueGetter: (data) => (`${data.row.business?.name || ''}`) },
    { field: 'business.address', headerAlign: 'center', headerName: 'Địa chỉ', minWidth: 400, valueGetter: (data) => (`${data.row.business?.address || ''}`) },

    //oldLicense
    {
      field: 'oldLicense.licenseNumber', headerAlign: 'center', headerName: 'Số GP', minWidth: 150, renderCell: (data) => (
        <ShowFilePDF name={data.row.oldLicense?.licenseNumber}
          src={`pdf/giay-phep/${data.row.oldLicense?.licensingAuthorities?.toLowerCase()}/${router.pathname.split('/')[2]}/${dayjs(data.row.oldLicense?.signDate).year()}/${data.row.oldLicense?.licenseNumber?.replace(/\//g, "_").toLowerCase()}`}
          fileName={data.row.oldLicense?.licenseFile}
        />
      )
    },
    { field: 'oldLicense.signDate', headerAlign: 'center', headerName: 'Ngày ký', minWidth: 150, renderCell: (data) => (FormatDate(data.row.oldLicense?.signDate)), },

    //Construction
    { field: 'construction.constructionName', headerAlign: 'center', headerName: 'Tên Công trình', minWidth: 300, valueGetter: (data) => (`${data.row.construction?.constructionName || ''}`) },
    { field: 'construction.constructionLocation', headerAlign: 'center', headerName: 'Địa điểm Công trình', minWidth: 400, valueGetter: (data) => (`${data.row.construction?.constructionLocation || ''}`) },
    { field: 'construction.constructionTypeName', headerAlign: 'center', headerName: 'Loại hình Công trình', minWidth: 200, valueGetter: (data) => (`${data.row.construction?.constructionTypeName || ''}`) },
    { field: 'construction.communeName', headerAlign: 'center', headerName: 'Xã', minWidth: 200, valueGetter: (data) => (`${data.row.construction?.communeName || ''}`) },
    { field: 'construction.districtName', headerAlign: 'center', headerName: 'Huyện', minWidth: 200, valueGetter: (data) => (`${data.row.construction?.districtName || ''}`) },
    { field: 'construction.exploitedWS', headerAlign: 'center', headerName: 'Nguồn nước khai thác', minWidth: 200, valueGetter: (data) => (`${data.row.construction?.exploitedWS || ''}`) },
    { field: 'construction.riverName', headerAlign: 'center', headerName: 'Lưu vực', minWidth: 150, valueGetter: (data) => (`${data.row.construction?.riverName || ''}`) },
    { field: 'construction.basinName', headerAlign: 'center', headerName: 'Tiểu vùng quy hoạch', minWidth: 250, valueGetter: (data) => (`${data.row.construction?.basinName || ''}`) },

    //licenseFee
    {
      field: 'licenseFees.licenseFeeNumber',
      headerAlign: 'center',
      headerName: 'Số QĐ',
      minWidth: 150,
      renderCell: (params) => (
        <div style={{ width: '100%' }}>
          {params.row.licenseFees.map((e: any) => (
            <div key={e.id}>
              <ShowFilePDF
                name={e?.licenseFeeNumber || ''}
                src={`/pdf/tien-cap-quyen/${e.licensingAuthorities?.toLowerCase()}/${new Date(e?.signDate).getFullYear()}/`}
                fileName={e?.filePDF || ''}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      field: 'licenseFees.signDate',

      headerAlign: 'center',
      headerName: 'Ngày ký',
      minWidth: 150,
      renderCell: (params) => (
        <div style={{ width: '100%' }}>
          {params.row.licenseFees.map((e: any) => (
            <div key={e.id}>
              {FormatDate(e.signDate)}
            </div>
          ))}
        </div>
      ),
    },
    {
      field: 'licenseFees.TotalMoney', headerAlign: 'center', headerName: 'Tổng tiền cấp quyền (VNĐ)', minWidth: 150, type: 'number', valueGetter: (params) => {
        const licenseFees = params.row.licenseFees || [];
        let totalMoney = 0;

        licenseFees.forEach((e: any) => {
          totalMoney += parseFloat(e.totalMoney) || 0;
        });

        return totalMoney == 0 ? '' : totalMoney;
      },
    },

    //Action
    {
      field: 'actions', headerAlign: 'center', headerName: '#', minWidth: 120, sortable: false,
      renderCell: data => (
        <Box>
          <CreateLicense isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />

          <Tooltip title='Xóa thông tin giấy phép'>
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
  ];

  //Grouping Column
  const columnGroup: GridColumnGroupingModel = [
    {
      groupId: 'Thông tin GP',
      headerAlign: 'center',
      children: [
        { field: 'licenseNumber' },
        { field: 'effect' },
        { field: 'signDate' },
        { field: 'issueDate' },
        { field: 'expriteDate' },
        { field: 'licenseTypeName' },
      ],
    },
    {
      groupId: 'Cơ quan/cá nhân được CP',
      headerAlign: 'center',
      children: [
        { field: 'business.name' },
        { field: 'business.address' }
      ],
    },
    {
      groupId: 'Thông tin GP cũ',
      headerAlign: 'center',
      children: [
        { field: 'oldLicense.licenseNumber' },
        { field: 'oldLicense.signDate' }
      ]
    },
    {
      groupId: 'Thông tin CT',
      headerAlign: 'center',
      children: [
        { field: 'construction.constructionName' },
        { field: 'construction.constructionLocation' },
        { field: 'construction.constructionTypeName' },
        { field: 'construction.communeName' },
        { field: 'construction.districtName' },
        { field: 'construction.exploitedWS' },
        { field: 'construction.riverName' },
        { field: 'construction.basinName' },
      ],
    },
    {
      groupId: 'Tiền cấp quyền',
      headerAlign: 'center',
      children: [
        { field: 'licenseFees.licenseFeeNumber' },
        { field: 'licenseFees.signDate' },
        { field: 'licenseFees.TotalMoney' }
      ],
    },
    {
      groupId: ' ',
      headerAlign: 'center',
      children: [
        { field: 'actions' }
      ],
    }
  ];

  const [paramsFilter, setParamsFilter] = useState({
    licenseNumber: null,
    licensingAuthorities: null,
    licenseTypeId: 0,
    licenseValidity: null,
    businessId: 0,
    constructionId: 0,
    constructionTypeId: 0,
    districtId: 0,
    communeId: 0,
    subBasinId: 0,
    pageIndex: 0,
    pageSize: 0
  });


  const isMounted = useRef(true);

  const getData = async () => {
    setLoading(true);
    fetchData('License/list', paramsFilter)
      .then((data) => {
        if (isMounted.current) {
          setResData(data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  useEffect(() => {

    // Component is mounted
    isMounted.current = true;

    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      isMounted.current = false;
    };
  }, []);


  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postSuccess, paramsFilter]);

  const handleFilterChange = (data: any, postSuccess: boolean | undefined) => {
    setParamsFilter(data);
    if (postSuccess !== undefined) {
      setPostSuccess(postSuccess);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Paper elevation={3} sx={{ py: 1, px: 3 }}>
          <Grid><Typography variant='overline'>Giấy phép/nước mặt</Typography></Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Grid item xs={12} md={12} sx={{ height: '45vh' }}>
          <CountLicense data={resData} />
        </Grid>
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper elevation={3} sx={{ height: '45vh', p: 1 }}>
          <Map center={mapCenter} zoom={mapZoom} mapData={null} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={12}>
        <Paper elevation={3} sx={{ p: 0, height: '100%' }}>
          <LicenseToolBar onChange={handleFilterChange} />
          <DataGridComponent
            rows={resData}
            columns={columnsTable}
            columnGroupingModel={columnGroup}
            columnFillter={ColumnFilters()}
            loading={loading}
          />
        </Paper>
      </Grid>
    </Grid >
  );
};

export default SurfaceWaterLicense;
