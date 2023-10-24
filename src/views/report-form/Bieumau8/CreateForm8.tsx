import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report8State } from './Reportt8InterFace'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report2Data, setreport2Data] = useState<Report8State>({
    id: data?.id || 0,
    tangChuaNuoc: data?.tangChuaNuoc || '',
    slGieng: data?.slGieng || '',
    mucNuocMaxKyTruoc: data?.mucNuocMaxKyTruoc || 0,
    mucNuocMaxKyBaoCao: data?.mucNuocMaxKyBaoCao || 0,
    mucNuocMediumKyTruoc: data?.mucNuocMediumKyTruoc || 0,
    mucNuocMediumKyBaoCao: data?.mucNuocMediumKyBaoCao || 0,
    mucNuocMinKyTruoc: data?.mucNuocMinKyTruoc || 0,
    mucNuocMinKyBaoCao: data?.mucNuocMinKyBaoCao || 0,
    ghiChu:data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)
  const handleChange = (prop: keyof Report8State) => (value: any) => {
    setreport2Data({ ...report2Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoTam/luu', report2Data)
        if (res) {
          // Reset form fields
          setreport2Data({
            id: 0,
            tangChuaNuoc: '',
            slGieng: '',
            mucNuocMaxKyTruoc: 0,
            mucNuocMaxKyBaoCao: 0,
            mucNuocMediumKyTruoc: 0,
            mucNuocMediumKyBaoCao: 0,
            mucNuocMinKyTruoc: 0,
            mucNuocMinKyBaoCao: 0,
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
        tangChuaNuoc: '',
        slGieng: '',
        mucNuocMaxKyTruoc: 0,
        mucNuocMaxKyBaoCao: 0,
        mucNuocMediumKyTruoc: 0,
        mucNuocMediumKyBaoCao: 0,
        mucNuocMinKyTruoc: 0,
        mucNuocMinKyBaoCao: 0,
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
            label='Tầng chứa nước'
            fullWidth
            placeholder=''
            value={report2Data.tangChuaNuoc || ''}
            onChange={event => handleChange('tangChuaNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Số lượng giếng'
            fullWidth
            placeholder=''
            value={report2Data.slGieng || ''}
            onChange={event => handleChange('slGieng')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mực nước lớn nhất Kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.mucNuocMaxKyTruoc || ''}
            onChange={event => handleChange('mucNuocMaxKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mực nước lớn nhất kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.mucNuocMaxKyBaoCao || ''}
            onChange={event => handleChange('mucNuocMaxKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mực nước trung bình kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.mucNuocMediumKyTruoc || ''}
            onChange={event => handleChange('mucNuocMediumKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mực nước trung bình kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.mucNuocMediumKyBaoCao || ''}
            onChange={event => handleChange('mucNuocMediumKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mực nước nhỏ nhất kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.mucNuocMinKyTruoc || ''}
            onChange={event => handleChange('mucNuocMinKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mực nước nhỏ nhất kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.mucNuocMinKyBaoCao || ''}
            onChange={event => handleChange('mucNuocMinKyBaoCao')(event.target.value)}
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

const CreateReport8 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport8
