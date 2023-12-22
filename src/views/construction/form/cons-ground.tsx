import { Typography, Grid, Autocomplete, TextField, CircularProgress, Button } from '@mui/material'
import { useEffect, FC, useState, Fragment } from 'react'
import { ConstructionSpecState, ConstructionState, emptyConstructionData, propConsDataState } from './construction-interface'
import { getData } from 'src/api/axios'
import { useRouter } from 'next/router'
import GetConstructionTypeId from 'src/@core/components/get-construction-type'
import { createConsCode, createConsUser } from 'src/@core/components/cons'
import ConstructionItem from './cons-item'
import { Add } from '@mui/icons-material'
import MiningPurpose from './mining-purpose'

interface ConsTypeFieldsetProps {
  data?: any
  onChange: (data: any) => void
}

const GroundWaterField: FC<ConsTypeFieldsetProps> = ({ data, onChange }) => {
  const propData: propConsDataState = { congtrinh: data?.congtrinh, thongso_ct: data?.thongso_ct, hangmuc_ct: data?.hangmuc_ct }
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
  const loai_ct = router.pathname.split('/')[2] == "nuoc-duoi-dat" ? router.pathname.split('/')[3] : "";

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
    isLicensepage ? setShowDataCons(congtrinh?.id !== null) : setShowDataCons(true);

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
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {
            loai_ct == "khai-thac-su-dung" || loai_ct == "tham-do" || loai_ct == "hanh-nghe-khoan" ?
              "" :
              <Grid item xs={12} md={4} sm={12}>
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
          }
          {
            isLicensepage ?
              <Grid item xs={12} md={4} sm={12}>
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
              <Grid item xs={12} md={4} sm={12}>
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
        {showDataCons ?
          <Grid container spacing={4}>
            <Grid item xs={12} md={3} sm={12}>
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
            <Grid item xs={12} md={3} sm={12}>
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
            <Grid item xs={12} md={6} sm={12}>
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
            <Grid item xs={12} md={3} sm={12}>
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
            <Grid item xs={12} md={3} sm={12}>
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
            <Grid item xs={12} md={3} sm={12}>
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
            <Grid item xs={12} md={3} sm={12}>
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
            <Grid item xs={12} md={3} sm={12}>
              <TextField
                size='small'
                type='text'
                fullWidth
                placeholder=''
                defaultValue={congtrinh?.namBatDauVanHanh}
                onChange={event => handleChange('namBatDauVanHanh')(event.target.value)}
                label='Năm vận hành'
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12}>
              <TextField
                size='small'
                type='text'
                fullWidth
                placeholder=''
                defaultValue={congtrinh?.thoiGianHNK}
                onChange={event => handleChange('thoiGianHNK')(event.target.value)}
                label='Thời gian hành nghề'
              />
            </Grid>
            {propData.congtrinh?.idLoaiCT === 7 ? (
              <Grid item xs={12} md={3} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  label='Số giếng khai thác'
                  fullWidth
                  placeholder=''
                  defaultValue={congtrinh?.soLuongGieng}
                  onChange={event => handleChange('soLuongGieng')(event.target.value)}
                />
              </Grid>
            ) : ""}
            {propData.congtrinh?.idLoaiCT === 7 ? (
              <Grid item xs={12} md={3} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng lượng nước khai thác(m3/ngày đêm)'
                  fullWidth
                  placeholder=''
                  defaultValue={thongso_ct?.luongNuocKT}
                  onChange={event => handleChange('luongNuocKT')(event.target.value)}
                />
              </Grid>
            ) : ""}
            {propData.congtrinh?.idLoaiCT === 8 ? (
              <Grid item xs={12} md={3} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  label='Thời gian thi công'
                  fullWidth
                  placeholder=''
                  defaultValue={congtrinh?.thoiGianXD}
                  onChange={event => handleChange('thoiGianXD')(event.target.value)}
                />
              </Grid>
            ) : ""}
            {propData.congtrinh?.idLoaiCT === 8 ? (
              <Grid item xs={12} md={3} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  label='Quy mô khoan thăm dò'
                  fullWidth
                  placeholder=''
                  defaultValue={congtrinh?.quyMoHNK}
                  onChange={event => handleChange('quyMoHNK')(event.target.value)}
                />
              </Grid>
            ) : ""}
            {propData.congtrinh?.idLoaiCT === 8 ? (
              <Grid item xs={12} md={6} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  label='Tầng chứa nước thăm dò'
                  fullWidth
                  placeholder=''
                  defaultValue={congtrinh?.quyMoHNK}
                  onChange={event => handleChange('quyMoHNK')(event.target.value)}
                />
              </Grid>
            ) : ""}

          </Grid> : ''}
      </fieldset>

      {/* check form tram bom */}
      {
        propData.congtrinh?.idLoaiCT === 9 ? (
          <fieldset>
            <legend>
              <Typography variant={'subtitle1'} className='legend__title'>
                Thông số công trình khoan
              </Typography>
            </legend>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  label='Lưu trữ khai thác(m3/ngày đêm)'
                  fullWidth
                  placeholder=''
                  defaultValue={thongso_ct?.qktCapNuocSinhHoat}
                  onChange={event => handleChange('qktCapNuocSinhHoat')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  label='Chế độ khai thác(giờ/ngày đêm)'
                  fullWidth
                  placeholder=''
                  defaultValue={thongso_ct?.cheDoKT}
                  onChange={event => handleChange('cheDoKT')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  label='Thời gian thi công'
                  fullWidth
                  placeholder=''
                  defaultValue={congtrinh?.thoiGianXD}
                  onChange={event => handleChange('thoiGianXD')(event.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  label='Tầng chứa nước thăm dò'
                  fullWidth
                  placeholder=''
                  defaultValue={congtrinh?.quyMoHNK}
                  onChange={event => handleChange('quyMoHNK')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  label='Khối lượng các hạng mục thăm dò'
                  fullWidth
                  placeholder=''
                  defaultValue={congtrinh?.khoiLuongCacHangMucTD}
                  onChange={event => handleChange('khoiLuongCacHangMucTD')(event.target.value)}
                />
              </Grid>
            </Grid>
          </fieldset>
        ) : (
          ''
        )
      }
      {showDataCons ?
        <Grid item xs={12}>
          {isLicensepage ? loai_ct !== "hanh-nghe-khoan" ? <MiningPurpose data={propData.luuluongtheo_mucdich || []} type={GetConstructionTypeId(router)} onChange={handleMiningPurposeChange} /> : "" : ""}
          <ConstructionItem data={propData.hangmuc_ct || []} type={isLicensepage ? GetConstructionTypeId(router) : congtrinh.idLoaiCT} onChange={handleConsItemChange} />
        </Grid> : ""}
    </>
  )
}
export default GroundWaterField
