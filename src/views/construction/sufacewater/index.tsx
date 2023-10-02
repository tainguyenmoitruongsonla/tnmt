//React Imports
import React, { useState, useEffect, useRef } from 'react'

//MUI Imports
import { Box, Tooltip, IconButton, Typography, Paper, Popover, Alert, ButtonGroup, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid'

//Other Imports
import FormatDate from 'src/@core/components/format-date'
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import DataGridComponent from 'src/@core/components/data-grid'
import { Delete } from '@mui/icons-material'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import dynamic from 'next/dynamic'
import { ConverterCood } from 'src/@core/components/map/convert-coord'
import CreateConstruction from '../form'
import { useRouter } from 'next/router'
import ConstructionToolBar from '../tool-bar'
import { deleteData, getData } from 'src/api/axios'

const Map = dynamic(() => import('src/@core/components/map'), { ssr: false })

// eslint-disable-next-line react-hooks/rules-of-hooks
const SurfaceConstruction = () => {
    //Init columnTable
    const columnsTable: GridColDef[] = [
        { field: 'id', headerAlign: 'center', headerName: 'ID', minWidth: 90 },
        {
            field: 'constructionName',
            headerAlign: 'center',
            headerName: 'Tên công trình',
            minWidth: 350,
            renderCell: data => (
                <Typography className='btnShowFilePdf' onClick={() => zoomConstruction(ConverterCood(data.row.y, data.row.x))}>
                    {data.row.constructionName}
                </Typography>
            )
        },
        {
            field: 'constructionLocation',
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
            field: 'exploitedWS',
            headerAlign: 'center',
            headerName: 'Nguồn nước khai thác',
            minWidth: 300
        },
        {
            field: 'exploitMethod',
            headerAlign: 'center',
            headerName: 'Phương thức khai thác',
            minWidth: 300
        },
        {
            field: 'exploitMode',
            headerAlign: 'center',
            headerName: 'Chế độ KT',
            minWidth: 300
        },
        {
            field: 'exploitPurpose',
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
            field: 'constructionTime',
            headerAlign: 'center',
            headerName: '	Năm xây dựng',
            minWidth: 100
        },
        {
            field: 'startDate',
            headerAlign: 'center',
            headerName: 'Năm vận hành',
            minWidth: 100
        },

        //constructionDetails
        {
            field: 'constructionLevel',
            headerAlign: 'center',
            headerName: 'Cấp CT',
            minWidth: 150
        },
        {
            field: 'basinArea',
            headerAlign: 'center',
            headerName: 'F lưu vực (km2)',
            minWidth: 150
        },
        {
            field: 'rainAvgForYears',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    X <sub>TB năm</sub> (m)
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'flowAvgForYears',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    Q <sub>TB năm</sub>(m3/s)
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'power',
            headerAlign: 'center',
            headerName: 'CS lắp máy(MW)',
            minWidth: 150
        },
        {
            field: 'guaranteedPower',
            headerAlign: 'center',
            headerName: 'CS đảm bảo (MW)',
            minWidth: 150
        },
        {
            field: 'damHeight',
            headerAlign: 'center',
            headerName: 'Chiều cao đập (m)',
            minWidth: 150
        },
        {
            field: 'damWidth',
            headerAlign: 'center',
            headerName: 'Chiều dài đập (m)',
            minWidth: 150
        },
        {
            field: 'damElevation',
            headerAlign: 'center',
            headerName: 'Cao trình đập (m)',
            minWidth: 150
        },
        {
            field: 'maximumFlow',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    Q<sub>max</sub>(m<sup>3</sup>/s)
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'minimumFlow',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    Q<sub>TT</sub>(m<sup>3</sup>/s)
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'guaranteedFlow',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    Q<sub>đảm bảo</sub>(m<sup>3</sup>/s)
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'hmax',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    H<sub>max</sub> (m){' '}
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'hmin',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    H<sub>min</sub> (m)
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'htt',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    H<sub>TT</sub>
                </span>
            ),
            minWidth: 150
        },
        { field: 'deadWL', headerAlign: 'center', headerName: 'MNC(m)', minWidth: 150 },
        { field: 'riseWL', headerAlign: 'center', headerName: 'MNDBT(m)', minWidth: 150 },
        {
            field: 'designFloodLevel',
            headerAlign: 'center',
            headerName: 'MNLTK(m)',
            minWidth: 150
        },
        {
            field: 'checkFloodWL',
            headerAlign: 'center',
            headerName: 'MNLKT(m)',
            minWidth: 150
        },
        {
            field: 'totalCapacity',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    W<sub>toàn bộ</sub>(triệu m<sup>3</sup>)
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'deadCapacity',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    W<sub> chết </sub>(triệu m<sup>3</sup>)
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'usefulCapacity',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    W<sub>hữu ích</sub>(triệu m<sup>3</sup>)
                </span>
            ),
            minWidth: 150
        },

        {
            field: 'pumpNumber',
            headerAlign: 'center',
            headerName: 'Số máy bơm',
            minWidth: 150
        },
        {
            field: 'flowDesigned',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    Q<sub>TK</sub> (m<sup>3</sup>/h)
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'realityFlow',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    Q<sub>TT</sub> (m<sup>3</sup>/h)
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'wateringAreaDesigned',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    F<sub>tưới TK</sub> (ha)
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'realityWateringArea',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    F<sub>tưới TT</sub> (ha)
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'averagePumpTime',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    T<sub>bơm TB</sub>(h)
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'minimumPumpTime',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    T<sub>bơm min</sub>(h)
                </span>
            ),
            minWidth: 150
        },
        {
            field: 'maximumPumpTime',
            headerAlign: 'center',
            renderHeader: () => (
                <span>
                    T<sub>bơm max</sub>(h)
                </span>
            ),
            minWidth: 150
        },

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
            renderCell: params => (
                <div style={{ width: '100%' }}>
                    {params.row.licenses?.map((e: any) => (
                        <div key={e.id}>
                            {FormatDate(e.issueDate)}
                        </div>
                    ))}
                </div>
            )
        },
        {
            field: 'license.SignDate',
            headerAlign: 'center',
            headerName: 'Ngày ký',
            minWidth: 150,
            renderCell: params => (
                <div style={{ width: '100%' }}>
                    {params.row.licenses?.map((e: any) => (
                        <div key={e.id}>
                            {FormatDate(e.signDate)}
                        </div>
                    ))}
                </div>
            )
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
            field: 'actions',
            headerAlign: 'center',
            headerName: '#',
            minWidth: 120,
            sortable: false,
            renderCell: data => (
                <Box>
                    <CreateConstruction isEdit={true} data={data.row} setPostSuccess={handlePostSuccess} />
                    <Tooltip title='Xóa thông tin công trình'>
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
            groupId: 'Thông tin công trình',
            headerAlign: 'center',
            children: [
                { field: 'constructionName' },
                { field: 'constructionLocation' },
                { field: 'coordinates' },
                { field: 'exploitedWS' },
                { field: 'exploitMethod' },
                { field: 'exploitMode' },
                { field: 'exploitPurpose' },
                { field: 'basinName' },
                { field: 'constructionTime' },
                { field: 'startDate' }
            ]
        },

        {
            groupId: 'Thông số của công trình',
            headerAlign: 'center',
            children: [
                { field: 'constructionLevel' },
                { field: 'basinArea' },
                { field: 'rainAvgForYears' },
                { field: 'flowAvgForYears' },
                { field: 'power' },
                { field: 'guaranteedPower' },
                { field: 'damHeight' },
                { field: 'damWidth' },
                { field: 'damElevation' },
                { field: 'maximumFlow' },
                { field: 'minimumFlow' },
                { field: 'guaranteedFlow' },
                { field: 'hmax' },
                { field: 'hmin' },
                { field: 'htt' },
                { field: 'deadWL' },
                { field: 'riseWL' },
                { field: 'designFloodLevel' },
                { field: 'checkFloodWL' },
                { field: 'totalCapacity' },
                { field: 'deadCapacity' },
                { field: 'usefulCapacity' },
                { field: 'pumpNumber' },
                { field: 'flowDesigned' },
                { field: 'realityFlow' },
                { field: 'wateringAreaDesigned' },
                { field: 'realityWateringArea' },
                { field: 'averagePumpTime' },
                { field: 'minimumPumpTime' },
                { field: 'maximumPumpTime' }
            ]
        },
        {
            groupId: 'Thông tin giấy phép',
            headerAlign: 'center',
            children: [{ field: 'license.LicenseNumber' }, { field: 'license.SignDate' }, { field: 'license.IssueDate' }]
        },

        {
            groupId: 'Tiền cấp quyền',
            headerAlign: 'center',
            children: [{ field: 'licenseFees.licenseFeeNumber' }, { field: 'licenseFees.TotalMoney' }]
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
    const [resData, setResData] = useState([])
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    //delete
    const [deleteConfirmAnchorEl, setDeleteConfirmAnchorEl] = useState<HTMLButtonElement | null>(null)
    const deleteConfirmOpen = Boolean(deleteConfirmAnchorEl)
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
        const dataId = data.id;
        deleteData('Construction/delete', dataId)
            .then((data) => {
                if (isMounted.current) {
                    setResData(prevData => prevData.filter((item: any) => item.id !== data.id))
                }
            })
            .finally(() => {
                setLoading(false);
                setDeleteConfirmAnchorEl(null)
            });
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


    useEffect(() => {
        isMounted.current = true

        return () => {
            isMounted.current = false;
        };
    }, []);


    useEffect(() => {
        switch (paramsFilter.constructionTypeId) {
            case 1:
                setColumnVisibility([]); break;
            case 4:
                setColumnVisibility([
                    'pumpNumber',
                    'flowDesigned',
                    'realityFlow',
                    'wateringAreaDesigned',
                    'realityWateringArea',
                    'averagePumpTime',
                    'minimumPumpTime',
                    'maximumPumpTime'
                ]); break;
            case 5:
                setColumnVisibility([
                    'pumpNumber',
                    'flowDesigned',
                    'realityFlow',
                    'wateringAreaDesigned',
                    'realityWateringArea',
                    'averagePumpTime',
                    'minimumPumpTime',
                    'maximumPumpTime'
                ]); break;
            case 6:
                setColumnVisibility([
                    'constructionLevel',
                    'basinArea',
                    'rainAvgForYears',
                    'flowAvgForYears',
                    'guaranteedPower',
                    'damHeight',
                    'damWidth',
                    'damElevation',
                    'maximumFlow',
                    'minimumFlow',
                    'guaranteedFlow',
                    'hmax',
                    'hmin',
                    'htt',
                    'deadWL',
                    'riseWL',
                    'designFloodLevel',
                    'checkFloodWL',
                    'totalCapacity',
                    'deadCapacity',
                    'usefulCapacity',
                    'flowDesigned',
                    'realityFlow'
                ]); break;
            case 10:
                setColumnVisibility([
                    'constructionLevel',
                    'basinArea',
                    'rainAvgForYears',
                    'flowAvgForYears',
                    'guaranteedPower',
                    'damHeight',
                    'damWidth',
                    'damElevation',
                    'maximumFlow',
                    'minimumFlow',
                    'guaranteedFlow',
                    'hmax',
                    'hmin',
                    'htt',
                    'deadWL',
                    'riseWL',
                    'designFloodLevel',
                    'checkFloodWL',
                    'totalCapacity',
                    'deadCapacity',
                    'usefulCapacity',
                    'pumpNumber',
                    'wateringAreaDesigned',
                    'realityWateringArea',
                    'averagePumpTime',
                    'minimumPumpTime',
                    'maximumPumpTime'
                ]); break;
            default:
                setColumnVisibility([
                    'constructionLevel',
                    'basinArea',
                    'rainAvgForYears',
                    'flowAvgForYears',
                    'power',
                    'guaranteedPower',
                    'damHeight',
                    'damWidth',
                    'damElevation',
                    'maximumFlow',
                    'minimumFlow',
                    'guaranteedFlow',
                    'hmax',
                    'hmin',
                    'htt',
                    'deadWL',
                    'riseWL',
                    'designFloodLevel',
                    'checkFloodWL',
                    'totalCapacity',
                    'deadCapacity',
                    'usefulCapacity',
                    'pumpNumber',
                    'flowDesigned',
                    'realityFlow',
                    'wateringAreaDesigned',
                    'realityWateringArea',
                    'averagePumpTime',
                    'minimumPumpTime',
                    'maximumPumpTime'
                ]); break;
        }

        const getDataConstructions = async () => {
            setLoading(true);
            getData('Construction/list', paramsFilter)
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
        getDataConstructions();
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
                    <Box className='map-legend' sx={{ background: 'white', pl: 2 }}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox onClick={() => setShowLabel(!showLabel)} />}
                                label='Hiển thị tên công trình'
                            />
                        </FormGroup>
                    </Box>
                    <Map center={mapCenter} zoom={mapZoom} showLabel={showLabel} mapData={resData} loading={false} />
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
                        columnVisibility={columnVisibility}
                        actions={<CreateConstruction isEdit={false} setPostSuccess={handlePostSuccess} />}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default SurfaceConstruction
