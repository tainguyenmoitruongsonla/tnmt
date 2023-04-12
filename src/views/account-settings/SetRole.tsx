import * as React from 'react';
import { useState, ElementType, ChangeEvent } from 'react'

import {  useTheme } from "@mui/material/styles";
import { styled } from '@mui/material/styles'
import {
  Grid,
  Dialog,
  DialogActions,
  AppBar,
  Toolbar,
  Typography,
  Slide,
  Box,
  TextField,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button'
import { TransitionProps } from '@mui/material/transitions';
import { ShieldTwoTone } from '@mui/icons-material';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

export default function SetRole() {

  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  const createData = (name: string, isDefault: boolean) => {
    return { name, isDefault }
  }
  
  const roleData = [
    createData('Supper User', false),
    createData('Admintrators', false),
    createData('Default', true),
  ]

  return (
    <div>
      <ShieldTwoTone className='tableActionBtn' onClick={handleClickOpen} />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1, color: `${theme.palette.text.light}` }} variant="h6" component="div">
              SỬA THÔNG TIN TÀI KHOẢN
            </Typography>
          </Toolbar>
        </AppBar>
        <form>
          <Grid container spacing={7} sx={{px: 10, pt: 10}}>
            <Grid item xs={12} sm={12} sx={{mb: 2}}>
              <Typography variant='h6'>THÔNG TIN TÀI KHOẢN</Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{my: 2}}>
              <TextField size='small' disabled type='text' fullWidth label='Tên đăng nhập' placeholder='User Name' defaultValue='User Name' />
            </Grid>
            <Grid item xs={12} md={4} sx={{my: 2}}>
              <TextField size='small' disabled type='text' fullWidth label='Họ tên' placeholder='Full Name' defaultValue='Full Name' />
            </Grid>
            <Grid item xs={12} md={4} sx={{my: 2}}>
              <TextField size='small' disabled type='email'  fullWidth label='Email' placeholder='example@gmail.com' defaultValue='example@gmail.com' />
            </Grid>
            <Grid item xs={12} sm={12} sx={{mb: 2}}>
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
        </form>
        <DialogActions>
          <Button className='btn closeBtn' onClick={handleClose}>HỦY</Button>
          <Button className='btn saveBtn' onClick={handleClose}>LƯU THAY ĐỔI</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}