import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report18AState } from './Report18InterFace'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report2Data, setreport2Data] = useState<Report18AState>({
    id: data?.id || 0,
    luuVucSong: data?.luuVucSong || '',
    tongSongPheDuyetBoKyTruoc: data?.tongSongPheDuyetBoKyTruoc || 0,
    tongSongPheDuyetBoKyBaoCao: data?.tongSongPheDuyetBoKyBaoCao || 0,
    tongSongPheDuyetDiaPhuongKyTruoc: data?.tongSongPheDuyetDiaPhuongKyTruoc || 0,
    tongSongPheDuyetDiaPhuongKyBaoCao: data?.tongSongPheDuyetDiaPhuongKyBaoCao || 0,
    tongHoPheDuyetKyTruoc: data?.tongHoPheDuyetKyTruoc || 0,
    tongHoPheDuyetKyBaoCao: data?.tongHoPheDuyetKyBaoCao || 0,
    ghiChu:data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)
  const handleChange = (prop: keyof Report18AState) => (value: any) => {
    setreport2Data({ ...report2Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoMuoiTam/luu', report2Data)
        if (res) {
          // Reset form fields
          setreport2Data({
            id: 0,
            luuVucSong: '',
            tongSongPheDuyetBoKyTruoc: 0,
            tongSongPheDuyetBoKyBaoCao: 0,
            tongSongPheDuyetDiaPhuongKyTruoc: 0,
            tongSongPheDuyetDiaPhuongKyBaoCao: 0,
            tongHoPheDuyetKyTruoc: 0,
            tongHoPheDuyetKyBaoCao: 0,
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
        tongSongPheDuyetBoKyTruoc: 0,
        tongSongPheDuyetBoKyBaoCao: 0,
        tongSongPheDuyetDiaPhuongKyTruoc: 0,
        tongSongPheDuyetDiaPhuongKyBaoCao: 0,
        tongHoPheDuyetKyTruoc: 0,
        tongHoPheDuyetKyBaoCao: 0,
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
            label='Tổng số sông,suối bộ phê duyệt kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.tongSongPheDuyetBoKyTruoc || ''}
            onChange={event => handleChange('tongSongPheDuyetBoKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng số sông,suối bộ phê duyệt kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.tongSongPheDuyetBoKyBaoCao || ''}
            onChange={event => handleChange('tongSongPheDuyetBoKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng số sông,suối địa phương phê duyệt kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.tongSongPheDuyetDiaPhuongKyTruoc || ''}
            onChange={event => handleChange('tongSongPheDuyetDiaPhuongKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng số sông,suối địa phương phê duyệt kỳ  báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.tongSongPheDuyetDiaPhuongKyBaoCao || ''}
            onChange={event => handleChange('tongSongPheDuyetDiaPhuongKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng số hồ phê duyệt kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.tongHoPheDuyetKyTruoc || ''}
            onChange={event => handleChange('tongHoPheDuyetKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng số hồ phê duyệt kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.tongHoPheDuyetKyBaoCao || ''}
            onChange={event => handleChange('tongHoPheDuyetKyBaoCao')(event.target.value)}
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

const CreateReport18 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport18
