import { Typography, Grid, Autocomplete, TextField, CircularProgress } from '@mui/material'
import { useEffect, FC, useState, Fragment } from 'react'
import fetchData from 'src/api/fetch'
import { ConstructionState } from './construction-interface'

interface ConsTypeFieldsetProps {
  data?: any // Thêm prop data để truyền dữ liệu từ ngoài vào
  onChange: (data: ConstructionState) => void
}

const SurfaceWaterField: FC<ConsTypeFieldsetProps> = ({ data, onChange }) => {
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
    constructionTime: data?.constructionTime || '',
    smallPlanningArea: data?.smallPlanningArea || '',
    exploitedWS: data?.exploitedWS || '',
    exploitMethod: data?.exploitMethod || '',
    exploitMode: data?.exploitMode || '',
    constructionLevel: data?.constructionLevel || '',
    basinArea: data?.basinArea || null,
    rainAvgForYears: data?.rainAvgForYears || null,
    flowAvgForYears: data?.flowAvgForYears || null,
    power: data?.power || null,
    guaranteedPower: data?.guaranteedPower || null,
    damHeight: data?.damHeight || null,
    maximumFlow: data?.maximumFlow || null,
    minimumFlow: data?.minimumFlow || null,
    guaranteedFlow: data?.guaranteedFlow || null,
    hmax: data?.hmax || null,
    hmin: data?.hmin || null,
    htt: data?.htt || null,
    deadWL: data?.deadWL || null,
    riseWL: data?.riseWL || null,
    designFloodLevel: data?.designFloodLevel || null,
    checkFloodWL: data?.checkFloodWL || null,
    totalCapacity: data?.totalCapacity || null,
    deadCapacity: data?.deadCapacity || null,
    usefulCapacity: data?.usefulCapacity || null,
    pumpNumber: data?.pumpNumber || null,
    wateringAreaDesigned: data?.wateringAreaDesigned || null,
    realityWateringArea: data?.realityWateringArea || null,
    flowDesigned: data?.flowDesigned || null,
    realityFlow: data?.realityFlow || null,
    pumpDesignFlow: data?.pumpDesignFlow || null,
    pumpMaxFlow: data?.pumpMaxFlow || null,
    suctionTankWL: data?.suctionTankWL || null,
    drainElevation: data?.drainElevation || null,
    drainLength: data?.drainLength || null,
    drainDiameter: data?.drainDiameter || null,
    drainSize: data?.drainSize || null
  })

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
        const filteredData = consTypes.filter((item: any) => item.parentId === 1);
        setconsType(filteredData);

        //district
        const distric = await fetchData('Locations/list/distric/51');
        setDistrict(distric);

        //commune
        const communes = await fetchData(`Locations/list/commune`);
        const communeFiltered = communes.filter((item: any) => item.districtId == consSFData?.districtId?.toString())
        setCommune(communeFiltered);

      } catch (error) {

        //console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getData()
    setCommune([]);

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
              value={consSFData.constructionName || ''}
              onChange={event => handleChange('constructionName')(event.target.value)}
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
              value={consSFData.constructionLocation || ''}
              onChange={event => handleChange('constructionLocation')(event.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              disabled={loading}
              size='small'
              options={district}
              getOptionLabel={(option: any) => option.districtName}
              value={district.find((option: any) => option.districtId === consSFData.districtId?.toString()) || null}
              isOptionEqualToValue={(option: any) => option.districtId}
              onChange={(_, value) => handleChange('districtId')(value?.districtId || 0)}
              renderInput={params => <TextField required {...params} fullWidth label='Chọn Quận/Huyện' InputProps={{
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
            <Autocomplete
              disabled={consSFData?.districtId !== undefined && consSFData.districtId == 0}
              size='small'
              options={commune}
              getOptionLabel={(option: any) => option.communeName}
              value={commune.find((option: any) => option.communeId === consSFData.communeId?.toString()) || null}
              isOptionEqualToValue={(option: any) => option.communeId}
              onChange={(_, value) => handleChange('communeId')(value?.communeId || 0)}
              renderInput={params => <TextField {...params} variant='outlined' fullWidth label='Chọn Xã/phường' InputProps={{
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
              variant='outlined'
              fullWidth
              label='Năm vận hành'
              placeholder=''
              value={consSFData.startDate || ''}
              onChange={event => handleChange('startDate')(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              label='Năm xây dựng'
              value={consSFData.constructionTime || ''}
              onChange={event => handleChange('constructionTime')(event.target.value)}
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
              label='X (VN2000)'
              value={consSFData.x || ''}
              onChange={event => handleChange('x')(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              value={consSFData.y || ''}
              onChange={event => handleChange('y')(event.target.value)}
              label='Y (VN2000)'
            />
          </Grid>
          
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              size='small'
              options={consType}
              getOptionLabel={(option: any) => option.label}
              value={consType.find((option: any) => option.value === consSFData.constructionTypeId) || null}
              isOptionEqualToValue={(option: any) => option.id}
              onChange={(_, value) => handleChange('constructionTypeId')(value?.id || 0)}
              renderInput={params => <TextField  {...params} fullWidth label='Chọn tiểu vùng quy hoạch' InputProps={{
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
            <Autocomplete
              size='small'
              options={consType}
              getOptionLabel={(option: any) => option.title}
              renderInput={params => <TextField {...params} variant='outlined' fullWidth label='Chọn lưu vực sông' InputProps={{
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
        </Grid>

        <Grid container spacing={4}>
         
          <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              multiline
              maxRows={4}
              value={consSFData.exploitedWS || ''}
              onChange={event => handleChange('exploitedWS')(event.target.value)}
              label='Nguồn nước khai thác'
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
              multiline
              maxRows={4}
              value={consSFData.exploitMethod || ''}
              onChange={event => handleChange('exploitMethod')(event.target.value)}
              label='Phương thức khai thác'
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
              value={consSFData.exploitMode || ''}
              onChange={event => handleChange('exploitMode')(event.target.value)}
              label='Chế độ khai thác'
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
                  value={consSFData.constructionLevel || ''}
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
                  value={consSFData.basinArea || ''}
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
                  value={consSFData.rainAvgForYears || ''}
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
                  value={consSFData.flowAvgForYears || ''}
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
                  value={consSFData.power || ''}
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
                  value={consSFData.guaranteedPower || ''}
                  onChange={event => handleChange('guaranteedPower')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Chiều cao đập'
                  fullWidth
                  placeholder=''
                  value={consSFData.damHeight || ''}
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
                  value={consSFData.maximumFlow || ''}
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
                  value={consSFData.minimumFlow || ''}
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
                  value={consSFData.guaranteedFlow || ''}
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
                  value={consSFData.hmax || ''}
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
                  value={consSFData.hmin || ''}
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
                  value={consSFData.htt || ''}
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
                  value={consSFData.totalCapacity || ''}
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
                  value={consSFData.deadCapacity || ''}
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
                  value={consSFData.usefulCapacity || ''}
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
                      value={consSFData.deadWL || ''}
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
                      value={consSFData.riseWL || ''}
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
                      value={consSFData.designFloodLevel || ''}
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
                      value={consSFData.checkFloodWL || ''}
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
                value={consSFData.pumpNumber || ''}
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
                value={consSFData.wateringAreaDesigned || ''}
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
                value={consSFData.realityWateringArea || ''}
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
                value={consSFData.flowDesigned || ''}
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
                value={consSFData.realityFlow || ''}
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
                value={consSFData.pumpDesignFlow || ''}
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
                value={consSFData.pumpMaxFlow || ''}
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
                value={consSFData.suctionTankWL || ''}
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
                value={consSFData.drainElevation || ''}
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
                value={consSFData.drainLength || ''}
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
                value={consSFData.drainDiameter || ''}
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
                value={consSFData.drainSize || ''}
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
export default SurfaceWaterField
