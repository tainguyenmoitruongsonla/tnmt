import React from 'react'
import { EditNote } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import { Button, DialogActions, Grid } from '@mui/material'


import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import BusinessFieldset from './business-fieldset';
import LicenseFieldset from './license-fieldset';
import ConsFieldset from './cons-fieldset'

const FormContruction = ({ onSubmit, closeDialogs }: any) => {

  const handleSubmit = (event: any) => {
    event.preventDefault()
    onSubmit()
    closeDialogs()
  }

  const handleClose = () => {
    closeDialogs()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <BusinessFieldset />
        </Grid>
        <Grid item xs={12}>
          <LicenseFieldset />
        </Grid>
        <Grid item xs={12}>
          <ConsFieldset />
        </Grid>
      </Grid>

      <DialogActions sx={{ p: 0, mt: 5 }}>
        <Button size='small' onClick={() => handleClose()} className='btn closeBtn'>
          Hủy
        </Button>
        <Button size='small' type='submit' className='btn saveBtn'>
          Lưu
        </Button>
      </DialogActions>
    </form>
  )
}

const CreateLicense = ({ isEdit }: { isEdit: boolean }) => {
  const formTitle = isEdit ? 'Sửa giấy phép' : 'Thêm mới giấy phép'
  const handleSubmit = () => {
    // handle form submission logic here
  }

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {isEdit ? (
            <EditNote
              onClick={() =>
                openDialogs(<FormContruction onSubmit={handleSubmit} closeDialogs={closeDialogs} />, formTitle)
              }
            />
          ) : (
            <Button
              size='small'
              fullWidth
              startIcon={<AddIcon />}
              variant='outlined'
              onClick={() =>
                openDialogs(<FormContruction onSubmit={handleSubmit} closeDialogs={closeDialogs} />, formTitle)
              }
            >
              Thêm mới
            </Button>
          )}
        </>
      )}
    </DialogsControlFullScreen>
  )
}

export default CreateLicense
