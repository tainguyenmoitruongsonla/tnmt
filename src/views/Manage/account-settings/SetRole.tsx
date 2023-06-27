import  React, { useState, ChangeEvent } from 'react';
import { Grid, DialogActions, Typography, TextField, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button } from '@mui/material';
import { ShieldTwoTone } from '@mui/icons-material';
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen';

const createData = (name: string, isDefault: boolean) => {
  return { name, isDefault }
}

interface State {
  userName: string
  fullName: string
  email: string
  phoneNumber: string
}

const roleData = [
  createData('Supper User', false),
  createData('Admintrators', false),
  createData('Default', true),
]

const Form = ({ onSubmit, closeDialogs, data }: any) => {

  const [values, setValues] = useState<State>({
    userName: data.userName,
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
  })

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit();
    closeDialogs();
  };

  const handleClose = () => {
    closeDialogs();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={7} sx={{ px: 10, pt: 10 }}>
          <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
            <Typography variant='h6'>THÔNG TIN TÀI KHOẢN</Typography>
          </Grid>
          <Grid item xs={12} md={3} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth disabled label='Tên đăng nhập' placeholder=' ' value={values.userName} />
          </Grid>
          <Grid item xs={12} md={3} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth disabled label='Họ tên' placeholder=' ' value={values.fullName} />
          </Grid>
          <Grid item xs={12} md={3} sx={{ my: 2 }}>
            <TextField size='small' type='email' fullWidth disabled label='Email' placeholder=' ' value={values.email} />
          </Grid>
          <Grid item xs={12} md={3} sx={{ my: 2 }}>
            <TextField size='small' type='phone' fullWidth disabled label='Số điện thoại' placeholder=' ' value={values.phoneNumber} />
          </Grid>
          <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
            <Typography variant='h6'>PHÂN QUYỀN TRUY CẬP</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell size='small'>ROLES</TableCell>
                  <TableCell size='small'>PERMIT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roleData.map(row => (
                  <TableRow key={row.name}>
                    <TableCell size='small'>
                      {row.name}
                    </TableCell>
                    <TableCell size='small'>
                      <Checkbox checked={row.isDefault} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
        <DialogActions>
          <Button className='btn closeBtn' onClick={handleClose}>HỦY</Button>
          <Button className='btn saveBtn' onClick={handleSubmit}>LƯU THAY ĐỔI</Button>
        </DialogActions>
      </form>
    </div>
  );
};


const SetRole = ({ data }: any) => {

  const formTitle = 'Thay đổi mật khẩu';
  const handleSubmit = () => {
    // handle form submission logic here
  };

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          <ShieldTwoTone className='tableActionBtn' onClick={() => openDialogs(<Form data={data} onSubmit={handleSubmit} closeDialogs={closeDialogs} />, formTitle)} />
        </>
      )}
    </DialogsControlFullScreen>
  );
}
export default SetRole;