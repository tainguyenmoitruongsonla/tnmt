import React, { useState } from 'react'
import { EditNote } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import {
  Grid,
  Button,
  TextField,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Typography
} from '@mui/material'
import DialogControlFullScreen from 'src/views/DialogControlFullScreen'

const complete1 = [{ title: 'Khóa 1' }, { title: 'Khóa 2' }, { title: 'Khóa 3' }]

const FormContruction = ({ onSubmit, closeDialogs }: any) => {
  const [name, setName] = useState('')
  const [pagelink, setPagelink] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (event: any) => {
    event.preventDefault()
    onSubmit(name, pagelink, description)
    closeDialogs()
  }

  const handleClose = () => {
    closeDialogs()
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>
          <Typography variant={'h6'}>Thông tin công trình</Typography>
        </legend>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            
            <Autocomplete
              size='small'
              options={complete1}
              getOptionLabel={option => option.title}
              renderInput={params => (
                <TextField {...params} variant='outlined' label='Chọn loại hình công trình' placeholder='' />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>  
            <TextField size='small' type='text' label='Tên công trình' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            
            <Autocomplete
              size='small'
              options={complete1}
              getOptionLabel={option => option.title}
              renderInput={params => (
                <TextField {...params} variant='outlined' placeholder='' label='Giấy phép' />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            
            <Autocomplete
              size='small'
              options={complete1}
              getOptionLabel={option => option.title}
              renderInput={params => (
                <TextField {...params} variant='outlined' label='Chọn Tỉnh/TP' placeholder='' />
              )}
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
              renderInput={params => (
                <TextField {...params} variant='outlined' label='Chọn Xã/Phường' placeholder='' />
              )}
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
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Phương thức khai thác' />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth placeholder='' defaultValue='' label='Chế độ khai thác' />
          </Grid>
        </Grid>
      </fieldset>
      <DialogActions sx={{p:0,mt:5}}>
          <Button onClick={() => handleClose()} className='btn closeBtn'>Hủy</Button>
          <Button type="submit" className='btn saveBtn'>Lưu</Button>
        </DialogActions>
    </form>
  )
}

const CreateConstruction = ({ isEdit }: { isEdit: boolean }) => {
  const formTitle = isEdit ? 'Thay đổi thông tin trang truy cập' : 'Thêmcoas'
  const handleSubmit = (name: any, pagelink: any, description: any) => {
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
