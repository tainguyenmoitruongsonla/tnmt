import DialogsControl from '../../DialogControl';
import { EditNote, PersonAddAlt } from "@mui/icons-material";
import { Grid, Button, TextField, DialogActions, IconButton, Typography } from "@mui/material";

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
            <TextField size='small' type='text' fullWidth label='Tài khoản' placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={12} sx={{my: 3}}>
            <TextField size='small' type='text' fullWidth label='Họ tên' placeholder='' defaultValue='' />
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

const EditAccount =  ({ isEdit }: { isEdit: boolean }) => {
  const formTitle = isEdit ? 'Thay đổi thông tin tài khoản' : 'Thêm tài khoản mới' ;
  const handleSubmit = () => {
    // handle form submission logic here
    
  };

  return (
    <DialogsControl>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
        {
          isEdit?
          <EditNote className='tableActionBtn' onClick={() => openDialogs(<Form onSubmit={handleSubmit} closeDialogs={closeDialogs} />, formTitle)} />
          :
          <IconButton className='addNewBtn' aria-label="add user" onClick={() => openDialogs(<Form onSubmit={handleSubmit} closeDialogs={closeDialogs} />, formTitle)}>
              <PersonAddAlt sx={{mr: 2}} />
              <Typography>Thêm mới</Typography>
          </IconButton>
        }
        </>
      )}
    </DialogsControl>
  );
};

export default EditAccount;
