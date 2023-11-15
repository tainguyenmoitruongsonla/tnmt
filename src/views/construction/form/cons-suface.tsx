import { Typography, Grid, Autocomplete, TextField, CircularProgress, Button } from '@mui/material'
import { useEffect, FC, useState, Fragment } from 'react'
import { ConstructionItemState, ConstructionSpecState, ConstructionState, emptyConstructionData, emptyConstructionSpec } from './construction-interface'
import { getData } from 'src/api/axios'
import { useRouter } from 'next/router'
import GetConstructionTypeId from 'src/@core/components/get-construction-type'
import { Add } from '@mui/icons-material'
import { createConsCode, createConsUser } from 'src/@core/components/cons'
import ConstructionItem from './cons-item'

interface ConsTypeFieldsetProps {
  data?: any // Thêm prop data để truyền dữ liệu từ ngoài vào
  onChange: (data: any) => void
}

const SurfaceWaterField: FC<ConsTypeFieldsetProps> = ({ data, onChange }) => {

  const [consData, setConsData] = useState<ConstructionState>({
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

  const [consItemData, setConsItemData] = useState<ConstructionItemState[]>(data?.hangmuc || []);
  const [consItemDataDetele, setConsItemDataDelete] = useState<any>();

  const handleconsItemChange = (dataSave: any, dataDelete: any) => {
    setConsItemDataDelete(dataDelete)
    setConsItemData(dataSave);
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
    isLicensepage ? setShowDataCons(consData?.id !== null) : setShowDataCons(true);
    const getDataForSelect = async () => {
      try {
        setLoading(true)

        //constructionType
        const consTypes = await getData('loai-ct/danh-sach')
        const filteredData = consTypes.filter((item: any) => item.idCha === 1)
        setconsType(filteredData)

        //cons
        const congtrinh = await getData('cong-trinh/danh-sach', {
          tenct: null,
          loai_ct: consData?.idLoaiCT !== null ? consData?.idLoaiCT : GetConstructionTypeId(router),
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
        const communeFiltered = communes.filter((item: any) => item.idHuyen == consData?.idHuyen?.toString())
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
  }, [consData?.idHuyen, consData?.idLoaiCT])

  const handleChange = (prop: keyof ConstructionState | keyof ConstructionSpecState) => (value: any) => {
    if (prop in consData) {
      setConsData((prevData) => {
        let mact = null;
        let taiKhoan = null;
        if (prop === 'tenCT') {
          mact = createConsCode({ ...prevData, [prop]: value });
          taiKhoan = createConsUser({ ...prevData, [prop]: value });
        }
        const updatedData = { ...prevData, maCT: mact, taiKhoan: taiKhoan, [prop]: value };
        onChange(updatedData);

        return updatedData;
      });
    } else {
      setConsSpec((prevSpec) => {
        const updatedSpec = { ...prevSpec, [prop]: value };
        onChange({
          consData: { ...consData, [prop]: value },
          consSpec: updatedSpec,
          consItemData: consItemData,
          consItemDataDetele: consItemDataDetele,
        });

        return updatedSpec;
      });
    }
  }


  const handleSetCons = (data: any) => {
    const cons: ConstructionState = data;
    setShowDataCons(true)
    setConsData(cons || emptyConstructionData)
    setConsSpec(data.thongso || emptyConstructionSpec);
    onChange({ consData: { ...cons }, consSpec: { ...data.thongso } })
  }

  const handleAddNewCons = () => {
    setShowDataCons(true)
    setConsData(emptyConstructionData)
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
              value={consType.find((option: any) => option.id === consData.idLoaiCT) || null}
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
                  value={ds_congtrinh.find((option: any) => option.tenCT.toLowerCase() === consData.tenCT?.toLowerCase()) || null}
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
                  value={consData.tenCT || ''}
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
                  value={consData.maCT || ''}
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
                  value={consData.viTriCT || ''}
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
                value={district.find((option: any) => option.idHuyen === consData.idHuyen?.toString()) || null}
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
                disabled={consData?.idHuyen !== undefined && consData.idHuyen == null}
                size='small'
                options={commune}
                getOptionLabel={(option: any) => option.tenXa}
                value={commune.find((option: any) => option.idXa === consData.idXa?.toString()) || null}
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
                value={consData.namBatDauVanHanh || ''}
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
                value={consData.thoiGianXD || ''}
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
                label='X (VN2000)'
                value={consData.x || ''}
                onChange={event => handleChange('x')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                fullWidth
                placeholder=''
                value={consData.y || ''}
                onChange={event => handleChange('y')(event.target.value)}
                label='Y (VN2000)'
              />
            </Grid>

            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <Autocomplete
                size='small'
                options={consType}
                getOptionLabel={(option: any) => option.label}
                value={consType.find((option: any) => option.value === consData.idLoaiCT) || null}
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
              value={consData.nguonNuocKT || ''}
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
              value={consData.phuongThucKT || ''}
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
                value={consData.cheDoKT || ''}
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
          consData?.idLoaiCT === 4 || consData?.idLoaiCT === 5 ? (
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
                      value={consData.capCT || ''}
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
                      value={consSpec.dienTichLuuVuc || ''}
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
                      value={consSpec.muaTrungBinhNam || ''}
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
                      value={consSpec.qTrungBinhNam || ''}
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
                      value={consSpec.congSuatLM || ''}
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
                      value={consSpec.congSuatDamBao || ''}
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
                      value={consSpec.chieuCaoDap || ''}
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
                      value={consSpec.qmaxNM || ''}
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
                      value={consSpec.qtt || ''}
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
                      value={consSpec.qDamBao || ''}
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
                      value={consSpec.hmax || ''}
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
                      value={consSpec.hmin || ''}
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
                      value={consSpec.htoiThieu || ''}
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
                      value={consSpec.dungTichToanBo || ''}
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
                      value={consSpec.dungTichChet || ''}
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
                      value={consSpec.dungTichHuuIch || ''}
                      onChange={event => handleChange('dungTichHuuIch')(event.target.value)}
                    />
                  </Grid>
                </Grid>
                {consData?.idLoaiCT === 4 ? (
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                        <TextField
                          size='small'
                          type='text'
                          label='Mực nước chết'
                          fullWidth
                          placeholder=''
                          value={consSpec.mnc || ''}
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
                          value={consSpec.mndbt || ''}
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
                          value={consSpec.mnltk || ''}
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
                          value={consSpec.mnlkt || ''}
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
          ) : consData?.idLoaiCT === 6 ? (
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
                    value={consSpec.soLuongMayBom || ''}
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
                    value={consSpec.dienTichTuoiThietKe || ''}
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
                    value={consSpec.dienTichTuoiThucTe || ''}
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
                    value={consSpec.qThietKe || ''}
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
                    value={consSpec.qThucTe || ''}
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
                    value={consSpec.qBomThietKe || ''}
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
                    value={consSpec.qBomLonNhat || ''}
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
                    value={consSpec.hBeHut || ''}
                    onChange={event => handleChange('hBeHut')(event.target.value)}
                  />
                </Grid>
              </Grid>
            </fieldset>
          ) : consData?.idLoaiCT === 12 ? (
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
                    value={consSpec.caoTrinhCong || ''}
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
                    value={consSpec.chieuDaiCong || ''}
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
                    value={consSpec.chieuRongCong || ''}
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
                    value={consSpec.kichThuocCong || ''}
                    onChange={event => handleChange('kichThuocCong')(event.target.value)}
                  />
                </Grid>
              </Grid>
            </fieldset>
          ) : '' : ''
      }
      {showDataCons ?
        <Grid item xs={12}>
          <ConstructionItem data={consItemData} onChange={handleconsItemChange} />
        </Grid> : ""}
    </>
  )
}
export default SurfaceWaterField
