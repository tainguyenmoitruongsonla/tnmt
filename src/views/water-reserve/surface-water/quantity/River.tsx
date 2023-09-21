import { Typography } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import { DataGrid, GridColDef, GridColumnGroupingModel, GridToolbarExport } from '@mui/x-data-grid';
import HeaderWaterReseve from "../../header";
import FooterWaterReseve from "../../footer";


const RiverSFReserve = () => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', },
        {
            field: 'stt',
            headerName: '〈 1 〉 ',
            
            headerAlign: 'center',
            align: 'center',
            width: 80,
            flex: 0.5,
            sortable: false,
        },
        {
            field: 'riverID',
            headerName: '〈 2 〉 ',
            
            headerAlign: 'center',
            width: 280,
            sortable: false,
        },
        {
            field: 'riverName',
            headerName: '〈 3 〉 ',
            
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'outflow',
            headerName: '〈 4 〉 ',
            
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'length',
            headerName: '〈 5 〉 ',
            
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'xStart',
            headerName: '〈 6 〉 ',
            
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'yStart',
            headerName: '〈 7 〉 ',
            
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'communeStart',
            headerName: '〈 8 〉 ',
            
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'districtStart',
            headerName: '〈 9 〉 ',
            
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'xFinish',
            headerName: '〈 10 〉 ',
            
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'yFinish',
            headerName: '〈 11 〉 ',
            
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'communeFinish',
            headerName: '〈 12 〉 ',
            
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'districtFinish',
            headerName: '〈 13 〉 ',
            
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'description',
            headerName: '〈 14 〉 ',
            
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
       
    ];

    const columnGroupingModel: GridColumnGroupingModel = [
        {
            groupId: 'STT',
            
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                
                children: [{ field: 'stt' }]
            }],
        },
        {
            groupId: 'Mã sông',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'riverID' }]
            }],
        },
        {
            groupId: 'Tên sông',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'riverName' }]
            }],
        },
        {
            groupId: 'Chảy ra ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'outflow' }]
            }],
        },
        {
            groupId: 'Chiều dài',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'length' }]
            }],
        },
        {
            groupId: 'Vị trí đầu sông',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [
                { groupId: 'Tọa độ X', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'xStart' }] },
                { groupId: 'Tọa độ Y', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'yStart' }] },
                { groupId: 'Xã', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'communeStart' }] },
                { groupId: 'Huyện', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'districtStart' }] },
            ],
        },
        {
            groupId: 'Vị trí cuối sông',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [
                { groupId: 'Tọa độ X', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'xFinish' }] },
                { groupId: 'Tọa độ Y', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'yFinish' }] },
                { groupId: 'Xã', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'communeFinish' }] },
                { groupId: 'Huyện', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'districtFinish' }] },
            ],
        },
        {
            groupId: 'Ghi chú',
            
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                
                children: [{ field: 'description' }]
            }],
        },
    ];

    const rows = [
        { id: 1,stt: 1, description: 1 },
        { id: 2, stt: 2,description: 2 },
        { id: 3, stt: 3,  description: 3 },
    ];

    const toolbar = () => {

        return (
            <Grid display={'flex'} justifyContent={'end'}>
                <GridToolbarExport csvOptions={{
                 utf8WithBom: true,
                }} />
            </Grid>
        )
    }

    return (
        <Grid container>
            <HeaderWaterReseve />   
            <Grid md={12} xs={12} textAlign={'center'} textTransform={'uppercase'}>
                <Typography pt={7} pb={4} className='font-weight-bold ' variant="h6">KIỂM KÊ SỐ LƯỢNG NGUỒN NƯỚC MẶT SÔNG, SUỐI, KÊNH RẠCH</Typography>
            </Grid>
            <Grid md={12} xs={12} pt={3}>
                <DataGrid
                    className="main-table"
                    rows={rows}
                    columns={columns}
                    slots={{
                        toolbar: toolbar
                    }}
                    disableRowSelectionOnClick
                    disableColumnMenu
                    showCellVerticalBorder
                    showColumnVerticalBorder
                    experimentalFeatures={{ columnGrouping: true }}
                    columnGroupingModel={columnGroupingModel}
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                // Hide columns status and traderName, the other columns will remain visible
                                id: false,
                            },
                        },
                    }}
                    density="compact"
                />
            </Grid>
            <FooterWaterReseve />   
        </Grid>
    )
}
export default RiverSFReserve;