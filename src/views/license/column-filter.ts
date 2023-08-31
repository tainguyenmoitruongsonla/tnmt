import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { columnFillters } from "src/@core/components/data-grid";
import fetchData from "src/api/fetch";

const ColumnFilters = () => {
    const [licenseTypes, setLicenseTypes] = useState([]);
    const [businesses, setBusinesses] = useState([]);
    const [constructionTypes, setConstructionTypes] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommune] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            try {
                // license type
                const licTypesData = await fetchData('LicenseTypes/list');
                setLicenseTypes(licTypesData.map((licType: any) => ({ label: licType.typeName, value: licType.typeSlug })));

                // business
                const businessData = await fetchData('Business/list');
                setBusinesses(businessData.map((business: any) => ({ label: business.name, value: business.id })));

                // constructiom type
                const ConsTypesData = await fetchData('ConstructionTypes/list');
                setConstructionTypes(ConsTypesData.filter((item: any) => item.parentId === (router.pathname.split('/')[2] == 'nuoc-mat' ? 1 : router.pathname.split('/')[2] == 'nuoc-duoi-dat' ? 2 : 3)).map((consTypes: any) => ({ label: consTypes.typeName, value: consTypes.typeSlug })));

                // district
                const districtsData = await fetchData('Locations/list/distric/51');
                setDistricts(districtsData.map((district: any) => ({ label: district.districtName, value: district.districtId })));

                // commune
                const comunnesData = await fetchData('Locations/list/commune');
                setCommune(comunnesData.map((commune: any) => ({ label: commune.communeName, value: commune.communeId })));

                // ... (rest of your code)
            } catch (error) {
            } finally {
            }
        };
        getData();
    }, [router.pathname]);

    // Define your column filter definitions
    const columnFilters: columnFillters[] = [
        {
            label: 'Số GP',
            value: 'licenseNumber',
            type: 'text',
        },
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
            options: licenseTypes,
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
            options: businesses,
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
            options: constructionTypes,
        },
        {
            label: 'Huyện',
            value: 'districtId',
            type: 'select',
            options: districts,
        },
        {
            label: 'Xã',
            value: 'communeId',
            type: 'select',
            options: communes,
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

    return columnFilters;
};

export default ColumnFilters;
