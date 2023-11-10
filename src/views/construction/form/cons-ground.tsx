import { Typography, Grid, Autocomplete, TextField, CircularProgress } from '@mui/material'
import { useEffect, FC, useState, Fragment } from 'react'
import { ConstructionSpecState, ConstructionState } from './construction-interface'
import { getData } from 'src/api/axios'

interface ConsTypeFieldsetProps {
  data?: any // Thêm prop data để truyền dữ liệu từ ngoài vào
  onChange: (data: any) => void
}

const GroundWaterField: FC<ConsTypeFieldsetProps> = ({ data, onChange }) => {
  const [consGroundData, setConsGroundData] = useState<ConstructionState>({
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
    qMaxKT: data?.thongso?.qMaxKT || null
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
        const filteredData = consTypes.filter((item: any) => item.idCha === 2)
        setconsType(filteredData)

        //district
        const distric = await getData('hanh-chinh/huyen/danh-sach')
        setDistrict(distric)

        //commune
        const communes = await getData(`hanh-chinh/xa/danh-sach`)
        const communeFiltered = communes.filter((item: any) => item.idHuyen == consGroundData?.idHuyen?.toString())
        setCommune(communeFiltered)
      } catch (error) {
        //console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getDataForSelect()
    setCommune([])
  }, [consGroundData?.idHuyen])

  const handleChange = (prop: keyof ConstructionState | keyof ConstructionSpecState) => (value: any) => {
    setConsGroundData({ ...consGroundData, [prop]: value })
    setConsSpec({ ...consSpec, [prop]: value })
    const dataChange = {
      consGroundData: consGroundData,
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
              value={consType.find((option: any) => option.id === consGroundData.idLoaiCT) || null}
              isOptionEqualToValue={(option: any) => option.id}
              onChange={(_, value) => handleChange('idLoaiCT')(value?.id || 0)}
              renderInput={params => <TextField required {...params} fullWidth label='Chọn loại hình công trình' InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {loading && <CircularProgress color='primary' size={20} />}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              }} />}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='Tên công trình'
              fullWidth
              placeholder=''
              defaultValue={consGroundData.tenCT}
              onChange={event => handleChange('tenCT')(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              variant='outlined'
              fullWidth
              label='Địa điểm công trình'
              defaultValue={consGroundData.viTriCT}
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
              value={district.find((option: any) => option.idHuyen === consGroundData.idHuyen?.toString()) || null}
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
              disabled={consGroundData?.idHuyen !== undefined && consGroundData.idHuyen == null}
              size='small'
              options={commune}
              getOptionLabel={(option: any) => option.tenXa}
              value={commune.find((option: any) => option.idXa === consGroundData.idXa?.toString()) || null}
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
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              variant='outlined'
              fullWidth
              label='Năm vận hành'
              placeholder=''
              defaultValue={consGroundData.namBatDauVanHanh}
              onChange={event => handleChange('namBatDauVanHanh')(event.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              label='X(VN2000'
              defaultValue={consGroundData.x}
              onChange={event => handleChange('x')(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consGroundData.y}
              onChange={event => handleChange('y')(event.target.value)}
              label='Y (VN2000)'
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consGroundData.thoiGianHNK}
              multiline
              onChange={event => handleChange('thoiGianHNK')(event.target.value)}
              label='Thời gian hành nghề'
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consGroundData.mucDichhTD}
              onChange={event => handleChange('mucDichhTD')(event.target.value)}
              label='Mục đích khai thác,sử dụng nước'
            />
          </Grid>

        </Grid>
      </fieldset>

      {/*check thuydien va ho chua */}
      {consGroundData?.idLoaiCT === 7 ? (
        <Grid item xs={12}>
          <fieldset>
            <legend>
              <Typography variant={'subtitle1'} className='legend__title'>
                Số hiệu,vị trí và thông số công trình khai thác
              </Typography>
            </legend>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Số giếng khai thác'
                  fullWidth
                  placeholder=''
                  defaultValue={consGroundData.mucDichhTD}
                  onChange={event => handleChange('mucDichhTD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng lượng nước khai thác(m3/ngày đêm)'
                  fullWidth
                  placeholder=''
                  defaultValue={consSpec.luongNuocKT}
                  onChange={event => handleChange('luongNuocKT')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Số hiệu'
                  fullWidth
                  placeholder=''
                  defaultValue={consGroundData.soLuongGieng}
                  onChange={event => handleChange('soLuongGieng')(event.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tâng chứa nước khai thác'
                  fullWidth
                  placeholder=''
                  defaultValue={consSpec.tangChuaNuocKT}
                  onChange={event => handleChange('tangChuaNuocKT')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Chiều sâu đoạn thu nước từ(m)'
                  fullWidth
                  placeholder=''
                  defaultValue={consSpec.chieuSauDoanThuNuocTu}
                  onChange={event => handleChange('chieuSauDoanThuNuocTu')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Chiều sâu đoạn thu nước đến (m)'
                  fullWidth
                  placeholder=''
                  defaultValue={consSpec.chieuSauDoanThuNuocDen}
                  onChange={event => handleChange('chieuSauDoanThuNuocDen')(event.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Lưu lượng khai thác NDD(m3/ngày đêm)'
                  fullWidth
                  placeholder=''
                  defaultValue={consSpec.qktCapNuocSinhHoat}
                  onChange={event => handleChange('qktCapNuocSinhHoat')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Chiều sâu mực nước tĩnh(m)'
                  fullWidth
                  placeholder=''
                  defaultValue={consSpec.mucNuocTinh}
                  onChange={event => handleChange('mucNuocTinh')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Chiều sâu mực nước động lớn nhất (m)'
                  fullWidth
                  placeholder=''
                  defaultValue={consSpec.mucNuocDong}
                  onChange={event => handleChange('mucNuocDong')(event.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Mực nước hạ thấp'
                  fullWidth
                  placeholder=''
                  defaultValue={consSpec.hHaThap}
                  onChange={event => handleChange('hHaThap')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Mực nước trong giếng khai thác'
                  fullWidth
                  placeholder=''
                  defaultValue={consSpec.hgieng}
                  onChange={event => handleChange('hgieng')(event.target.value)}
                />
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
      ) : (
        ''
      )}

      {/* check form tram bom */}
      {consGroundData?.idLoaiCT === 8 ? (
        <fieldset>
          <legend>
            <Typography variant={'subtitle1'} className='legend__title'>
              Số hiệu,vị trí và thông số công trình khai thác
            </Typography>
          </legend>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Lưu trữ khai thác(m3/ngày đêm)'
                fullWidth
                placeholder=''
                defaultValue={consSpec.qktCapNuocSinhHoat}
                onChange={event => handleChange('qktCapNuocSinhHoat')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Chế độ khai thác(giờ/ngày đêm)'
                fullWidth
                placeholder=''
                defaultValue={consGroundData.cheDoKT}
                onChange={event => handleChange('cheDoKT')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Thời gian thi công'
                fullWidth
                placeholder=''
                defaultValue={consGroundData.thoiGianXD}
                onChange={event => handleChange('thoiGianXD')(event.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Tầng chứa nước thăm dò'
                fullWidth
                placeholder=''
                defaultValue={consGroundData.quyMoHNK}
                onChange={event => handleChange('quyMoHNK')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Khối lượng các hạng mục thăm dò'
                fullWidth
                placeholder=''
                defaultValue={consGroundData.khoiLuongCacHangMucTD}
                onChange={event => handleChange('khoiLuongCacHangMucTD')(event.target.value)}
              />
            </Grid>
          </Grid>
        </fieldset>
      ) : (
        ''
      )}

      {/* check form cong */}

      {consGroundData?.idLoaiCT === 9 ? (
        <fieldset>
          <legend>
            <Typography variant={'subtitle1'} className='legend__title'>
              Số hiệu,vị trí và thông số công trình khai thác
            </Typography>
          </legend>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Quy mô khoan thăm dò'
                fullWidth
                placeholder=''
                defaultValue={consGroundData.quyMoHNK}
                onChange={event => handleChange('quyMoHNK')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Tầng chứa nước thăm dò'
                fullWidth
                placeholder=''
                defaultValue={consGroundData.quyMoHNK}
                onChange={event => handleChange('quyMoHNK')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Thời gian thi công'
                fullWidth
                placeholder=''
                defaultValue={consGroundData.thoiGianXD}
                onChange={event => handleChange('thoiGianXD')(event.target.value)}
              />
            </Grid>
          </Grid>
        </fieldset>
      ) : (
        ''
      )}
    </>
  )
}
export default GroundWaterField
