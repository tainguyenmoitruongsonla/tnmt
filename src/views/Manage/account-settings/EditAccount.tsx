// ** React Imports
import { useState, ChangeEvent, MouseEvent, useEffect } from 'react';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { EditNote, PersonAddAlt } from "@mui/icons-material";

// ** MUI Imports
import { Grid, Button, DialogActions, IconButton, Typography, FormControl, Box, InputAdornment } from "@mui/material";

// ** Component Imports
import DialogsControl from 'src/@core/components/dialog-control';
import postApiData from 'src/api/postApiData';
import { AutoComplete, TextField } from 'src/@core/components/field';

interface State {
  userName?: string,
  password?: string,
  confirmPassword?: string,
  fullName: string,
  email: string,
  phoneNumber: string,
  userType: string
}

const Form = ({ data, isEdit, closeDialogs }: any) => {

  const [values, setValues] = useState<State>({
    userName: data?.userName || '',
    password: data?.password || '',
    confirmPassword: data?.confirmPassword || '',
    fullName: data?.fullName || '',
    email: data?.email || '',
    phoneNumber: data?.phoneNumber || '',
    userType: data?.userType || ''
  });

  const [showPassword, setShowPassword] = useState(false)

  const UserType = [
    { title: "Cá nhân", value: 0 },
    { title: "Doanh nghiệp", value: 1 },
  ];

  const [success, setSuccess] = useState<any>()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const handleApiCall = async () => {
      if (isEdit) {
        const res = await postApiData(`User/update/${data.userName}`, values);
        setSuccess(res);
        console.log('Data successfully updated!')
      } else {
        const res = await postApiData('User/create', values);
        setSuccess(res);
        console.log('Data successfully cereated!')
      }
    };

    // Call the function
    handleApiCall();

    if (success) {   
      // Reset form fields
      setValues({
        userName: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        userType: ''
      });

      closeDialogs();
    }
  };

  const handleClose = () => {
    closeDialogs();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={12} sx={{ my: 3 }}>
          <AutoComplete
            onChange={(e: any, v: any) => handleChange('userType')}
            size="small"
            options={UserType}
            getOptionLabel={(option: any) => option.title}
            label="Chọn loại tài khoản"
          />
        </Grid>
        {isEdit ?
          '' :
          <Grid item xs={12} md={12}>
            <TextField size='small' type='text' fullWidth sx={{ my: 3 }} label='Tài khoản' placeholder='' value={values?.userName} onChange={handleChange('userName')} />
            <FormControl fullWidth sx={{ my: 3 }}>
              <TextField
                label='Mật khẩu'
                size='small'
                value={values.password}
                onChange={handleChange('password')}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ my: 3 }}>
              <TextField
                label='Nhập lại mật khẩu'
                size='small'
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                type={showPassword ? 'text' : 'confirmPassword'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>
          </Grid>
        }
        <Grid item xs={12} md={12} sx={{ my: 3 }}>
          <TextField size='small' type='text' fullWidth label='Họ tên' placeholder='' value={values?.fullName} onChange={handleChange('fullName')} />
        </Grid>
        <Grid item xs={12} md={12} sx={{ my: 3 }}>
          <TextField size='small' type='email' fullWidth label='Email' placeholder='' value={values?.email} onChange={handleChange('email')} />
        </Grid>
        <Grid item xs={12} md={12} sx={{ my: 3 }}>
          <TextField size='small' type='text' fullWidth label='Số điện thoại' placeholder='' value={values?.phoneNumber} onChange={handleChange('phoneNumber')} />
        </Grid>
      </Grid>
      <DialogActions sx={{ p: 0 }}>
        <Button onClick={() => handleClose()} className='btn closeBtn'>Hủy</Button>
        <Button type="submit" className='btn saveBtn'>Lưu</Button>
      </DialogActions>
    </form>
  );
};

const EditAccount = ({ data, isEdit }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin tài khoản' : 'Thêm tài khoản mới';

  return (
    <DialogsControl>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {
            isEdit ?
              <EditNote className='tableActionBtn' onClick={() => openDialogs(<Form data={data} isEdit={isEdit} closeDialogs={closeDialogs} />, formTitle)} />
              :
              <IconButton className='addNewBtn' aria-label="add user" onClick={() => openDialogs(<Form closeDialogs={closeDialogs} />, formTitle)}>
                <PersonAddAlt sx={{ mr: 2 }} />
                <Typography>Thêm mới</Typography>
              </IconButton>
          }
        </>
      )}
    </DialogsControl>
  );
};

export default EditAccount;
