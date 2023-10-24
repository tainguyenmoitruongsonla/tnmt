import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report11State } from './Report11InterFace'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report2Data, setreport2Data] = useState<Report11State>({
    id: data?.id || 0,
    luuVucSong: data?.luuVucSong || '',
    tongSoCongTrinh: data?.tongSoCongTrinh || 0,
    congTrinhHoChua: data?.congTrinhHoChua || 0,
    congTrinhDapDang: data?.congTrinhDapDang || 0,
    congTrinhCong: data?.congTrinhCong || 0,
    congTrinhTramBom: data?.congTrinhTramBom || 0,
    congTrinhKhacNuocMat: data?.congTrinhKhacNuocMat || 0,
    congTrinhGieng: data?.congTrinhGieng || 0,
    congTrinhKhacNDD: data?.congTrinhKhacNDD || 0,
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)
  const handleChange = (prop: keyof Report11State) => (value: any) => {
    setreport2Data({ ...report2Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoMuoiMot/luu', report2Data)
        if (res) {
          // Reset form fields
          setreport2Data({
            id: 0,
            luuVucSong: '',
            tongSoCongTrinh: 0,
            congTrinhHoChua: 0,
            congTrinhDapDang: 0,
            congTrinhCong: 0,
            congTrinhTramBom: 0,
            congTrinhKhacNuocMat: 0,
            congTrinhGieng: 0,
            congTrinhKhacNDD: 0,
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
      luuVucSong: '',
      tongSoCongTrinh: 0,
      congTrinhHoChua: 0,
      congTrinhDapDang: 0,
      congTrinhCong: 0,
      congTrinhTramBom: 0,
      congTrinhKhacNuocMat: 0,
      congTrinhGieng: 0,
      congTrinhKhacNDD: 0,
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
            value={report2Data.tongSoCongTrinh || ''}
            onChange={event => handleChange('tongSoCongTrinh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình hồ chứa'
            fullWidth
            placeholder=''
            value={report2Data.congTrinhHoChua || ''}
            onChange={event => handleChange('congTrinhHoChua')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình đập dâng'
            fullWidth
            placeholder=''
            value={report2Data.congTrinhDapDang || ''}
            onChange={event => handleChange('congTrinhDapDang')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình cống'
            fullWidth
            placeholder=''
            value={report2Data.congTrinhCong || ''}
            onChange={event => handleChange('congTrinhCong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình trạm bơm'
            fullWidth
            placeholder=''
            value={report2Data.congTrinhTramBom || ''}
            onChange={event => handleChange('congTrinhTramBom')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình khác nước mặt'
            fullWidth
            placeholder=''
            value={report2Data.congTrinhKhacNuocMat || ''}
            onChange={event => handleChange('congTrinhKhacNuocMat')(event.target.value)}
          />
        </Grid>
       
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình giếng'
            fullWidth
            placeholder=''
            value={report2Data.congTrinhGieng || ''}
            onChange={event => handleChange('congTrinhGieng')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình khác nước dưới đất'
            fullWidth
            placeholder=''
            value={report2Data.congTrinhKhacNDD || ''}
            onChange={event => handleChange('congTrinhKhacNDD')(event.target.value)}
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

const CreateReport11 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport11
