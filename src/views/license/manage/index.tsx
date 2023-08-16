import * as React from 'react';

// ** MUI Imports
import { Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react'

// ** Icons Imports

// ** Components Imports
import CountLicenseForManage from 'src/views/license/count-license-for-manage';
import ApexChartLicense from 'src/views/license/license-bar-chart';
import fetchData from 'src/api/fetch';
import { useLoadingContext } from 'src/@core/theme/loading-provider';


const ManageLicense = () => {
    useEffect(() => {
        document.title = "Quản lý thông tin giấy phép nước mặt";
    }, []);

    const [resData, setResData] = useState([]);
    const { showLoading, hideLoading } = useLoadingContext();
    const [loading, setLoading] = useState(false)
    loading == true ? showLoading() : hideLoading();

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const data = await fetchData('License/list');
                setResData(data);
            } catch (error) {
                setResData([]);
            } finally {
                setLoading(false);
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
        const uniqueYears = Array.from(new Set(data.map((item: any) => new Date(item.signDate).getFullYear()))) as number[];

        const followYearCount: Record<number, number> = {};

        uniqueYears.forEach((year: number) => {
            followYearCount[year] = 0;
        });

        return data.reduce((count: any, item: any) => {
            if (constructionTypeArray.includes(item.constructionTypeSlug)) {
                // Licensing Authorities
                let ministerCount = count.minister;
                let provinceCount = count.province;
                if (item.licensingAuthorities === 0) {
                    ministerCount++;
                } else if (item.licensingAuthorities === 1) {
                    provinceCount++;
                }

                // License Validity
                let validityCount = count.validity;
                if (item.licenseValidity === 'con-hieu-luc' || item.licenseValidity === 'sap-het-hieu-luc') {
                    validityCount++;
                }

                // Year
                const signDateYear = new Date(item.signDate).getFullYear(); // Extract year from signDate
                followYearCount[signDateYear] = (followYearCount[signDateYear] || 0) + 1; // Increment year count

                return {
                    total: count.total + 1,
                    minister: ministerCount,
                    province: provinceCount,
                    validity: validityCount,
                    followYear: followYearCount
                };
            }

            return count;
        }, { total: 0, minister: 0, province: 0, validity: 0, followYear: followYearCount });
    };

    const countCategories = [
        { name: 'surfaceWaterCount', types: licSurfaceWater, displayName: 'Khai thác sử dụng nước mặt' },
        { name: 'exploitGroundWaterCount', types: licExploitGroundWater, displayName: 'Khai thác sử dụng nước dưới đất' },
        { name: 'probedGroundWaterCount', types: licProbedGroundWater, displayName: 'Thăm dò nước dưới đất' },
        { name: 'drillingPracticeCount', types: licDrillingPractice, displayName: 'Hành nghề khoan' },
        { name: 'dischargeWaterCount', types: dischargeWaterCons, displayName: 'Xả thải vào nguồn nước' },
    ];

    const dataForCount: any = {};

    countCategories.forEach(category => {
        const countResult = countLicense(resData, category.types);
        const uniqueYears = Array.from(new Set(Object.keys(countResult.followYear).map(Number).concat(Array.from({ length: new Date().getFullYear() - 2012 + 1 }, (_, i) => 2012 + i)))) as number[];

        uniqueYears.sort((a, b) => a - b);

        uniqueYears.forEach(year => {
            if (!countResult.followYear[year]) {
                countResult.followYear[year] = 0;
            }
        });

        dataForCount[category.name] = {
            totalCount: countResult.total,
            licensingAuthorities: { minister: countResult.minister, province: countResult.province },
            licenseValidity: countResult.validity,
            dataFollowYear: uniqueYears.map(year => countResult.followYear[year] || 0),
            yearsArray: uniqueYears
        };
    });

    const data = countCategories.map(category => ({
        name: category.displayName,
        data: dataForCount[category.name].dataFollowYear,
    }));

    const year = dataForCount.surfaceWaterCount.yearsArray;

    const color = [
        'rgb(106, 179, 230)',
        'rgb(0, 61, 126)',
        'rgb(125, 95, 58)',
        'rgb(0, 178, 151)',
        'rgb(244, 153, 23)',
    ];

    return (
        <Grid container spacing={3}>
            <CountLicenseForManage data={dataForCount} />
            <Grid item xs={12} sm={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
                <Paper elevation={3}>
                    <ApexChartLicense data={data} year={year} color={color} />
                </Paper>
            </Grid>
        </Grid >
    )
}

export default ManageLicense
