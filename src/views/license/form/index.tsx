import React from 'react'
import { Add, EditNote } from '@mui/icons-material'
import { Button, DialogActions, Grid } from '@mui/material'


import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import BusinessFieldset from './business-fieldset';
import LicenseFieldset from './license-fieldset';
import ConsFieldset from './cons-fieldset'

const FormLicense = ({ data, closeDialogs }: any) => {

  const handleSubmit = (event: any) => {
    event.preventDefault()
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
          <LicenseFieldset data={data} />
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

interface CreateLicenseProps {
  isEdit: boolean;
  data?: any;
}

const CreateLicense = ({ isEdit, data }: CreateLicenseProps) => {
  const formTitle = isEdit ? 'Sửa giấy phép' : 'Thêm mới giấy phép'

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {isEdit ? (
            <EditNote
              className='tableActionBtn'
              onClick={() =>
                openDialogs(<FormLicense data={data} closeDialogs={closeDialogs} />, formTitle)
              }
            />
          ) : (
            <Button
              size="small" startIcon={<Add />}
              onClick={() =>
                openDialogs(<FormLicense data={data} closeDialogs={closeDialogs} />, formTitle)
              }
            >Thêm mới
            </Button>
          )}
        </>
      )}
    </DialogsControlFullScreen>
  )
}

export default CreateLicense
