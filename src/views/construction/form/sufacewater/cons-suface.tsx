import { Search } from '@mui/icons-material'
import { Typography, Grid, Autocomplete, TextField, Button } from '@mui/material'
import { useEffect, FC, useState } from 'react'
import fetchData from 'src/api/fetch'

// import CreateHydroelectric from "./create-hydroelectric";

interface ConsTypeFieldsetProps {
  data?: ConsState // Thêm prop data để truyền dữ liệu từ ngoài vào
  onChange: (data: ConsState) => void
}

interface ConsState {
  id: number
  parentId: number
  contructionTypeId: number
  contructionName: string
}

const ConstructionField: FC<ConsTypeFieldsetProps> = ({ data, onChange }) => {
  const [consSFData, setConsSFData] = useState<ConsState>({
    id: 0,
    parentId: 0,
    contructionTypeId: 0,
    contructionName: ''
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

  const handleChange = (prop: keyof ConsState) => (value: any) => {
    setConsSFData({ ...consSFData, [prop]: value })
    onChange({ ...consSFData, [prop]: value })
  }

  // console.log(consSFData);

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
              isOptionEqualToValue={(option: any) => option.id}
              onChange={(_, id) => handleChange('contructionTypeId')(id?.id || 0)}
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
              value={consSFData.contructionName}
              onChange={handleChange('contructionName')}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='Địa điểm công trình' placeholder='' />
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
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Vĩ độ' />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue=''
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
            <TextField size='small' variant='outlined' fullWidth label='Năm vận hành' placeholder='' />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Năm xây dựng' />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Tiểu vùng quy hoạch' />
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
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Nguồn nước khai thác' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue=''
              label='Phương thức khai thác'
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Chế độ khai thác' />
          </Grid>
        </Grid>
      </fieldset>

      {/*check thuydien va ho chua */}
      {consSFData?.contructionTypeId === 4 || consSFData?.contructionTypeId === 5 ? (
        <Grid item xs={12}>
          <fieldset>
            <legend>
              <Typography variant={'subtitle1'} className='legend__title'>
                THÔNG Số CÔNG TRÌNH
              </Typography>
            </legend>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Cấp công trình' fullWidth placeholder='' defaultValue='' />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Diện tích lưu vực'
                  fullWidth
                  placeholder=''
                  defaultValue=''
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Lượng mưa trung bình nhiều năm'
                  fullWidth
                  placeholder=''
                  defaultValue=''
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Lưu lượng trung bình nhiều năm'
                  fullWidth
                  placeholder=''
                  defaultValue=''
                />
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Công suất' fullWidth placeholder='' defaultValue='' />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Công suất đảm bảo'
                  fullWidth
                  placeholder=''
                  defaultValue=''
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Chiều cao đập' fullWidth placeholder='' defaultValue='' />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Lưu lượng tối đa' fullWidth placeholder='' defaultValue='' />
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
                  defaultValue=''
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Lưu lượng đảm bảo'
                  fullWidth
                  placeholder=''
                  defaultValue=''
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Hmax' fullWidth placeholder='' defaultValue='' />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Hmin' fullWidth placeholder='' defaultValue='' />
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Htt' fullWidth placeholder='' defaultValue='' />
              </Grid>

              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Dung tích toàn bộ'
                  fullWidth
                  placeholder=''
                  defaultValue=''
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField size='small' type='text' label='Dung tích chết' fullWidth placeholder='' defaultValue='' />
              </Grid>
              <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Dung tích hữu ích'
                  fullWidth
                  placeholder=''
                  defaultValue=''
                />
              </Grid>
            </Grid>
            {consSFData?.contructionTypeId === 4 ? (
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Mực nước chết'
                      fullWidth
                      placeholder=''
                      defaultValue=''
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Mực nước dâng bình thường'
                      fullWidth
                      placeholder=''
                      defaultValue=''
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Mực nước lũ thiết kế'
                      fullWidth
                      placeholder=''
                      defaultValue=''
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
                    <TextField
                      size='small'
                      type='text'
                      label='Mực nước lũ kiểm tra'
                      fullWidth
                      placeholder=''
                      defaultValue=''
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
      {consSFData?.contructionTypeId === 6 ? (
        <fieldset>
          <legend>
            <Typography variant={'subtitle1'} className='legend__title'>
              THÔNG Số CÔNG TRÌNH
            </Typography>
          </legend>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField size='small' type='text' label='Số máy bơm' fullWidth placeholder='' defaultValue='' />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Diện tích tưới thiết kế'
                fullWidth
                placeholder=''
                defaultValue=''
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Lượng mưa tưới thực tế'
                fullWidth
                placeholder=''
                defaultValue=''
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField size='small' type='text' label='Lưu lượng thiết kế' fullWidth placeholder='' defaultValue='' />
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField size='small' type='text' label='Lưu lượng thực tế' fullWidth placeholder='' defaultValue='' />
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
                defaultValue=''
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
                defaultValue=''
              />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField size='small' type='text' label='Mực nước bể hút' fullWidth placeholder='' defaultValue='' />
            </Grid>
          </Grid>
        </fieldset>
      ) : (
        ''
      )}

      {/* check form cong */}

      {consSFData?.contructionTypeId === 12 ? (
        <fieldset>
          <legend>
            <Typography variant={'subtitle1'} className='legend__title'>
              THÔNG Số CÔNG TRÌNH
            </Typography>
          </legend>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField size='small' type='text' label='Cao trình cống' fullWidth placeholder='' defaultValue='' />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField size='small' type='text' label='Chiều dài cống' fullWidth placeholder='' defaultValue='' />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField size='small' type='text' label='Đường kính (m)' fullWidth placeholder='' defaultValue='' />
            </Grid>
            <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
              <TextField
                size='small'
                type='text'
                label='Kích thước(rộng*cao)'
                fullWidth
                placeholder=''
                defaultValue=''
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
