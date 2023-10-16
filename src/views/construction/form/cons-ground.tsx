import { Typography, Grid, Autocomplete, TextField, CircularProgress } from '@mui/material'
import { useEffect, FC, useState, Fragment } from 'react'
import { ConstructionState } from './construction-interface'
import { getData } from 'src/api/axios'


interface ConsTypeFieldsetProps {
  data?: any  // Thêm prop data để truyền dữ liệu từ ngoài vào
  onChange: (data: ConstructionState) => void
}

const GroundWaterField: FC<ConsTypeFieldsetProps> = ({ data, onChange }) => {
  const [consGroundData, setConsGroundData] = useState<ConstructionState>({
    id: data?.id || 0,
    constructionTypeId: data?.constructionTypeId || 0,
    constructionParentTypeId: data?.constructionParentTypeId || 2,
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
    startDate: data?.startDate || null,
    exploitPurpose: data?.exploitPurpose || '',
    constructionTime: data?.constructionTime || '',
    explorationPurposes: data?.explorationPurposes || '',
    drillingDuration: data?.drillingDuration || '',
    numberExploitWells: data?.numberExploitWells || null,
    amountWaterExploited: data?.amountWaterExploited || null,
    wellNumber: data?.wellNumber || '',
    exploitAquifer: data?.exploitAquifer || null,
    waterDepthFrom: data?.waterDepthFrom || null,
    waterDepthTo: data?.waterDepthTo || null,
    waterSupplyFlow: data?.waterSupplyFlow || null,
    staticWL: data?.staticWL || null,
    dynamicWL: data?.dynamicWL || null,
    lowWL: data?.lowWL || null,
    wellWL: data?.wellWL || null,
    exploitMode: data?.exploitMode || '',
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
  const [district, setDistrict] = useState<any>([])
  const [commune, setCommune] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const getDataForSelect = async () => {
      try {
        setLoading(true)

        //constructionType
        const consTypes = await getData('loai-ct/danh-sach');
        const filteredData = consTypes.filter((item: any) => item.parentId === 2);
        setconsType(filteredData);

        //district
        const distric = await getData('hanh-chinh/huyen/danh-sach');
        setDistrict(distric);

        //commune
        const communes = await getData(`hanh-chinh/danh-sach/xa`);
        const communeFiltered = communes.filter((item: any) => item.districtId == consGroundData?.districtId?.toString())
        setCommune(communeFiltered);

      } catch (error) {

        //console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getDataForSelect()
    setCommune([]);

  }, [consGroundData?.districtId])

  const handleChange = (prop: keyof ConstructionState) => (value: any) => {
    setConsGroundData({ ...consGroundData, constructionParentTypeId: 2, [prop]: value })
    onChange({ ...consGroundData, constructionParentTypeId: 2, [prop]: value })
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
              value={consType.find((option: any) => option.id === consGroundData.constructionTypeId) || null}
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
              disabled={loading}
              size='small'
              options={district}
              getOptionLabel={(option: any) => option.districtName}
              value={district.find((option: any) => option.districtId === consGroundData.districtId?.toString()) || null}
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
              disabled={consGroundData?.districtId !== undefined && consGroundData.districtId == 0}
              size='small'
              options={commune}
              getOptionLabel={(option: any) => option.communeName}
              value={commune.find((option: any) => option.communeId === consGroundData.communeId?.toString()) || null}
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
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue={consGroundData.drillingDuration}
              multiline
              onChange={event => handleChange('drillingDuration')(event.target.value)}
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
              defaultValue={consGroundData.explorationPurposes}
              onChange={event => handleChange('explorationPurposes')(event.target.value)}
              label='Mục đích khai thác,sử dụng nước'
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
                  defaultValue={consGroundData.numberExploitWells}
                  onChange={event => handleChange('numberExploitWells')(event.target.value)}
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
                  defaultValue={consGroundData.exploitAquifer}
                  onChange={event => handleChange('exploitAquifer')(event.target.value)}
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
                defaultValue={consGroundData.exploitMode}
                onChange={event => handleChange('exploitMode')(event.target.value)}
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
