import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Report17State } from './Report17InterFace'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report2Data, setreport2Data] = useState<Report17State>({
    id: data?.id || 0,
    tinh: data?.tinh || '',
    tongCTPheDuyetTCQKyTruoc: data?.tongCTPheDuyetTCQKyTruoc || 0,
    tongCTPheDuyetTCQKyBaoCao: data?.tongCTPheDuyetTCQKyBaoCao || 0,
    tongCTPheDuyetTCQBoKyTruoc: data?.tongCTPheDuyetTCQBoKyTruoc || 0,
    tongCTPheDuyetTCQBoKyBaoCao: data?.tongCTPheDuyetTCQBoKyBaoCao || 0,
    tongCTPheDuyetTCQDiaPhuongKyTruoc: data?.tongCTPheDuyetTCQDiaPhuongKyTruoc || 0,
    tongCTPheDuyetTCQDiaPhuongKyBaoCao: data?.tongCTPheDuyetTCQDiaPhuongKyBaoCao || 0,
    tongTCQpKyTruoc: data?.tongTCQpKyTruoc || 0,
    tongTCQKyBaoCao: data?.tongTCQKyBaoCao || 0,
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)
  const handleChange = (prop: keyof Report17State) => (value: any) => {
    setreport2Data({ ...report2Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoMuoiBay/luu', report2Data)
        if (res) {
          // Reset form fields
          setreport2Data({
            id: 0,
            tinh: '',
            tongCTPheDuyetTCQKyTruoc: 0,
            tongCTPheDuyetTCQKyBaoCao: 0,
            tongCTPheDuyetTCQBoKyTruoc: 0,
            tongCTPheDuyetTCQBoKyBaoCao: 0,
            tongCTPheDuyetTCQDiaPhuongKyTruoc: 0,
            tongCTPheDuyetTCQDiaPhuongKyBaoCao: 0,
            tongTCQpKyTruoc: 0,
            tongTCQKyBaoCao: 0,
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
      tongCTPheDuyetTCQKyTruoc: 0,
      tongCTPheDuyetTCQKyBaoCao: 0,
      tongCTPheDuyetTCQBoKyTruoc: 0,
      tongCTPheDuyetTCQBoKyBaoCao: 0,
      tongCTPheDuyetTCQDiaPhuongKyTruoc: 0,
      tongCTPheDuyetTCQDiaPhuongKyBaoCao: 0,
      tongTCQpKyTruoc: 0,
      tongTCQKyBaoCao: 0,
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
            label='Tổng công trình phê duyệt TCQ kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.tongCTPheDuyetTCQKyTruoc || ''}
            onChange={event => handleChange('tongCTPheDuyetTCQKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng công trình phê duyệt TCQ kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.tongCTPheDuyetTCQKyBaoCao || ''}
            onChange={event => handleChange('tongCTPheDuyetTCQKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng công trình bộ phê duyệt TCQ kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.tongCTPheDuyetTCQBoKyTruoc || ''}
            onChange={event => handleChange('tongCTPheDuyetTCQBoKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng công trình bộ phê duyệt TCQ kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.tongCTPheDuyetTCQBoKyBaoCao || ''}
            onChange={event => handleChange('tongCTPheDuyetTCQBoKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng công trình địa phương phê duyệt TCQ kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.tongCTPheDuyetTCQDiaPhuongKyTruoc || ''}
            onChange={event => handleChange('tongCTPheDuyetTCQDiaPhuongKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng công trình địa phương phê duyệt TCQ kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.tongCTPheDuyetTCQDiaPhuongKyBaoCao || ''}
            onChange={event => handleChange('tongCTPheDuyetTCQDiaPhuongKyBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng số TCQ phê duyệt TCQ kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.tongTCQpKyTruoc || ''}
            onChange={event => handleChange('tongTCQpKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng số TCQ phê duyệt TCQ kỳ báo cáo'
            fullWidth
            placeholder=''
            value={report2Data.tongTCQKyBaoCao || ''}
            onChange={event => handleChange('tongTCQKyBaoCao')(event.target.value)}
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

const CreateReport17 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport17
