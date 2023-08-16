import React, { useState } from 'react';
import { Add, Edit } from '@mui/icons-material';
import { Button, DialogActions, Grid } from '@mui/material';

import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen';
import BusinessFieldset from 'src/views/business/form/business-fieldset';
import LicenseFieldset from 'src/views/license/form/license-fieldset';
import ConstructionField from 'src/views/construction/form/sufacewater/cons-suface';

interface FormLicenseProps {
  data: any;
  closeDialogs: () => void;
  setPostSuccess?: (value: boolean) => void;
}

const FormLicense: React.FC<FormLicenseProps> = ({ data, closeDialogs, setPostSuccess }) => {

  //Business
  const [businessData, setBusinessData] = useState<any>({});

  const handleBusinessChange = (data: any) => {
    setBusinessData(data);
  };

  //License
  const [licenseData, setLicenseData] = useState<any>({});

  const handleLicenseChange = (data: any) => {
    setLicenseData(data);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    //format data type = date(Dayjs) to new Date() 
    licenseData.signDate = licenseData.signDate?.toDate();
    licenseData.issueDate = licenseData.issueDate?.toDate();
    licenseData.expriteDate = licenseData.expriteDate?.toDate();

    const newVal = {
      license: licenseData,
      business: businessData
    }

    //Set postSuccess before hideLoading
    typeof (setPostSuccess) === 'function' ? setPostSuccess(false) : '';

    console.log(newVal)

    closeDialogs();
  };

  const handleClose = () => {
    closeDialogs();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <BusinessFieldset data={data?.business} onChange={handleBusinessChange} />
        </Grid>
        <Grid item xs={12}>
          <LicenseFieldset data={data?.license} onChange={handleLicenseChange} />
        </Grid>
        <Grid item xs={12}>
          <ConstructionField />
        </Grid>
      </Grid>

      <DialogActions sx={{ p: 0, mt: 5 }}>
        <Button size='small' onClick={handleClose} className='btn cancleBtn'>
          Hủy
        </Button>
        <Button size='small' type='submit' className='btn saveBtn'>
          Lưu
        </Button>
      </DialogActions>
    </form>
  );
};

interface CreateLicenseProps {
  isEdit: boolean;
  data?: any;
  setPostSuccess?: (value: boolean) => void;
}

const CreateLicense: React.FC<CreateLicenseProps> = ({ isEdit, data, setPostSuccess }) => {
  const formTitle = isEdit ? 'Sửa giấy phép' : 'Thêm mới giấy phép';

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {isEdit ? (
            <Edit
              className='tableActionBtn'
              onClick={() =>
                openDialogs(<FormLicense data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
              }
            />
          ) : (
            <Button
              size="small"
              startIcon={<Add />}
              onClick={() =>
                openDialogs(<FormLicense data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
              }
            >
              Thêm mới
            </Button>
          )}
        </>
      )}
    </DialogsControlFullScreen>
  );
};

export default CreateLicense;
