//React Imports
import React, { useState, useEffect, useRef } from 'react'

//MUI Imports
import { Box, Typography, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid'

//Other Imports
import FormatDate from 'src/@core/components/format-date'

import ShowFilePDF from 'src/@core/components/show-file-pdf'
import DataGridComponent from 'src/@core/components/data-grid'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import dynamic from 'next/dynamic'
import { getData } from 'src/api/axios'

import CreateConstruction from '../form'
import ConstructionToolBar from '../tool-bar'
import { useRouter } from 'next/router' 
import DeleteData from 'src/@core/components/delete-data'



const Map = dynamic(() => import('src/@core/components/map'), { ssr: false })

// eslint-disable-next-line react-hooks/rules-of-hooks
const GroundConstruction = () => {

    //Init columnTable
    const columnsTable: GridColDef[] = [
        { field: 'id', headerAlign: 'center', headerName: 'ID', minWidth: 90 },
        {
            field: 'constructionName', headerAlign: 'center', headerName: 'Tên công trình', minWidth: 350, renderCell: (data) => (<Typography
                className='btnShowFilePdf' onClick={() => zoomConstruction([data.row.lat, data.row.lng])}>{data.row.constructionName}</Typography>)
        },
        { field: 'constructionLocation', headerAlign: 'center', headerName: 'Ví trí công trình', minWidth: 350, },
        { field: 'exploitPurpose', headerAlign: 'center', headerName: 'Mục đích khai thác,sử dụng nước', minWidth: 250, },
        { field: 'numberExploitWells', headerAlign: 'center', headerName: 'Số giếng khai thác', minWidth: 150, },
        { field: 'constructionTime', headerAlign: 'center', headerName: '	Năm xây dựng', minWidth: 100, },
        { field: 'startDate', headerAlign: 'center', headerName: 'Năm vận hành', minWidth: 100, },
        { field: 'amountWaterExploited', headerAlign: 'center', renderHeader: () => (<span>Q<sub>KT</sub> (m<sup>3</sup>/ngày đêm)</span>), minWidth: 150, },
        { field: 'wellNumber', headerAlign: 'center', headerName: 'Số hiệu', minWidth: 150, },
        { field: 'drillingDuration', headerAlign: 'center', headerName: 'Thời gian hành nghề khoan', minWidth: 150, },

        //coordinates
        { field: 'x', headerAlign: 'center', headerName: 'X', minWidth: 150, },
        { field: 'y', headerAlign: 'center', headerName: 'Y', minWidth: 150, },

        //
        { field: 'waterDepthFrom', headerAlign: 'center', headerName: 'Từ ', minWidth: 150, },
        { field: 'waterDepthTo', headerAlign: 'center', headerName: 'Đến', minWidth: 150, },

        //constructionDetails
        { field: 'waterSupplyFlow', headerAlign: 'center', renderHeader: () => (<span>Q<sub>khai thác</sub> (m<sup>3</sup>/ng.đêm)</span>), minWidth: 150, },
        { field: 'wellWL', headerAlign: 'center', renderHeader: () => (<span> H<sub>giếng khai thác</sub></span>), minWidth: 150, },
        { field: 'monitoringWellWL', headerAlign: 'center', renderHeader: () => (<span> H<sub>giếng quan trắc</sub></span>), minWidth: 150, },
        { field: 'exploitMethod', headerAlign: 'center', headerName: 'Chế độ KT (giờ/ng.đêm)', minWidth: 150, },
        { field: 'staticWL', headerAlign: 'center', headerName: 'Chiều sâu MN tĩnh(m)', minWidth: 150, },
        { field: 'dynamicWL', headerAlign: 'center', headerName: 'Chiều sâu MN động max(m)', minWidth: 150, },
        { field: 'exploitAquifer', headerAlign: 'center', headerName: 'Tầng chứa nước KT', minWidth: 150, },
        { field: 'lowWL', headerAlign: 'center', headerName: 'Mực nước hạ thấp', minWidth: 150, },

        //license
        {
            field: 'license.LicenseNumber',

            headerAlign: 'center',
            headerName: 'Số GP',
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ width: '100%' }}>
                    {params.row.licenses.map((e: any) => (
                        <div key={e.id}>
                            <ShowFilePDF
                                name={e?.licenseNumber || ''}
                                src={`/pdf/giay-phep/${e.licensingAuthorities?.toLowerCase()}/${new Date(e?.signDate).getFullYear()}/`}
                                fileName={e?.filePDF || ''}
                            />
                        </div>
                    ))}
                </div>
            ),
        },
        {
            field: 'license.IssueDate',

            headerAlign: 'center',
            headerName: 'Hiệu lực GP',
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ width: '100%' }}>
                    {params.row.licenses?.map((e: any) => (
                        <div key={e.id}>
                            {FormatDate(e.issueDate)}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            field: 'license.SignDate',

            headerAlign: 'center',
            headerName: 'Ngày ký',
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ width: '100%' }}>
                    {params.row.licenses?.map((e: any) => (
                        <div key={e.id}>
                            {FormatDate(e.signDate)}
                        </div>
                    ))}
                </div>
            ),
        },

        //licenseFee
        {
            field: 'licenseFees.licenseFeeNumber',
            headerAlign: 'center',
            headerName: 'Số QĐ',
            minWidth: 150,
            renderCell: (params) => (
                <div style={{ width: '100%' }}>
                    {params.row.licenses?.map((e: any) => (
                        e?.licenseFees.map((e: any) => (
                            <div key={e.id}>
                                <ShowFilePDF
                                    name={e?.licenseFeeNumber || ''}
                                    src={`/pdf/tien-cap-quyen/${e.licensingAuthorities?.toLowerCase()}/${new Date(e?.signDate).getFullYear()}/`}
                                    fileName={e?.filePDF || ''}
                                />
                            </div>
                        ))
                    ))}
                </div>
            ),
        },
        {
            field: 'licenseFees.TotalMoney',
            headerAlign: 'center',
            headerName: 'Tổng tiền cấp quyền (VNĐ)',
            minWidth: 150,
            type: 'number',
            renderCell: (params) => (
                <div style={{ width: '100%' }}>
                    {params.row.licenses?.map((e: any) => (
                        e?.licenseFees.map((e: any) => (
                            <div key={e.id}>
                                {e.totalMoney.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </div>
                        ))
                    ))}
                </div>
            ),
        },

        //Action
        {
            field: 'actions', headerAlign: 'center', headerName: '#', minWidth: 120, sortable: false,
            renderCell: (data) => (
                <Box>
                    <CreateConstruction isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
                    <DeleteData url={'Construction'} data={data} setPostSuccess={handlePostSuccess} />
                </Box>
            )
        },
    ];


    //Grouping Column
    const columnGroup: GridColumnGroupingModel = [
        {
            groupId: 'Thông tin công trình',

            headerAlign: 'center',
            children: [
                { field: 'constructionName' },
                { field: 'constructionLocation' },
                { field: 'exploitPurpose' },
                { field: 'numberExploitWells' },
                { field: 'constructionTime' },
                { field: 'startDate' },
                { field: 'amountWaterExploited' },
                { field: 'wellNumber' },
                { field: 'drillingDuration' },
            ],
        },
        {
            groupId: 'Tọa độ',

            headerAlign: 'center',
            children: [
                { field: 'x' },
                { field: 'y' },
            ]
        },
        {
            groupId: 'Chiều sâu đoạn thu nước(m)',

            headerAlign: 'center',
            children: [
                { field: 'waterDepthFrom' },
                { field: 'waterDepthTo' },
            ]
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
                { field: 'lowWL' },
            ]
        },
        {
            groupId: 'Thông tin giấy phép',

            headerAlign: 'center',
            children: [
                { field: 'license.LicenseNumber' },
                { field: 'license.SignDate' },
                { field: 'license.IssueDate' },
            ]
        },

        {
            groupId: 'Tiền cấp quyền',

            headerAlign: 'center',
            children: [
                { field: 'licenseFees.licenseFeeNumber' },
                { field: 'licenseFees.TotalMoney' }
            ]
        },

        {
            groupId: ' ',

            headerAlign: 'center',
            children: [
                { field: 'actions' }
            ],
        }
    ];

    const [mapCenter, setMapCenter] = useState([15.012172, 108.676488])
    const [mapZoom, setMapZoom] = useState(9)
    const [showLabel, setShowLabel] = useState(false)
    const [resData, setResData] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const [postSuccess, setPostSuccess] = useState(false)

    const handlePostSuccess = () => {
        setPostSuccess(prevState => !prevState)
    }

    function getConstructionTypeId() {
        const pathSegments = router.pathname.split('/');
        const section = pathSegments[2];

        switch (section) {
            case "nuoc-mat":
                return 1;
            case "nuoc-duoi-dat":
                return 2;
            case "xa-thai":
                return 3;
            default:
                return 0;
        }
    }

    const [paramsFilter, setParamsFilter] = useState({
        constructionName: '',
        exploitedWS: '',
        constructionTypeId: getConstructionTypeId(),
        businessId: 0,
        districtId: 0,
        communeId: 0,
        pageIndex: 0,
        pageSize: 0
    });


    const isMounted = useRef(true);

    const getDataConstruction = async () => {
        setLoading(true);
        getData('cong-trinh/danh-sach', paramsFilter)
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
        getDataConstruction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postSuccess, paramsFilter]);

    const handleFilterChange = (data: any, postSuccess: boolean | undefined) => {
        setParamsFilter(data);
        if (postSuccess !== undefined) {
            setPostSuccess(postSuccess);
        }
    };

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
                    <ConstructionToolBar onChange={handleFilterChange} />
                    <DataGridComponent
                        rows={resData}
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
