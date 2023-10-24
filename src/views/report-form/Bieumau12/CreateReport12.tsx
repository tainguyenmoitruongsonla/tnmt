import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report9State } from './Report9InterFace'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report2Data, setreport2Data] = useState<Report9State>({
    id: data?.id || 0,
    luuVucSong: data?.luuVucSong || '',
    tongCongTrinhKyTruoc: data?.tongCongTrinhKyTruoc || 0,
    tongCongTrinhKyBaoCao: data?.tongCongTrinhKyBaoCao || 0,
    congTrinhNuocMatKyTruoc: data?.congTrinhNuocMatKyTruoc || 0,
    congTrinhNuocMatKyBaoCao: data?.congTrinhNuocMatKyBaoCao || 0,
    congTrinhNDDKyTruoc: data?.congTrinhNDDKyTruoc || 0,
    congTrinhNDDKyBaoCao: data?.congTrinhNDDKyBaoCao || 0,
    ghiChu:data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)
  const handleChange = (prop: keyof Report9State) => (value: any) => {
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
            luuVucSong: '',
            tongCongTrinhKyTruoc: 0,
            tongCongTrinhKyBaoCao: 0,
            congTrinhNuocMatKyTruoc: 0,
            congTrinhNuocMatKyBaoCao: 0,
            congTrinhNDDKyTruoc: 0,
            congTrinhNDDKyBaoCao: 0,
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
        tongCongTrinhKyTruoc: 0,
        tongCongTrinhKyBaoCao: 0,
        congTrinhNuocMatKyTruoc: 0,
        congTrinhNuocMatKyBaoCao: 0,
        congTrinhNDDKyTruoc: 0,
        congTrinhNDDKyBaoCao: 0,
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
            label='Tổng công trình kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.tongCongTrinhKyTruoc || ''}
            onChange={event => handleChange('tongCongTrinhKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng công trình kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.tongCongTrinhKyBaoCao || ''}
            onChange={event => handleChange('tongCongTrinhKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình nước mặt kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.congTrinhNuocMatKyTruoc || ''}
            onChange={event => handleChange('congTrinhNuocMatKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình nước mặt kỳ trước báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.congTrinhNuocMatKyBaoCao || ''}
            onChange={event => handleChange('congTrinhNuocMatKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình nước dưới đất kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.congTrinhNDDKyTruoc || ''}
            onChange={event => handleChange('congTrinhNDDKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công trình nước dưới đất kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.congTrinhNDDKyBaoCao || ''}
            onChange={event => handleChange('congTrinhNDDKyBaoCao')(event.target.value)}
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

const CreateReport9 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport9
