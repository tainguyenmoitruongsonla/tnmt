import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report13State } from './Report13InterFace'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report2Data, setreport2Data] = useState<Report13State>({
    id: data?.id || 0,
    viTriQuanTrac: data?.viTriQuanTrac || '',
    boD5LonNhat: data?.boD5LonNhat || 0,
    boD5NhoNhat: data?.boD5NhoNhat || 0,
    codLonNhat: data?.codLonNhat || 0,
    codNhoNhat: data?.codNhoNhat || 0,
    doLonNhat: data?.doLonNhat || 0,
    doNhoNhat: data?.doNhoNhat || 0,
    ghiChu:data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)
  const handleChange = (prop: keyof Report13State) => (value: any) => {
    setreport2Data({ ...report2Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoMuoiBa/luu', report2Data)
        if (res) {
          // Reset form fields
          setreport2Data({
            id: 0,
            viTriQuanTrac: '',
            boD5LonNhat: 0,
            boD5NhoNhat: 0,
            codLonNhat: 0,
            codNhoNhat: 0,
            doLonNhat: 0,
            doNhoNhat: 0,
           ghiChu:''
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
        boD5LonNhat: 0,
        boD5NhoNhat: 0,
        codLonNhat: 0,
        codNhoNhat: 0,
        doLonNhat: 0,
        doNhoNhat: 0,
       ghiChu:''
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
            label='BO5 lớn nhất'
            fullWidth
            placeholder=''
            value={report2Data.boD5LonNhat || ''}
            onChange={event => handleChange('boD5LonNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='BO5 nhỏ nhất'
            fullWidth
            placeholder=''
            value={report2Data.boD5NhoNhat || ''}
            onChange={event => handleChange('boD5NhoNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='COD lớn nhất'
            fullWidth
            placeholder=''
            value={report2Data.codLonNhat || ''}
            onChange={event => handleChange('codLonNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='COD nhỏ nhất'
            fullWidth
            placeholder=''
            value={report2Data.codNhoNhat || ''}
            onChange={event => handleChange('codNhoNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='DO lớn nhất'
            fullWidth
            placeholder=''
            value={report2Data.doLonNhat || ''}
            onChange={event => handleChange('doLonNhat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='DO nhỏ nhất'
            fullWidth
            placeholder=''
            value={report2Data.doNhoNhat || ''}
            onChange={event => handleChange('doNhoNhat')(event.target.value)}
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

const CreateReport13 = ({ data, setPostSuccess, isEdit }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin biểu mẫu' : 'Thêm tài biểu mẫu'

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

export default CreateReport13
