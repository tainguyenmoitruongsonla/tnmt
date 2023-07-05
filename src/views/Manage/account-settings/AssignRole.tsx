//  **  Imports React
import React, { useState, useEffect, ChangeEvent } from 'react';

// ** Imports MUI
import { Grid, DialogActions, Typography, TextField, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Button } from '@mui/material';

// ** Imports Icons
import { ShieldTwoTone } from '@mui/icons-material';

// ** Imports Component
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen';
import fetchData from 'src/api/fetch';
import postData from 'src/api/post';
import { useLoadingContext } from 'src/@core/theme/loading-provider';

interface State {
  userId: string
  roleName: string
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {

  const [roleData, setRoleData] = useState([]);
  const { showLoading, hideLoading } = useLoadingContext();
  const [values, setValues] = useState<State>({
    userId: data?.id,
    roleName: data?.role,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        showLoading();
        const data = await fetchData('Role/list');
        setRoleData(data);
      } catch (error) {
        setRoleData([]);
      }
      hideLoading();
    };

    getData();
  }, []);

  const handleChange = (prop: keyof State, roleName: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const newValue = checked ? roleName : '';
    setValues((prevValues) => ({
      ...prevValues,
      [prop]: newValue,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const handleApiCall = async () => {
      showLoading();
      const res = await postData('Auth/assign-role', values);

      if (res) {
        // Reset form fields
        setValues({
          userId: '',
          roleName: '',
        });

        if (typeof setPostSuccess === 'function') {
          setPostSuccess(true);
        }
        closeDialogs();
      }
      hideLoading();
    };

    // Call the function
    handleApiCall();
  };

  const handleClose = () => {
    setValues({
      userId: '',
      roleName: '',
    });

    closeDialogs();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={7} sx={{ px: 10, pt: 10 }}>
          <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
            <Typography variant='h6'>THÔNG TIN TÀI KHOẢN</Typography>
          </Grid>
          <Grid item xs={12} md={3} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth disabled label='Tên đăng nhập' placeholder=' ' value={data.userName || ''} />
          </Grid>
          <Grid item xs={12} md={3} sx={{ my: 2 }}>
            <TextField size='small' type='text' fullWidth disabled label='Họ tên' placeholder=' ' value={data.fullName || ''} />
          </Grid>
          <Grid item xs={12} md={3} sx={{ my: 2 }}>
            <TextField size='small' type='email' fullWidth disabled label='Email' placeholder=' ' value={data.email || ''} />
          </Grid>
          <Grid item xs={12} md={3} sx={{ my: 2 }}>
            <TextField size='small' type='phone' fullWidth disabled label='Số điện thoại' placeholder=' ' value={data.phoneNumber || ''} />
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
                {roleData.map((row: any, key) => (
                  <TableRow key={key}>
                    <TableCell size='small'>
                      {row?.name}
                    </TableCell>
                    <TableCell size='small'>
                      <Checkbox
                        name='isDefault'
                        checked={values.roleName === row.name}
                        onChange={handleChange('roleName', row.name)}
                      />

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
        <DialogActions>
          <Button className='btn closeBtn' onClick={handleClose}>HỦY</Button>
          <Button type='submit' className='btn saveBtn'>LƯU THAY ĐỔI</Button>
        </DialogActions>
      </form>
    </div>
  );
};

const AssignRole = ({ data, setPostSuccess }: any) => {

  const formTitle = 'Phân quyền truy cập';

  return (
    <>
      <DialogsControlFullScreen>
        {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
          <>
            <ShieldTwoTone className='tableActionBtn' onClick={() => openDialogs(<Form data={data} setPostSuccess={setPostSuccess} closeDialogs={closeDialogs} />, formTitle)} />
          </>
        )}
      </DialogsControlFullScreen>
    </>
  );
}
export default AssignRole;