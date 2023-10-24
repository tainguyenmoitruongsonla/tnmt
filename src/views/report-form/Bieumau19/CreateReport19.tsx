import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report19State } from './Report19InterFace'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report2Data, setreport2Data] = useState<Report19State>({
    id: data?.id || 0,
    tinh: data?.tinh || '',
    soCuocThanhTraKyTruoc: data?.soCuocThanhTraKyTruoc || 0,
    soCuocThanhTraKyBaoCao: data?.soCuocThanhTraKyBaoCao || 0,
    soDoiTuongThanhTraKyTruoc: data?.soDoiTuongThanhTraKyTruoc || 0,
    soDoiTuongThanhTraKyBaoCao: data?.soDoiTuongThanhTraKyBaoCao || 0,
    soTCCNXuPhatKyTruoc: data?.soTCCNXuPhatKyTruoc || 0,
    soTCCNXuPhatKyBaoCao: data?.soTCCNXuPhatKyBaoCao || 0,
    tongTienXuPhatKyTruoc: data?.tongTienXuPhatKyTruoc || 0,
    tongTienXuPhatKyBaoCao: data?.tongTienXuPhatKyBaoCao || 0,
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)
  const handleChange = (prop: keyof Report19State) => (value: any) => {
    setreport2Data({ ...report2Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoMuoiChin/luu', report2Data)
        if (res) {
          // Reset form fields
          setreport2Data({
            id: 0,
            tinh: '',
            soCuocThanhTraKyTruoc: 0,
            soCuocThanhTraKyBaoCao: 0,
            soDoiTuongThanhTraKyTruoc: 0,
            soDoiTuongThanhTraKyBaoCao: 0,
            soTCCNXuPhatKyTruoc: 0,
            soTCCNXuPhatKyBaoCao: 0,
            tongTienXuPhatKyTruoc: 0,
            tongTienXuPhatKyBaoCao: 0,
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
      tinh: '',
      soCuocThanhTraKyTruoc: 0,
      soCuocThanhTraKyBaoCao: 0,
      soDoiTuongThanhTraKyTruoc: 0,
      soDoiTuongThanhTraKyBaoCao: 0,
      soTCCNXuPhatKyTruoc: 0,
      soTCCNXuPhatKyBaoCao: 0,
      tongTienXuPhatKyTruoc: 0,
      tongTienXuPhatKyBaoCao: 0,
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
            label='Tỉnh'
            fullWidth
            placeholder=''
            value={report2Data.tinh || ''}
            onChange={event => handleChange('tinh')(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số lượng các cuộc điều tra kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.soCuocThanhTraKyTruoc || ''}
            onChange={event => handleChange('soCuocThanhTraKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số lượng các cuộc điều tra kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.soCuocThanhTraKyBaoCao || ''}
            onChange={event => handleChange('soCuocThanhTraKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số lượng đối tượng thanh tra kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.soDoiTuongThanhTraKyTruoc || ''}
            onChange={event => handleChange('soDoiTuongThanhTraKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số lượng đối tượng thanh tra kỳ  báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.soDoiTuongThanhTraKyBaoCao || ''}
            onChange={event => handleChange('soDoiTuongThanhTraKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số lượng tổ chức,cá nhân bị xử phạt kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.soTCCNXuPhatKyTruoc || ''}
            onChange={event => handleChange('soTCCNXuPhatKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số lượng tổ chức,cá nhân bị xử phạt kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.soTCCNXuPhatKyBaoCao || ''}
            onChange={event => handleChange('soTCCNXuPhatKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng tiền xử phạt kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.tongTienXuPhatKyTruoc || ''}
            onChange={event => handleChange('tongTienXuPhatKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng tiền xử phạt xử phạt kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.tongTienXuPhatKyBaoCao || ''}
            onChange={event => handleChange('tongTienXuPhatKyBaoCao')(event.target.value)}
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

const CreateReport19 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport19
