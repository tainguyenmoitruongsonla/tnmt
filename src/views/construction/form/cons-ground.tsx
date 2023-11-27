import { Typography, Grid, Autocomplete, TextField, CircularProgress, Button } from '@mui/material'
import { useEffect, FC, useState, Fragment } from 'react'
import { ConstructionItemState, ConstructionSpecState, ConstructionState, MiningPurposeState, emptyConstructionData, emptyConstructionSpec } from './construction-interface'
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

  const [consType, setconsType] = useState<any>([])
  const [district, setDistrict] = useState<any>([])
  const [commune, setCommune] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showDataCons, setShowDataCons] = useState<boolean>(false)
  const [ds_congtrinh, setDSCongtrinh] = useState<any>([])


  const router = useRouter();
  const isLicensepage = router.pathname.split('/')[1] == "giay-phep";
  const loai_ct = router.pathname.split('/')[2] == "nuoc-duoi-dat" && router.pathname.split('/')[3]

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

    setPropData({ ...propData, congtrinh: { ...propData.congtrinh, idLoaiCT: loai_ct == "khai-thac-su-dung" ? 7 : loai_ct == "tham-do" ? 8 : loai_ct == "hanh-nghe-khoan" ? 9 : data?.idLoaiCT || null } })

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
          }
          {
            isLicensepage ?
              <Grid item xs={12} md={4} sm={12}>
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
                value={propData.congtrinh?.tenCT || ''}
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
                value={propData.congtrinh?.maCT || ''}
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
                value={propData.congtrinh?.viTriCT || ''}
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
            <Grid item xs={12} md={3} sm={12}>
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
            <Grid item xs={12} md={3} sm={12}>
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
            <Grid item xs={12} md={3} sm={12}>
              <TextField
                size='small'
                type='text'
                fullWidth
                placeholder=''
                defaultValue={propData.congtrinh?.namBatDauVanHanh}
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
                defaultValue={propData.congtrinh?.thoiGianHNK}
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
                  defaultValue={propData.congtrinh?.soLuongGieng}
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
                  defaultValue={propData.thongso_ct?.luongNuocKT}
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
                  defaultValue={propData.congtrinh?.thoiGianXD}
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
                  defaultValue={propData.congtrinh?.quyMoHNK}
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
                  defaultValue={propData.congtrinh?.quyMoHNK}
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
                  defaultValue={propData.thongso_ct?.qktCapNuocSinhHoat}
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
                  defaultValue={propData.thongso_ct?.cheDoKT}
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
                  defaultValue={propData.congtrinh?.thoiGianXD}
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
                  defaultValue={propData.congtrinh?.quyMoHNK}
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
                  defaultValue={propData.congtrinh?.khoiLuongCacHangMucTD}
                  onChange={event => handleChange('khoiLuongCacHangMucTD')(event.target.value)}
                />
              </Grid>
            </Grid>
          </fieldset>
        ) : (
          ''
        )
      }
      {
        showDataCons ?
          <Grid item xs={12}>
            <MiningPurpose data={propData.luuluongtheo_mucdich} type={GetConstructionTypeId(router)} onChange={handleMiningPurposeChange} />
            <ConstructionItem data={propData.hangmuc_ct} type={GetConstructionTypeId(router)} onChange={handleConsItemChange} />
          </Grid> : ""
      }
    </>
  )
}
export default GroundWaterField
