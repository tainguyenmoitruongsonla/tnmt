import React, { useState } from 'react';
import DialogsControl from '../../DialogControl';
import { EditNote } from "@mui/icons-material";
import { Grid, Button, TextField, DialogActions } from "@mui/material";

const Form = ({ onSubmit, closeDialogs }: any) => {
  const [username, setUsername] = useState('');
  const [fullname, setFullName] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(username, fullname);
    closeDialogs();
  };

  const handleClose = () => {
    closeDialogs();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={12} sx={{my: 3}}>
            <TextField size='small' type='text' disabled fullWidth label='Tài khoản' placeholder='Username' defaultValue='Username' onChange={(e) => setUsername(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={12} sx={{my: 3}}>
            <TextField size='small' type='text' fullWidth label='Họ tên' placeholder='' defaultValue='' onChange={(e) => setFullName(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={12} sx={{my: 3}}>
            <TextField size='small' type='email'  fullWidth label='Email' placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={12} sx={{my: 3}}>
            <TextField size='small' type='text'  fullWidth label='Số điện thoại' placeholder='' defaultValue='' />
          </Grid>
      </Grid>
      <DialogActions sx={{p:0}}>
        <Button onClick={() => handleClose()} className='btn closeBtn'>Hủy</Button>
        <Button type="submit" className='btn saveBtn'>Lưu</Button>
      </DialogActions>
    </form>
  );
};

const EditAccount = () => {
  const formTitle = 'Thay đổi thông tin tài khoản';
  const handleSubmit = (username:any, password:any) => {
    // handle form submission logic here
  };

  return (
    <DialogsControl>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          <EditNote className='tableActionBtn' onClick={() => openDialogs(<Form onSubmit={handleSubmit} closeDialogs={closeDialogs} />, formTitle)} />
        </>
      )}
    </DialogsControl>
  );
};

export default EditAccount;
