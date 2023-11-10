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
    capCT: data?.capCT || null,
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
    id: data?.thongso?.id || null,
    idCT: data?.thongso?.idCT || null,
    idHangMucCT: data?.thongso?.idHangMucCT || null,
    dienTichLuuVuc: data?.thongso?.dienTichLuuVuc || null,
    muaTrungBinhNam: data?.thongso?.muaTrungBinhNam || null,
    qTrungBinhNam: data?.thongso?.qTrungBinhNam || null,
    congSuatLM: data?.thongso?.congSuatLM || null,
    congSuatDamBao: data?.thongso?.congSuatDamBao || null,
    chieuCaoDap: data?.thongso?.chieuCaoDap || null,
    chieuDaiDap: data?.thongso?.chieuDaiDap || null,
    caoTrinhDap: data?.thongso?.caoTrinhDap || null,
    qmaxNM: data?.thongso?.qmaxNM || null,
    qtt: data?.thongso?.qtt || null,
    qDamBao: data?.thongso?.qDamBao || null,
    hmax: data?.thongso?.hmax || null,
    hmin: data?.thongso?.hmin || null,
    htoiThieu: data?.thongso?.htoiThieu || null,
    mnc: data?.thongso?.mnc || null,
    mndbt: data?.thongso?.mndbt || null,
    mnltk: data?.thongso?.mnltk || null,
    mnlkt: data?.thongso?.mnlkt || null,
    dungTichToanBo: data?.thongso?.dungTichToanBo || null,
    dungTichChet: data?.thongso?.dungTichChet || null,
    dungTichHuuIch: data?.thongso?.dungTichHuuIch || null,
    caoTrinhCong: data?.thongso?.caoTrinhCong || null,
    chieuDaiCong: data?.thongso?.chieuDaiCong || null,
    chieuRongCong: data?.thongso?.chieuRongCong || null,
    kichThuocCong: data?.thongso?.kichThuocCong || null,
    soLuongMayBom: data?.thongso?.soLuongMayBom || null,
    qThietKe: data?.thongso?.qThietKe || null,
    qThucTe: data?.thongso?.qThucTe || null,
    dienTichTuoiThietKe: data?.thongso?.dienTichTuoiThietKe || null,
    dienTichTuoiThucTe: data?.thongso?.dienTichTuoiThucTe || null,
    thoiGianBomTB: data?.thongso?.thoiGianBomTB || null,
    thoiGianBomNhoNhat: data?.thongso?.thoiGianBomNhoNhat || null,
    thoiGianBomLonNhat: data?.thongso?.thoiGianBomLonNhat || null,
    chieuSauDoanThuNuocTu: data?.thongso?.chieuSauDoanThuNuocTu || null,
    chieuSauDoanThuNuocDen: data?.thongso?.chieuSauDoanThuNuocDen || null,
    qktCapNuocSinhHoat: data?.thongso?.qktCapNuocSinhHoat || null,
    hgieng: data?.thongso?.hgieng || null,
    hGiengKT: data?.thongso?.hGiengKT || null,
    phuongThucKT: data?.thongso?.phuongThucKT || null,
    mucNuocTinh: data?.thongso?.mucNuocTinh || null,
    mucNuocDong: data?.thongso?.mucNuocDong || null,
    tangChuaNuocKT: data?.thongso?.tangChuaNuocKT || null,
    hHaThap: data?.thongso?.hHaThap || null,
    luongNuocKT: data?.thongso?.luongNuocKT || null,
    hDatOngLocTu: data?.thongso?.hDatOngLocTu || null,
    hDatOngLocDen: data?.thongso?.hDatOngLocDen || null,
    qktLonNhat: data?.thongso?.qktLonNhat || null,
    congSuatBom: data?.thongso?.congSuatBom || null,
    qXaThaiTB: data?.thongso?.qXaThaiTB || null,
    qXaThaiLonNhat: data?.thongso?.qXaThaiLonNhat || null,
    kqKf: data?.thongso?.kqKf || null,
    qXaTran: data?.thongso?.qXaTran || null,
    qLonNhatTruocLu: data?.thongso?.qLonNhatTruocLu || null,
    hlu: data?.thongso?.hlu || null,
    hThuongLuu: data?.thongso?.hThuongLuu || null,
    hHaLuu: data?.thongso?.hHaLuu || null,
    qBomThietKe: data?.thongso?.qBomThietKe || null,
    qBomLonNhat: data?.thongso?.qBomLonNhat || null,
    hBeHut: data?.thongso?.hBeHut || null,
    qXaThai: data?.thongso?.qXaThai || null,
    qMaxXaThai: data?.thongso?.qMaxXaThai || null,
    qKhaiThac: data?.thongso?.qKhaiThac || null,
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
