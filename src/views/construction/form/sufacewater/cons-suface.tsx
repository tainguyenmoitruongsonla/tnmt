import { Search } from '@mui/icons-material'
import { Typography, Grid, Autocomplete, TextField, Button } from '@mui/material'
import { useEffect, FC, useState } from 'react'
import fetchData from 'src/api/fetch'
import { Suface } from './construction'

interface ConsTypeFieldsetProps {
  data?: Suface // Thêm prop data để truyền dữ liệu từ ngoài vào
  onChange: (data: Suface) => void
}

const ConstructionField: FC<ConsTypeFieldsetProps> = ({ data, onChange }) => {
  const [consSFData, setConsSFData] = useState<Suface>({
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
    lat: data?.lat || null,
    lng: data?.lng || null,
    startDate: data?.startDate || null,
    constructionTime: data?.constructionTime || '',
    smallPlanningArea: data?.smallPlanningArea || '',
    exploitedWS: data?.exploitedWS || '',
    miningMethod: data?.miningMethod || '',
    miningMode: data?.miningMode || '',
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

  useEffect(() => {
    if (data) {
      setConsSFData(data)
    }
  }, [data])

  const [consType, setconsType] = useState<any>([])

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData('ConstructionTypes/list')
        const SFwaterconstype: any = []
        data.map((e: any) => {
          if (e.parentId == 1) {
            const option = {
              id: e.id,
              label: e.typeName,
              value: e.typeSlug
            }
            SFwaterconstype.push(option)
          }
        })
        setconsType(SFwaterconstype)
      } catch (error) {
        setconsType([])
      } finally {
      }
    }
    getData()
  }, [])

  const handleChange = (prop: keyof Suface) => (value: any) => {
    setConsSFData({ ...consSFData, [prop]: value })
    onChange({ ...consSFData, [prop]: value })
  }

  console.log(consSFData)

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
              size='small'
              options={consType}
              getOptionLabel={(option: any) => option.label}
              defaultValue={consType.find((option: any) => option.value === consSFData.constructionTypeId) || null}
              isOptionEqualToValue={(option: any) => option.id}
              onChange={(_, value) => handleChange('constructionTypeId')(value?.id || 0)}
              renderInput={params => <TextField required {...params} fullWidth label='Chọn loại hình CP' />}
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
              onChange={(e: any, v: any) => handleChange(v)}
              size='small'
              options={consType}
              getOptionLabel={(option: any) => option.title}
              renderInput={params => <TextField {...params} variant='outlined' fullWidth label='Chọn Quận/Huyện' />}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              size='small'
              options={consType}
              getOptionLabel={(option: any) => option.title}
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
              label='Năm vận hành'
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
              label='Năm xây dựng'
              defaultValue={consSFData.constructionTime}
              onChange={event => handleChange('constructionTime')(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
              <Autocomplete
              size='small'
               options={consType}
               getOptionLabel={(option: any) => option.label}
               defaultValue={consType.find((option: any) => option.value === consSFData.constructionTypeId) || null}
               isOptionEqualToValue={(option: any) => option.id}
               onChange={(_, value) => handleChange('constructionTypeId')(value?.id || 0)}
               renderInput={params => <TextField  {...params} fullWidth label='Chọn tiểu vùng quy hoạch' />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              size='small'
              options={consType}
              getOptionLabel={(option: any) => option.title}
              renderInput={params => <TextField {...params} variant='outlined' fullWidth label='Chọn lưu vực sông' />}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consSFData.exploitedWS}
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
              defaultValue={consSFData.miningMethod}
              onChange={event => handleChange('miningMethod')(event.target.value)}
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
              defaultValue={consSFData.miningMode}
              onChange={event => handleChange('miningMode')(event.target.value)}
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
export default ConstructionField
