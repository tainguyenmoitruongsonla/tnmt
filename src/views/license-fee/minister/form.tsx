// ** React Imports
import { useState, ChangeEvent, MouseEvent } from 'react'

// ** Icons Imports
import { EditNote } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
// ** MUI Imports
import { Grid, Button, DialogActions } from '@mui/material'

// ** Component Imports
import DialogsControl from 'src/@core/components/dialog-control'
import postApiData from 'src/api/post'
import { DatePicker, TextField } from 'src/@core/components/field'
import { useLoadingContext } from 'src/@core/theme/loading-provider'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface State {
  id?: number
  childrenId?: number
  licenseFeeNumber?: string
  signDate?: Date
  licensingAuthorities?: number
  totalMoney: number
  filePDF: string
  description: string
}

const Form = ({ data, setPostSuccess, isEdit, closeDialogs }: any) => {
  const [values, setValues] = useState<State>({
    id: data?.id || 0,
    childrenId: data?.childrenId || 0,
    licenseFeeNumber: data?.licenseFeeNumber || '',
    signDate: data?.signDate || '',
    licensingAuthorities: data?.licensingAuthorities || '',
    totalMoney: data?.totalMoney || 0,
    filePDF: data?.filePDF || '',
    description: data?.description || ''
  })
  const { showLoading, hideLoading } = useLoadingContext()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setValues({ ...values, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      showLoading()
      setValues({ ...values, licensingAuthorities: 0 })

      const res = await postApiData('LicenseFee/save', values)

      if (res) {
        // Reset form fields
        setValues({
          id: 0,
          childrenId: 0,
          licenseFeeNumber: '',
          signDate: new Date(),
          licensingAuthorities: 0,
          totalMoney: 0,
          filePDF: '',
          description: ''
        })

        typeof setPostSuccess === 'function' ? setPostSuccess(true) : ''
        closeDialogs()
      }
      hideLoading()
      console.log(res)
    }

    // Call the function
    handleApiCall()
  }

  const handleClose = () => {
    setValues({
      id: 0,
      childrenId: 0,
      licenseFeeNumber: '',
      signDate: new Date(),
      licensingAuthorities: 0,
      totalMoney: 0,
      filePDF: '',
      description: ''
    })

    closeDialogs()
  }
  const [signDate, setSignDate] = useState(null)
  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={12} sx={{ my: 3 }}>
          <TextField
            size='small'
            fullWidth
            label='Số quyết định'
            placeholder=''
            value={values?.licenseFeeNumber}
            onChange={handleChange('licenseFeeNumber')}
          />
        </Grid>
        <Grid item xs={12} md={12} sx={{ my: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Ngày ký'
              value={signDate}
              onChange={(newSignDate: any) => setSignDate(newSignDate)}
              format='DD/MM/YYYY'
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={12} sx={{ my: 3 }}>
          <TextField
            size='small'
            fullWidth
            label='Tổng tiền'
            placeholder=''
            value={values?.totalMoney}
            onChange={handleChange('totalMoney')}
          />
        </Grid>
        <Grid item xs={12} md={12} sx={{ my: 3 }}>
          <TextField
            size='small'
            type='file'
            fullWidth
            placeholder=''
            value={values?.filePDF}
            onChange={handleChange('filePDF')}
          />
        </Grid>
        <Grid item xs={12} md={12} sx={{ my: 3 }}>
          <TextField
            size='small'
            fullWidth
            label='Ghi chú'
            placeholder=''
            value={values?.description}
            onChange={handleChange('description')}
          />
        </Grid>
      </Grid>
      <DialogActions sx={{ p: 0 }}>
        <Button onClick={() => handleClose()} className='btn closeBtn'>
          Hủy
        </Button>
        <Button type='submit' className='btn saveBtn'>
          Lưu
        </Button>
      </DialogActions>
    </form>
  )
}

const FormLincenseFee = ({ data, setPostSuccess, isEdit }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin tài khoản' : 'Thêm tài khoản mới'

  return (
    <DialogsControl>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {isEdit ? (
            <EditNote
              className='tableActionBtn'
              onClick={() =>
                openDialogs(
                  <Form data={data} setPostSuccess={setPostSuccess} isEdit={isEdit} closeDialogs={closeDialogs} />,
                  formTitle
                )
              }
            />
          ) : (
            <Button
              fullWidth
              size='small'
              startIcon={<AddIcon />}
              variant='outlined'
              onClick={() =>
                openDialogs(<Form data={data} setPostSuccess={setPostSuccess} closeDialogs={closeDialogs} />, formTitle)
              }
            >
              Thêm mới
            </Button>
          )}
        </>
      )}
    </DialogsControl>
  )
}

export default FormLincenseFee
