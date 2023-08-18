import React, { useState } from 'react';
import { Add, Edit } from '@mui/icons-material';
import { Button, DialogActions, Grid } from '@mui/material';

import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen';
import BusinessFieldset from 'src/views/business/form/business-fieldset';
import LicenseFieldset from 'src/views/license/form/license-fieldset';
import ConstructionField from 'src/views/construction/form/sufacewater/cons-suface';
import LicenseFeeFeild from 'src/views/license-fee/form/licensefee-feild';
import { useLoadingContext } from 'src/@core/theme/loading-provider';
import post from 'src/api/post';

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
  const [licenseData, setLicenseData] = useState<any>(data);

  const handleLicenseChange = (data: any) => {
    setLicenseData(data);
  };

  //Construction
  const [constructionData, setConstructionData] = useState<any>({});

  const handleConstructionChange = (data: any) => {
    setConstructionData(data);
  };

  //licenseFee
  const [licenseFeeData, setLicenseFeeData] = useState<any[]>([]);

  const handleLicenseFeeChange = (data: any) => {
    // Handle the updated license data here
    setLicenseFeeData(data);
  };

  const { showLoading, hideLoading } = useLoadingContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newVal = {
      license: licenseData,
      business: businessData,
      licenseFees: licenseFeeData,
      construction: constructionData
    }

    const handleApiCall = async () => {
      showLoading();
      const res = await post('License/save', newVal.license);

      console.log(res)

      if (res.id) {
        // Reset form fields
        setLicenseData({});
        typeof (setPostSuccess) === 'function' ? setPostSuccess(true) : '';
        hideLoading();
      }
      hideLoading();
    };

    // Call the function
    handleApiCall();
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
          <LicenseFieldset data={data} onChange={handleLicenseChange} />
        </Grid>
        <Grid item xs={12}>
          <LicenseFeeFeild data={data?.licenseFee} onChange={handleLicenseFeeChange} />
        </Grid>
        <Grid item xs={12}>
          <ConstructionField data={data?.consData} onChange={handleConstructionChange} />
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
