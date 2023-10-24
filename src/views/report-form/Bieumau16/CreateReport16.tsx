import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report16State } from './Report16InterFace'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report2Data, setreport2Data] = useState<Report16State>({
    id: data?.id || 0,
    loaiGiayPhep: data?.loaiGiayPhep || '',
    tongGPCapKyTruoc: data?.tongGPCapKyTruoc || 0,
    tongGPCapKyBaoCao: data?.tongGPCapKyBaoCao || 0,
    tongGPBoCapKyTruoc: data?.tongGPBoCapKyTruoc || 0,
    tongGPBoCapKyBaoCao: data?.tongGPBoCapKyBaoCao || 0,
    tongGPDiaPhuongCapKyTruoc: data?.tongGPDiaPhuongCapKyTruoc || 0,
    tongGPDiaPhuongCapBaoCao: data?.tongGPDiaPhuongCapBaoCao || 0,
    ghiChu:data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)
  const handleChange = (prop: keyof Report16State) => (value: any) => {
    setreport2Data({ ...report2Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoMuoiSau/luu', report2Data)
        if (res) {
          // Reset form fields
          setreport2Data({
            id: 0,
            loaiGiayPhep: '',
            tongGPCapKyTruoc: 0,
            tongGPCapKyBaoCao: 0,
            tongGPBoCapKyTruoc: 0,
            tongGPBoCapKyBaoCao: 0,
            tongGPDiaPhuongCapKyTruoc: 0,
            tongGPDiaPhuongCapBaoCao: 0,
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
        loaiGiayPhep: '',
        tongGPCapKyTruoc: 0,
        tongGPCapKyBaoCao: 0,
        tongGPBoCapKyTruoc: 0,
        tongGPBoCapKyBaoCao: 0,
        tongGPDiaPhuongCapKyTruoc: 0,
        tongGPDiaPhuongCapBaoCao: 0,
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
            label='Loại giấy phép'
            fullWidth
            placeholder=''
            value={report2Data.loaiGiayPhep || ''}
            onChange={event => handleChange('loaiGiayPhep')(event.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng giấy phép cấp kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.tongGPCapKyTruoc || ''}
            onChange={event => handleChange('tongGPCapKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng giấy phép kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.tongGPCapKyBaoCao || ''}
            onChange={event => handleChange('tongGPCapKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng giấy phép bộ cấp kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.tongGPBoCapKyTruoc || ''}
            onChange={event => handleChange('tongGPBoCapKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng giấy phép bộ cấp  kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.tongGPBoCapKyBaoCao || ''}
            onChange={event => handleChange('tongGPBoCapKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng giấy phép địa phương cấp  kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.tongGPDiaPhuongCapKyTruoc || ''}
            onChange={event => handleChange('tongGPDiaPhuongCapKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng giấy phép địa phương cấp kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.tongGPDiaPhuongCapBaoCao || ''}
            onChange={event => handleChange('tongGPDiaPhuongCapBaoCao')(event.target.value)}
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

const CreateReport16 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport16
