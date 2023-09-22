import { FilterList, Replay, Search } from "@mui/icons-material";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Collapse, TextField, Toolbar, Typography, Autocomplete } from "@mui/material";
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

    const [paramsFilter, setParamsFilter] = useState({
        licenseNumber: null,
        licensingAuthorities: null,
        licenseTypeId: 0,
        licenseValidity: null,
        businessId: 0,
        constructionId: 0,
        constructionTypeId: router.pathname.split('/')[2] == "nuoc-mat" ? 1 : router.pathname.split('/')[2] == "nuoc-duoi-dat" ? 2 : router.pathname.split('/')[2] == "xa-thai" ? 3 : 0,
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
            constructionTypeId: router.pathname.split('/')[2] == "nuoc-mat" ? 1 : router.pathname.split('/')[2] == "nuoc-duoi-dat" ? 2 : router.pathname.split('/')[2] == "xa-thai" ? 3 : 0,
            districtId: 0,
            communeId: 0,
            subBasinId: 0,
            pageIndex: 0,
            pageSize: 0
        });
        onChange(paramsFilter);
    }

    useEffect(() => {
        const getData = async () => {
            try {
                // license type
                const licTypesData = await fetch('LicenseTypes/list');
                setLicenseTypes(licTypesData);

                // constructiom type
                const ConsTypesData = await fetch('ConstructionTypes/list');
                setConsTypes(ConsTypesData.filter((item: any) => item.parentId === (router.pathname.split('/')[2] == 'nuoc-mat' ? 1 : router.pathname.split('/')[2] == 'nuoc-duoi-dat' ? 2 : 3)));

                //businesses
                const businessData = await fetch('Business/list');
                setBusinesses(businessData);

                // district
                const districtsData = await fetch('Locations/list/distric/51');
                setDistricts(districtsData);

                if (paramsFilter.districtId > 0) {
                    // comunnes
                    const comunnesData = await fetch(`Locations/list/commune/get-by-distric/${paramsFilter.districtId}`);
                    setCommunes(comunnesData);
                }

                // subBasin
                const subBasinsData = await fetch('Locations/list/distric/51');
                setSubBasins(subBasinsData);

            } catch (error) {
            } finally {
            }
        };
        getData();
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
                            <MenuItem value={0}>
                                Loại công trình
                            </MenuItem>
                            {consTypes.map((e: any, i: number) => (
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
                <Grid item xs={6} md={1.5} py={0}>
                    <CreateLicense isEdit={false} setPostSuccess={handlePostSuccess} />
                </Grid>
            </Grid>
        </Toolbar>
    );
};

export default LicenseToolBar;
