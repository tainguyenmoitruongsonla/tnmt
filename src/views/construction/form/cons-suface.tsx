import { Typography, Grid, Autocomplete, TextField, CircularProgress, Button } from '@mui/material'
import { useEffect, FC, useState, Fragment } from 'react'
import { ConstructionSpecState, ConstructionState, emptyConstructionData, propConsDataState } from './construction-interface'
import { getData } from 'src/api/axios'
import { useRouter } from 'next/router'
import GetConstructionTypeId from 'src/@core/components/get-construction-type'
import { Add } from '@mui/icons-material'
import { createConsCode, createConsUser } from 'src/@core/components/cons'
import ConstructionItem from './cons-item'
import MiningPurpose from './mining-purpose'

interface ConsTypeFieldsetProps {
  data?: propConsDataState
  onChange: (data: propConsDataState) => void
}

const SurfaceWaterField: FC<ConsTypeFieldsetProps> = ({ data, onChange }) => {
  const propData: propConsDataState = { congtrinh: data?.congtrinh, thongso_ct: data?.thongso_ct, hangmuc_ct: data?.hangmuc_ct, luuluongtheo_mucdich: data?.luuluongtheo_mucdich }
  const [congtrinh, setCongTrinh] = useState<ConstructionState>({
    id: propData.congtrinh?.id || null,
    idLoaiCT: propData.congtrinh?.idLoaiCT || null,
    idHuyen: propData.congtrinh?.idHuyen || null,
    idXa: propData.congtrinh?.idXa || null,
    idSong: propData.congtrinh?.idSong || null,
    idLuuVuc: propData.congtrinh?.idLuuVuc || null,
    idTieuLuuVuc: propData.congtrinh?.idTieuLuuVuc || null,
    idTangChuaNuoc: propData.congtrinh?.idTangChuaNuoc || null,
    tenCT: propData.congtrinh?.tenCT || null,
    maCT: propData.congtrinh?.maCT || null,
    viTriCT: propData.congtrinh?.viTriCT || null,
    x: propData.congtrinh?.x || null,
    y: propData.congtrinh?.y || null,
    capCT: propData.congtrinh?.capCT || null,
    namBatDauVanHanh: propData.congtrinh?.namBatDauVanHanh || null,
    nguonNuocKT: propData.congtrinh?.nguonNuocKT || null,
    mucDichhKT: propData.congtrinh?.mucDichhKT || null,
    phuongThucKT: propData.congtrinh?.phuongThucKT || null,
    nguonNuocXT: propData.congtrinh?.nguonNuocXT || null,
    thoiGianKT: propData.congtrinh?.thoiGianKT || null,
    thoiGianHNK: propData.congtrinh?.thoiGianHNK || null,
    mucDichHNK: propData.congtrinh?.mucDichHNK || null,
    mucDichhTD: propData.congtrinh?.mucDichhTD || null,
    quyMoHNK: propData.congtrinh?.quyMoHNK || null,
    thoiGianXD: propData.congtrinh?.thoiGianXD || null,
    soLuongGiengKT: propData.congtrinh?.soLuongGiengKT || null,
    soLuongGiengQT: propData.congtrinh?.soLuongGiengQT || null,
    soDiemXaThai: propData.congtrinh?.soDiemXaThai || null,
    soLuongGieng: propData.congtrinh?.soLuongGieng || null,
    khoiLuongCacHangMucTD: propData.congtrinh?.khoiLuongCacHangMucTD || null,
    qktThietKe: propData.congtrinh?.qktThietKe || null,
    qktThucTe: propData.congtrinh?.qktThucTe || null,
    viTriXT: propData.congtrinh?.viTriXT || null,
    taiKhoan: propData.congtrinh?.taiKhoan || null,
    chuThich: propData.congtrinh?.chuThich || null,
  })

  const [thongso_ct, setThongsoCt] = useState<ConstructionSpecState>({
    id: propData.thongso_ct?.id || null,
    idCT: propData.thongso_ct?.idCT || null,
    idHangMucCT: propData.thongso_ct?.idHangMucCT || null,
    caoTrinhCong: propData.thongso_ct?.caoTrinhCong || null,
    cheDoKT: propData.thongso_ct?.cheDoKT || null,
    caoTrinhDap: propData.thongso_ct?.caoTrinhDap || null,
    cheDoXT: propData.thongso_ct?.cheDoXT || null,
    chieuCaoDap: propData.thongso_ct?.chieuCaoDap || null,
    chieuDaiCong: propData.thongso_ct?.chieuDaiCong || null,
    chieuDaiDap: propData.thongso_ct?.chieuDaiDap || null,
    duongKinhCong: propData.thongso_ct?.duongKinhCong || null,
    chieuRongDap: propData.thongso_ct?.chieuRongDap || null,
    nguongTran: propData.thongso_ct?.nguongTran || null,
    chieuSauDoanThuNuocDen: propData.thongso_ct?.chieuSauDoanThuNuocDen || null,
    chieuSauDoanThuNuocTu: propData.thongso_ct?.chieuSauDoanThuNuocTu || null,
    congSuatBom: propData.thongso_ct?.congSuatBom || null,
    congSuatDamBao: propData.thongso_ct?.congSuatDamBao || null,
    congSuatLM: propData.thongso_ct?.congSuatLM || null,
    dienTichLuuVuc: propData.thongso_ct?.dienTichLuuVuc || null,
    dienTichTuoiThietKe: propData.thongso_ct?.dienTichTuoiThietKe || null,
    dienTichTuoiThucTe: propData.thongso_ct?.dienTichTuoiThucTe || null,
    dungTichChet: propData.thongso_ct?.dungTichChet || null,
    dungTichHuuIch: propData.thongso_ct?.dungTichHuuIch || null,
    dungTichToanBo: propData.thongso_ct?.dungTichToanBo || null,
    hBeHut: propData.thongso_ct?.hBeHut || null,
    hDatOngLocDen: propData.thongso_ct?.hDatOngLocDen || null,
    hDatOngLocTu: propData.thongso_ct?.hDatOngLocTu || null,
    hDoanThuNuocDen: propData.thongso_ct?.hDoanThuNuocDen || null,
    hDoanThuNuocTu: propData.thongso_ct?.hDoanThuNuocTu || null,
    hDong: propData.thongso_ct?.hDong || null,
    hgieng: propData.thongso_ct?.hgieng || null,
    hGiengKT: propData.thongso_ct?.hGiengKT || null,
    hHaLuu: propData.thongso_ct?.hHaLuu || null,
    hHaThap: propData.thongso_ct?.hHaThap || null,
    hlu: propData.thongso_ct?.hlu || null,
    hmax: propData.thongso_ct?.hmax || null,
    hmin: propData.thongso_ct?.hmin || null,
    hThuongLuu: propData.thongso_ct?.hThuongLuu || null,
    hTinh: propData.thongso_ct?.hTinh || null,
    htoiThieu: propData.thongso_ct?.htoiThieu || null,
    kichThuocCong: propData.thongso_ct?.kichThuocCong || null,
    kqKf: propData.thongso_ct?.kqKf || null,
    luongNuocKT: propData.thongso_ct?.luongNuocKT || null,
    mnc: propData.thongso_ct?.mnc || null,
    mndbt: propData.thongso_ct?.mndbt || null,
    mnlkt: propData.thongso_ct?.mnlkt || null,
    mnltk: propData.thongso_ct?.mnltk || null,
    muaTrungBinhNam: propData.thongso_ct?.muaTrungBinhNam || null,
    mucNuocDong: propData.thongso_ct?.mucNuocDong || null,
    mucNuocTinh: propData.thongso_ct?.mucNuocTinh || null,
    phuongThucXT: propData.thongso_ct?.phuongThucXT || null,
    qBomLonNhat: propData.thongso_ct?.qBomLonNhat || null,
    qBomThietKe: propData.thongso_ct?.qBomThietKe || null,
    qDamBao: propData.thongso_ct?.qDamBao || null,
    qKhaiThac: propData.thongso_ct?.qKhaiThac || null,
    qktCapNuocSinhHoat: propData.thongso_ct?.qktCapNuocSinhHoat || null,
    qktLonNhat: propData.thongso_ct?.qktLonNhat || null,
    qLonNhatTruocLu: propData.thongso_ct?.qLonNhatTruocLu || null,
    qMaxKT: propData.thongso_ct?.qMaxKT || null,
    qmaxNM: propData.thongso_ct?.qmaxNM || null,
    qMaxXaThai: propData.thongso_ct?.qMaxXaThai || null,
    qThietKe: propData.thongso_ct?.qThietKe || null,
    qThucTe: propData.thongso_ct?.qThucTe || null,
    qTrungBinhNam: propData.thongso_ct?.qTrungBinhNam || null,
    qtt: propData.thongso_ct?.qtt || null,
    qXaThai: propData.thongso_ct?.qXaThai || null,
    qXaThaiLonNhat: propData.thongso_ct?.qXaThaiLonNhat || null,
    qXaThaiTB: propData.thongso_ct?.qXaThaiTB || null,
    qXaTran: propData.thongso_ct?.qXaTran || null,
    soLuongMayBom: propData.thongso_ct?.soLuongMayBom || null,
    thoiGianBomLonNhat: propData.thongso_ct?.thoiGianBomLonNhat || null,
    thoiGianBomNhoNhat: propData.thongso_ct?.thoiGianBomNhoNhat || null,
    thoiGianBomTB: propData.thongso_ct?.thoiGianBomTB || null,
  })

  const [consType, setconsType] = useState<any>([])
  const [district, setDistrict] = useState<any>([])
  const [commune, setCommune] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showDataCons, setShowDataCons] = useState<boolean>(false)
  const [ds_congtrinh, setDSCongtrinh] = useState<any>([])

  const router = useRouter();
  const isLicensepage = router.pathname.split('/')[1] == "giay-phep";

  useEffect(() => {
    isLicensepage ? setShowDataCons(congtrinh?.id !== null) : setShowDataCons(true);
  }, [congtrinh?.id, isLicensepage])

  useEffect(() => {
    const getDataForSelect = async () => {
      try {
        setLoading(true)

        //constructionType
        const consTypes = await getData('loai-ct/danh-sach')
        const filteredData = consTypes.filter((item: any) => item.idCha === GetConstructionTypeId(router))
        setconsType(filteredData)

        //cons
        const dscongtrinh = await getData('cong-trinh/danh-sach', {
          tenct: null,
          loai_ct: congtrinh?.idLoaiCT !== null ? congtrinh?.idLoaiCT : GetConstructionTypeId(router),
          huyen: 0,
          xa: 0,
          song: 0,
          luuvuc: 0,
          tieu_luuvuc: 0,
          tang_chuanuoc: 0,
          tochuc_canhan: 0,
          nguonnuoc_kt: null
        })
        setDSCongtrinh(dscongtrinh)

        //district
        const distric = await getData('hanh-chinh/huyen/danh-sach')
        setDistrict(distric)

        //commune
        const communes = await getData(`hanh-chinh/xa/danh-sach`)
        const communeFiltered = communes.filter((item: any) => item.idHuyen == congtrinh?.idHuyen?.toString())
        setCommune(communeFiltered)
      } catch (error) {
        //console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getDataForSelect()
    setCommune([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [congtrinh?.idHuyen, congtrinh?.idLoaiCT, router])

  const handleChange = (property: keyof ConstructionState | keyof ConstructionSpecState) => (value: any) => {
    const updatedCT: ConstructionState = { ...congtrinh };
    const updatedTSCT: ConstructionSpecState = { ...thongso_ct };

    if (property in updatedCT) {
      updatedCT.maCT = createConsCode({ ...updatedCT, [property]: value });
      updatedCT.taiKhoan = createConsUser({ ...updatedCT, [property]: value });
      (updatedCT as any)[property] = value;

      setCongTrinh({ ...updatedCT });
    } else {
      (updatedTSCT as any)[property] = value;
      setThongsoCt({ ...updatedTSCT });
    }
  };

  const handleConsItemChange = (dataSave: any, dataDelete: any) => {
    onChange({ congtrinh: congtrinh, thongso_ct: thongso_ct, hangmuc_ct: dataSave, hangmuc_ct_xoa: dataDelete })
  };
  const handleMiningPurposeChange = (dataSave: any, dataDelete: any) => {
    onChange({ congtrinh: congtrinh, thongso_ct: thongso_ct, luuluongtheo_mucdich: dataSave, luuluongtheo_mucdich_xoa: dataDelete })
  };

  useEffect(() => {
    onChange({ congtrinh: congtrinh, thongso_ct: thongso_ct })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [congtrinh, thongso_ct])

  const handleSetCons = (data: any) => {
    const cons: ConstructionState = data;
    setShowDataCons(true)
    setCongTrinh({ ...cons });
    onChange({ congtrinh: congtrinh, thongso_ct: thongso_ct })
  }

  const handleAddNewCons = () => {
    setShowDataCons(true)
    setCongTrinh(emptyConstructionData);
  }

  return (
    <>
      <fieldset>
        <legend>
          <Typography variant={'subtitle1'} className='legend__title'>
            THÔNG TIN CÔNG TRÌNH
          </Typography>
        </legend>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              disabled={loading}
              size='small'
              options={consType}
              getOptionLabel={(option: any) => option.tenLoaiCT}
              value={consType.find((option: any) => option.id === congtrinh?.idLoaiCT) || null}
              isOptionEqualToValue={(option: any) => option.id}
              onChange={(_, value) => handleChange('idLoaiCT')(value?.id || 0)}
              renderInput={params => (
                <TextField
                  required
                  {...params}
                  fullWidth
                  label='Chọn loại hình công trình'
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {loading && <CircularProgress color='primary' size={20} />}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    )
                  }}
                />
              )}
            />
          </Grid>
          {
            isLicensepage ?
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <Autocomplete
                  disabled={loading}
                  size='small'
                  options={ds_congtrinh}
                  getOptionLabel={(option: any) => `${option.tenCT} ${option.donvi_hanhchinh !== null ? `(${option.donvi_hanhchinh?.tenHuyen})` : ''}`}
                  value={ds_congtrinh.find((option: any) => option.tenCT.toLowerCase() === congtrinh?.tenCT?.toLowerCase()) || null}
                  isOptionEqualToValue={(option: any) => option.tenCT}
                  onChange={(_, value) => handleSetCons(value || emptyConstructionData)}
                  renderInput={params => (
                    <TextField
                      required
                      {...params}
                      fullWidth
                      label='Chọn công trình'
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <Fragment>
                            {loading && <CircularProgress color='primary' size={20} />}
                            {params.InputProps.endAdornment}
                          </Fragment>
                        )
                      }}
                    />
                  )}
                />
              </Grid> : ''
          }
          {
            isLicensepage ?
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <Button
                  variant='outlined'
                  sx={{ borderRadius: 0 }}
                  size='small'
                  startIcon={<Add />}
                  onClick={handleAddNewCons}
                >
                  Thêm công trình mới
                </Button>
              </Grid>
              : ""
          }
        </Grid>
        {
          showDataCons ?
            <Grid container spacing={4}>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tên công trình'
                  fullWidth
                  placeholder=''
                  value={congtrinh?.tenCT || ''}
                  onChange={event => handleChange('tenCT')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Ký hiệu công trình'
                  fullWidth
                  placeholder=''
                  disabled
                  value={congtrinh?.maCT || ''}
                  onChange={event => handleChange('maCT')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  variant='outlined'
                  fullWidth
                  label='Địa điểm công trình'
                  multiline
                  maxRows={4}
                  value={congtrinh?.viTriCT || ''}
                  onChange={event => handleChange('viTriCT')(event.target.value)}
                />
              </Grid>
            </Grid> : ""
        }

        {showDataCons ?
          <Grid container spacing={4}>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <Autocomplete
                disabled={loading}
                size='small'
                options={district}
                getOptionLabel={(option: any) => option.tenHuyen}
                value={district.find((option: any) => option.idHuyen === congtrinh?.idHuyen?.toString()) || null}
                isOptionEqualToValue={(option: any) => option.idHuyen}
                onChange={(_, value) => handleChange('idHuyen')(value?.idHuyen || 0)}
                renderInput={params => (
                  <TextField
                    required
                    {...params}
                    fullWidth
                    label='Chọn Quận/Huyện'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {loading && <CircularProgress color='primary' size={20} />}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <Autocomplete
                disabled={congtrinh?.idHuyen !== undefined && congtrinh?.idHuyen == null}
                size='small'
                options={commune}
                getOptionLabel={(option: any) => option.tenXa}
                value={commune.find((option: any) => option.idXa === congtrinh?.idXa?.toString()) || null}
                isOptionEqualToValue={(option: any) => option.idXa}
                onChange={(_, value) => handleChange('idXa')(value?.idXa || 0)}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    fullWidth
                    label='Chọn Xã/phường'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {loading && <CircularProgress color='primary' size={20} />}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                variant='outlined'
                fullWidth
                label='Năm vận hành'
                placeholder=''
                value={congtrinh?.namBatDauVanHanh || ''}
                onChange={event => handleChange('namBatDauVanHanh')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                fullWidth
                placeholder=''
                label='Năm xây dựng'
                value={congtrinh?.thoiGianXD || ''}
                onChange={event => handleChange('thoiGianXD')(event.target.value)}
              />
            </Grid>
          </Grid>
          : ""
        }

        {showDataCons ?
          <Grid container spacing={4}>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                fullWidth
                placeholder=''
                label='Toạ độ X (VN2000)'
                value={congtrinh?.x || ''}
                onChange={event => handleChange('x')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                fullWidth
                placeholder=''
                value={congtrinh?.y || ''}
                onChange={event => handleChange('y')(event.target.value)}
                label='Toạ độ Y (VN2000)'
              />
            </Grid>

            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <Autocomplete
                size='small'
                options={consType}
                getOptionLabel={(option: any) => option.label}
                value={consType.find((option: any) => option.value === congtrinh?.idLoaiCT) || null}
                isOptionEqualToValue={(option: any) => option.id}
                onChange={(_, value) => handleChange('idLoaiCT')(value?.id || 0)}
                renderInput={params => (
                  <TextField
                    {...params}
                    fullWidth
                    label='Chọn tiểu vùng quy hoạch'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {loading && <CircularProgress color='primary' size={20} />}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <Autocomplete
                size='small'
                options={consType}
                getOptionLabel={(option: any) => option.title}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant='outlined'
                    fullWidth
                    label='Chọn lưu vực sông'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {loading && <CircularProgress color='primary' size={20} />}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
          : ""
        }

        {showDataCons ? <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              multiline
              maxRows={4}
              value={congtrinh?.nguonNuocKT || ''}
              onChange={event => handleChange('nguonNuocKT')(event.target.value)}
              label='Nguồn nước khai thác'
            />
          </Grid>
        </Grid>
          : ""
        }

        {showDataCons ? <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              multiline
              maxRows={4}
              value={congtrinh?.phuongThucKT || ''}
              onChange={event => handleChange('phuongThucKT')(event.target.value)}
              label='Phương thức khai thác'
            />
          </Grid>
        </Grid>
          : ""
        }
        {showDataCons ?
          <Grid container spacing={4}>
            <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                fullWidth
                placeholder=''
                value={thongso_ct?.cheDoKT || ''}
                onChange={event => handleChange('cheDoKT')(event.target.value)}
                label='Chế độ khai thác'
              />
            </Grid>
          </Grid>
          : ""
        }
      </fieldset>

      {
        showDataCons ?
          congtrinh?.idLoaiCT === 4 || congtrinh?.idLoaiCT === 5 ? (
            <Grid item xs={12}>
              <fieldset>
                <legend>
                  <Typography variant={'subtitle1'} className='legend__title'>
                    THÔNG Số CÔNG TRÌNH
                  </Typography>
                </legend>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Cấp công trình'
                      fullWidth
                      placeholder=''
                      value={congtrinh?.capCT || ''}
                      onChange={event => handleChange('capCT')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Diện tích lưu vực'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.dienTichLuuVuc || ''}
                      onChange={event => handleChange('dienTichLuuVuc')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Lượng mưa trung bình nhiều năm'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.muaTrungBinhNam || ''}
                      onChange={event => handleChange('muaTrungBinhNam')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Lưu lượng trung bình nhiều năm'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.qTrungBinhNam || ''}
                      onChange={event => handleChange('qTrungBinhNam')(event.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Công suất'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.congSuatLM || ''}
                      onChange={event => handleChange('congSuatLM')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Công suất đảm bảo'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.congSuatDamBao || ''}
                      onChange={event => handleChange('congSuatDamBao')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Chiều cao đập'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.chieuCaoDap || ''}
                      onChange={event => handleChange('chieuCaoDap')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Lưu lượng tối đa'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.qmaxNM || ''}
                      onChange={event => handleChange('qmaxNM')(event.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Lưu lượng tối thiểu'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.qtt || ''}
                      onChange={event => handleChange('qtt')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Lưu lượng đảm bảo'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.qDamBao || ''}
                      onChange={event => handleChange('qDamBao')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='hmax'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.hmax || ''}
                      onChange={event => handleChange('hmax')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Hmin'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.hmin || ''}
                      onChange={event => handleChange('hmin')(event.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Htt'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.htoiThieu || ''}
                      onChange={event => handleChange('htoiThieu')(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Dung tích toàn bộ'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.dungTichToanBo || ''}
                      onChange={event => handleChange('dungTichToanBo')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Dung tích chết'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.dungTichChet || ''}
                      onChange={event => handleChange('dungTichChet')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Dung tích hữu ích'
                      fullWidth
                      placeholder=''
                      value={thongso_ct?.dungTichHuuIch || ''}
                      onChange={event => handleChange('dungTichHuuIch')(event.target.value)}
                    />
                  </Grid>
                </Grid>
                {congtrinh?.idLoaiCT === 4 ? (
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                        <TextField
                          size='small'
                          type='text'
                          label='Mực nước chết'
                          fullWidth
                          placeholder=''
                          value={thongso_ct?.mnc || ''}
                          onChange={event => handleChange('mnc')(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                        <TextField
                          size='small'
                          type='text'
                          label='Mực nước dâng bình thường'
                          fullWidth
                          placeholder=''
                          value={thongso_ct?.mndbt || ''}
                          onChange={event => handleChange('mndbt')(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                        <TextField
                          size='small'
                          type='text'
                          label='Mực nước lũ thiết kế'
                          fullWidth
                          placeholder=''
                          value={thongso_ct?.mnltk || ''}
                          onChange={event => handleChange('mnltk')(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                        <TextField
                          size='small'
                          type='text'
                          label='Mực nước lũ kiểm tra'
                          fullWidth
                          placeholder=''
                          value={thongso_ct?.mnlkt || ''}
                          onChange={event => handleChange('mnlkt')(event.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  ''
                )}
              </fieldset>
            </Grid>
          ) : congtrinh?.idLoaiCT === 6 ? (
            <fieldset>
              <legend>
                <Typography variant={'subtitle1'} className='legend__title'>
                  THÔNG Số CÔNG TRÌNH
                </Typography>
              </legend>
              <Grid container spacing={4}>
                <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                  <TextField
                    size='small'
                    type='text'
                    label='Số máy bơm'
                    fullWidth
                    placeholder=''
                    value={thongso_ct?.soLuongMayBom || ''}
                    onChange={event => handleChange('soLuongMayBom')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                  <TextField
                    size='small'
                    type='text'
                    label='Diện tích tưới thiết kế'
                    fullWidth
                    placeholder=''
                    value={thongso_ct?.dienTichTuoiThietKe || ''}
                    onChange={event => handleChange('dienTichTuoiThietKe')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                  <TextField
                    size='small'
                    type='text'
                    label='Lượng mưa tưới thực tế'
                    fullWidth
                    placeholder=''
                    value={thongso_ct?.dienTichTuoiThucTe || ''}
                    onChange={event => handleChange('dienTichTuoiThucTe')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                  <TextField
                    size='small'
                    type='text'
                    label='Lưu lượng thiết kế'
                    fullWidth
                    placeholder=''
                    value={thongso_ct?.qThietKe || ''}
                    onChange={event => handleChange('qThietKe')(event.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={4}>
                <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                  <TextField
                    size='small'
                    type='text'
                    label='Lưu lượng thực tế'
                    fullWidth
                    placeholder=''
                    value={thongso_ct?.qThucTe || ''}
                    onChange={event => handleChange('qThucTe')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                  <TextField
                    size='small'
                    type='text'
                    label={
                      <>
                        Q<sub>tk</sub>(m<sup>3</sup>/<sub>ngày đêm</sub>)
                      </>
                    }
                    fullWidth
                    placeholder=''
                    value={thongso_ct?.qBomThietKe || ''}
                    onChange={event => handleChange('qBomThietKe')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                  <TextField
                    size='small'
                    type='text'
                    label={
                      <>
                        Q<sub>max</sub>(m<sup>3</sup>/<sub>ngày đêm</sub>)
                      </>
                    }
                    fullWidth
                    placeholder=''
                    value={thongso_ct?.qBomLonNhat || ''}
                    onChange={event => handleChange('qBomLonNhat')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                  <TextField
                    size='small'
                    type='text'
                    label='Mực nước bể hút'
                    fullWidth
                    placeholder=''
                    value={thongso_ct?.hBeHut || ''}
                    onChange={event => handleChange('hBeHut')(event.target.value)}
                  />
                </Grid>
              </Grid>
            </fieldset>
          ) : congtrinh?.idLoaiCT === 12 ? (
            <fieldset>
              <legend>
                <Typography variant={'subtitle1'} className='legend__title'>
                  THÔNG Số CÔNG TRÌNH
                </Typography>
              </legend>
              <Grid container spacing={4}>
                <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                  <TextField
                    size='small'
                    type='text'
                    label='Cao trình cống'
                    fullWidth
                    placeholder=''
                    value={thongso_ct?.caoTrinhCong || ''}
                    onChange={event => handleChange('caoTrinhCong')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                  <TextField
                    size='small'
                    type='text'
                    label='Chiều dài cống'
                    fullWidth
                    placeholder=''
                    value={thongso_ct?.chieuDaiCong || ''}
                    onChange={event => handleChange('chieuDaiCong')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                  <TextField
                    size='small'
                    type='text'
                    label='Đường kính (m)'
                    fullWidth
                    placeholder=''
                    value={thongso_ct?.duongKinhCong || ''}
                    onChange={event => handleChange('duongKinhCong')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                  <TextField
                    size='small'
                    type='text'
                    label='Kích thước(rộng*cao)'
                    fullWidth
                    placeholder=''
                    value={thongso_ct?.kichThuocCong || ''}
                    onChange={event => handleChange('kichThuocCong')(event.target.value)}
                  />
                </Grid>
              </Grid>
            </fieldset>
          ) : '' : ''
      }
      {showDataCons ?
        <Grid item xs={12}>
          {isLicensepage ? <MiningPurpose data={propData.luuluongtheo_mucdich || []} type={GetConstructionTypeId(router)} onChange={handleMiningPurposeChange} /> : ""}
          <ConstructionItem data={propData.hangmuc_ct || []} type={GetConstructionTypeId(router)} onChange={handleConsItemChange} />
        </Grid> : ""}
    </>
  )
}
export default SurfaceWaterField
