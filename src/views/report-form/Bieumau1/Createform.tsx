import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report1State } from './Report1InterFace'


const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report1Data, setreport1Data] = useState<Report1State>({
    id: data?.id || 0,
    luuVucSong: data?.luuVucSong || '',
    tongTramQuanTracKyTruoc: data?.tongTramQuanTracKyTruoc || 0,
    tongTramQuanTracBaoCao: data?.tongTramQuanTracBaoCao || 0,
    tramKhiTuongKyTruoc: data?.tramKhiTuongKyTruoc || 0,
    tramKhiTuongBaoCao: data?.tramKhiTuongBaoCao || 0,
    tramThuyVanKyTruoc: data?.tramThuyVanKyTruoc || 0,
    tramThuyVanKyBaoCao: data?.tramThuyVanKyBaoCao || 0,
    tramTNNKyTruoc: data?.tramTNNKyTruoc || 0,
    tramTNNKyBaoCao: data?.tramTNNKyBaoCao || 0,
    tramQuanTracKyTruoc: data?.tramQuanTracKyTruoc || 0,
    tramQuanTracKyBaoCao: data?.tramQuanTracKyBaoCao || 0,
    ghiChu:data?.ghiChu || '',
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof Report1State) => (value: any) => {
    setreport1Data({ ...report1Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoMot/luu', report1Data)
        if (res) {
          // Reset form fields
          setreport1Data({
            id:0,
            luuVucSong: '',
            tongTramQuanTracKyTruoc: 0,
            tongTramQuanTracBaoCao: 0,
            tramKhiTuongKyTruoc: 0,
            tramKhiTuongBaoCao: 0,
            tramThuyVanKyTruoc: 0,
            tramThuyVanKyBaoCao: 0,
            tramTNNKyTruoc: 0,
            tramTNNKyBaoCao: 0,
            tramQuanTracKyTruoc: 0,
            tramQuanTracKyBaoCao: 0,
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
    setreport1Data({
      id: 0,
      luuVucSong: '',
      tongTramQuanTracKyTruoc: 0,
      tongTramQuanTracBaoCao: 0,
      tramKhiTuongKyTruoc: 0,
      tramKhiTuongBaoCao: 0,
      tramThuyVanKyTruoc: 0,
      tramThuyVanKyBaoCao: 0,
      tramTNNKyTruoc: 0,
      tramTNNKyBaoCao: 0,
      tramQuanTracKyTruoc: 0,
      tramQuanTracKyBaoCao: 0,
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
            value={report1Data.luuVucSong || ''}
            onChange={event => handleChange('luuVucSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tổng trạm quan trắc kỳ trước'
            fullWidth
            placeholder=''
            value={report1Data.tongTramQuanTracKyTruoc || ''}
            onChange={event => handleChange('tongTramQuanTracKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tổng trạm quan trắc kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report1Data.tongTramQuanTracBaoCao || ''}
            onChange={event => handleChange('tongTramQuanTracBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Trạm khí tượng kỳ trước'
            fullWidth
            placeholder=''
            value={report1Data.tramKhiTuongKyTruoc || ''}
            onChange={event => handleChange('tramKhiTuongKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Trạm khí tượng Kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report1Data.tramKhiTuongBaoCao || ''}
            onChange={event => handleChange('tramKhiTuongBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Trạm thủy văn Kỳ trước'
            fullWidth
            placeholder=''
            value={report1Data.tramThuyVanKyTruoc || ''}
            onChange={event => handleChange('tramThuyVanKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Trạm thủy văn kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report1Data.tramThuyVanKyBaoCao || ''}
            onChange={event => handleChange('tramThuyVanKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Trạm tài nguyên nước kỳ trước'
            fullWidth
            placeholder=''
            value={report1Data.tramTNNKyTruoc || ''}
            onChange={event => handleChange('tramTNNKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Trạm tài nguyên nước kì báo cáo'
            fullWidth
            placeholder=''
            value={report1Data.tramTNNKyBaoCao || ''}
            onChange={event => handleChange('tramTNNKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Trạm quan trắc kỳ trước'
            fullWidth
            placeholder=''
            value={report1Data.tramQuanTracKyTruoc || ''}
            onChange={event => handleChange('tramQuanTracKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Trạm quan trắc kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report1Data.tramQuanTracKyBaoCao || ''}
            onChange={event => handleChange('tramQuanTracKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={report1Data.ghiChu || ''}
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

const CreateReport1 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport1
