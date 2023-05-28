import React, { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Grid, Button, TextField, DialogActions, Autocomplete } from "@mui/material";
import DialogsControl from 'src/views/DialogControl'

const complete1 = [{ title: 'Khóa 1' }, { title: 'Khóa 2' }, { title: 'Khóa 3' }]
 
const Form = ({ onSubmit, closeDialogs }: any) => {
  const [name, setName] = useState('');
  const [pagelink, setPagelink] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(name, pagelink, description);
    closeDialogs();
  };

  const handleClose = () => {
    closeDialogs();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={12} sx={{my: 2}}>
            <Autocomplete
              size='small'
              options={complete1}
              getOptionLabel={option => option.title}
              renderInput={params => (
                <TextField {...params} variant='outlined' label='Chọn loại công trình' placeholder='' />
              )}
            />
        </Grid>
        <Grid item xs={12} md={12} sx={{my: 2}}>
            <Autocomplete
                size='small'
                options={complete1}
                getOptionLabel={option => option.title}
                renderInput={params => (
                    <TextField {...params} variant='outlined' label='Chọn cơ quan GP' placeholder='' />
                )}
                />
        </Grid>
        <Grid item xs={12} md={12} sx={{my: 2}}>
            <Autocomplete
                size='small'
                options={complete1}
                getOptionLabel={option => option.title}
                renderInput={params => (
                    <TextField {...params} variant='outlined' label='Chọn huyện' placeholder='' />
                )}
                />
        </Grid>
        <Grid item xs={12} md={12} sx={{my: 2}}>
            <Autocomplete
                size='small'
                options={complete1}
                getOptionLabel={option => option.title}
                renderInput={params => (
                    <TextField {...params} variant='outlined' label='Chọn tiểu vùng quy hoạch' placeholder='' />
                )}
                />
        </Grid>
        <Grid item xs={12} md={12} sx={{my: 2}}>
            <TextField variant='outlined' fullWidth label='Nhập số GP' placeholder='' />
        </Grid>
        <Grid item xs={12} md={12} sx={{my: 2}}>
            <TextField variant='outlined' fullWidth label='Nhập tên công trình' placeholder='' />
        </Grid>
      </Grid>
      <DialogActions sx={{p:0,mt:2,justifyContent:'center'}}>
        <Button onClick={() => handleClose()} className='btn closeBtn'>Hủy</Button>
        <Button type="submit" className='btn saveBtn'>Tìm kiếm</Button>
      </DialogActions>
    </form>
  );
};

const SearchConstruction = () => {
  const formTitle = 'Tìm kiếm nâng cao';
  const handleSubmit = (name: any, pagelink: any, description: any) => {
    // handle form submission logic here
  };

  return (
    <DialogsControl>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
            <Button size='small' startIcon={<FilterAltIcon/>} variant="outlined" onClick={() => openDialogs(<Form onSubmit={handleSubmit} closeDialogs={closeDialogs} />, formTitle)}>Bộ lọc</Button>
        </>
      )}
    </DialogsControl>
  );
};

export default SearchConstruction;
