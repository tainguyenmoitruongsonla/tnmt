import DialogsControl from '../../DialogControl';
import { LockOpen } from "@mui/icons-material";
import { Grid, Button, TextField, DialogActions } from "@mui/material";

const Form = ({ onSubmit, closeDialogs }: any) => {

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit();
    closeDialogs();
  };

  const handleClose = () => {
    closeDialogs();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={12} sx={{my: 3}}>
            <TextField disabled size='small' type='password' fullWidth label='Mật khẩu cũ' placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={12} sx={{my: 3}}>
            <TextField size='small' type='password' fullWidth label='Mật khẩu mới' placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={12} sx={{my: 3}}>
            <TextField size='small' type='password'  fullWidth label='Xác nhận mật khẩu' placeholder='' defaultValue='' />
          </Grid>
      </Grid>
      <DialogActions sx={{p:0}}>
        <Button onClick={() => handleClose()} className='btn closeBtn'>Hủy</Button>
        <Button type="submit" className='btn saveBtn'>Lưu</Button>
      </DialogActions>
    </form>
  );
};

const ChangePassword = () => {
  const formTitle = 'Thay đổi mật khẩu';
  const handleSubmit = () => {
    // handle form submission logic here
  };

  return (
    <DialogsControl>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          <LockOpen className='tableActionBtn' onClick={() => openDialogs(<Form onSubmit={handleSubmit} closeDialogs={closeDialogs} />, formTitle)} />
        </>
      )}
    </DialogsControl>
  );
};

export default ChangePassword;
