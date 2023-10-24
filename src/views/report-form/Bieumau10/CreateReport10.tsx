import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report10State } from './Report10InterFace'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report2Data, setreport2Data] = useState<Report10State>({
    id: data?.id || 0,
    luuVucSong: data?.luuVucSong || '',
    tongCongTrinh: data?.tongCongTrinh || 0,
    ctTuoiNuocMat: data?.ctTuoiNuocMat || 0,
    ctTuoiNuocDuoiDat: data?.ctTuoiNuocDuoiDat || 0,
    ctThuyDien: data?.ctThuyDien || 0,
    ctMucDichKhacNuocMat: data?.ctMucDichKhacNuocMat || 0,
    ctMucDichKhacNuocDuoiDat: data?.ctMucDichKhacNuocDuoiDat || 0,
    ghiChu:data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)
  const handleChange = (prop: keyof Report10State) => (value: any) => {
    setreport2Data({ ...report2Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoMuoi/luu', report2Data)
        if (res) {
          // Reset form fields
          setreport2Data({
            id: 0,
            luuVucSong: '',
            tongCongTrinh: 0,
            ctTuoiNuocMat: 0,
            ctTuoiNuocDuoiDat: 0,
            ctThuyDien: 0,
            ctMucDichKhacNuocMat: 0,
            ctMucDichKhacNuocDuoiDat: 0,
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
        luuVucSong: '',
        tongCongTrinh: 0,
        ctTuoiNuocMat: 0,
        ctTuoiNuocDuoiDat: 0,
        ctThuyDien: 0,
        ctMucDichKhacNuocMat: 0,
        ctMucDichKhacNuocDuoiDat: 0,
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
            label='Lưu vực sông'
            fullWidth
            placeholder=''
            value={report2Data.luuVucSong || ''}
            onChange={event => handleChange('luuVucSong')(event.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng công trình'
            fullWidth
            placeholder=''
            value={report2Data.tongCongTrinh || ''}
            onChange={event => handleChange('tongCongTrinh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình tưới nước mặt'
            fullWidth
            placeholder=''
            value={report2Data.ctTuoiNuocMat || ''}
            onChange={event => handleChange('ctTuoiNuocMat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình tưới nước dưới đất'
            fullWidth
            placeholder=''
            value={report2Data.ctTuoiNuocDuoiDat || ''}
            onChange={event => handleChange('ctTuoiNuocDuoiDat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình thủy điện'
            fullWidth
            placeholder=''
            value={report2Data.ctThuyDien || ''}
            onChange={event => handleChange('ctThuyDien')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình mục đích khác nước mặt'
            fullWidth
            placeholder=''
            value={report2Data.ctMucDichKhacNuocMat || ''}
            onChange={event => handleChange('ctMucDichKhacNuocMat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình mục đích khác nước dưới đất'
            fullWidth
            placeholder=''
            value={report2Data.ctMucDichKhacNuocDuoiDat || ''}
            onChange={event => handleChange('ctMucDichKhacNuocDuoiDat')(event.target.value)}
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

const CreateReport10 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport10
