import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report14State } from './Report14InterFace'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report2Data, setreport2Data] = useState<Report14State>({
    id: data?.id || 0,
    viTriQuanTrac: data?.viTriQuanTrac || '',
    pHlonNhat: data?.pHlonNhat || 0,
    phNhoNhat: data?.phNhoNhat || 0,
    doCungLonNhat: data?.doCungLonNhat || 0,
    doCungNhoNhat: data?.doCungNhoNhat || 0,
    amoniLonNhat: data?.amoniLonNhat || 0,
    amoniNhoNhat: data?.amoniNhoNhat || 0,
    nitratLonNhat: data?.nitratLonNhat || 0,
    nitratNhoNhat: data?.nitratNhoNhat || 0,
    sulfatLonNhat: data?.sulfatLonNhat || 0,
    sulfatNhoNhat: data?.sulfatNhoNhat || 0,
    asenLonNhat: data?.asenLonNhat || 0,
    asenNhoNhat: data?.asenNhoNhat || 0,
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)
  const handleChange = (prop: keyof Report14State) => (value: any) => {
    setreport2Data({ ...report2Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoChin/luu', report2Data)
        if (res) {
          // Reset form fields
          setreport2Data({
            id: 0,
            viTriQuanTrac: '',
            pHlonNhat: 0,
            phNhoNhat: 0,
            doCungLonNhat: 0,
            doCungNhoNhat: 0,
            amoniLonNhat: 0,
            amoniNhoNhat: 0,
            nitratLonNhat: 0,
            nitratNhoNhat: 0,
            sulfatLonNhat: 0,
            sulfatNhoNhat: 0,
            asenLonNhat: 0,
            asenNhoNhat: 0,
            ghiChu: ''
          })

          typeof setPostSuccess === 'function' ? setPostSuccess(true) : ''
          closeDialogs()
        }
      } catch (error) {
        console.log(error)
      } finally {
        6
        setSaving(false)
      }
    }

    // Call the function
    handleApiCall()
  }

  const handleClose = () => {
    setreport2Data({
      id: 0,
      viTriQuanTrac: '',
      pHlonNhat: 0,
      phNhoNhat: 0,
      doCungLonNhat: 0,
      doCungNhoNhat: 0,
      amoniLonNhat: 0,
      amoniNhoNhat: 0,
      nitratLonNhat: 0,
      nitratNhoNhat: 0,
      sulfatLonNhat: 0,
      sulfatNhoNhat: 0,
      asenLonNhat: 0,
      asenNhoNhat: 0,
      ghiChu: ''
    })

    closeDialogs()
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Vị trí quan trắc'
            fullWidth
            placeholder=''
            value={report2Data.viTriQuanTrac || ''}
            onChange={event => handleChange('viTriQuanTrac')(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Nồng độ PH lớn nhất'
            fullWidth
            placeholder=''
            value={report2Data.pHlonNhat || ''}
            onChange={event => handleChange('pHlonNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Nồng độ PH nhỏ nhất'
            fullWidth
            placeholder=''
            value={report2Data.phNhoNhat || ''}
            onChange={event => handleChange('phNhoNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Độ cứng(tính theo CaCo3) lớn nhất'
            fullWidth
            placeholder=''
            value={report2Data.doCungLonNhat || ''}
            onChange={event => handleChange('doCungLonNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Độ cứng(tính theo CaCo3) nhỏ nhất'
            fullWidth
            placeholder=''
            value={report2Data.doCungNhoNhat || ''}
            onChange={event => handleChange('doCungNhoNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Amoni NH4+(tính theo N) lớn nhất'
            fullWidth
            placeholder=''
            value={report2Data.amoniLonNhat || ''}
            onChange={event => handleChange('amoniLonNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Amoni NH4+(tính theo N) nhỏ nhất'
            fullWidth
            placeholder=''
            value={report2Data.amoniNhoNhat || ''}
            onChange={event => handleChange('amoniNhoNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Nitrat(N03-) lớn nhất'
            fullWidth
            placeholder=''
            value={report2Data.nitratLonNhat || ''}
            onChange={event => handleChange('nitratLonNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Nitrat(N03) nhỏ nhất'
            fullWidth
            placeholder=''
            value={report2Data.nitratNhoNhat || ''}
            onChange={event => handleChange('nitratNhoNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Sulfat lớn nhất'
            fullWidth
            placeholder=''
            value={report2Data.sulfatLonNhat || ''}
            onChange={event => handleChange('sulfatLonNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Sulfat nhỏ nhất'
            fullWidth
            placeholder=''
            value={report2Data.sulfatNhoNhat || ''}
            onChange={event => handleChange('sulfatNhoNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Asen lớn nhất'
            fullWidth
            placeholder=''
            value={report2Data.asenLonNhat || ''}
            onChange={event => handleChange('asenLonNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Asen nhỏ nhất'
            fullWidth
            placeholder=''
            value={report2Data.asenNhoNhat || ''}
            onChange={event => handleChange('asenNhoNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={report2Data.ghiChu || ''}
            onChange={event => handleChange('ghiChu')(event.target.value)}
          />
        </Grid>
      </Grid>

      <DialogActions sx={{ p: 0, mt: 5 }}>
        <Button size='small' onClick={handleClose} className='btn cancleBtn'>
          Hủy
        </Button>
        <Button disabled={saving} className='btn saveBtn' onClick={handleSubmit}>
          {' '}
          {saving ? <CircularProgress color='inherit' size={20} /> : <Save />} &nbsp; Lưu{' '}
        </Button>
      </DialogActions>
    </>
  )
}

const CreateReport14 = ({ data, setPostSuccess, isEdit }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin tài khoản' : 'Thêm tài khoản mới'

  return (
    <DialogsControl>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {isEdit ? (
            <EditNote
              className='tableActionBtn'
              onClick={() =>
                openDialogs(<Form data={data} setPostSuccess={setPostSuccess} closeDialogs={closeDialogs} />, formTitle)
              }
            />
          ) : (
            <IconButton
              aria-label='add user'
              onClick={() =>
                openDialogs(<Form setPostSuccess={setPostSuccess} closeDialogs={closeDialogs} />, formTitle)
              }
            >
              <PersonAddAlt sx={{ mr: 2 }} />
              <Typography>Thêm mới</Typography>
            </IconButton>
          )}
        </>
      )}
    </DialogsControl>
  )
}

export default CreateReport14
