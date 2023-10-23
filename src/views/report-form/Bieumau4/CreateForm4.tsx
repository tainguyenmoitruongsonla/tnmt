import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report4State } from './Report4Interface'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report4Data, setreport4Data] = useState<Report4State>({
    id: data?.id || 0,
    luuVucSong: data?.luuVucSong || '',
    dongChayTBNam: data?.dongChayTBNam || 0,
    dongChayKyTruoc: data?.dongChayKyTruoc || 0,
    dongChayKyBaoCao: data?.dongChayKyBaoCao || 0,
    dongChayMuaLuTB: data?.dongChayMuaLuTB || 0,
    dongChayMuaLuKyTruoc: data?.dongChayMuaLuKyTruoc || 0,
    dongChayMuaLuKyBaoCao: data?.dongChayMuaLuKyBaoCao || 0,
    dongChayMuaCanTB: data?.dongChayMuaCanTB || 0,
    dongChayMuaCanKyTruoc: data?.dongChayMuaCanKyTruoc || 0,
    dongChayMuaCanKyBaoCao: data?.dongChayMuaCanKyBaoCao || 0,
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof Report4State) => (value: any) => {
    setreport4Data({ ...report4Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoBon/luu', report4Data)
        if (res) {
          // Reset form fields
          setreport4Data({
            id: 0,
            luuVucSong: '',
            dongChayTBNam: 0,
            dongChayKyTruoc: 0,
            dongChayKyBaoCao: 0,
            dongChayMuaLuTB: 0,
            dongChayMuaLuKyTruoc: 0,
            dongChayMuaLuKyBaoCao: 0,
            dongChayMuaCanTB: 0,
            dongChayMuaCanKyTruoc: 0,
            dongChayMuaCanKyBaoCao: 0,
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
    setreport4Data({
      id: 0,
      luuVucSong: '',
      dongChayTBNam: 0,
      dongChayKyTruoc: 0,
      dongChayKyBaoCao: 0,
      dongChayMuaLuTB: 0,
      dongChayMuaLuKyTruoc: 0,
      dongChayMuaLuKyBaoCao: 0,
      dongChayMuaCanTB: 0,
      dongChayMuaCanKyTruoc: 0,
      dongChayMuaCanKyBaoCao: 0,
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
            label='Tên lưu vực'
            fullWidth
            placeholder=''
            value={report4Data.luuVucSong || ''}
            onChange={event => handleChange('luuVucSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Typography align='center' variant='h6'>
            Tổng lượng dòng chảy năm
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Typography align='center' variant='h6'>
            Tổng lượng dòng chảy mùa lũ
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Typography align='center' variant='h6'>
            Tổng lượng dòng chảy mùa cạn
          </Typography>
        </Grid>

        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Trung bình nhiều năm'
            fullWidth
            placeholder=''
            value={report4Data.dongChayTBNam || ''}
            onChange={event => handleChange('dongChayTBNam')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Trung bình nhiều năm'
            fullWidth
            placeholder=''
            value={report4Data.dongChayMuaLuTB || ''}
            onChange={event => handleChange('dongChayMuaLuTB')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Trung bình nhiều năm'
            fullWidth
            placeholder=''
            value={report4Data.dongChayMuaCanTB || ''}
            onChange={event => handleChange('dongChayMuaCanTB')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Kỳ trước'
            fullWidth
            placeholder=''
            value={report4Data.dongChayKyTruoc || ''}
            onChange={event => handleChange('dongChayKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Kỳ trước'
            fullWidth
            placeholder=''
            value={report4Data.dongChayMuaLuKyTruoc || ''}
            onChange={event => handleChange('dongChayMuaLuKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Kỳ trước'
            fullWidth
            placeholder=''
            value={report4Data.dongChayMuaCanKyTruoc || ''}
            onChange={event => handleChange('dongChayMuaCanKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Kỳ Báo Cáo'
            fullWidth
            placeholder=''
            value={report4Data.dongChayKyBaoCao || ''}
            onChange={event => handleChange('dongChayKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}  sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Kỳ Báo Cáo'
            fullWidth
            placeholder=''
            value={report4Data.dongChayMuaLuKyBaoCao || ''}
            onChange={event => handleChange('dongChayMuaLuKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Kỳ Báo Cáo'
            fullWidth
            placeholder=''
            value={report4Data.dongChayMuaCanKyBaoCao || ''}
            onChange={event => handleChange('dongChayMuaCanKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={report4Data.ghiChu || ''}
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

const CreateReport4 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport4
