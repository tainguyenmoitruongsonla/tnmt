//React Imports
import React, { useState, useEffect, useRef } from 'react';

//MUI Imports
import { Typography, Paper, Grid, Box } from '@mui/material';

//Other Imports
import FormatDate from 'src/@core/components/format-date';
import CheckEffect from 'src/views/license/check-effect';

// import MapComponent from 'src/@core/components/map';
import CountLicense from 'src/views/license/count-license';
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import CreateLicense from './form';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import LicenseToolBar from './tool-bar';
import { getData } from 'src/api/axios';
import DeleteData from 'src/@core/components/delete-data';
import GetConstructionTypeId from 'src/@core/components/get-construction-type';
import TableComponent, { TableColumn } from 'src/@core/components/table';


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
    const columnsTable: TableColumn[] = [
        { id: "soGP", label: "Số GP", rowspan: 2, align: 'left', pinned: "left", minWidth: 200, elm: (row: any) => (<ShowFilePDF name={row.soGP} src={row.fileGiayPhep} />) },
        { id: "hieuluc_gp", label: "Hiệu lực GP", rowspan: 2, align: 'left', minWidth: 200, elm: (row: any) => (<CheckEffect data={row} />) },
        { id: "ngayKy", label: "Ngày ký", rowspan: 2, align: 'left', minWidth: 200, elm: (row: any) => (FormatDate(row.ngayKy)) },
        { id: "ngayCoHieuLuc", label: "Ngày có hiệu lực", rowspan: 2, align: 'left', minWidth: 200, elm: (row: any) => (FormatDate(row.ngayCoHieuLuc)) },
        { id: "ngayHetHieuLuc", label: "Ngày hểt hiệu lực", rowspan: 2, align: 'left', minWidth: 200, elm: (row: any) => (FormatDate(row.ngayHetHieuLuc)) },
        {
            id: "tochuc_canhan", label: "Cơ quan/cá nhân được CP", align: 'left', children: [
                { id: "tenTCCN", label: "Tên", align: 'left', minWidth: 400, },
                { id: "diaChi", label: "Địa chỉ", align: 'left', minWidth: 400, },
            ]
        },
        {
            id: "giayphep_cu", label: "GP cũ", align: 'left', children: [
                { id: "soGP", label: "Số GP", rowspan: 2, align: 'left', minWidth: 200, elm: (row: any) => (<ShowFilePDF name={row.soGP} src={row.fileGiayPhep} />) },
                { id: "ngayKy", label: "Ngày ký", rowspan: 2, align: 'left', minWidth: 200, elm: (row: any) => (FormatDate(row.ngayKy)) },
            ]
        },
        {
            id: "congtrinh", label: "Công trình", align: 'left', children: [
                { id: "tenCT", label: "Tên", rowspan: 2, align: 'left', minWidth: 300, elm: (row: any) => (row.tenCT) },
                { id: "viTriCT", label: "Địa điểm", rowspan: 2, align: 'left', minWidth: 300, elm: (row: any) => (row.donvi_hanhchinh?.tenXa && row.donvi_hanhchinh?.tenXa != null ? `${row.donvi_hanhchinh?.tenXa}, ${row.donvi_hanhchinh?.tenHuyen}, Tỉnh Quảng Ngãi` : "") },
                { id: "loaiCT", label: "Loại công trình", rowspan: 2, align: 'left', minWidth: 200, elm: (row: any) => (row.loaiCT?.tenLoaiCT) },
                { id: "nguonNuocKT", label: "Nguồn nước khai thác", rowspan: 2, align: 'left', minWidth: 300, },
                { id: "luuvuc", label: "Lưu vực", rowspan: 2, align: 'left', minWidth: 300, },
                { id: "tieuvung_quyhoach", label: "Tiểu vùng quy hoạch", rowspan: 2, align: 'left', minWidth: 300, },

            ]
        },
        {
            id: "tiencq", label: "Tiền cấp quyền", align: 'left', children: [
                { id: "soQDTCQ", label: "Số QĐ", rowspan: 2, align: 'left', minWidth: 200, elm: (row: any) => (<ShowFilePDF name={row?.soQDTCQ} src={row?.filePDF} />) },
                { id: "ngayKy", label: "Ngày ký", rowspan: 2, align: 'left', minWidth: 200, elm: (row: any) => (FormatDate(row.ngayKy)) },
                { id: "tongTienCQ", label: "Tổng tiền", rowspan: 2, align: 'left', minWidth: 200, },
            ]
        },
        { id: "actions", label: "#", rowspan: 2, align: 'center', pinned: "right" },
    ]

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
                    <TableComponent columns={columnsTable} rows={resData} loading={loading} pagination
                        actions={(row: any) => (
                            <Box display={'flex'}>
                                <CreateLicense isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                                <DeleteData url={'giay-phep'} data={row} setPostSuccess={handlePostSuccess} />
                            </Box>
                        )} />
                </Paper>
            </Grid>
        </Grid >
    );
};

export default ListLicenses;
