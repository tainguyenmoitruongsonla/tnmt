import { FilterList, Replay, Search } from "@mui/icons-material";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Collapse, TextField, Toolbar, Typography, Autocomplete, ListSubheader } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import fetch from "src/api/fetch";
import CreateLicense from "../form";
import { useRouter } from "next/router";

interface LicenseToolBarProps {
    onChange: (data: any, postSuccess?: boolean | undefined) => void;
}
const LicenseToolBar: FC<LicenseToolBarProps> = ({ onChange }) => {
    const [postSucceed, setPostSucceed] = useState(false);
    const router = useRouter();
    const [licenseTypes, setLicenseTypes] = useState([]);
    const [consTypes, setConsTypes] = useState([])
    const [businesses, setBusinesses] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [subBasins, setSubBasins] = useState([]);

    function getConstructionTypeId() {
        const pathSegments = router.pathname.split('/');
        const section = pathSegments[2];
        const subsection = pathSegments[3];

        switch (section) {
            case "nuoc-mat":
                return 1;
            case "nuoc-duoi-dat":
                switch (subsection) {
                    case "khai-thac-su-dung":
                        return 7;
                    case "tham-do":
                        return 8;
                    case "hanh-nghe-khoan":
                        return 9;
                    default:
                        return 0;
                }
            case "xa-thai":
                return 3;
            default:
                return 0;
        }
    }

    const [paramsFilter, setParamsFilter] = useState({
        licenseNumber: null,
        licensingAuthorities: null,
        licenseTypeId: 0,
        licenseValidity: null,
        businessId: 0,
        constructionId: 0,
        constructionTypeId: getConstructionTypeId(),
        districtId: 0,
        communeId: 0,
        subBasinId: 0,
        pageIndex: 0,
        pageSize: 0
    });

    //Hiệu lục giấy phép
    const licenseValidity = [
        { label: 'Còn hiệu lực', value: 'con-hieu-luc' },
        { label: 'Hết hiệu lực', value: 'het-hieu-luc' },
        { label: 'Sáp hết hiệu lực', value: 'sap-het-hieu-luc' },
        { label: 'Đã bị thu hồi', value: 'da-bi-thu-hoi' },
    ]

    //Cơ quan cấp phép
    const licensingAuthorities = [
        { label: 'Bộ TNMT', value: 'btnmt' },
        { label: 'UBND Tỉnh', value: 'ubndt' }
    ]

    const [open, setOpen] = useState(false);


    //Actions on page
    const handleOpenAdvanceSearch = () => {
        setOpen((prev) => !prev);
    };

    const handleChange = (event: SelectChangeEvent | ChangeEvent<HTMLInputElement> | null) => (column: string) => {
        if (event) {
            if (event?.target) {
                setParamsFilter({ ...paramsFilter, [column]: event.target.value });
            } else {
                setParamsFilter({ ...paramsFilter, [column]: event });
            }
        }

    };

    const handlePostSuccess = () => {
        setPostSucceed(prevState => !prevState);
        onChange(paramsFilter, postSucceed);
    };

    const applyFilterChange = () => {
        onChange(paramsFilter);
    }

    const reloadData = () => {
        setParamsFilter({
            licenseNumber: null,
            licensingAuthorities: null,
            licenseTypeId: 0,
            licenseValidity: null,
            businessId: 0,
            constructionId: 0,
            constructionTypeId: getConstructionTypeId(),
            districtId: 0,
            communeId: 0,
            subBasinId: 0,
            pageIndex: 0,
            pageSize: 0
        });
        onChange(paramsFilter);
    }

    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            try {
                // license type
                const licTypesData = await fetch('LicenseTypes/list');

                // constructiom type
                const ConsTypesData = await fetch('ConstructionTypes/list');

                //businesses
                const businessData = await fetch('Business/list');

                // district
                const districtsData = await fetch('Locations/list/distric/51');

                if (paramsFilter.districtId > 0) {
                    // comunnes
                    const comunnesData = await fetch(`Locations/list/commune/get-by-distric/${paramsFilter.districtId}`);
                    if (isMounted) {
                        setCommunes(comunnesData);
                    }
                }

                // subBasin
                const subBasinsData = await fetch('SubBasin/list');

                if (isMounted) {
                    setLicenseTypes(licTypesData);
                    setConsTypes(
                        ConsTypesData.map((item: any) => {
                            const section = router.pathname.split('/')[2];

                            if (section === 'nuoc-mat') {
                                if (item.parentId === 1) {
                                    return item;
                                }
                            } else if (section === 'xa-thai') {
                                if (item.parentId === 3) {
                                    return item;
                                }
                            } else {
                                const children = item.parentId === 0 ? ConsTypesData.filter((childItem: any) => childItem.parentId === item.id) : [];
                                const res = { ...(item.parentId === 0 ? { ...item, children } : undefined) };

                                return res;
                            }
                        })
                    );

                    setBusinesses(businessData);
                    setDistricts(districtsData);
                    setSubBasins(subBasinsData);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getData();

        return () => {
            isMounted = false;
        };
    }, [paramsFilter.districtId, router.pathname]);

    return (
        <Toolbar variant="dense">
            <Grid container spacing={2} sx={{ paddingY: 3 }}>
                <Grid item xs={12} md={3} py={0}>
                    <TextField
                        sx={{ p: 0 }}
                        size="small"
                        fullWidth
                        variant="outlined"
                        placeholder="Số giấy phép..."
                        onChange={(e: any) => handleChange(e)('licenseNumber')}
                    />
                </Grid>
                <Grid item xs={12} md={2} py={0}>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="license-type-select">Cơ quan cấp phép</InputLabel>
                        <Select
                            labelId="license-type-select"
                            id="demo-select-small"
                            value={paramsFilter.licensingAuthorities || ''}
                            label="Cơ quan cấp phép"
                            onChange={(e: any) => handleChange(e)('licensingAuthorities')}
                        >
                            <MenuItem value="">
                                Cơ quan cấp phép
                            </MenuItem>
                            {licensingAuthorities.map((e: any, i: number) => (
                                <MenuItem
                                    key={i}
                                    value={e.value}
                                >
                                    {e.label}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={2} py={0}>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="license-type-select">Loại hình cấp phép</InputLabel>
                        <Select
                            labelId="license-type-select"
                            id="demo-select-small"
                            value={paramsFilter.licenseTypeId || ''}
                            label="Loại hình cấp phép"
                            onChange={(e: any) => handleChange(e)('licenseTypeId')}
                        >
                            <MenuItem value={0}>
                                Loại hình cấp phép
                            </MenuItem>
                            {licenseTypes.map((e: any, i: number) => (
                                <MenuItem
                                    key={i}
                                    value={e.id}
                                >
                                    {e.typeName}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={2} py={0}>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="license-type-select">Hiệu  lực giấy phép</InputLabel>
                        <Select
                            labelId="license-type-select"
                            id="demo-select-small"
                            value={paramsFilter.licenseValidity || ''}
                            label="Hiệu  lực giấy phép"
                            onChange={(e: any) => handleChange(e)('licenseValidity')}
                        >
                            <MenuItem value="">
                                Hiệu  lực giấy phép
                            </MenuItem>
                            {licenseValidity.map((e: any, i: number) => (
                                <MenuItem
                                    key={i}
                                    value={e.value}
                                >
                                    {e.label}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>
                {
                    router.pathname.split('/')[2] !== 'nuoc-duoi-dat' ?
                        <Grid item xs={12} md={2} py={0}>
                            <FormControl size="small" fullWidth>
                                <InputLabel id="license-type-select">Loại công trình</InputLabel>
                                <Select
                                    labelId="license-type-select"
                                    id="demo-select-small"
                                    value={paramsFilter.constructionTypeId > 3 ? paramsFilter.constructionTypeId : 0}
                                    label="Loại công trình"
                                    onChange={(e: any) => handleChange(e)('constructionTypeId')}
                                >
                                    <MenuItem value={0}>Loại công trình</MenuItem>
                                    {
                                        router.pathname.split('/')[2] !== 'nuoc-mat' || router.pathname.split('/')[2] !== 'xathai' ?
                                            consTypes.filter((item: any) => item !== undefined).map((e: any, i: number) => [
                                                <MenuItem key={i} value={e.id}>
                                                    {e.typeName}
                                                </MenuItem>
                                            ])
                                            :
                                            consTypes
                                                .filter((item: any) => item?.children)
                                                .map((e: any, i: number) => [
                                                    <ListSubheader key={`subheader-${i}`}>{e.typeName}</ListSubheader>,
                                                    ...e.children.map((child: any, j: number) => (
                                                        <MenuItem key={`child-${j}`} value={child.id}>
                                                            {child.typeName}
                                                        </MenuItem>
                                                    )),
                                                ])
                                    }
                                </Select>


                            </FormControl>
                        </Grid>
                        :
                        ''
                }

                <Grid item xs={12} md={12} >
                    <Collapse in={open}>
                        <fieldset>
                            <legend>
                                <Typography variant={'subtitle1'}>
                                    Tìm kiếm nâng cao
                                </Typography>
                            </legend>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={2} py={0}>
                                    <Autocomplete
                                        size="small"
                                        fullWidth
                                        options={businesses}
                                        getOptionLabel={(option: any) => option.name}
                                        value={businesses.find((item: any) => item.id === paramsFilter.businessId) || null}
                                        onChange={(_, newValue) => {
                                            handleChange(newValue?.id)('businessId');
                                        }}
                                        clearOnEscape={true}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="TC/Cá nhân được CP"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={2} py={0}>
                                    <Autocomplete
                                        size="small"
                                        fullWidth
                                        options={districts}
                                        getOptionLabel={(option: any) => option.districtName}
                                        value={districts.find((item: any) => item.districtId === paramsFilter.districtId) || null}
                                        onChange={(_, newValue) => {
                                            handleChange(newValue?.districtId)('districtId');
                                        }}
                                        clearOnEscape={true}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Huyện"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={2} py={0}>
                                    <Autocomplete
                                        size="small"
                                        disabled={paramsFilter.districtId <= 0}
                                        fullWidth
                                        options={communes}
                                        getOptionLabel={(option: any) => option.communeName}
                                        value={communes.find((item: any) => item.communeId === paramsFilter.communeId) || null}
                                        onChange={(_, newValue) => {
                                            handleChange(newValue?.communeId)('communeId');
                                        }}
                                        clearOnEscape={true}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Xã"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={2} py={0}>
                                    <Autocomplete
                                        size="small"
                                        fullWidth
                                        options={subBasins}
                                        getOptionLabel={(option: any) => option.name}
                                        value={subBasins.find((item: any) => item.id === paramsFilter.subBasinId) || null}
                                        onChange={(_, newValue) => {
                                            handleChange(newValue?.id)('subBasinId');
                                        }}
                                        clearOnEscape={true}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Tiểu vùng quy hoạch"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </fieldset >
                    </Collapse >
                </Grid>
                <Grid item xs={6} md={1.5} py={0}>
                    <Button variant='outlined' size='small' fullWidth sx={{ borderRadius: 0 }} startIcon={<Search />} onClick={applyFilterChange}>Tìm kiếm</Button>
                </Grid>
                <Grid item xs={6} md={1.5} py={0}>
                    <Button variant='outlined' size='small' fullWidth sx={{ borderRadius: 0 }} startIcon={<Replay />} onClick={reloadData}>Tải lại</Button>
                </Grid>
                <Grid item xs={6} md={1.5} py={0}>
                    <Button variant='outlined' size='small' fullWidth sx={{ borderRadius: 0 }} startIcon={<FilterList />} onClick={handleOpenAdvanceSearch}>
                        Bộ lọc
                    </Button>
                </Grid>
                {
                    router.pathname.split('/')[2] == "nuoc-mat" || router.pathname.split('/')[2] == "nuoc-duoi-dat" || router.pathname.split('/')[2] == "xa-thai" ?
                        <Grid item xs={6} md={1.5} py={0}>
                            <CreateLicense isEdit={false} setPostSuccess={handlePostSuccess} />
                        </Grid>
                        :
                        ''
                }
            </Grid>
        </Toolbar>
    );
};

export default LicenseToolBar;
