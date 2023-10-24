import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report7State } from './Report7Interface'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report6Data, setreport6Data] = useState<Report7State>({
    id: data?.id || 0,
    khuVuc: data?.khuVuc || '',
    vungDieuTra: data?.vungDieuTra || '',
    dienTichDuocDieuTra: data?.dienTichDuocDieuTra || 0,
    tangChuaNuocDieuTra: data?.tangChuaNuocDieuTra || '',
    tyLeDieuTra: data?.tyLeDieuTra || '',
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof Report7State) => (value: any) => {
    setreport6Data({ ...report6Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoBay/luu', report6Data)
        if (res) {
          // Reset form fields
          setreport6Data({
            id: 0,
            khuVuc: '',
            vungDieuTra: '',
            dienTichDuocDieuTra: 0,
            tangChuaNuocDieuTra: '',
            tyLeDieuTra: '',
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
    setreport6Data({
      id: 0,
      khuVuc: '',
      vungDieuTra: '',
      dienTichDuocDieuTra: 0,
      tangChuaNuocDieuTra: '',
      tyLeDieuTra: '',
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
            label='Khu vực'
            fullWidth
            placeholder=''
            value={report6Data.khuVuc || ''}
            onChange={event => handleChange('khuVuc')(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Vùng điều tra'
            fullWidth
            placeholder=''
            value={report6Data.vungDieuTra || ''}
            onChange={event => handleChange('vungDieuTra')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Diện tích được điều tra'
            fullWidth
            placeholder=''
            value={report6Data.dienTichDuocDieuTra || ''}
            onChange={event => handleChange('dienTichDuocDieuTra')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tầng chứa nước điều tra'
            fullWidth
            placeholder=''
            value={report6Data.tangChuaNuocDieuTra || ''}
            onChange={event => handleChange('tangChuaNuocDieuTra')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tỷ lệ điều tra'
            fullWidth
            placeholder=''
            value={report6Data.tyLeDieuTra || ''}
            onChange={event => handleChange('tyLeDieuTra')(event.target.value)}
          />
        </Grid>
       
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={report6Data.ghiChu || ''}
            onChange={event => handleChange('ghiChu')(event.target.value)}
          />
        </Grid>
      </Grid>

      <DialogActions sx={{ p: 0, mt: 6 }}>
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

const CreateReport7 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport7
