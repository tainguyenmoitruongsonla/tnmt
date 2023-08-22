import React, { useEffect, useState } from 'react';
import { Add, Edit, Save } from '@mui/icons-material';
import { Autocomplete, Button, CircularProgress, DialogActions, Grid, TextField, Typography } from '@mui/material';
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen';
import LicenseFieldset, { LicenseState } from 'src/views/license/form/license-fieldset';
import ConstructionField from 'src/views/construction/form/sufacewater/cons-suface';
import LicenseFeeFeild from 'src/views/license-fee/form/licensefee-feild';
import post from 'src/api/post';
import fetchData from 'src/api/fetch';
import FormBusiness from 'src/views/business/form';

interface FormLicenseProps {
  data: any;
  closeDialogs: () => void;
  setPostSuccess?: (value: boolean) => void;
}

const FormLicense: React.FC<FormLicenseProps> = ({ data, closeDialogs, setPostSuccess }) => {

  const [fetching, setFetching] = useState(true)
  const [saving, setSaving] = useState(false);

  //Business
  const [listBusiness, setListBusiness] = useState<any>([]);
  const [business, setBusiness] = useState<any>({});

  //License
  const [licenseData, setLicenseData] = useState<LicenseState>(data);

  const handleLicenseChange = (data: any) => {
    console.log(data)
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newLic = {
      ...licenseData,
      businessId: business.id
    }

    console.log({ licFee: licenseFeeData, cons: constructionData })

    const handleApiCall = async () => {
      setSaving(true)
      setFetching(true)
      try {
        const res = await post('License/save', newLic);

        if (res) {
          // Reset form fields
          setLicenseData({
            id: 0,
            childId: 0,
            licensingTypeId: 0,
            businessId: 0,
            licenseName: '',
            licenseNumber: '',
            signDate: null,
            issueDate: null,
            expriteDate: null,
            duration: '',
            licensingAuthorities: 0,
            relatedDocumentFile: '',
            licenseRequestFile: '',
          });
          typeof (setPostSuccess) === 'function' ? setPostSuccess(true) : '';
        }
      } catch (error) {
      } finally {
        setSaving(false)
        setFetching(false)
      }
    };

    // Call the function
    handleApiCall();
    closeDialogs();
  };

  useEffect(() => {
    let isMounted = true; // Flag to track component mount status

    const getData = async () => {
      setFetching(true)
      try {
        const data = await fetchData('Business/list');
        if (isMounted) {
          setListBusiness(data);
        }
      } catch (error) {
        if (isMounted) {
          setListBusiness([]);
        }
      } finally {
        if (isMounted) {
          setFetching(false)
        }
      }
    };

    getData();

    return () => {
      isMounted = false; // Set the flag to false when unmounting
    };
  }, []);

  const handleClose = () => {
    closeDialogs();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <fieldset>
            <legend>
              <Typography variant={'subtitle1'} className="legend__title">THÔNG TIN TỔ CHỨC/CÁ NHÂN</Typography>
            </legend>
            {fetching ? <CircularProgress size={20} /> : (
              <Grid container spacing={4} alignContent={'center'}>
                <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
                  <Autocomplete
                    size="small"
                    options={listBusiness}
                    getOptionLabel={(option: any) => option.name}
                    defaultValue={listBusiness?.find((option: any) => option.id === licenseData?.businessId) || null}
                    isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
                    onChange={(event, value) => setBusiness(value)}
                    renderInput={(params: any) => (
                      <TextField
                        required
                        {...params}
                        fullWidth
                        label="Chủ giấy phép"
                        disabled={fetching}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                  <TextField
                    label='Địa chỉ'
                    size='small'
                    type='text'
                    fullWidth
                    placeholder=''
                    value={business?.address || ''} />
                </Grid>
                <Grid item xs={12} md={2} sm={12} sx={{ my: 2 }} alignContent={'center'}>
                  <FormBusiness isEdit={false} setPostSuccess={(prevState => !prevState)} />
                </Grid>
              </Grid>
            )}
          </fieldset>
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
        <Button type="submit" disabled={saving} className='btn saveBtn'> {saving ? <CircularProgress color='inherit' size={20} /> : <Save />} &nbsp; Lưu </Button>
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
