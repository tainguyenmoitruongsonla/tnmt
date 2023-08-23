import { Typography, Grid, Autocomplete, TextField } from '@mui/material'
import { useEffect, FC, useState } from 'react'
import fetchData from 'src/api/fetch'
import { Suface } from '../construction'

interface ConsTypeFieldsetProps {
  data?: Suface // Thêm prop data để truyền dữ liệu từ ngoài vào
  onChange: (data: Suface) => void
}

const GroundWaterField: FC<ConsTypeFieldsetProps> = ({ data, onChange }) => {
  const [consGroundData, setConsGroundData] = useState<Suface>({
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
    constructionLocation: data?.constructionLocation || '',
    x: data?.x || null,
    y: data?.y || null,
    lat: data?.lat || null,
    lng: data?.lng || null,
    startDate: data?.startDate || null,
    miningPurpose: data?.miningPurpose || '',
    constructionTime: data?.constructionTime || '',
    explorationPurposes: data?.explorationPurposes || '',
    drillingDuration: data?.drillingDuration || '',
    numberMiningWells: data?.numberMiningWells || null,
    amountWaterExploited: data?.amountWaterExploited || null,
    wellNumber: data?.wellNumber || '',
    miningAquifer: data?.miningAquifer || null,
    waterDepthFrom: data?.waterDepthFrom || null,
    waterDepthTo: data?.waterDepthTo || null,
    waterSupplyFlow: data?.waterSupplyFlow || null,
    staticWL: data?.staticWL || null,
    dynamicWL: data?.dynamicWL || null,
    lowWL: data?.lowWL || null,
    wellWL: data?.wellWL || null,
    miningMode: data?.miningMode || '',
    probeAquifer: data?.probeAquifer || null,
    volumeOfExplorationItems: data?.volumeOfExplorationItems || '',
    drillingScale: data?.drillingScale || ''
  })

  useEffect(() => {
    if (data) {
      setConsGroundData(data)
    }
  }, [data])

  const [consType, setconsType] = useState<any>([])

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData('ConstructionTypes/list')
        const Groundwaterconstype: any = []
        data.map((e: any) => {
          if (e.parentId == 2) {
            const option = {
              id: e.id,
              label: e.typeName,
              value: e.typeSlug
            }
            Groundwaterconstype.push(option)
          }
        })
        setconsType(Groundwaterconstype)
      } catch (error) {
        setconsType([])
      } finally {
      }
    }
    getData()
  }, [])
  console.log(data)

  const handleChange = (prop: keyof Suface) => (value: any) => {
    setConsGroundData({ ...consGroundData, [prop]: value })
    onChange({ ...consGroundData, [prop]: value })
  }

  console.log(consGroundData)

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
              defaultValue={consType.find((option: any) => option.value === consGroundData.constructionTypeId) || null}
              isOptionEqualToValue={(option: any) => option.id}
              onChange={(_, value) => handleChange('constructionTypeId')(value?.id || 0)}
              renderInput={params => <TextField required {...params} fullWidth label='Chọn loại hình công trình' />}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              label='Tên công trình'
              fullWidth
              placeholder=''
              defaultValue={consGroundData.constructionName}
              onChange={event => handleChange('constructionName')(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              variant='outlined'
              fullWidth
              label='Địa điểm công trình'
              defaultValue={consGroundData.constructionLocation}
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
              variant='outlined'
              fullWidth
              label='Năm vận hành'
              placeholder=''
              defaultValue={consGroundData.startDate}
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
              defaultValue={consGroundData.constructionTime}
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
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              label='X (WGS84)'
              defaultValue={consGroundData.lat}
              onChange={event => handleChange('lat')(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consGroundData.lng}
              onChange={event => handleChange('lng')(event.target.value)}
              label='Y (WGS84)'
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consGroundData.explorationPurposes}
              onChange={event => handleChange('explorationPurposes')(event.target.value)}
              label='Mục đích khai thác,sử dụng nước'
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consGroundData.drillingDuration}
              onChange={event => handleChange('drillingDuration')(event.target.value)}
              label='Thời gian hành nghề'
            />
          </Grid>
        </Grid>
      </fieldset>

      {/*check thuydien va ho chua */}
      {consGroundData?.constructionTypeId === 7 ? (
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
                  defaultValue={consGroundData.numberMiningWells}
                  onChange={event => handleChange('numberMiningWells')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng lượng nước khai thác(m3/ngày đêm)'
                  fullWidth
                  placeholder=''
                  defaultValue={consGroundData.amountWaterExploited}
                  onChange={event => handleChange('amountWaterExploited')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Số hiệu'
                  fullWidth
                  placeholder=''
                  defaultValue={consGroundData.wellNumber}
                  onChange={event => handleChange('wellNumber')(event.target.value)}
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
                  defaultValue={consGroundData.miningAquifer}
                  onChange={event => handleChange('miningAquifer')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Chiều sâu đoạn thu nước từ(m)'
                  fullWidth
                  placeholder=''
                  defaultValue={consGroundData.waterDepthFrom}
                  onChange={event => handleChange('waterDepthFrom')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Chiều sâu đoạn thu nước đến (m)'
                  fullWidth
                  placeholder=''
                  defaultValue={consGroundData.waterDepthTo}
                  onChange={event => handleChange('waterDepthTo')(event.target.value)}
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
                  defaultValue={consGroundData.waterSupplyFlow}
                  onChange={event => handleChange('waterSupplyFlow')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Chiều sâu mực nước tĩnh(m)'
                  fullWidth
                  placeholder=''
                  defaultValue={consGroundData.staticWL}
                  onChange={event => handleChange('staticWL')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Chiều sâu mực nước động lớn nhất (m)'
                  fullWidth
                  placeholder=''
                  defaultValue={consGroundData.dynamicWL}
                  onChange={event => handleChange('dynamicWL')(event.target.value)}
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
                  defaultValue={consGroundData.lowWL}
                  onChange={event => handleChange('lowWL')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Mực nước trong giếng khai thác'
                  fullWidth
                  placeholder=''
                  defaultValue={consGroundData.wellWL}
                  onChange={event => handleChange('wellWL')(event.target.value)}
                />
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
      ) : (
        ''
      )}

      {/* check form tram bom */}
      {consGroundData?.constructionTypeId === 8 ? (
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
                defaultValue={consGroundData.waterSupplyFlow}
                onChange={event => handleChange('waterSupplyFlow')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Chế độ khai thác(giờ/ngày đêm)'
                fullWidth
                placeholder=''
                defaultValue={consGroundData.miningMode}
                onChange={event => handleChange('miningMode')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Thời gian thi công'
                fullWidth
                placeholder=''
                defaultValue={consGroundData.constructionTime}
                onChange={event => handleChange('constructionTime')(event.target.value)}
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
                defaultValue={consGroundData.probeAquifer}
                onChange={event => handleChange('probeAquifer')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Khối lượng các hạng mục thăm dò'
                fullWidth
                placeholder=''
                defaultValue={consGroundData.volumeOfExplorationItems}
                onChange={event => handleChange('volumeOfExplorationItems')(event.target.value)}
              />
            </Grid>
          </Grid>
        </fieldset>
      ) : (
        ''
      )}

      {/* check form cong */}

      {consGroundData?.constructionTypeId === 9 ? (
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
                defaultValue={consGroundData.drillingScale}
                onChange={event => handleChange('drillingScale')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Tầng chứa nước thăm dò'
                fullWidth
                placeholder=''
                defaultValue={consGroundData.probeAquifer}
                onChange={event => handleChange('probeAquifer')(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Thời gian thi công'
                fullWidth
                placeholder=''
                defaultValue={consGroundData.constructionTime}
                onChange={event => handleChange('constructionTime')(event.target.value)}
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
