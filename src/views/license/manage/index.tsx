import { useEffect, useRef, useState } from 'react';

// ** MUI Imports
import { Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

// ** Icons Imports

// ** Components Imports
import CountLicenseForManage from 'src/views/license/count-license-for-manage';
import ApexChartLicense from 'src/views/license/license-bar-chart';
import { getData } from 'src/api/axios';
import BoxLoading from 'src/@core/components/box-loading';
import LicenseToolBar from '../tool-bar';


const ManageLicense = () => {
    const [resData, setResData] = useState([]);
    const [resDataForChart, setResDataForChart] = useState([]);
    const [loading, setLoading] = useState(false)
    const [resLoading, setResLoading] = useState(false)

    const [paramsFilter, setParamsFilter] = useState({
        licenseNumber: null,
        licensingAuthorities: null,
        licenseTypeId: 0,
        licenseValidity: null,
        businessId: 0,
        constructionId: 0,
        constructionTypeId: 0,
        districtId: 0,
        communeId: 0,
        subBasinId: 0,
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
        const getDataLicense = async () => {
            setResLoading(true);
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
                    if (isMounted.current) {
                        setResLoading(false);
                    }
                });
        };
        getDataLicense();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const getDataForChart = async () => {
        setLoading(true);
        getData('giay-phep/danh-sach', paramsFilter)
            .then((data) => {
                if (isMounted.current) {
                    setResDataForChart(data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                if (isMounted.current) {
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        getDataForChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsFilter]);


    const licSurfaceWater = ['thuydien', 'hochua', 'trambom', 'tramcapnuoc', 'dapthuyloi', 'cong', 'nhamaynuoc', 'congtrinh_nuocmatkhac'];
    const licExploitGroundWater = ['khaithac'];
    const licProbedGroundWater = ['thamdo'];
    const licDrillingPractice = ['hanhnghekhoan'];
    const dischargeWaterCons = ['khu_cumcn_taptrung', 'sx_tieuthu_cn', 'sx_kd_dv', 'cs_benhvien', 'khudancu_langnghe', 'channuoi_ntts', 'congtrinh_xathaikhac'];

    const countLicense = (data: any, constructionTypeArray: string[]) => {
        return data.reduce((count: any, item: any) => {
            if (constructionTypeArray.includes(item.construction?.constructionTypeSlug)) {
                // Licensing Authorities
                let ministerCount = count.minister;
                let provinceCount = count.province;
                if (item.licensingAuthorities.toLowerCase() === 'btnmt') {
                    ministerCount++;
                } else if (item.licensingAuthorities.toLowerCase() === 'ubndt') {
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
            if (constructionTypeArray.includes(item.construction?.constructionTypeSlug)) {

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
    ]

    const handleFilterChange = (data: any) => {
        setParamsFilter(data);
    };

    return (
        <Grid container rowSpacing={5} pt={3} px={2}>
            <CountLicenseForManage data={dataForCount} loading={resLoading} />
            <Grid xs={12} sm={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
                <Paper elevation={3}>
                    <LicenseToolBar onChange={handleFilterChange} />
                    {loading ? <BoxLoading /> : <ApexChartLicense data={data} year={year} color={color} />}
                </Paper>
            </Grid>
        </Grid >
    )
}

export default ManageLicense
