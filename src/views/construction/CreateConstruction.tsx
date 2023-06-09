import React, { useState } from 'react'
import { EditNote } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import {
  Grid,
  Button,
  TextField,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Autocomplete,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl
} from '@mui/material'
import DialogControlFullScreen from 'src/views/DialogControlFullScreen'
import CreateHydroelectric from './CreateHydroelectric'

const complete1 = [{ title: 'Khóa 1' }, { title: 'Khóa 2' }, { title: 'Khóa 3' }]

const FormContruction = ({ onSubmit, closeDialogs }: any) => {

  const handleSubmit = (event: any) => {
    event.preventDefault()
    onSubmit()
    closeDialogs()
  }

  const handleClose = () => {
    closeDialogs()
  }

  const [selectedValue, setSelectedValue] = useState('')
  const [showForm, setShowForm] = useState(false)
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string)
    setShowForm(true)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>
          <Typography variant={'h6'}>THÔNG TIN CÔNG TRÌNH</Typography>
        </legend>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Chọn loại công trình</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                size='small'
                value={selectedValue}
                label='Chọn loại hình công trình'
                onChange={handleChange}
              >
                <MenuItem value="hydroelectric">Thủy điện</MenuItem>
                <MenuItem value={2}>Hồ chứa</MenuItem>
                <MenuItem value={3}>Trạm bơm</MenuItem>
                <MenuItem value={4}>Đập/Hệ thống thủy lợi</MenuItem>
                <MenuItem value={5}>Cống</MenuItem>
                <MenuItem value={6}>Trạm cấp nước</MenuItem>
                <MenuItem value={7}>Nhà máy nước</MenuItem>
                <MenuItem value={8}>Công trình khác</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Tên công trình' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              size='small'
              options={complete1}
              getOptionLabel={option => option.title}
              renderInput={params => <TextField {...params} variant='outlined' placeholder='' label='Giấy phép' />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              size='small'
              options={complete1}
              getOptionLabel={option => option.title}
              renderInput={params => <TextField {...params} variant='outlined' label='Chọn Tỉnh/TP' placeholder='' />}
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              size='small'
              options={complete1}
              getOptionLabel={option => option.title}
              renderInput={params => (
                <TextField {...params} variant='outlined' label='Chọn Quận/Huyện' placeholder='' />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              size='small'
              options={complete1}
              getOptionLabel={option => option.title}
              renderInput={params => <TextField {...params} variant='outlined' label='Chọn Xã/Phường' placeholder='' />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='Địa điểm công trình' placeholder='' />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Vĩ độ' />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Kinh độ' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' variant='outlined' fullWidth label='Năm vận hành' placeholder='' />
          </Grid>
          <Grid item xs={12} md={3} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Năm xây dựng' />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Tiểu vùng quy hoạch' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <Autocomplete
              size='small'
              options={complete1}
              getOptionLabel={option => option.title}
              renderInput={params => (
                <TextField {...params} variant='outlined' label='Chọn lưu vực sông' placeholder='' />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Nguồn nước khai thác' />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
            <TextField
              size='small'
              type='text'
              fullWidth
              placeholder=''
              defaultValue=''
              label='Phương thức khai thác'
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Chế độ khai thác' />
          </Grid>
        </Grid>
      </fieldset>

      {showForm && (
        <div>
          {selectedValue === 'hydroelectric' && 
            (<CreateHydroelectric />)}
          {selectedValue === 'option2' && (
            <form>
              <TextField label='Name' />
              <TextField label='Email' />
              <TextField label='Name' />
              <TextField label='Email' />
            </form>
          )}
          {selectedValue === 'option3' && (
            <form>
              <TextField label='Name' />
              <TextField label='Email' /> <TextField label='Name' />
              <TextField label='Email' /> <TextField label='Name' />
              <TextField label='Email' /> <TextField label='Name' />
              <TextField label='Email' />
            </form>
          )}
        </div>
      )}

      <fieldset>
        <legend>
          <Typography variant={'h6'}>VỊ TRÍ CÁC HẠNG MỤC CHÍNH CỦA CÔNG TRÌNH KHAI THÁC SỬ DỤNG NƯỚC</Typography>
        </legend>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>TT</TableCell>
                <TableCell align='center'>Hạng mục</TableCell>
                <TableCell align='center'>Tọa độ X</TableCell>
                <TableCell align='center'>Tọa độ Y</TableCell>
                <TableCell align='center'>
                  <Button className='btn-link'>Thêm</Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            </TableBody>
          </Table>
        </TableContainer>
      </fieldset>

      <DialogActions sx={{ p: 0, mt: 5 }}>
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

const CreateConstruction = ({ isEdit }: { isEdit: boolean }) => {
  const formTitle = isEdit ? 'Thay đổi thông tin trang truy cập' : 'THÔNG TIN CÔNG TRÌNH KHAI THÁC, SỬ DỤNG NƯỚC MẶT'
  const handleSubmit = () => {
    // handle form submission logic here
  }

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {isEdit ? (
            <EditNote
              onClick={() =>
                openDialogs(<FormContruction onSubmit={handleSubmit} closeDialogs={closeDialogs} />, formTitle)
              }
            />
          ) : (
            <Button
              size='small'
              startIcon={<AddIcon />}
              variant='outlined'
              onClick={() =>
                openDialogs(<FormContruction onSubmit={handleSubmit} closeDialogs={closeDialogs} />, formTitle)
              }
            >
              Thêm mới
            </Button>
          )}
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default CreateConstruction
