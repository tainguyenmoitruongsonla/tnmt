//React Imports
import React, { useState, useEffect, useRef } from 'react';

//MUI Imports
import { Box, Typography, Paper, Grid } from '@mui/material';
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

//Other Imports
import FormatDate from 'src/@core/components/format-date';
import CheckEffect from 'src/views/license/check-effect';

// import MapComponent from 'src/@core/components/map';
import CountLicense from 'src/views/license/count-license';
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import DataGridComponent from 'src/@core/components/data-grid';
import CreateLicense from '../form';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import LicenseToolBar from '../tool-bar';
import { getData } from 'src/api/axios';
import DeleteData from '../delete-data';


const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const ListLicenses = () => {
    const [mapCenter] = useState([15.012172, 108.676488]);
    const [mapZoom] = useState(9);

    const [postSuccess, setPostSuccess] = useState(false);
    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState);
    };
    const [loading, setLoading] = useState(false);
    const [resData, setResData] = useState([]);

    //delete

    const router = useRouter();

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
                    <DeleteData data={data} setPostSuccess={handlePostSuccess} />
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

    function getConstructionTypeId() {
        const pathSegments = router.pathname.split('/');
        const section = pathSegments[2];
        const subsection = pathSegments[3];

        switch (section) {
            case "nuoc-mat":
                return 1;
            case "nuoc-duoi-dat":
                switch (subsection) {
                    case "khai-thac-su-dung":
                        return 7;
                    case "tham-do":
                        return 8;
                    case "hanh-nghe-khoan":
                        return 9;
                    default:
                        return 0;
                }
            case "xa-thai":
                return 3;
            default:
                return 0;
        }
    }

    const [paramsFilter, setParamsFilter] = useState({
        licenseNumber: null,
        licensingAuthorities: null,
        licenseTypeId: 0,
        licenseValidity: null,
        businessId: 0,
        constructionId: 0,
        constructionTypeId: getConstructionTypeId(),
        districtId: 0,
        communeId: 0,
        subBasinId: 0,
        pageIndex: 0,
        pageSize: 0
    });


    const isMounted = useRef(true);

    const getDataLicense = async () => {
        setLoading(true);
        getData('License/list', paramsFilter)
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
        isMounted.current = true

        return () => {
            isMounted.current = false;
        };
    }, []);


    useEffect(() => {
        getDataLicense();
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
                    <Typography variant='overline'>Giấy phép/nước mặt</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={3} sx={{ height: '45vh' }}>
                <CountLicense data={resData} />
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
                        loading={loading}
                    />
                </Paper>
            </Grid>
        </Grid >
    );
};

export default ListLicenses;
