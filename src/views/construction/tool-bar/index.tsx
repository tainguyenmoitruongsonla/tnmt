import { FilterList, Replay, Search } from "@mui/icons-material";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Collapse, TextField, Toolbar, Typography, Autocomplete, ListSubheader } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react"
import CreateLicense from "../form";
import { useRouter } from "next/router";
import { getData } from "src/api/axios";

interface ConstructionToolBarProps {
    onChange: (data: any, postSuccess?: boolean | undefined) => void;
}
const ConstructionToolBar: FC<ConstructionToolBarProps> = ({ onChange }) => {
    const [postSucceed, setPostSucceed] = useState(false);
    const router = useRouter();
    const [consTypes, setConsTypes] = useState([])
    const [businesses, setBusinesses] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);

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
        constructionName: '',
        exploitedWS: '',
        constructionTypeId: getConstructionTypeId(),
        businessId: 0,
        districtId: 0,
        communeId: 0,
        pageIndex: 0,
        pageSize: 0
    });

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
            constructionName: '',
            exploitedWS: '',
            constructionTypeId: getConstructionTypeId(),
            businessId: 0,
            districtId: 0,
            communeId: 0,
            pageIndex: 0,
            pageSize: 0
        });
        onChange(paramsFilter);
    }

    useEffect(() => {
        let isMounted = true;

        const getDataForSelect = async () => {
            try {

                // constructiom type
                const ConsTypesData = await getData('ConstructionTypes/list');

                //businesses
                const businessData = await getData('Business/list');

                // district
                const districtsData = await getData('Locations/list/distric/51');

                if (paramsFilter.districtId > 0) {
                    // comunnes
                    const comunnesData = await getData(`Locations/list/commune/get-by-distric/${paramsFilter.districtId}`);
                    if (isMounted) {
                        setCommunes(comunnesData);
                    }
                }

                if (isMounted) {
                    setConsTypes(
                        ConsTypesData.map((item: any) => {
                            const section = router.pathname.split('/')[2];
                            switch (section) {
                                case 'nuoc-mat':
                                    if (item.parentId === 1) {
                                        return item;
                                    }
                                    break;
                                case 'nuoc-duoi-dat':
                                    if (item.parentId === 2) {
                                        return item;
                                    }
                                    break;
                                case 'xa-thai':
                                    if (item.parentId === 3) {
                                        return item;
                                    }
                                    break;
                                default:
                                    const children = item.parentId === 0 ? ConsTypesData.filter((childItem: any) => childItem.parentId === item.id) : [];
                                    const res = { ...(item.parentId === 0 ? { ...item, children } : undefined) };

                                    return res;
                                    break;
                            }
                        })
                    );

                    setBusinesses(businessData);
                    setDistricts(districtsData);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getDataForSelect();

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
                        placeholder="Tên công trình..."
                        onChange={(e: any) => handleChange(e)('constructionName')}
                    />
                </Grid>
                <Grid item xs={12} md={2} py={0}>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="license-type-select">Loại công trình</InputLabel>
                        <Select
                            labelId="license-type-select"
                            id="demo-select-small"
                            value={paramsFilter.constructionTypeId > 3 ? paramsFilter.constructionTypeId : getConstructionTypeId()}
                            label="Loại công trình"
                            onChange={(e: any) => handleChange(e)('constructionTypeId')}
                        >
                            <MenuItem value={getConstructionTypeId()}>Loại công trình</MenuItem>
                            {
                                router.pathname.split('/')[2] == 'nuoc-mat' || router.pathname.split('/')[2] == 'nuoc-duoi-dat' || router.pathname.split('/')[2] == 'xa-thai' ?
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
                                <Grid item xs={12} md={3} py={0}>
                                    <TextField
                                        sx={{ p: 0 }}
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Nguồn nước khai thác..."
                                        onChange={(e: any) => handleChange(e)('exploitedWS')}
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

export default ConstructionToolBar;
