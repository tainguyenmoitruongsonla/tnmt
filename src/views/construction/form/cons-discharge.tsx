import { Search } from '@mui/icons-material'
import { Typography, Grid, Autocomplete, TextField, Button,CircularProgress } from '@mui/material'
import { useEffect, FC, useState, Fragment } from 'react'
import fetchData from 'src/api/fetch'
import { ConstructionState } from './construction-interface'



interface ConsTypeFieldsetProps {
  data?: any // Thêm prop data để truyền dữ liệu từ ngoài vào
  onChange: (data: ConstructionState) => void
}

const DischargeWaterField: FC<ConsTypeFieldsetProps> = ({ data, onChange }) => {
  const [consSFData, setConsSFData] = useState<ConstructionState>({
    id: data?.id || 0,
    constructionTypeId: data?.constructionTypeId || 0,
    provinceId: data?.provinceId || 51,
    districtId: data?.districtId || 0,
    communeId: data?.communeId || 0,
    riverId: data?.riverId || 0,
    basinId: data?.basinId || 0,
    subBasinId: data?.subBasinId || 0,
    aquiferId: data?.aquiferId || 0,
    constructionName: data?.constructionName || '',
    constructionCode: data?.constructionCode || '',
    constructionLocation: data?.constructionLocation || '',
    x: data?.x || null,
    y: data?.y || null,
    startDate: data?.startDate || null,
    constructionDetailLocation: data?.constructionDetailLocation || null,
    dischargeWS :data?.dischargeWS || null,
    dischargeMethod:data?.dischargeMethod || null,
    dischargeMode:data?.dischargeMode || null,
    averageDischargeFlow:data?.averageDischargeFlow || null,
    maximumWasteWaterFlow:data?.maximumWasteWaterFlow || null,
    kqKf:data?.kqKf || null,
  })

  useEffect(() => {
    if (data) {
      setConsSFData(data)
    }
  }, [data])

  const [consType, setconsType] = useState<any>([])
  const [district, setDistrict] = useState<any>([])
  const [commune, setCommune] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)

        //constructionType
        const consTypes = await fetchData('ConstructionTypes/list');
        const filteredData = consTypes.filter((item: any) => item.parentId === 3);
        setconsType(filteredData);
        console.log(consTypes);
        
        //district
        const distric = await fetchData('Locations/list/distric/51');
        setDistrict(distric);       

        //commune
        const commune = await fetchData(`Locations/list/commune/${consSFData?.districtId}`);
        setCommune(commune);

      } catch (error) {
        setconsType([])
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [consSFData?.districtId])

  const handleChange = (prop: keyof ConstructionState) => (value: any) => {
    setConsSFData({ ...consSFData, [prop]: value })
    onChange({ ...consSFData, [prop]: value })
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
              getOptionLabel={(option: any) => option.typeName}
              value={consType.find((option: any) => option.id === consSFData.constructionTypeId) || null}
              isOptionEqualToValue={(option: any) => option.id}
              onChange={(_, value) => handleChange('constructionTypeId')(value?.id || 0)}
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
              defaultValue={consSFData.constructionName}
              onChange={event => handleChange('constructionName')(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              variant='outlined'
              fullWidth
              label='Địa điểm công trình'
              defaultValue={consSFData.constructionLocation}
              onChange={event => handleChange('constructionLocation')(event.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              size='small'
              options={district}
              getOptionLabel={(option: any) => option.districtName}
              value={district.find((option: any) => option.id === consSFData.districtId) || null}
              isOptionEqualToValue={(option: any) => option.id}
              onChange={(_, value) => handleChange('districtId')(value?.id || 0)}
              renderInput={params => <TextField {...params} fullWidth label='Chọn Quận/Huyện' />}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              size='small'
              options={commune}
              getOptionLabel={(option: any) => option.communeName}
              value={commune.find((option: any) => option.id === consSFData.communeId) || null}
              isOptionEqualToValue={(option: any) => option.id}
              onChange={(_, value) => handleChange('communeId')(value?.id || 0)}
              renderInput={params => <TextField {...params} variant='outlined' fullWidth label='Chọn Xã/phường' />}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              label='Vĩ độ'
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
              label='Kinh độ'
              InputProps={{
                endAdornment: (
                  <Button
                    sx={{ border: 0, marginRight: '-14px', backgroundColor: 'rgba(0, 70, 110, 0.04)' }}
                    onClick={() => alert('open map')}
                  >
                    <Search />
                  </Button>
                )
              }}
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
              defaultValue={consSFData.startDate}
              onChange={event => handleChange('startDate')(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consSFData.constructionDetailLocation}
              onChange={event => handleChange('constructionDetailLocation')(event.target.value)}
              label='Vị trí xả thải'
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consSFData.dischargeWS}
              onChange={event => handleChange('dischargeWS')(event.target.value)}
              label='Nguồn tiếp nhận xả thải'
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consSFData.dischargeMethod}
              onChange={event => handleChange('dischargeMethod')(event.target.value)}
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
              defaultValue={consSFData.dischargeMode}
              onChange={event => handleChange('dischargeMode')(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
              size='small'
              type='number'
              fullWidth
              placeholder=''
              defaultValue={consSFData.averageDischargeFlow}
              onChange={event => handleChange('averageDischargeFlow')(event.target.value)}
              label='Lưu lượng xả trung bình m3/ngày đêm'
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consSFData.maximumWasteWaterFlow}
              onChange={event => handleChange('maximumWasteWaterFlow')(event.target.value)}
              label='Lưu lượng xả lớn nhất m3/ngày đêm'
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
          <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consSFData.kqKf}
              onChange={event => handleChange('kqKf')(event.target.value)}
              label='Chất lượng nước thải, hệ số Kq và Kf'
            />
          </Grid>
        </Grid>

       
      </fieldset>

      {/*check thuydien va ho chua */}
      {consSFData?.constructionTypeId === 4 || consSFData?.constructionTypeId === 5 ? (
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
                  defaultValue={consSFData.constructionLevel}
                  onChange={event => handleChange('constructionLevel')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Diện tích lưu vực'
                  fullWidth
                  placeholder=''
                  defaultValue={consSFData.basinArea}
                  onChange={event => handleChange('basinArea')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Lượng mưa trung bình nhiều năm'
                  fullWidth
                  placeholder=''
                  defaultValue={consSFData.rainAvgForYears}
                  onChange={event => handleChange('rainAvgForYears')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Lưu lượng trung bình nhiều năm'
                  fullWidth
                  placeholder=''
                  defaultValue={consSFData.flowAvgForYears}
                  onChange={event => handleChange('flowAvgForYears')(event.target.value)}
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
                  defaultValue={consSFData.power}
                  onChange={event => handleChange('power')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Công suất đảm bảo'
                  fullWidth
                  placeholder=''
                  defaultValue={consSFData.guaranteedFlow}
                  onChange={event => handleChange('guaranteedFlow')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Chiều cao đập'
                  fullWidth
                  placeholder=''
                  defaultValue={consSFData.damHeight}
                  onChange={event => handleChange('damHeight')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Lưu lượng tối đa'
                  fullWidth
                  placeholder=''
                  defaultValue={consSFData.maximumFlow}
                  onChange={event => handleChange('maximumFlow')(event.target.value)}
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
                  defaultValue={consSFData.minimumFlow}
                  onChange={event => handleChange('minimumFlow')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Lưu lượng đảm bảo'
                  fullWidth
                  placeholder=''
                  defaultValue={consSFData.guaranteedFlow}
                  onChange={event => handleChange('guaranteedFlow')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Hmax'
                  fullWidth
                  placeholder=''
                  defaultValue={consSFData.hmax}
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
                  defaultValue={consSFData.hmin}
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
                  defaultValue={consSFData.htt}
                  onChange={event => handleChange('htt')(event.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Dung tích toàn bộ'
                  fullWidth
                  placeholder=''
                  defaultValue={consSFData.totalCapacity}
                  onChange={event => handleChange('totalCapacity')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Dung tích chết'
                  fullWidth
                  placeholder=''
                  defaultValue={consSFData.deadCapacity}
                  onChange={event => handleChange('deadCapacity')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Dung tích hữu ích'
                  fullWidth
                  placeholder=''
                  defaultValue={consSFData.usefulCapacity}
                  onChange={event => handleChange('usefulCapacity')(event.target.value)}
                />
              </Grid>
            </Grid>
            {consSFData?.constructionTypeId === 4 ? (
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Mực nước chết'
                      fullWidth
                      placeholder=''
                      defaultValue={consSFData.deadWL}
                      onChange={event => handleChange('deadWL')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Mực nước dâng bình thường'
                      fullWidth
                      placeholder=''
                      defaultValue={consSFData.riseWL}
                      onChange={event => handleChange('riseWL')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Mực nước lũ thiết kế'
                      fullWidth
                      placeholder=''
                      defaultValue={consSFData.designFloodLevel}
                      onChange={event => handleChange('designFloodLevel')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Mực nước lũ kiểm tra'
                      fullWidth
                      placeholder=''
                      defaultValue={consSFData.checkFloodWL}
                      onChange={event => handleChange('checkFloodWL')(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              ''
            )}
          </fieldset>
        </Grid>
      ) : (
        ''
      )}

      {/* check form tram bom */}
      {consSFData?.constructionTypeId === 6 ? (
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
                defaultValue={consSFData.pumpNumber}
                onChange={event => handleChange('pumpNumber')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Diện tích tưới thiết kế'
                fullWidth
                placeholder=''
                defaultValue={consSFData.wateringAreaDesigned}
                onChange={event => handleChange('wateringAreaDesigned')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Lượng mưa tưới thực tế'
                fullWidth
                placeholder=''
                defaultValue={consSFData.realityWateringArea}
                onChange={event => handleChange('realityWateringArea')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Lưu lượng thiết kế'
                fullWidth
                placeholder=''
                defaultValue={consSFData.flowDesigned}
                onChange={event => handleChange('flowDesigned')(event.target.value)}
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
                defaultValue={consSFData.realityFlow}
                onChange={event => handleChange('realityFlow')(event.target.value)}
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
                defaultValue={consSFData.pumpDesignFlow}
                onChange={event => handleChange('pumpDesignFlow')(event.target.value)}
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
                defaultValue={consSFData.pumpMaxFlow}
                onChange={event => handleChange('pumpMaxFlow')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Mực nước bể hút'
                fullWidth
                placeholder=''
                defaultValue={consSFData.suctionTankWL}
                onChange={event => handleChange('suctionTankWL')(event.target.value)}
              />
            </Grid>
          </Grid>
        </fieldset>
      ) : (
        ''
      )}

      {/* check form cong */}

      {consSFData?.constructionTypeId === 12 ? (
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
                defaultValue={consSFData.drainElevation}
                onChange={event => handleChange('drainElevation')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Chiều dài cống'
                fullWidth
                placeholder=''
                defaultValue={consSFData.drainLength}
                onChange={event => handleChange('drainLength')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Đường kính (m)'
                fullWidth
                placeholder=''
                defaultValue={consSFData.drainDiameter}
                onChange={event => handleChange('drainDiameter')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Kích thước(rộng*cao)'
                fullWidth
                placeholder=''
                defaultValue={consSFData.drainSize}
                onChange={event => handleChange('drainSize')(event.target.value)}
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
export default DischargeWaterField
