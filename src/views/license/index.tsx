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
import CreateLicense from './form';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import LicenseToolBar from './tool-bar';
import { getData } from 'src/api/axios';
import DeleteData from 'src/@core/components/delete-data';
import GetConstructionTypeId from 'src/@core/components/get-construction-type';


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

    //xoa

    const router = useRouter();

    //Init columnTable
    const columnsTable: GridColDef[] = [
        { field: 'id', headerAlign: 'center', sortable: false, headerName: 'ID', minWidth: 90 },
        {
            field: 'soGP', headerAlign: 'center', sortable: false, headerName: 'Số GP', minWidth: 150, renderCell: (data) => (
                <ShowFilePDF name={data.row.soGP}
                    src={data.row.fileGiayPhep}
                />)
        },
        { field: 'hieuluc_gp', headerAlign: 'center', sortable: false, headerName: 'Hiệu lực GP', minWidth: 150, renderCell: (data) => (<CheckEffect data={data.row} />) },
        { field: 'ngayKy', headerAlign: 'center', sortable: false, headerName: 'Ngày ký', minWidth: 150, renderCell: (data) => (FormatDate(data.row.ngayKy)) },
        { field: 'ngayCoHieuLuc', headerAlign: 'center', sortable: false, headerName: 'Ngày có hiệu lực', minWidth: 150, renderCell: (data) => (FormatDate(data.row.ngayCoHieuLuc)) },
        { field: 'ngayHetHieuLuc', headerAlign: 'center', sortable: false, headerName: 'Ngày hểt hiệu lực', minWidth: 150, renderCell: (data) => (FormatDate(data.row.ngayHetHieuLuc)) },
        { field: 'loaiGP', headerAlign: 'center', sortable: false, headerName: 'Loại hình', minWidth: 200, renderCell: (data) => (data.row.loaiGP.tenLoaiGP) },

        //tochuc_canhan
        { field: 'tochuc_canhan.name', headerAlign: 'center', sortable: false, headerName: 'Tên', minWidth: 400, valueGetter: (data) => (`${data.row.tochuc_canhan?.tenTCCN}`) },
        { field: 'tochuc_canhan.address', headerAlign: 'center', sortable: false, headerName: 'Địa chỉ', minWidth: 400, valueGetter: (data) => (`${data.row.tochuc_canhan?.diaChi}`) },

        //giayphep_cu
        {
            field: 'giayphep_cu.soGP', headerAlign: 'center', sortable: false, headerName: 'Số GP', minWidth: 150, renderCell: (data) => (
                <ShowFilePDF name={data.row.giayphep_cu?.soGP}
                    src={data.row.giayphep_cu?.fileGiayPhep}
                />
            )
        },
        { field: 'giayphep_cu.ngayKy', headerAlign: 'center', sortable: false, headerName: 'Ngày ký', minWidth: 150, renderCell: (data) => (FormatDate(data.row.giayphep_cu?.ngayKy)), },

        //congtrinh
        { field: 'congtrinh.tenCT', headerAlign: 'center', sortable: false, headerName: 'Tên Công trình', minWidth: 300, valueGetter: (data) => (`${data.row.congtrinh?.tenCT}`) },
        { field: 'congtrinh.viTriCT', headerAlign: 'center', sortable: false, headerName: 'Địa điểm Công trình', minWidth: 400, valueGetter: (data) => (`${data.row.congtrinh?.viTriCT}`) },
        { field: 'congtrinh.loaiCT', headerAlign: 'center', sortable: false, headerName: 'Loại hình Công trình', minWidth: 200, valueGetter: (data) => (`${data.row.congtrinh?.loaiCT?.tenLoaiCT}`) },
        { field: 'congtrinh.tenXa', headerAlign: 'center', sortable: false, headerName: 'Xã', minWidth: 200, valueGetter: (data) => (`${data.row.congtrinh?.donvi_hanhchinh?.tenXa}`) },
        { field: 'congtrinh.tenHuyen', headerAlign: 'center', sortable: false, headerName: 'Huyện', minWidth: 200, valueGetter: (data) => (`${data.row.congtrinh?.donvi_hanhchinh?.tenHuyen}`) },
        { field: 'congtrinh.nguonNuocKT', headerAlign: 'center', sortable: false, headerName: 'Nguồn nước khai thác', minWidth: 200, valueGetter: (data) => (`${data.row.congtrinh?.nguonNuocKT}`) },
        { field: 'congtrinh.riverName', headerAlign: 'center', sortable: false, headerName: 'Lưu vực', minWidth: 150, valueGetter: (data) => (`${data.row.congtrinh?.riverName}`) },
        { field: 'congtrinh.basinName', headerAlign: 'center', sortable: false, headerName: 'Tiểu vùng quy hoạch', minWidth: 250, valueGetter: (data) => (`${data.row.congtrinh?.basinName}`) },

        //licenseFee
        {
            field: 'tiencq.soQDTCQ',
            headerAlign: 'center',
            sortable: false, headerName: 'Số QĐ',
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ width: '100%' }}>
                    {params.row.tiencq.map((e: any) => (
                        <div key={e.id}>
                            <ShowFilePDF
                                name={e?.soQDTCQ}
                                src={e?.filePDF}
                            />
                        </div>
                    ))}
                </div>
            ),
        },
        {
            field: 'tiencq.ngayKy',

            headerAlign: 'center',
            sortable: false, headerName: 'Ngày ký',
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ width: '100%' }}>
                    {params.row.tiencq.map((e: any) => (
                        <div key={e.id}>
                            {FormatDate(e.ngayKy)}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            field: 'tiencq.tongTienCQ', headerAlign: 'center', sortable: false, headerName: 'Tổng tiền cấp quyền (VNĐ)', minWidth: 150, type: 'number', valueGetter: (params) => {
                const tiencq = params.row.tiencq || [];
                let tongTienCQ = 0;

                tiencq.forEach((e: any) => {
                    tongTienCQ += parseFloat(e.tongTienCQ) || 0;
                });

                return tongTienCQ == 0 ? '' : tongTienCQ;
            },
        },

        //Action
        {
            field: 'actions', headerAlign: 'center', sortable: false, headerName: '#', minWidth: 120,
            renderCell: data => (
                <Box>
                    <CreateLicense isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
                    <DeleteData url={'License'} data={data} setPostSuccess={handlePostSuccess} />
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
                { field: 'soGP' },
                { field: 'hieuluc_gp' },
                { field: 'ngayKy' },
                { field: 'ngayCoHieuLuc' },
                { field: 'ngayHetHieuLuc' },
                { field: 'loaiGP' },
            ],
        },
        {
            groupId: 'Cơ quan/cá nhân được CP',
            headerAlign: 'center',
            children: [
                { field: 'tochuc_canhan.name' },
                { field: 'tochuc_canhan.address' }
            ],
        },
        {
            groupId: 'Thông tin GP cũ',
            headerAlign: 'center',
            children: [
                { field: 'giayphep_cu.soGP' },
                { field: 'giayphep_cu.ngayKy' }
            ]
        },
        {
            groupId: 'Thông tin CT',
            headerAlign: 'center',
            children: [
                { field: 'congtrinh.tenCT' },
                { field: 'congtrinh.viTriCT' },
                { field: 'congtrinh.loaiCT' },
                { field: 'congtrinh.tenXa' },
                { field: 'congtrinh.tenHuyen' },
                { field: 'congtrinh.nguonNuocKT' },
                { field: 'congtrinh.riverName' },
                { field: 'congtrinh.basinName' },
            ],
        },
        {
            groupId: 'Tiền cấp quyền',
            headerAlign: 'center',
            children: [
                { field: 'tiencq.soQDTCQ' },
                { field: 'tiencq.ngayKy' },
                { field: 'tiencq.tongTienCQ' }
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
        so_gp: null,
        cong_trinh: 0,
        coquan_cp: null,
        loaihinh_cp: 0,
        hieuluc_gp: null,
        loai_ct: GetConstructionTypeId(router),
        tang_chuanuoc: 0,
        huyen: 0,
        xa: 0,
        tieuvung_qh: 0,
        tochuc_canhan: 0,
        tu_nam: 0,
        den_nam: 0,
    });


    const isMounted = useRef(true);

    const getDataLicense = async () => {
        setLoading(true);
        getData('giay-phep/danh-sach', paramsFilter)
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
