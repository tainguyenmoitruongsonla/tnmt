import { Typography } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import { DataGrid, GridColDef, GridColumnGroupingModel, GridToolbarExport } from '@mui/x-data-grid';

const AquiferArea = () => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', },
        {
            field: 'stt',
            headerName:'〈 1 〉',
            
            headerAlign: 'center',
            align: 'center',
            width: 80,
            flex: 0.5,
            sortable: false,
        },
        {
            field: 'basin',
            headerName:'〈 2 〉',
            
            headerAlign: 'center',
            width: 280,
            sortable: false,
        },
        {
            field: 'acreage',
            headerName:'〈 3 〉',
            
            headerAlign: 'center',
            width: 150,
            sortable: false,
        },
        {
            field: 'annualRainfall',
            headerName:'〈 4 〉',
            
            headerAlign: 'center',
            width: 150,
            sortable: false,
        },
        {
            field: 'population',
            headerName:'〈 5 〉',
            
            headerAlign: 'center',
            width: 150,
            sortable: false,
        },
        {
            field: 'totalAmountOfRainWater',
            headerName:'〈 6 〉',
            
            headerAlign: 'center',
            width: 150,
            sortable: false,
        },
        {
            field: 'amountOfRainWater',
            headerName:'〈 7 〉',
            
            headerAlign: 'center',
            width: 150,
            sortable: false,
        },
        {
            field: 'description',
            headerName:'〈 8 〉',
            
            headerAlign: 'center',
            width: 250,
            flex: 1,
            sortable: false,
        },
    ];

    const columnGroupingModel: GridColumnGroupingModel = [
        {
            groupId: 'STT',
            
            headerAlign: 'center',
            children: [{ field: 'stt' }],
        },
        {
            groupId: 'Tầng chứa nước/lưu vực',
            
            headerAlign: 'center',
            children: [{ field: 'basin' }],
        },
        {
            groupId: 'Diện tích(km)',
            
            headerAlign: 'center',
            children: [{ field: 'acreage' }],
        },
        {
            groupId: 'Dân số(người)',
            
            headerAlign: 'center',
            children: [{ field: 'annualRainfall' }],
        },
        {
            groupId: 'Lưu lượng mưa năm(mm)',
            
            headerAlign: 'center',
            children: [{ field: 'population' }],
        },
        {
            groupId: 'Tổng lượng nước mưa(10³m³)',
            
            headerAlign: 'center',
            children: [{ field: 'totalAmountOfRainWater' }],
        },
        {
            groupId: 'Lượng nước mưa(m³/người/năm)',
            
            headerAlign: 'center',
            children: [{ field: 'amountOfRainWater' }],
        },
        {
            groupId: 'Ghi chú',
            
            headerAlign: 'center',
            children: [{ field: 'description' }],
        },
    ];

    const rows = [
        { id: 1, stt: 1, basin: 'basin1', acreage: '15', annualRainfall: '1000', population: '1000000', totalAmountOfRainWater: '1000000', amountOfRainWater: '10000', description: 'note' },
        { id: 2, stt: 2, basin: 'basin1', acreage: '15', annualRainfall: '1000', population: '1000000', totalAmountOfRainWater: '1000000', amountOfRainWater: '10000', description: 'note' },
        { id: 3, stt: 3, basin: 'basin1', acreage: '15', annualRainfall: '1000', population: '1000000', totalAmountOfRainWater: '1000000', amountOfRainWater: '10000', description: 'note' }
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
                <Typography pt={7} pb={4} variant="h6">THÔNG TIN DỮ LIỆU VỀ DIỆN TÍCH CÁC TẦNG CHỨA NƯỚC THEO TIỂU VÙNG QUY HOẠCH <br /> trên địa bàn tỉnh quảng ngãi</Typography>
                <Typography variant="button">Kỳ báo cáo: <b>{new Date().getFullYear()}</b></Typography>
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
        </Grid>
    )
}
export default AquiferArea;