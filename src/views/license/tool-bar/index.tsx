import { FilterList, Replay, Search } from "@mui/icons-material";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Collapse, TextField, Toolbar, Typography, Autocomplete, ListSubheader } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import CreateLicense from "../form";
import { useRouter } from "next/router";
import { getData } from "src/api/axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import GetConstructionTypeId from "src/@core/components/get-construction-type";

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
        so_gp: null,
        cong_trinh: 0,
        coquan_cp: null,
        loaihinh_cp: 0,
        hieuluc_gp: null,
        loai_ct: GetConstructionTypeId(router),
        tang_chuanuoc: 0,
        huyen: 0,
        xa: 0,
        tieuvung_qh: 0,
        tochuc_canhan: 0,
        tu_nam: new Date().getFullYear() - 5,
        den_nam: new Date().getFullYear(),
    });

    //Hiệu lục giấy phép
    const hieuluc_gp = [
        { label: 'Còn hiệu lực', value: 'con-hieu-luc' },
        { label: 'Hết hiệu lực', value: 'het-hieu-luc' },
        { label: 'Sáp hết hiệu lực', value: 'sap-het-hieu-luc' },
        { label: 'Đã bị thu hồi', value: 'da-bi-thu-hoi' },
    ]

    //Cơ quan cấp phép
    const coquan_cp = [
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
        onChange({ ...paramsFilter }, postSucceed);
    };

    const applyFilterChange = () => {
        onChange({ ...paramsFilter });
    }

    const reloadData = () => {
        setParamsFilter(() => {
            const newParamsFilter = {
                so_gp: null,
                cong_trinh: 0,
                coquan_cp: null,
                loaihinh_cp: 0,
                hieuluc_gp: null,
                loai_ct: GetConstructionTypeId(router),
                tang_chuanuoc: 0,
                huyen: 0,
                xa: 0,
                tieuvung_qh: 0,
                tochuc_canhan: 0,
                tu_nam: new Date().getFullYear() - 5,
                den_nam: new Date().getFullYear(),
            };
            onChange({ ...newParamsFilter });

            return newParamsFilter;
        });
    }


    useEffect(() => {
        let isMounted = true;

        const getDataForSelect = async () => {
            try {
                // license type
                const loaihinh_cp = await getData('loai-gp/danh-sach');

                // constructiom type
                const loai_ct = await getData('loai-ct/danh-sach');

                //businesses
                const tochuc_canhan = await getData('to-chuc-ca-nhan/danh-sach');

                // district
                const huyen = await getData('hanh-chinh/huyen/danh-sach');

                if (paramsFilter.huyen > 0) {
                    // comunnes
                    const xa = await getData(`hanh-chinh/xa/danh-sach/${paramsFilter.huyen}`);
                    if (isMounted) {
                        setCommunes(xa);
                    }
                }

                // subBasin
                const subBasinsData = await getData('TieuVungLuuVuc/danh-sach');

                if (isMounted) {
                    setLicenseTypes(loaihinh_cp);
                    setConsTypes(
                        loai_ct.map((item: any) => {
                            const section = router.pathname.split('/')[2];

                            if (section === 'nuoc-mat') {
                                if (item.idCha === 1) {
                                    return item;
                                }
                            } else if (section === 'xa-thai') {
                                if (item.idCha === 3) {
                                    return item;
                                }
                            } else {
                                const children = item.idCha === 0 ? loai_ct.filter((childItem: any) => childItem.idCha === item.id) : [];
                                const res = { ...(item.idCha === 0 ? { ...item, children } : undefined) };

                                return res;
                            }
                        })
                    );

                    setBusinesses(tochuc_canhan);
                    setDistricts(huyen);
                    setSubBasins(subBasinsData);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getDataForSelect();

        return () => {
            isMounted = false;
        };
    }, [paramsFilter, paramsFilter.huyen, router.pathname]);

    return (
        <Toolbar variant="dense">
            <Grid container spacing={2} sx={{ paddingY: 3 }}>
                {
                    router.pathname.split('/')[2] == 'nuoc-mat' || router.pathname.split('/')[2] == 'nuoc-duoi-dat' || router.pathname.split('/')[2] == 'xa-thai'
                        ?
                        <Grid item xs={12} md={3} py={0}>
                            <TextField
                                sx={{ p: 0 }}
                                size="small"
                                fullWidth
                                variant="outlined"
                                placeholder="Số giấy phép..."
                                onChange={(e: any) => handleChange(e)('so_gp')}
                            />
                        </Grid>
                        : ''
                }

                <Grid item xs={12} md={2} py={0}>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="license-type-select">Cơ quan cấp phép</InputLabel>
                        <Select
                            labelId="license-type-select"
                            id="demo-select-small"
                            value={paramsFilter.coquan_cp || ''}
                            label="Cơ quan cấp phép"
                            onChange={(e: any) => handleChange(e)('coquan_cp')}
                        >
                            <MenuItem value="">
                                Cơ quan cấp phép
                            </MenuItem>
                            {coquan_cp.map((e: any, i: number) => (
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
                            value={paramsFilter.loaihinh_cp || ''}
                            label="Loại hình cấp phép"
                            onChange={(e: any) => handleChange(e)('loaihinh_cp')}
                        >
                            <MenuItem value={0}>
                                Loại hình cấp phép
                            </MenuItem>
                            {licenseTypes.map((e: any, i: number) => (
                                <MenuItem
                                    key={i}
                                    value={e.id}
                                >
                                    {e.tenLoaiGP}
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
                            value={paramsFilter.hieuluc_gp || ''}
                            label="Hiệu  lực giấy phép"
                            onChange={(e: any) => handleChange(e)('hieuluc_gp')}
                        >
                            <MenuItem value="">
                                Hiệu  lực giấy phép
                            </MenuItem>
                            {hieuluc_gp.map((e: any, i: number) => (
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
                                    value={paramsFilter.loai_ct > 3 ? paramsFilter.loai_ct : GetConstructionTypeId(router)}
                                    label="Loại công trình"
                                    onChange={(e: any) => handleChange(e)('loai_ct')}
                                >
                                    <MenuItem value={GetConstructionTypeId(router)}>Loại công trình</MenuItem>
                                    {
                                        router.pathname.split('/')[2] == 'nuoc-mat' || router.pathname.split('/')[2] == 'xa-thai' ?
                                            consTypes.filter((item: any) => item !== undefined).map((e: any, i: number) => [
                                                <MenuItem key={i} value={e.id}>
                                                    {e.tenLoaiCT}
                                                </MenuItem>
                                            ])
                                            :
                                            consTypes
                                                .filter((item: any) => item?.children)
                                                .map((e: any, i: number) => [
                                                    <ListSubheader key={`subheader-${i}`}>{e.tenLoaiCT}</ListSubheader>,
                                                    ...e.children.map((child: any, j: number) => (
                                                        <MenuItem key={`child-${j}`} value={child.id}>
                                                            {child.tenLoaiCT}
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
                                        getOptionLabel={(option: any) => option.tenTCCN}
                                        value={businesses.find((item: any) => item.id === paramsFilter.tochuc_canhan) || null}
                                        onChange={(_, newValue) => {
                                            handleChange(newValue?.id)('tochuc_canhan');
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
                                        getOptionLabel={(option: any) => option.tenHuyen}
                                        value={districts.find((item: any) => item.idHuyen === paramsFilter.huyen) || null}
                                        onChange={(_, newValue) => {
                                            handleChange(newValue?.idHuyen)('huyen');
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
                                        disabled={paramsFilter.huyen <= 0}
                                        fullWidth
                                        options={communes}
                                        getOptionLabel={(option: any) => option.tenXa}
                                        value={communes.find((item: any) => item.idXa === paramsFilter.xa) || null}
                                        onChange={(_, newValue) => {
                                            handleChange(newValue?.idXa)('xa');
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
                                        getOptionLabel={(option: any) => option.tieuVungQuyHoach}
                                        value={subBasins.find((item: any) => item.id === paramsFilter.tieuvung_qh) || null}
                                        onChange={(_, newValue) => {
                                            handleChange(newValue?.id)('tieuvung_qh');
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
                                <Grid item xs={12} md={2} py={0}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label='Từ năm'
                                            views={["year"]}
                                            value={dayjs(new Date(paramsFilter.tu_nam, 1, 1))}
                                            onChange={(newVal: any) => handleChange(newVal.year())('tu_nam')}
                                            slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} md={2} py={0}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label='Đến năm'
                                            views={["year"]}
                                            value={dayjs(new Date(paramsFilter.den_nam, 1, 1))}
                                            onChange={(newVal: any) => handleChange(newVal.year())('den_nam')}
                                            slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
                                        />
                                    </LocalizationProvider>
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
