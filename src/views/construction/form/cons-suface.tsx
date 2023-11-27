import { Typography, Grid, Autocomplete, TextField, CircularProgress, Button } from '@mui/material'
import { useEffect, FC, useState, Fragment } from 'react'
import { ConstructionItemState, ConstructionSpecState, ConstructionState, MiningPurposeState, emptyConstructionData, emptyConstructionSpec } from './construction-interface'
import { getData } from 'src/api/axios'
import { useRouter } from 'next/router'
import GetConstructionTypeId from 'src/@core/components/get-construction-type'
import { Add } from '@mui/icons-material'
import { createConsCode, createConsUser } from 'src/@core/components/cons'
import ConstructionItem from './cons-item'
import MiningPurpose from './mining-purpose'

interface ConsTypeFieldsetProps {
  data?: any // Thêm prop data để truyền dữ liệu từ ngoài vào
  onChange: (data: any) => void
}

const SurfaceWaterField: FC<ConsTypeFieldsetProps> = ({ data, onChange }) => {

  const [propData, setPropData] = useState<{
    congtrinh?: ConstructionState;
    thongso_ct?: ConstructionSpecState;
    hangmuc_ct?: ConstructionItemState[];
    hangmuc_ct_xoa?: any;
    luuluongtheo_mucdich?: MiningPurposeState[];
    luuluongtheo_mucdich_xoa?: any;
  }>({
    congtrinh: {
      id: data?.id || null,
      idLoaiCT: data?.idLoaiCT || null,
      idHuyen: data?.idHuyen || null,
      idXa: data?.idXa || null,
      idSong: data?.idSong || null,
      idLuuVuc: data?.idLuuVuc || null,
      idTieuLuuVuc: data?.idTieuLuuVuc || null,
      idTangChuaNuoc: data?.idTangChuaNuoc || null,
      tenCT: data?.tenCT || null,
      maCT: data?.maCT || null,
      viTriCT: data?.viTriCT || null,
      x: data?.x || null,
      y: data?.y || null,
      capCT: data?.capCT || null,
      namBatDauVanHanh: data?.namBatDauVanHanh || null,
      nguonNuocKT: data?.nguonNuocKT || null,
      mucDichhKT: data?.mucDichhKT || null,
      phuongThucKT: data?.phuongThucKT || null,
      nguonNuocXT: data?.nguonNuocXT || null,
      thoiGianKT: data?.thoiGianKT || null,
      thoiGianHNK: data?.thoiGianHNK || null,
      mucDichHNK: data?.mucDichHNK || null,
      mucDichhTD: data?.mucDichhTD || null,
      quyMoHNK: data?.quyMoHNK || null,
      thoiGianXD: data?.thoiGianXD || null,
      soLuongGiengKT: data?.soLuongGiengKT || null,
      soLuongGiengQT: data?.soLuongGiengQT || null,
      soDiemXaThai: data?.soDiemXaThai || null,
      soLuongGieng: data?.soLuongGieng || null,
      khoiLuongCacHangMucTD: data?.khoiLuongCacHangMucTD || null,
      qktThietKe: data?.qktThietKe || null,
      qktThucTe: data?.qktThucTe || null,
      viTriXT: data?.viTriXT || null,
      taiKhoan: data?.taiKhoan || null,
      chuThich: data?.chuThich || null,
    },
    thongso_ct: {
      id: data?.thongso?.id || null,
      idCT: data?.thongso?.idCT || null,
      idHangMucCT: data?.thongso?.idHangMucCT || null,
      caoTrinhCong: data?.thongso?.caoTrinhCong || null,
      cheDoKT: data?.thongso?.cheDoKT || null,
      caoTrinhDap: data?.thongso?.caoTrinhDap || null,
      cheDoXT: data?.thongso?.cheDoXT || null,
      chieuCaoDap: data?.thongso?.chieuCaoDap || null,
      chieuDaiCong: data?.thongso?.chieuDaiCong || null,
      chieuDaiDap: data?.thongso?.chieuDaiDap || null,
      chieuRongCong: data?.thongso?.chieuRongCong || null,
      chieuSauDoanThuNuocDen: data?.thongso?.chieuSauDoanThuNuocDen || null,
      chieuSauDoanThuNuocTu: data?.thongso?.chieuSauDoanThuNuocTu || null,
      congSuatBom: data?.thongso?.congSuatBom || null,
      congSuatDamBao: data?.thongso?.congSuatDamBao || null,
      congSuatLM: data?.thongso?.congSuatLM || null,
      dienTichLuuVuc: data?.thongso?.dienTichLuuVuc || null,
      dienTichTuoiThietKe: data?.thongso?.dienTichTuoiThietKe || null,
      dienTichTuoiThucTe: data?.thongso?.dienTichTuoiThucTe || null,
      dungTichChet: data?.thongso?.dungTichChet || null,
      dungTichHuuIch: data?.thongso?.dungTichHuuIch || null,
      dungTichToanBo: data?.thongso?.dungTichToanBo || null,
      hBeHut: data?.thongso?.hBeHut || null,
      hDatOngLocDen: data?.thongso?.hDatOngLocDen || null,
      hDatOngLocTu: data?.thongso?.hDatOngLocTu || null,
      hDoanThuNuocDen: data?.thongso?.hDoanThuNuocDen || null,
      hDoanThuNuocTu: data?.thongso?.hDoanThuNuocTu || null,
      hDong: data?.thongso?.hDong || null,
      hgieng: data?.thongso?.hgieng || null,
      hGiengKT: data?.thongso?.hGiengKT || null,
      hHaLuu: data?.thongso?.hHaLuu || null,
      hHaThap: data?.thongso?.hHaThap || null,
      hlu: data?.thongso?.hlu || null,
      hmax: data?.thongso?.hmax || null,
      hmin: data?.thongso?.hmin || null,
      hThuongLuu: data?.thongso?.hThuongLuu || null,
      hTinh: data?.thongso?.hTinh || null,
      htoiThieu: data?.thongso?.htoiThieu || null,
      kichThuocCong: data?.thongso?.kichThuocCong || null,
      kqKf: data?.thongso?.kqKf || null,
      luongNuocKT: data?.thongso?.luongNuocKT || null,
      mnc: data?.thongso?.mnc || null,
      mndbt: data?.thongso?.mndbt || null,
      mnlkt: data?.thongso?.mnlkt || null,
      mnltk: data?.thongso?.mnltk || null,
      muaTrungBinhNam: data?.thongso?.muaTrungBinhNam || null,
      mucNuocDong: data?.thongso?.mucNuocDong || null,
      mucNuocTinh: data?.thongso?.mucNuocTinh || null,
      phuongThucXT: data?.thongso?.phuongThucXT || null,
      qBomLonNhat: data?.thongso?.qBomLonNhat || null,
      qBomThietKe: data?.thongso?.qBomThietKe || null,
      qDamBao: data?.thongso?.qDamBao || null,
      qKhaiThac: data?.thongso?.qKhaiThac || null,
      qktCapNuocSinhHoat: data?.thongso?.qktCapNuocSinhHoat || null,
      qktLonNhat: data?.thongso?.qktLonNhat || null,
      qLonNhatTruocLu: data?.thongso?.qLonNhatTruocLu || null,
      qMaxKT: data?.thongso?.qMaxKT || null,
      qmaxNM: data?.thongso?.qmaxNM || null,
      qMaxXaThai: data?.thongso?.qMaxXaThai || null,
      qThietKe: data?.thongso?.qThietKe || null,
      qThucTe: data?.thongso?.qThucTe || null,
      qTrungBinhNam: data?.thongso?.qTrungBinhNam || null,
      qtt: data?.thongso?.qtt || null,
      qXaThai: data?.thongso?.qXaThai || null,
      qXaThaiLonNhat: data?.thongso?.qXaThaiLonNhat || null,
      qXaThaiTB: data?.thongso?.qXaThaiTB || null,
      qXaTran: data?.thongso?.qXaTran || null,
      soLuongMayBom: data?.thongso?.soLuongMayBom || null,
      thoiGianBomLonNhat: data?.thongso?.thoiGianBomLonNhat || null,
      thoiGianBomNhoNhat: data?.thongso?.thoiGianBomNhoNhat || null,
      thoiGianBomTB: data?.thongso?.thoiGianBomTB || null,
    },
    hangmuc_ct: data?.hangmuc || [],
    hangmuc_ct_xoa: [],
    luuluongtheo_mucdich: data?.luuluongtheo_mucdich || [],
    luuluongtheo_mucdich_xoa: []
  });

  const handleConsItemChange = (dataSave: any, dataDelete: any) => {
    setPropData({ ...propData, hangmuc_ct: dataSave, hangmuc_ct_xoa: dataDelete });
  };
  const handleMiningPurposeChange = (dataSave: any, dataDelete: any) => {
    setPropData({ ...propData, luuluongtheo_mucdich: dataSave, luuluongtheo_mucdich_xoa: dataDelete })
  };

  const [consType, setconsType] = useState<any>([])
  const [district, setDistrict] = useState<any>([])
  const [commune, setCommune] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showDataCons, setShowDataCons] = useState<boolean>(false)
  const [ds_congtrinh, setDSCongtrinh] = useState<any>([])

  const router = useRouter();
  const isLicensepage = router.pathname.split('/')[1] == "giay-phep";

  useEffect(() => {
    const getDataForSelect = async () => {
      try {
        setLoading(true)

        //constructionType
        const consTypes = await getData('loai-ct/danh-sach')
        const filteredData = consTypes.filter((item: any) => item.idCha === GetConstructionTypeId(router))
        setconsType(filteredData)

        //cons
        const congtrinh = await getData('cong-trinh/danh-sach', {
          tenct: null,
          loai_ct: propData.congtrinh?.idLoaiCT !== null ? propData.congtrinh?.idLoaiCT : GetConstructionTypeId(router),
          huyen: 0,
          xa: 0,
          song: 0,
          luuvuc: 0,
          tieu_luuvuc: 0,
          tang_chuanuoc: 0,
          tochuc_canhan: 0,
          nguonnuoc_kt: null
        })
        setDSCongtrinh(congtrinh)

        //district
        const distric = await getData('hanh-chinh/huyen/danh-sach')
        setDistrict(distric)

        //commune
        const communes = await getData(`hanh-chinh/xa/danh-sach`)
        const communeFiltered = communes.filter((item: any) => item.idHuyen == propData.congtrinh?.idHuyen?.toString())
        setCommune(communeFiltered)
      } catch (error) {
        //console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getDataForSelect()
    setCommune([])
    isLicensepage ? setShowDataCons(propData.congtrinh?.id !== null) : setShowDataCons(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propData.congtrinh?.idHuyen, propData.congtrinh?.idLoaiCT, router])

  useEffect(() => {
    onChange({ ...propData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propData])

  const handleChange = (prop: keyof ConstructionState | keyof ConstructionSpecState) => (value: any) => {
    if (prop in propData.congtrinh!) {
      setPropData((prevData) => {
        let mact = null;
        let taiKhoan = null;
        if (prop === 'tenCT') {
          mact = createConsCode({ ...prevData, [prop]: value });
          taiKhoan = createConsUser({ ...prevData, [prop]: value });
        }
        const updatedData = { ...prevData, maCT: mact, taiKhoan: taiKhoan, [prop]: value };
        onChange({
          congtrinh: updatedData,
          ...propData
        });

        return updatedData;
      });
    } else {
      setPropData((prevSpec) => {
        const updatedSpec = { ...prevSpec, [prop]: value };
        onChange({
          thongso_ct: updatedSpec,
          ...propData
        });

        return updatedSpec;
      });
    }
  }

  const handleSetCons = (data: any) => {
    const cons: ConstructionState = data;
    setShowDataCons(true)
    setPropData({ congtrinh: cons || emptyConstructionData, thongso_ct: data?.thongso || emptyConstructionSpec })
    onChange({ congtrinh: { ...cons }, thongso_ct: { ...data?.thongso }, hangmuc_ct: { ...data?.hangmuc }, luuluongtheo_mucdich: { ...data?.luuluongtheo_mucdich } })
  }

  const handleAddNewCons = () => {
    setShowDataCons(true)
    setPropData({ congtrinh: emptyConstructionData, thongso_ct: emptyConstructionSpec })
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
              value={consType.find((option: any) => option.id === propData.congtrinh?.idLoaiCT) || null}
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
                  value={ds_congtrinh.find((option: any) => option.tenCT.toLowerCase() === propData.congtrinh?.tenCT?.toLowerCase()) || null}
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
                  value={propData.congtrinh?.tenCT || ''}
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
                  value={propData.congtrinh?.maCT || ''}
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
                  value={propData.congtrinh?.viTriCT || ''}
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
                value={district.find((option: any) => option.idHuyen === propData.congtrinh?.idHuyen?.toString()) || null}
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
                disabled={propData.congtrinh?.idHuyen !== undefined && propData.congtrinh?.idHuyen == null}
                size='small'
                options={commune}
                getOptionLabel={(option: any) => option.tenXa}
                value={commune.find((option: any) => option.idXa === propData.congtrinh?.idXa?.toString()) || null}
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
                value={propData.congtrinh?.namBatDauVanHanh || ''}
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
                value={propData.congtrinh?.thoiGianXD || ''}
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
                value={propData.congtrinh?.x || ''}
                onChange={event => handleChange('x')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                fullWidth
                placeholder=''
                value={propData.congtrinh?.y || ''}
                onChange={event => handleChange('y')(event.target.value)}
                label='Toạ độ Y (VN2000)'
              />
            </Grid>

            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <Autocomplete
                size='small'
                options={consType}
                getOptionLabel={(option: any) => option.label}
                value={consType.find((option: any) => option.value === propData.congtrinh?.idLoaiCT) || null}
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
              value={propData.congtrinh?.nguonNuocKT || ''}
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
              value={propData.congtrinh?.phuongThucKT || ''}
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
                value={propData?.thongso_ct?.cheDoKT || ''}
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
          propData.congtrinh?.idLoaiCT === 4 || propData.congtrinh?.idLoaiCT === 5 ? (
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
                      value={propData.congtrinh?.capCT || ''}
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
                      value={propData?.thongso_ct?.dienTichLuuVuc || ''}
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
                      value={propData?.thongso_ct?.muaTrungBinhNam || ''}
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
                      value={propData?.thongso_ct?.qTrungBinhNam || ''}
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
                      value={propData?.thongso_ct?.congSuatLM || ''}
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
                      value={propData?.thongso_ct?.congSuatDamBao || ''}
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
                      value={propData?.thongso_ct?.chieuCaoDap || ''}
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
                      value={propData?.thongso_ct?.qmaxNM || ''}
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
                      value={propData?.thongso_ct?.qtt || ''}
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
                      value={propData?.thongso_ct?.qDamBao || ''}
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
                      value={propData?.thongso_ct?.hmax || ''}
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
                      value={propData?.thongso_ct?.hmin || ''}
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
                      value={propData?.thongso_ct?.htoiThieu || ''}
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
                      value={propData?.thongso_ct?.dungTichToanBo || ''}
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
                      value={propData?.thongso_ct?.dungTichChet || ''}
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
                      value={propData?.thongso_ct?.dungTichHuuIch || ''}
                      onChange={event => handleChange('dungTichHuuIch')(event.target.value)}
                    />
                  </Grid>
                </Grid>
                {propData.congtrinh?.idLoaiCT === 4 ? (
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                        <TextField
                          size='small'
                          type='text'
                          label='Mực nước chết'
                          fullWidth
                          placeholder=''
                          value={propData?.thongso_ct?.mnc || ''}
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
                          value={propData?.thongso_ct?.mndbt || ''}
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
                          value={propData?.thongso_ct?.mnltk || ''}
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
                          value={propData?.thongso_ct?.mnlkt || ''}
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
          ) : propData.congtrinh?.idLoaiCT === 6 ? (
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
                    value={propData?.thongso_ct?.soLuongMayBom || ''}
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
                    value={propData?.thongso_ct?.dienTichTuoiThietKe || ''}
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
                    value={propData?.thongso_ct?.dienTichTuoiThucTe || ''}
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
                    value={propData?.thongso_ct?.qThietKe || ''}
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
                    value={propData?.thongso_ct?.qThucTe || ''}
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
                    value={propData?.thongso_ct?.qBomThietKe || ''}
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
                    value={propData?.thongso_ct?.qBomLonNhat || ''}
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
                    value={propData?.thongso_ct?.hBeHut || ''}
                    onChange={event => handleChange('hBeHut')(event.target.value)}
                  />
                </Grid>
              </Grid>
            </fieldset>
          ) : propData.congtrinh?.idLoaiCT === 12 ? (
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
                    value={propData?.thongso_ct?.caoTrinhCong || ''}
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
                    value={propData?.thongso_ct?.chieuDaiCong || ''}
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
                    value={propData?.thongso_ct?.chieuRongCong || ''}
                    onChange={event => handleChange('chieuRongCong')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                  <TextField
                    size='small'
                    type='text'
                    label='Kích thước(rộng*cao)'
                    fullWidth
                    placeholder=''
                    value={propData?.thongso_ct?.kichThuocCong || ''}
                    onChange={event => handleChange('kichThuocCong')(event.target.value)}
                  />
                </Grid>
              </Grid>
            </fieldset>
          ) : '' : ''
      }
      {showDataCons ?
        <Grid item xs={12}>
          <MiningPurpose data={propData.luuluongtheo_mucdich} type={GetConstructionTypeId(router)} onChange={handleMiningPurposeChange} />
          <ConstructionItem data={propData.hangmuc_ct} type={GetConstructionTypeId(router)} onChange={handleConsItemChange} />
        </Grid> : ""}
    </>
  )
}
export default SurfaceWaterField
