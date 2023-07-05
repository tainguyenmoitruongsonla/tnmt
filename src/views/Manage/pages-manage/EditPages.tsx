import DialogsControl from 'src/@core/components/dialog-control';
import { EditNote, PersonAddAlt } from "@mui/icons-material";
import { Grid, Button, TextField, DialogActions, IconButton, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { ChangeEvent, useState } from 'react';
import { useLoadingContext } from 'src/@core/theme/loading-provider';
import postData from 'src/api/post';

interface State {
  id?: number,
  name?: string,
  path?: string,
  description?: string,
  permitAccess?: boolean,
}


const Form = ({ data, setPostSuccess, closeDialogs }: any) => {

  const [values, setValues] = useState<State>({
    id: data?.id || 0,
    name: data?.name || '',
    path: data?.path || '',
    description: data?.description || '',
    permitAccess: data?.permitAccess || false,
  });

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setValues({ ...values, [prop]: value });
  };

  const { showLoading, hideLoading } = useLoadingContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const handleApiCall = async () => {
      showLoading();
      const res = await postData('Dashboard/save', values);

      if (res) {
        // Reset form fields
        setValues({
          id: 0,
          name: '',
          path: '',
          description: '',
          permitAccess: false,
        });

        typeof (setPostSuccess) === 'function' ? setPostSuccess(true) : '';
        closeDialogs();
      }
      hideLoading();
    };

    // Call the function
    handleApiCall();
  };

  const handleClose = () => {
    setValues({
      id: 0,
      name: '',
      path: '',
      description: '',
      permitAccess: false,
    });

    closeDialogs();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' fullWidth label='Tên' placeholder='' value={values?.name} onChange={handleChange('name')} />
        </Grid>
        <Grid item xs={12} md={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' fullWidth label='Đường dẫn' placeholder='' value={values?.path} onChange={handleChange('path')} />
        </Grid>
        <Grid item xs={12} md={12} sx={{ my: 2 }}>
          <TextField size='small' type='text' fullWidth label='Mô tả' placeholder='' value={values?.description} onChange={handleChange('description')} />
        </Grid>
        <Grid item xs={12} md={12} sx={{ my: 2 }}>
          <FormControlLabel control={<Checkbox name='permitAccess' checked={!!values?.permitAccess} onChange={handleChange('permitAccess')} />} label="Cho phép truy cập" />
        </Grid>
      </Grid>
      <DialogActions sx={{ p: 0 }}>
        <Button onClick={() => handleClose()} className='btn closeBtn'>Hủy</Button>
        <Button type="submit" className='btn saveBtn'>Lưu</Button>
      </DialogActions>
    </form>
  );
};

const EditPages = ({ data, isEdit, setPostSuccess }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin trang truy cập' : 'Thêm trang truy cập';

  return (
    <DialogsControl>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {
            isEdit ?
              <EditNote className='tableActionBtn' onClick={() => openDialogs(<Form data={data} setPostSuccess={setPostSuccess} isEdit={isEdit} closeDialogs={closeDialogs} />, formTitle)} />
              :
              <IconButton className='addNewBtn' aria-label="add user" onClick={() => openDialogs(<Form data={data} setPostSuccess={setPostSuccess} isEdit={isEdit} closeDialogs={closeDialogs} />, formTitle)}>
                <PersonAddAlt sx={{ mr: 2 }} />
                <Typography>Thêm mới</Typography>
              </IconButton>

          }
        </>
      )}
    </DialogsControl>
  );
};

export default EditPages;
