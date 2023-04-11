import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField} from '@mui/material';
import { LockOpen } from '@mui/icons-material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(4),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, my: 2, p: 2, textAlign: 'center' }} {...other}>
      {children}
    </DialogTitle>
  );
}

export default function ChangePassword() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <LockOpen className='tableActionBtn' onClick={handleClickOpen} />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          ĐỔI MẬT KHẨU
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Grid container>
          <Grid item xs={12} md={12} sx={{my: 2}}>
              <TextField size='small' type='password' fullWidth label='Mật khẩu cũ' placeholder='johnDoe' defaultValue='johnDoe' />
            </Grid>
            <Grid item xs={12} md={12} sx={{my: 2}}>
              <TextField size='small' type='password' fullWidth label='Mật khẩu mói' placeholder='johnDoe' defaultValue='johnDoe' />
            </Grid>
            <Grid item xs={12} md={12} sx={{my: 2}}>
              <TextField size='small' type='password'  fullWidth label='Xác nhận mật khẩu' placeholder='John Doe' defaultValue='John Doe' />
            </Grid>
        </Grid>
        </DialogContent>
        <DialogActions sx={{py: 2}}>
          <Button className='btn closeBtn' onClick={handleClose}>HỦY</Button>
          <Button className='btn saveBtn' onClick={handleClose}>LƯU THAY ĐỔI</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}