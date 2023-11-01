import { Typography, Grid, Autocomplete, TextField, CircularProgress } from '@mui/material'
import { useEffect, FC, useState, Fragment } from 'react'
import { ConstructionSpecState, ConstructionState } from './construction-interface'
import { getData } from 'src/api/axios'

interface ConsTypeFieldsetProps {
  data?: any // Thêm prop data để truyền dữ liệu từ ngoài vào
  onChange: (data: any) => void
}

const DischargeWaterField: FC<ConsTypeFieldsetProps> = ({ data, onChange }) => {
  const [consSFData, setConsSFData] = useState<ConstructionState>({
    id: data?.id || null,
    idLoaiCT: data?.idLoaiCT || null,
    idXa: data?.idXa || null,
    idHuyen: data?.idHuyen || null,
    idSong: data?.idSong || null,
    idLuuVuc: data?.idLuuVuc || null,
    idTieuLuuVuc: data?.idTieuLuuVuc || null,
    idTangChuaNuoc: data?.idTangChuaNuoc || null,
    taiKhoan: data?.taiKhoan || null,
    tenCT: data?.tenCT || null,
    maCT: data?.maCT || null,
    viTriCT: data?.viTriCT || null,
    x: data?.x || null,
    y: data?.y || null,
    namBatDauVanHanh: data?.namBatDauVanHanh || null,
    nguonNuocKT: data?.nguonNuocKT || null,
    cheDoKT: data?.cheDoKT || null,
    mucDichhKT: data?.mucDichhKT || null,
    phuongThucKT: data?.phuongThucKT || null,
    phuongThucXT: data?.phuongThucXT || null,
    cHeDoXT: data?.cHeDoXT || null,
    nguonNuocXT: data?.nguonNuocXT || null,
    thoiGianKT: data?.thoiGianKT || null,
    thoiGianHNK: data?.thoiGianHNK || null,
    mucDichHNK: data?.mucDichHNK || null,
    mucDichhTD: data?.mucDichhTD || null,
    quyMoHNK: data?.quyMoHNK || null,
    thoiGianXD: data?.thoiGianXD || null,
    soLuongGiengKT: data?.soLuongGiengKT || null,
    soLuongGiengQT: data?.soLuongGiengQT || null,
    chuThich: data?.chuThich || null,
    soLuongGieng: data?.soLuongGieng || null,
    khoiLuongCacHangMucTD: data?.khoiLuongCacHangMucTD || null,
    qktThietKe: data?.qktThietKe || null,
    qktThucTe: data?.qktThucTe || null,
    viTriXT: data?.viTriXT || null
  })
  const [consSpec, setConsSpec] = useState<ConstructionSpecState>({
    id: data?.thongso?.id || 0,
    idCT: data?.thongso?.idCT || 0,
    idHangMucCT: data?.thongso?.idHangMucCT || 0,
    capCT: data?.thongso?.capCT || 0,
    dienTichLuuVuc: data?.thongso?.dienTichLuuVuc || 0,
    muaTrungBinhNam: data?.thongso?.muaTrungBinhNam || 0,
    qTrungBinhNam: data?.thongso?.qTrungBinhNam || 0,
    congSuatLM: data?.thongso?.congSuatLM || 0,
    congSuatDamBao: data?.thongso?.congSuatDamBao || 0,
    chieuCaoDap: data?.thongso?.chieuCaoDap || 0,
    chieuDaiDap: data?.thongso?.chieuDaiDap || 0,
    caoTrinhDap: data?.thongso?.caoTrinhDap || 0,
    qmaxNM: data?.thongso?.qmaxNM || 0,
    qtt: data?.thongso?.qtt || 0,
    qDamBao: data?.thongso?.qDamBao || 0,
    hmax: data?.thongso?.hmax || 0,
    hmin: data?.thongso?.hmin || 0,
    htoiThieu: data?.thongso?.htoiThieu || 0,
    mnc: data?.thongso?.mnc || 0,
    mndbt: data?.thongso?.mndbt || 0,
    mnltk: data?.thongso?.mnltk || 0,
    mnlkt: data?.thongso?.mnlkt || 0,
    dungTichToanBo: data?.thongso?.dungTichToanBo || 0,
    dungTichChet: data?.thongso?.dungTichChet || 0,
    dungTichHuuIch: data?.thongso?.dungTichHuuIch || 0,
    caoTrinhCong: data?.thongso?.caoTrinhCong || 0,
    chieuDaiCong: data?.thongso?.chieuDaiCong || 0,
    chieuRongCong: data?.thongso?.chieuRongCong || 0,
    kichThuocCong: data?.thongso?.kichThuocCong || 0,
    soLuongMayBom: data?.thongso?.soLuongMayBom || 0,
    qThietKe: data?.thongso?.qThietKe || 0,
    qThucTe: data?.thongso?.qThucTe || 0,
    dienTichTuoiThietKe: data?.thongso?.dienTichTuoiThietKe || 0,
    dienTichTuoiThucTe: data?.thongso?.dienTichTuoiThucTe || 0,
    thoiGianBomTB: data?.thongso?.thoiGianBomTB || 0,
    thoiGianBomNhoNhat: data?.thongso?.thoiGianBomNhoNhat || 0,
    thoiGianBomLonNhat: data?.thongso?.thoiGianBomLonNhat || 0,
    chieuSauDoanThuNuocTu: data?.thongso?.chieuSauDoanThuNuocTu || 0,
    chieuSauDoanThuNuocDen: data?.thongso?.chieuSauDoanThuNuocDen || 0,
    qktCapNuocSinhHoat: data?.thongso?.qktCapNuocSinhHoat || 0,
    hgieng: data?.thongso?.hgieng || 0,
    hGiengKT: data?.thongso?.hGiengKT || 0,
    phuongThucKT: data?.thongso?.phuongThucKT || 0,
    mucNuocTinh: data?.thongso?.mucNuocTinh || 0,
    mucNuocDong: data?.thongso?.mucNuocDong || 0,
    tangChuaNuocKT: data?.thongso?.tangChuaNuocKT || 0,
    hHaThap: data?.thongso?.hHaThap || 0,
    luongNuocKT: data?.thongso?.luongNuocKT || 0,
    hDatOngLocTu: data?.thongso?.hDatOngLocTu || 0,
    hDatOngLocDen: data?.thongso?.hDatOngLocDen || 0,
    qktLonNhat: data?.thongso?.qktLonNhat || 0,
    congSuatBom: data?.thongso?.congSuatBom || 0,
    qXaThaiTB: data?.thongso?.qXaThaiTB || 0,
    qXaThaiLonNhat: data?.thongso?.qXaThaiLonNhat || 0,
    kqKf: data?.thongso?.kqKf || 0,
    qXaTran: data?.thongso?.qXaTran || 0,
    qLonNhatTruocLu: data?.thongso?.qLonNhatTruocLu || 0,
    hlu: data?.thongso?.hlu || 0,
    hThuongLuu: data?.thongso?.hThuongLuu || 0,
    hHaLuu: data?.thongso?.hHaLuu || 0,
    qBomThietKe: data?.thongso?.qBomThietKe || 0,
    qBomLonNhat: data?.thongso?.qBomLonNhat || 0,
    hBeHut: data?.thongso?.hBeHut || 0,
    qXaThai: data?.thongso?.qXaThai || 0,
    qMaxXaThai: data?.thongso?.qMaxXaThai || 0,
    qKhaiThac: data?.thongso?.qKhaiThac || 0,
    qMaxKT: 0
  })
  const [consType, setconsType] = useState<any>([])
  const [district, setDistrict] = useState<any>([])
  const [commune, setCommune] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getDataForSelect = async () => {
      try {
        setLoading(true)

        //constructionType
        const consTypes = await getData('loai-ct/danh-sach')
        const filteredData = consTypes.filter((item: any) => item.idCha === 3)
        setconsType(filteredData)

        //district
        const distric = await getData('hanh-chinh/huyen/danh-sach')
        setDistrict(distric)

        //commune
        const communes = await getData(`hanh-chinh/xa/danh-sach`)
        const communeFiltered = communes.filter((item: any) => item.idHuyen == consSFData?.idHuyen?.toString())
        setCommune(communeFiltered)
      } catch (error) {
        //console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getDataForSelect()
    setCommune([])
  }, [consSFData?.idHuyen])

  const handleChange = (prop: keyof ConstructionState | keyof ConstructionSpecState) => (value: any) => {
    setConsSFData({ ...consSFData, [prop]: value })
    setConsSpec({ ...consSpec, [prop]: value })
    const dataChange = {
      consSFData: consSFData,
      consSpec: consSpec
    }
    onChange({ ...dataChange, [prop]: value })
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
              value={consType.find((option: any) => option.id === consSFData.idLoaiCT) || null}
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

          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='Tên công trình'
              fullWidth
              placeholder=''
              defaultValue={consSFData.tenCT}
              onChange={event => handleChange('tenCT')(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              variant='outlined'
              fullWidth
              label='Địa điểm công trình'
              defaultValue={consSFData.viTriCT}
              onChange={event => handleChange('viTriCT')(event.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              disabled={loading}
              size='small'
              options={district}
              getOptionLabel={(option: any) => option.tenHuyen}
              value={district.find((option: any) => option.idHuyen === consSFData.idHuyen?.toString()) || null}
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
              disabled={consSFData?.idHuyen !== undefined && consSFData.idHuyen == null}
              size='small'
              options={commune}
              getOptionLabel={(option: any) => option.tenXa}
              value={commune.find((option: any) => option.idXa === consSFData.idXa?.toString()) || null}
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
              type='text'
              fullWidth
              placeholder=''
              label='Vĩ độ X'
              defaultValue={consSFData.x}
              onChange={event => handleChange('x')(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consSFData.y}
              onChange={event => handleChange('y')(event.target.value)}
              label='Kinh độ Y'
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              variant='outlined'
              fullWidth
              label='Năm bắt đầu vận hành'
              placeholder=''
              defaultValue={consSFData.namBatDauVanHanh}
              onChange={event => handleChange('namBatDauVanHanh')(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consSFData.viTriXT}
              onChange={event => handleChange('viTriXT')(event.target.value)}
              label='Vị trí xả thải'
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consSFData.nguonNuocXT}
              onChange={event => handleChange('nguonNuocXT')(event.target.value)}
              label='Nguồn tiếp nhận xả thải'
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consSFData.phuongThucXT}
              onChange={event => handleChange('phuongThucXT')(event.target.value)}
              label='Phương thức xả thải'
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              variant='outlined'
              fullWidth
              label='Chế độ xả thải'
              placeholder=''
              defaultValue={consSFData.cHeDoXT}
              onChange={event => handleChange('cHeDoXT')(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              fullWidth
              placeholder=''
              defaultValue={consSpec.qXaThaiTB || ''}
              onChange={event => handleChange('qXaThaiTB')(event.target.value)}
              label='Lưu lượng xả trung bình m3/ngày đêm'
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consSpec.qXaThaiLonNhat || ''}
              onChange={event => handleChange('qXaThaiLonNhat')(event.target.value)}
              label='Lưu lượng xả lớn nhất m3/ngày đêm'
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consSpec.kqKf || ''}
              onChange={event => handleChange('kqKf')(event.target.value)}
              label='Chất lượng nước thải, hệ số Kq và Kf'
            />
          </Grid>
        </Grid>
      </fieldset>
    </>
  )
}
export default DischargeWaterField
