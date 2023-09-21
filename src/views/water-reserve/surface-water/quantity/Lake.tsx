import { Typography } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import { DataGrid, GridColDef, GridColumnGroupingModel, GridToolbarExport } from '@mui/x-data-grid';
import HeaderWaterReseve from "../../header";
import FooterWaterReseve from "../../footer";


const LakeSFReserve = () => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', },
        {
            field: 'stt',
            headerName: '〈 1 〉 ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            align: 'center',
            width: 80,
            flex: 0.5,
            sortable: false,
        },
        {
            field: 'lakeName',
            headerName: '〈 2 〉 ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 280,
            sortable: false,
        },
        {
            field: 'exploitedWater',
            headerName: '〈 3 〉 ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'belongsRiver',
            headerName: '〈 4 〉 ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'surfaceArea',
            headerName: '〈 5 〉 ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'totalCapacity',
            headerName: '〈 6 〉 ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'usefulCapacity',
            headerName: '〈 7 〉 ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'communeStart',
            headerName: '〈 8 〉 ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'districtStart',
            headerName: '〈 9 〉 ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'purpose',
            headerName: '〈 10 〉 ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        
        {
            field: 'description',
            headerName: '〈 11 〉 ',
            headerClassName: 'tableHead',
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
            groupId: 'Tên hồ chứa,ao,đầm,phá',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'lakeName' }]
            }],
        },
        {
            groupId: 'Nguồn nước khai thác',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'exploitedWater' }]
            }],
        },
        {
            groupId: 'Thuộc hệ thống sông ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'belongsRiver' }]
            }],
        },
        {
            groupId: 'Diện tích mặt nước(m2)',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'surfaceArea' }]
            }],
        },
        {
            groupId: 'Dung tích toàn bộ(triệu/m3)',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'totalCapacity' }]
            }],
        },
        {
            groupId: 'Dung tích hữu ích(triệu/m3)',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'usefulCapacity' }]
            }],
        },
        {
            groupId: 'Vị trí hành chính',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [
                { groupId: 'Xã', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'communeStart' }] },
                { groupId: 'Huyện', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'districtStart' }] },
            ],
        },
        {
            groupId: 'Mục đích sử dụng',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'purpose' }]
            }],
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
                <Typography pt={7} pb={4} className='font-weight-bold ' variant="h6">KIỂM KÊ SỐ LƯỢNG NGUỒN NƯỚC MẶT AO, HỒ, ĐẦM, PHÁ</Typography>
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
export default LakeSFReserve;