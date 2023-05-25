import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Typography, Grid, SelectChangeEvent } from '@mui/material';
import CreateHydroelectric from 'src/views/construction/CreateHydroelectric';

const MyComponent = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
    setShowForm(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Xử lý khi form được gửi đi
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>
          <Typography variant={'h6'}>THÔNG TIN CÔNG TRÌNH</Typography>
        </legend>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Chọn loại công trình</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                size='small'
                value={selectedValue}
                label='Chọn loại hình công trình'
                onChange={handleChange}
              >
                <MenuItem value="option1">Thủy điện</MenuItem>
                <MenuItem value={2}>Hồ chứa</MenuItem>
                <MenuItem value={3}>Trạm bơm</MenuItem>
                <MenuItem value={4}>Đập/Hệ thống thủy lợi</MenuItem>
                <MenuItem value={5}>Cống</MenuItem>
                <MenuItem value={6}>Trạm cấp nước</MenuItem>
                <MenuItem value={7}>Nhà máy nước</MenuItem>
                <MenuItem value={8}>Công trình khác</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Tên công trình' fullWidth placeholder='' defaultValue='' />
          </Grid>
        </Grid>
      </fieldset>

      {showForm && (
        <div>
          {selectedValue === 'option1' && (
            <Test />
          )}
          {selectedValue === '2' && (
            <form>
              <TextField label='Name' />
              <TextField label='Email' />
              <TextField label='Name' />
              <TextField label='Email' />
            </form>
          )}
          {selectedValue === '3' && (
            <form>
              <TextField label='Name' />
              <TextField label='Email' />
              <TextField label='Name' />
              <TextField label='Email' />
              <TextField label='Name' />
              <TextField label='Email' />
              <TextField label='Name' />
              <TextField label='Email' />
            </form>
          )}
        </div>
      )}
    </form>
  );
};

const Test= () => {
  return (
    <form>
      {/* Giao diện form cho loại công trình Thủy điện */}
      <TextField label='Field 1' />
      <TextField label='Field 2' />
    </form>
  );
};

export default MyComponent;

