import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report6AState } from './Report6Interface'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report6Data, setreport6Data] = useState<Report6AState>({
    id: data?.id || 0,
    luuVucSong: data?.luuVucSong || '',
    slHoChua: data?.slHoChua || 0,
    dungTichToanBo: data?.dungTichToanBo || 0,
    dungTichHuuich: data?.dungTichHuuich || 0,
    dungTichPhongLu: data?.dungTichPhongLu || 0,
    dungTichTichDuoc: data?.dungTichTichDuoc || 0,
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof Report6AState) => (value: any) => {
    setreport6Data({ ...report6Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoSau/luu', report6Data)
        if (res) {
          // Reset form fields
          setreport6Data({
            id: 0,
            luuVucSong: '',
            slHoChua: 0,
            dungTichToanBo: 0,
            dungTichHuuich: 0,
            dungTichPhongLu: 0,
            dungTichTichDuoc: 0,
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
    setreport6Data({
        id: 0,
        luuVucSong: '',
        slHoChua: 0,
        dungTichToanBo: 0,
        dungTichHuuich: 0,
        dungTichPhongLu: 0,
        dungTichTichDuoc: 0,
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
            value={report6Data.luuVucSong || ''}
            onChange={event => handleChange('luuVucSong')(event.target.value)}
          />
        </Grid>
 
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Số lượng hồ chứa'
            fullWidth
            placeholder=''
            value={report6Data.slHoChua || ''}
            onChange={event => handleChange('slHoChua')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Dung tích toàn bộ'
            fullWidth
            placeholder=''
            value={report6Data.dungTichToanBo || ''}
            onChange={event => handleChange('dungTichToanBo')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Dung tích hữu ích'
            fullWidth
            placeholder=''
            value={report6Data.dungTichHuuich || ''}
            onChange={event => handleChange('dungTichHuuich')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Dung tích phòng lũ'
            fullWidth
            placeholder=''
            value={report6Data.dungTichPhongLu || ''}
            onChange={event => handleChange('dungTichPhongLu')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Dung tích tích được'
            fullWidth
            placeholder=''
            value={report6Data.dungTichTichDuoc || ''}
            onChange={event => handleChange('dungTichTichDuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={report6Data.ghiChu || ''}
            onChange={event => handleChange('ghiChu')(event.target.value)}
          />
        </Grid>
      </Grid>

      <DialogActions sx={{ p: 0, mt: 6 }}>
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

const CreateReport6 = ({ data, setPostSuccess, isEdit }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin biểu mẫu' : 'Thêm biểu mẫu mới'

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

export default CreateReport6
