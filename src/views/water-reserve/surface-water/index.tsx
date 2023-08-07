import { Typography } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import { DataGrid, GridColDef, GridColumnGroupingModel, GridToolbarExport } from '@mui/x-data-grid';

const SurfaceWater = () => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', },
        {
            field: 'stt',
            headerName: '(1) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            align: 'center',
            width: 80,
            flex: 0.5,
            sortable: false,
        },
        {
            field: 'basin',
            headerName: '(2) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 280,
            sortable: false,
        },
        {
            field: 'i',
            headerName: '(3) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'ii',
            headerName: '(4) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'iii',
            headerName: '(5) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'iv',
            headerName: '(6) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'v',
            headerName: '(7) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'vi',
            headerName: '(8) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'vii',
            headerName: '(9) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'viii',
            headerName: '(10) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'ix',
            headerName: '(11) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'x',
            headerName: '(12) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'xi',
            headerName: '(13) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'xii',
            headerName: '(14) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 100,
            sortable: false,
        },
        {
            field: 'avgYear',
            headerName: '(15) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 150,
            sortable: false,
        },
        {
            field: 'totalAmountOfSurfaceWater',
            headerName: '(16) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            width: 150,
            sortable: false,
        },

        {
            field: 'description',
            headerName: '(17) ',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            minWidth: 250,
            flex: 1,
            sortable: false,
        },
    ];

    const columnGroupingModel: GridColumnGroupingModel = [
        {
            groupId: 'STT',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'stt' }]
            }],
        },
        {
            groupId: 'Tiểu vùng lưu vực',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'basin' }]
            }],
        },
        {
            groupId: 'Lưu lượng (m³/s)',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [
                { groupId: 'I', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'i' }] },
                { groupId: 'II', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'ii' }] },
                { groupId: 'III', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'iii' }] },
                { groupId: 'IV', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'iv' }] },
                { groupId: 'V', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'v' }] },
                { groupId: 'VI', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'vi' }] },
                { groupId: 'VII', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'vii' }] },
                { groupId: 'VIII', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'viii' }] },
                { groupId: 'IX', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'ix' }] },
                { groupId: 'X', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'x' }] },
                { groupId: 'XI', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'xi' }] },
                { groupId: 'XII', headerClassName: 'tableHead', headerAlign: 'center', children: [{ field: 'xii' }] }
            ],
        },
        {
            groupId: 'TB năm',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'avgYear' }]
            }],
        },
        {
            groupId: 'W(10⁶m³)',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'totalAmountOfSurfaceWater' }]
            }],
        },
        {
            groupId: 'Ghi chú',
            headerClassName: 'tableHead',
            headerAlign: 'center',
            children: [{
                groupId: ' ',
                headerClassName: 'tableHead',
                children: [{ field: 'description' }]
            }],
        },
    ];

    const rows = [
        { id: 1, stt: 1, basin: 'basin1', i: 1, ii: 1, iii: 1, iv: 1, v: 1, vi: 1, vii: 1, viii: 1, ix: 1, x: 1, xi: 1, xii: 1, avgYear: 1, totalAmountOfSurfaceWater: 1, description: 1 },
        { id: 2, stt: 2, basin: 'basin2', i: 2, ii: 2, iii: 2, iv: 2, v: 2, vi: 2, vii: 2, viii: 2, ix: 2, x: 2, xi: 2, xii: 2, avgYear: 2, totalAmountOfSurfaceWater: 2, description: 2 },
        { id: 3, stt: 3, basin: 'basin3', i: 3, ii: 3, iii: 3, iv: 3, v: 3, vi: 3, vii: 3, viii: 3, ix: 3, x: 3, xi: 3, xii: 3, avgYear: 3, totalAmountOfSurfaceWater: 3, description: 3 },
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
            <Grid md={12} xs={12} textAlign={'center'} textTransform={'uppercase'}>
                <Typography pt={7} pb={4} variant="h6">THÔNG TIN DỮ LIỆU VỀ LƯU LƯỢNG TRUNG BÌNH THÁNG NĂM TRÊN CÁC TIỂU VÙNG QUY HOẠCH <br /> TRÊN ĐỊA BÀN tỉnh quảng ngãi</Typography>
                <Typography variant="button">Kỳ báo cáo: <b>{new Date().getFullYear()}</b></Typography>
            </Grid>
            <Grid md={12} xs={12} px={15} pt={3}>
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
        </Grid>
    )
}
export default SurfaceWater;