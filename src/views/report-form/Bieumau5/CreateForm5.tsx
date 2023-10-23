import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report5State } from './Report5Interface'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report5Data, setreport5Data] = useState<Report5State>({
    id: data?.id || 0,
    tenTram: data?.tenTram || '',
    luuLuongThang1: data?.luuLuongThang1 || 0,
    luuLuongThang2: data?.luuLuongThang2 || 0,
    luuLuongThang3: data?.luuLuongThang3 || 0,
    luuLuongThang4: data?.luuLuongThang4 || 0,
    luuLuongThang5: data?.luuLuongThang5 || 0,
    luuLuongThang6: data?.luuLuongThang6 || 0,
    luuLuongThang7: data?.luuLuongThang7 || 0,
    luuLuongThang8: data?.luuLuongThang8 || 0,
    luuLuongThang9: data?.luuLuongThang9 || 0,
    luuLuongThang10: data?.luuLuongThang10 || 0,
    luuLuongThang11: data?.luuLuongThang11 || 0,
    luuLuongThang12: data?.luuLuongThang21 || 0,
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof Report5State) => (value: any) => {
    setreport5Data({ ...report5Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoNam/luu', report5Data)
        if (res) {
          // Reset form fields
          setreport5Data({
            id: 0,
            tenTram: '',
            luuLuongThang1: 0,
            luuLuongThang2: 0,
            luuLuongThang3: 0,
            luuLuongThang4: 0,
            luuLuongThang5: 0,
            luuLuongThang6: 0,
            luuLuongThang7: 0,
            luuLuongThang8: 0,
            luuLuongThang9: 0,
            luuLuongThang10:0,
            luuLuongThang11:0,
            luuLuongThang12: 0,
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
    setreport5Data({
      id: 0,
      tenTram: '',
      luuLuongThang1: 0,
      luuLuongThang2: 0,
      luuLuongThang3: 0,
      luuLuongThang4: 0,
      luuLuongThang5: 0,
      luuLuongThang6: 0,
      luuLuongThang7: 0,
      luuLuongThang8: 0,
      luuLuongThang9: 0,
      luuLuongThang10:0,
      luuLuongThang11:0,
      luuLuongThang12: 0,
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
            label='Tên trạm'
            fullWidth
            placeholder=''
            value={report5Data.tenTram || ''}
            onChange={event => handleChange('tenTram')(event.target.value)}
          />
        </Grid>
 
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng tháng  1'
            fullWidth
            placeholder=''
            value={report5Data.luuLuongThang1 || ''}
            onChange={event => handleChange('luuLuongThang1')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng tháng  2'
            fullWidth
            placeholder=''
            value={report5Data.luuLuongThang2 || ''}
            onChange={event => handleChange('luuLuongThang2')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng tháng3'
            fullWidth
            placeholder=''
            value={report5Data.luuLuongThang3 || ''}
            onChange={event => handleChange('luuLuongThang3')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng tháng 4'
            fullWidth
            placeholder=''
            value={report5Data.luuLuongThang4 || ''}
            onChange={event => handleChange('luuLuongThang4')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng tháng 5'
            fullWidth
            placeholder=''
            value={report5Data.luuLuongThang5 || ''}
            onChange={event => handleChange('luuLuongThang5')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng tháng 6'
            fullWidth
            placeholder=''
            value={report5Data.luuLuongThang6 || ''}
            onChange={event => handleChange('luuLuongThang6')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lưu lương tháng 7'
            fullWidth
            placeholder=''
            value={report5Data.luuLuongThang7 || ''}
            onChange={event => handleChange('luuLuongThang7')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng tháng 8'
            fullWidth
            placeholder=''
            value={report5Data.luuLuongThang8 || ''}
            onChange={event => handleChange('luuLuongThang8')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng tháng 9'
            fullWidth
            placeholder=''
            value={report5Data.luuLuongThang9 || ''}
            onChange={event => handleChange('luuLuongThang9')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng tháng 10'
            fullWidth
            placeholder=''
            value={report5Data.luuLuongThang10 || ''}
            onChange={event => handleChange('luuLuongThang10')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng tháng 11'
            fullWidth
            placeholder=''
            value={report5Data.luuLuongThang11 || ''}
            onChange={event => handleChange('luuLuongThang11')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng tháng 12'
            fullWidth
            placeholder=''
            value={report5Data.luuLuongThang12 || ''}
            onChange={event => handleChange('luuLuongThang12')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={report5Data.ghiChu || ''}
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

const CreateReport5 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport5
