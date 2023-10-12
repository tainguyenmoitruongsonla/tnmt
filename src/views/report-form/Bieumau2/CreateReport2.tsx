import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  tenTram: string
  thoiKyQuanTrac: string
  muaNamKyTruoc: number
  muaNamBaoCao: number
  muaNamThayDoi: number
  muaMuaKyTruoc: number
  muaMuaBaoCao: number
  muaMuaThayDoi: number
  muaKhoKyTruoc: number
  muaKhoBaoCao: number
  muaKhoThayDoi: number
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [report2Data, setreport2Data] = useState<State>({
    id: data?.id || 0,
    tenTram: data?.tenTram || '',
    thoiKyQuanTrac: data?.thoiKyQuanTrac || '',
    muaNamKyTruoc: data?.muaNamKyTruoc || 0,
    muaNamBaoCao: data?.muaNamBaoCao || 0,
    muaNamThayDoi: data?.muaNamThayDoi || 0,
    muaMuaKyTruoc: data?.muaMuaKyTruoc || 0,
    muaMuaBaoCao: data?.muaMuaBaoCao || 0,
    muaMuaThayDoi: data?.muaMuaThayDoi || 0,
    muaKhoKyTruoc: data?.muaKhoKyTruoc || 0,
    muaKhoBaoCao: data?.muaKhoBaoCao || 0,
    muaKhoThayDoi: data?.muaKhoThayDoi || 0
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setreport2Data({ ...report2Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('BieuMauSoHai/luu', report2Data)
        if (res) {
          // Reset form fields
          setreport2Data({
            id: 0,
            tenTram: '',
            thoiKyQuanTrac: '',
            muaNamKyTruoc: 0,
            muaNamBaoCao: 0,
            muaNamThayDoi: 0,
            muaMuaKyTruoc: 0,
            muaMuaBaoCao: 0,
            muaMuaThayDoi: 0,
            muaKhoKyTruoc: 0,
            muaKhoBaoCao: 0,
            muaKhoThayDoi: 0
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
      tenTram: '',
      thoiKyQuanTrac: '',
      muaNamKyTruoc: 0,
      muaNamBaoCao: 0,
      muaNamThayDoi: 0,
      muaMuaKyTruoc: 0,
      muaMuaBaoCao: 0,
      muaMuaThayDoi: 0,
      muaKhoKyTruoc: 0,
      muaKhoBaoCao: 0,
      muaKhoThayDoi: 0
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
            value={report2Data.tenTram || ''}
            onChange={event => handleChange('tenTram')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Thời kỳ quan trắc'
            fullWidth
            placeholder=''
            value={report2Data.thoiKyQuanTrac || ''}
            onChange={event => handleChange('thoiKyQuanTrac')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <Typography variant='h6'>Tổng lượng mưa (mm)</Typography>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Typography align='center' variant='h6'>
            Năm
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Typography align='center' variant='h6'>
            Mùa mưa
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Typography align='center' variant='h6'>
            Mùa khô
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.muaNamKyTruoc || ''}
            onChange={event => handleChange('muaNamKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.muaMuaKyTruoc || ''}
            onChange={event => handleChange('muaMuaKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Kỳ trước'
            fullWidth
            placeholder=''
            value={report2Data.muaKhoKyTruoc || ''}
            onChange={event => handleChange('muaKhoKyTruoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Kỳ sau'
            fullWidth
            placeholder=''
            value={report2Data.muaNamBaoCao || ''}
            onChange={event => handleChange('muaNamBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Kỳ sau'
            fullWidth
            placeholder=''
            value={report2Data.muaMuaBaoCao || ''}
            onChange={event => handleChange('muaMuaBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Kỳ sau'
            fullWidth
            placeholder=''
            value={report2Data.muaKhoBaoCao || ''}
            onChange={event => handleChange('muaKhoBaoCao')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Kỳ thay đổi'
            fullWidth
            placeholder=''
            value={report2Data.muaNamThayDoi || ''}
            onChange={event => handleChange('muaNamThayDoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Kỳ thay đổi'
            fullWidth
            placeholder=''
            value={report2Data.muaMuaThayDoi || ''}
            onChange={event => handleChange('muaMuaThayDoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Kỳ thay đổi'
            fullWidth
            placeholder=''
            value={report2Data.muaKhoThayDoi || ''}
            onChange={event => handleChange('muaKhoThayDoi')(event.target.value)}
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

const CreateReport2 = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateReport2
