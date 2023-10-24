import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report15State } from './Report15InterFace'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report2Data, setreport2Data] = useState<Report15State>({
    id: data?.id || 0,
    coQuanPhatHanh: data?.coQuanPhatHanh || '',
    vanBanKyTruoc: data?.vanBanKyTruoc || 0,
    vanBanKyBaoCao: data?.vanBanKyBaoCao || 0,
    ghiChu:data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)
  const handleChange = (prop: keyof Report15State) => (value: any) => {
    setreport2Data({ ...report2Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoMuoiNam/luu', report2Data)
        if (res) {
          // Reset form fields
          setreport2Data({
            id: 0,
            coQuanPhatHanh: '',
            vanBanKyTruoc: 0,
            vanBanKyBaoCao: 0,
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
        coQuanPhatHanh: '',
        vanBanKyTruoc: 0,
        vanBanKyBaoCao: 0,
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
            label='Cơ quan phát hành'
            fullWidth
            placeholder=''
            value={report2Data.coQuanPhatHanh || ''}
            onChange={event => handleChange('coQuanPhatHanh')(event.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Văn bản kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.vanBanKyTruoc || ''}
            onChange={event => handleChange('vanBanKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Văn bản kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.vanBanKyBaoCao || ''}
            onChange={event => handleChange('vanBanKyBaoCao')(event.target.value)}
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

const CreateReport15 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport15
