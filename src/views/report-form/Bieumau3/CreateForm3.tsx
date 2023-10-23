import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report3State } from './Report3Interface'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report3Data, setreport3Data] = useState<Report3State>({
    id: data?.id || 0,
    tenTram: data?.tenTram || '',
    thoiKyQuanTrac: data?.tenTram || '',
    luongMuaThang1: data?.luongMuaThang1 || 0,
    luongMuaThang2: data?.luongMuaThang2 || 0,
    luongMuaThang3: data?.luongMuaThang3 || 0,
    luongMuaThang4: data?.luongMuaThang4 || 0,
    luongMuaThang5: data?.luongMuaThang5 || 0,
    luongMuaThang6: data?.luongMuaThang6 || 0,
    luongMuaThang7: data?.luongMuaThang7 || 0,
    luongMuaThang8: data?.luongMuaThang8 || 0,
    luongMuaThang9: data?.luongMuaThang9 || 0,
    luongMuaThang10: data?.luongMuaThang10 || 0,
    luongMuaThang11: data?.luongMuaThang11 || 0,
    luongMuaThang12: data?.luongMuaThang12 || 0,
    luongMuaNam: data?.luongMuaNam || 0,
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof Report3State) => (value: any) => {
    setreport3Data({ ...report3Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoBa/luu', report3Data)
        if (res) {
          // Reset form fields
          setreport3Data({
            id:0,
            tenTram: '',
            thoiKyQuanTrac: '',
            luongMuaThang1: 0,
            luongMuaThang2: 0,
            luongMuaThang3:0,
            luongMuaThang4: 0,
            luongMuaThang5: 0,
            luongMuaThang6: 0,
            luongMuaThang7: 0,
            luongMuaThang8: 0,
            luongMuaThang9: 0,
            luongMuaThang10: 0,
            luongMuaThang11: 0,
            luongMuaThang12: 0,
            luongMuaNam: 0,
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
    setreport3Data({
        id:0,
        tenTram: '',
        thoiKyQuanTrac: '',
        luongMuaThang1: 0,
        luongMuaThang2: 0,
        luongMuaThang3:0,
        luongMuaThang4: 0,
        luongMuaThang5: 0,
        luongMuaThang6: 0,
        luongMuaThang7: 0,
        luongMuaThang8: 0,
        luongMuaThang9: 0,
        luongMuaThang10: 0,
        luongMuaThang11: 0,
        luongMuaThang12: 0,
        luongMuaNam: 0,
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
            label='Tên trạm'
            fullWidth
            placeholder=''
            value={report3Data.tenTram || ''}
            onChange={event => handleChange('tenTram')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Thời kì quan trắc'
            fullWidth
            placeholder=''
            value={report3Data.thoiKyQuanTrac || ''}
            onChange={event => handleChange('thoiKyQuanTrac')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lương mưa tháng 1'
            fullWidth
            placeholder=''
            value={report3Data.luongMuaThang1 || ''}
            onChange={event => handleChange('luongMuaThang1')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lượng mưa tháng 2'
            fullWidth
            placeholder=''
            value={report3Data.luongMuaThang2 || ''}
            onChange={event => handleChange('luongMuaThang2')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Lượng mưa tháng 3'
            fullWidth
            placeholder=''
            value={report3Data.luongMuaThang3 || ''}
            onChange={event => handleChange('luongMuaThang3')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Lượng mưa tháng 4'
            fullWidth
            placeholder=''
            value={report3Data.luongMuaThang4 || ''}
            onChange={event => handleChange('luongMuaThang4')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Lượng mưa tháng 5'
            fullWidth
            placeholder=''
            value={report3Data.luongMuaThang5 || ''}
            onChange={event => handleChange('luongMuaThang5')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Lương mưa tháng 6'
            fullWidth
            placeholder=''
            value={report3Data.luongMuaThang6 || ''}
            onChange={event => handleChange('luongMuaThang6')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Lượng mưa tháng 7'
            fullWidth
            placeholder=''
            value={report3Data.luongMuaThang7 || ''}
            onChange={event => handleChange('luongMuaThang7')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Lượng mưa tháng 8'
            fullWidth
            placeholder=''
            value={report3Data.luongMuaThang8 || ''}
            onChange={event => handleChange('luongMuaThang8')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lương mưa tháng 9'
            fullWidth
            placeholder=''
            value={report3Data.luongMuaThang9 || ''}
            onChange={event => handleChange('luongMuaThang9')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lượng mưa tháng 10'
            fullWidth
            placeholder=''
            value={report3Data.luongMuaThang10 || ''}
            onChange={event => handleChange('luongMuaThang10')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lương mưa tháng 11'
            fullWidth
            placeholder=''
            value={report3Data.luongMuaThang11 || ''}
            onChange={event => handleChange('luongMuaThang11')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lượng mưa tháng 12'
            fullWidth
            placeholder=''
            value={report3Data.luongMuaThang12 || ''}
            onChange={event => handleChange('luongMuaThang12')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={report3Data.ghiChu || ''}
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

const CreateReport3 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport3
