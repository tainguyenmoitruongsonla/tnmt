import * as React from 'react';

// ** MUI Imports
import { Autocomplete, Box, Button, Divider, Paper, Slide, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

// ** Icons Imports

// ** Components Imports
import CountLicenseForManage from 'src/views/license/count-license-for-manage';
import ApexChartLicense from 'src/views/license/license-bar-chart';
import fetchData from 'src/api/fetch';

import { columnFillters } from 'src/@core/components/data-grid';
import { Cached, FilterList, Search } from '@mui/icons-material';
import BoxLoading from 'src/@core/components/box-loading';

interface ToolbarProps {
    data: any
    columns: any
    formFilter?: any
}


const ManageLicense = () => {
    const [resData, setResData] = React.useState([]);
    const [resDataForChart, setResDataForChart] = React.useState([]);
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true)
                const data = await fetchData('License/list');
                setResData(data);
                setResDataForChart(data)
            } catch (error) {
                setResData([]);
                setResDataForChart([]);
            } finally {
                setLoading(false)
            }
        };
        getData();
    }, []);


    const licSurfaceWater = ['thuydien', 'hochua', 'trambom', 'tramcapnuoc', 'dapthuyloi', 'cong', 'nhamaynuoc', 'congtrinh_nuocmatkhac'];
    const licExploitGroundWater = ['khaithac'];
    const licProbedGroundWater = ['thamdo'];
    const licDrillingPractice = ['hanhnghekhoan'];
    const dischargeWaterCons = ['khu_cumcn_taptrung', 'sx_tieuthu_cn', 'sx_kd_dv', 'cs_benhvien', 'khudancu_langnghe', 'channuoi_ntts', 'congtrinh_xathaikhac'];

    const countLicense = (data: any, constructionTypeArray: string[]) => {
        return data.reduce((count: any, item: any) => {
            if (constructionTypeArray.includes(item.constructionTypeSlug)) {
                // Licensing Authorities
                let ministerCount = count.minister;
                let provinceCount = count.province;
                if (item.licensingAuthorities === 'BTNMT') {
                    ministerCount++;
                } else if (item.licensingAuthorities === 'UBNDT') {
                    provinceCount++;
                }

                // License Validity
                let validityCount = count.validity;
                if (item.licenseValidity === 'con-hieu-luc' || item.licenseValidity === 'sap-het-hieu-luc') {
                    validityCount++;
                }

                return {
                    total: count.total + 1,
                    minister: ministerCount,
                    province: provinceCount,
                    validity: validityCount
                };
            }

            return count;
        }, { total: 0, minister: 0, province: 0, validity: 0 });
    };

    const countLicenseForChart = (data: any, constructionTypeArray: string[]) => {
        const uniqueYears = Array.from(new Set(data.map((item: any) => new Date(item.signDate).getFullYear()))) as number[];

        const followYearCount: Record<number, number> = {};

        uniqueYears.forEach((year: number) => {
            followYearCount[year] = 0;
        });

        return data.reduce((count: any, item: any) => {
            if (constructionTypeArray.includes(item.constructionTypeSlug)) {

                // Year
                const signDateYear = new Date(item.signDate).getFullYear(); // Extract year from signDate
                followYearCount[signDateYear] = (followYearCount[signDateYear] || 0) + 1; // Increment year count

                return {
                    followYear: followYearCount
                };
            }

            return count;
        }, { followYear: followYearCount });
    };

    const countCategories = [
        { name: 'surfaceWaterCount', types: licSurfaceWater, displayName: 'Khai thác sử dụng nước mặt' },
        { name: 'exploitGroundWaterCount', types: licExploitGroundWater, displayName: 'Khai thác sử dụng nước dưới đất' },
        { name: 'probedGroundWaterCount', types: licProbedGroundWater, displayName: 'Thăm dò nước dưới đất' },
        { name: 'drillingPracticeCount', types: licDrillingPractice, displayName: 'Hành nghề khoan' },
        { name: 'dischargeWaterCount', types: dischargeWaterCons, displayName: 'Xả thải vào nguồn nước' },
    ];

    const dataForCount: any = {};
    const dataForChart: any = {};


    countCategories.forEach(category => {
        const countResult = countLicense(resData, category.types);
        const countResForChart = countLicenseForChart(resDataForChart, category.types);

        const uniqueYears = Array.from(new Set(Object.keys(countResForChart.followYear).map(Number).concat(Array.from({ length: new Date().getFullYear() - 2012 + 1 }, (_, i) => 2012 + i)))) as number[];

        uniqueYears.sort((a, b) => a - b);

        uniqueYears.forEach(year => {
            if (!countResForChart.followYear[year]) {
                countResForChart.followYear[year] = 0;
            }
        });

        dataForCount[category.name] = {
            totalCount: countResult.total,
            licensingAuthorities: { minister: countResult.minister, province: countResult.province },
            licenseValidity: countResult.validity,
        };

        dataForChart[category.name] = {
            dataFollowYear: uniqueYears.map(year => countResForChart.followYear[year] || 0),
            yearsArray: uniqueYears
        };
    });

    const data = countCategories.map(category => ({
        name: category.displayName,
        data: dataForChart[category.name].dataFollowYear,
    }));

    const year = dataForChart.surfaceWaterCount.yearsArray;

    const color = [
        'rgb(106, 179, 230)',
        'rgb(0, 61, 126)',
        'rgb(125, 95, 58)',
        'rgb(0, 178, 151)',
        'rgb(244, 153, 23)',
    ];

    const columnFillter: columnFillters[] = [
        {
            label: 'Cơ quan cấp phép',
            value: 'licensingAuthorities',
            type: 'select',
            options: [
                { label: 'BTNMT', value: 'BTNMT' },
                { label: 'UBND Tỉnh', value: 'UBNDT' },
            ],
        },
        {
            label: 'Loại hình cấp phép',
            value: 'licenseTypeSlug',
            type: 'select',
            options: [
                { label: 'Cấp mới', value: 'cap-moi' },
                { label: 'Cấp lại', value: 'cap-lai' },
                { label: 'Gia hạn', value: 'gia-han' },
                { label: 'Điểu chỉnh', value: 'dieu-chinh' },
                { label: 'Thu hồi', value: 'thu-hoi' },
            ],
        },
        {
            label: 'Hiệu lực giấy phép',
            value: 'licenseValidity',
            type: 'select',
            options: [
                { label: 'Còn hiệu lực', value: 'con-hieu-luc' },
                { label: 'Hết hiệu lực', value: 'het-hieu-luc' },
                { label: 'Sáp hết hiệu lực', value: 'sap-het-hieu-luc' },
                { label: 'Đã bị thu hồi', value: 'da-bi-thu-hoi' },
            ],
        },
        {
            label: 'Chủ  giấy phép',
            value: 'businessId',
            type: 'select',
            options: [
                { label: 'Công ty A', value: 1 },
                { label: 'Công ty B', value: 2 },
                { label: 'Công ty C', value: 3 },
                { label: '...', value: 4 },
            ],
        },
        {
            label: 'Công trình',
            value: 'constructionName',
            type: 'text',
        },
        {
            label: 'Loại công trình',
            value: 'constructionTypeSlug',
            type: 'select',
            options: [
                { label: 'Thủy điện', value: 'thuydien' },
                { label: 'Hồ chứa', value: 'hochua' },
                { label: 'Trạm bơm', value: 'trambom' },
                { label: '...', value: '...' },
            ],
        },
        {
            label: 'Huyện',
            value: 'districtId',
            type: 'select',
            options: [
                { label: 'Huyện 1', value: 1 },
                { label: 'Huyện 2', value: 2 },
                { label: 'Huyện 3', value: 3 },
                { label: '...', value: 4 },
            ],
        },
        {
            label: 'Xã',
            value: 'communeId',
            type: 'select',
            options: [
                { label: 'Xã 1', value: 1 },
                { label: 'Xã 2', value: 2 },
                { label: 'Xã 3', value: 3 },
                { label: '...', value: 4 },
            ],
        },
        {
            label: 'Tiểu vùng quy hoạch',
            value: 'basinId',
            type: 'select',
            options: [
                { label: 'Tiểu vùng quy hoạch 1', value: 1 },
                { label: 'Tiểu vùng quy hoạch 2', value: 2 },
                { label: 'Tiểu vùng quy hoạch 3', value: 3 },
                { label: '...', value: 4 },
            ],
        },
    ];

    function Toolbar(props: ToolbarProps) {
        const { data, columns, formFilter } = props;
        const [filters, setFilters] = React.useState<any>({});
        const [isSlideVisible, setIsSlideVisible] = React.useState(false);

        const toggleSlide = () => {
            setIsSlideVisible(!isSlideVisible);
        };

        const toggleReload = () => {
            setResDataForChart(data);
        }

        const handleFilterChange = (column: any, value: any) => {

            setFilters((prevFilters: any) => ({
                ...prevFilters,
                [column]: value,
            }));
        };

        const applyFilters = () => {
            const filteredData = data.filter((item: { [key: string]: any }) => {
                let isMatch = true; // Sử dụng biến để kiểm tra tất cả các điều kiện

                for (const column of columns) {
                    const columnValue = filters?.[column.value] as any;
                    const itemValue = item[column.value];

                    if (column.type === 'select') {
                        if (columnValue && itemValue !== columnValue.value) {
                            isMatch = false; // Nếu một điều kiện không khớp, đặt biến isMatch là false
                        }
                    }

                    if (column.type === 'text') {
                        if (columnValue?.toString().toLowerCase() && !itemValue?.toString().toLowerCase().includes(columnValue?.toString().toLowerCase())) {
                            isMatch = false; // Nếu một điều kiện không khớp, đặt biến isMatch là false
                        }
                    }

                    if (column.type === 'dateRange') {
                        if (columnValue) {
                            const itemValueYear = new Date(itemValue).getFullYear();
                            if (columnValue.from && itemValueYear < columnValue.from) {
                                isMatch = false;
                            }
                            if (columnValue.to && itemValueYear > columnValue.to) {
                                isMatch = false;
                            }
                        }
                    }
                }

                return isMatch; // Trả về true nếu tất cả các điều kiện khớp
            });
            setResDataForChart(filteredData);
        };

        return (
            <Grid container justifyContent={'end'} alignItems={'center'} py={3} >
                <Button size="small" startIcon={<FilterList />} onClick={toggleSlide}>
                    Bộ lọc
                </Button>
                <Divider orientation="vertical" variant="middle" sx={{ borderColor: 'gray' }} flexItem />
                <Button size="small" startIcon={<Cached />} onClick={toggleReload}>
                    Tải lại
                </Button>
                <Slide direction="left" in={isSlideVisible} mountOnEnter unmountOnExit>
                    <fieldset style={{ width: '100%' }}>
                        <legend>
                            <Typography variant={'button'}>Bộ lọc</Typography>
                        </legend>
                        <Grid container >
                            {columns.map((column: any) => (
                                <Grid md={column.type === 'dateRange' ? 4 : 2} xs={12} py={2} px={column.type === 'dateRange' ? 0 : 2} key={column.value}>
                                    {column.type === 'text' ? (
                                        <TextField
                                            size='small'
                                            fullWidth
                                            variant='standard'
                                            inputProps={{ style: { fontSize: 11 } }}
                                            InputLabelProps={{ style: { fontSize: 14 } }}
                                            label={column.label}
                                            value={filters?.[column.value] || ''}
                                            onChange={(event) => handleFilterChange(column.value, event.target.value)}
                                        />
                                    ) : column.type === 'select' ? (
                                        <Autocomplete
                                            size='small'
                                            fullWidth
                                            options={column.options}
                                            getOptionLabel={(option) => option.label}
                                            value={filters?.[column.value] || null}
                                            onChange={(_, value) => handleFilterChange(column.value, value)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant='standard'
                                                    fullWidth
                                                    label={column.label}
                                                />
                                            )}
                                        />

                                    ) : column.type === 'dateRange' ? (

                                        <Grid container>
                                            <Box width={'50%'} px={2}>
                                                <Autocomplete
                                                    size="small"
                                                    fullWidth
                                                    options={column.options || []}
                                                    getOptionLabel={(option) => option.label}
                                                    value={filters?.[column.value] && filters?.[column.value].from}
                                                    onChange={(_, value) =>
                                                        handleFilterChange(column.value, {
                                                            ...filters?.[column.value],
                                                            from: value?.value,
                                                        })
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant='standard'
                                                            fullWidth
                                                            label={`Từ ${column.label}`}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                            <Box width={'50%'} px={2}>
                                                <Autocomplete
                                                    size="small"
                                                    fullWidth
                                                    options={column.options || []}
                                                    getOptionLabel={(option) => option.label}
                                                    value={filters?.[column.value] && filters?.[column.value].to}
                                                    onChange={(_, value) =>
                                                        handleFilterChange(column.value, {
                                                            ...filters?.[column.value],
                                                            to: value?.value,
                                                        })
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant='standard'
                                                            fullWidth
                                                            label={`Đến ${column.label}`}
                                                        />
                                                    )}
                                                />
                                            </Box>

                                        </Grid>
                                    ) : null}
                                </Grid>
                            ))}
                            {formFilter ?
                                <Grid md={2} xs={6} px={2}>
                                    {formFilter}
                                </Grid>
                                : ''}
                            <Grid xs={12} justifyContent={'end'} display={'flex'} pt={4}>
                                <Button size="small" className="btn" variant="outlined" startIcon={<Search />} onClick={applyFilters}>
                                    Tìm  kiếm
                                </Button>
                            </Grid>
                        </Grid>
                    </fieldset>
                </Slide>
            </Grid>
        );
    };

    return (
        loading ? (
            <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <BoxLoading />
            </Box>
        ) : (
            <Grid container rowSpacing={5} pt={3} px={2}>
                <CountLicenseForManage data={dataForCount} />
                <Grid xs={12} sm={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
                    <Paper elevation={3}>
                        <Toolbar data={resData} columns={columnFillter} />
                        <ApexChartLicense data={data} year={year} color={color} />
                    </Paper>
                </Grid>
            </Grid >
        )
    )
}

export default ManageLicense
