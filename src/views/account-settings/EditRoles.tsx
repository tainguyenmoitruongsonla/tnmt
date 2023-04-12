import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import { EditNote } from '@mui/icons-material';

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

const EditRoles = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <EditNote className='tableActionBtn' onClick={handleClickOpen} />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          SỬA THÔNG TIN
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <form action="">
            <Grid container>
              <Grid item xs={12} md={12} sx={{my: 2}}>
                <TextField size='small' type='text' fullWidth label='Tên' placeholder='' defaultValue='' />
              </Grid>
              <Grid item xs={12} md={12} sx={{my: 2}}>
                <TextField size='small' type='text' fullWidth label='Mô tả' placeholder='' defaultValue='' />
              </Grid>
              <Grid item xs={12} md={12} sx={{my: 2}}>
              <FormGroup>
                <FormControlLabel control={<Checkbox name='isDefault' />} label="Đặt là mặc định" />
              </FormGroup>
              </Grid>
            </Grid>
            <DialogActions>
              <Button type='reset' className='btn closeBtn' onClick={handleClose}>HỦY</Button>
              <Button className='btn saveBtn' onClick={handleClose}>LƯU THAY ĐỔI</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
export default EditRoles;