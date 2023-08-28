import React, { useEffect, useState } from 'react';
import { Add, Edit, Save } from '@mui/icons-material';
import { Autocomplete, Button, CircularProgress, DialogActions, Grid, TextField, Typography, Paper, Tooltip, IconButton } from '@mui/material';
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen';
import LicenseFieldset, { LicenseState } from 'src/views/license/form/license-fieldset';
import ConstructionField from 'src/views/construction/form/sufacewater/cons-suface';
import LicenseFeeFeild from 'src/views/license-fee/form/licensefee-feild';
import { LicenseFeeState } from 'src/views/license-fee/form';
import post from 'src/api/post';
import fetchData from 'src/api/fetch';
import FormBusiness from 'src/views/business/form';
import { enqueueSnackbar } from 'notistack';

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
  const [saveBusinessSuccess, setBusinessSuccess] = useState<boolean>(false)
  const handleSaveBusinessSuccess = () => {
    setBusinessSuccess(prevState => !prevState);
  };

  //License
  const [licenseData, setLicenseData] = useState<LicenseState>(data);

  const handleLicenseChange = (data: any) => {
    setLicenseData(data);
  };

  //Construction
  const [constructionData, setConstructionData] = useState<any>({});

  const handleConstructionChange = (data: any) => {
    setConstructionData(data);
  };

  //licenseFee
  const [licenseFeeData, setLicenseFeeData] = useState<LicenseFeeState[]>([]);
  const [licenseFeeDataRemove, setLicenseFeeDataRemove] = useState<LicenseFeeState[]>([]);


  const handleLicenseFeeChange = (dataSave: any, dataDelete: any) => {
    // Handle the updated license data here
    setLicenseFeeData(dataSave);
    setLicenseFeeDataRemove(dataDelete)
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newLic = {
      ...licenseData,
      businessId: business.id
    }

    if (
      !business || !licenseData?.businessId ||
      !licenseData?.licenseNumber ||
      !licenseData?.signDate ||
      !licenseData?.issueDate ||
      !licenseData?.licensingAuthorities ||
      !licenseData?.licensingTypeId
    ) {
      let res: string | undefined = undefined;

      if (!licenseData?.businessId && licenseData?.businessId > 0) {
        res = 'Chủ giấy phép*';
      } else if (!licenseData?.licenseNumber) {
        res = 'Số giấy phép*';
      } else if (!licenseData?.signDate) {
        res = 'Ngày ký giấy phép*';
      } else if (!licenseData?.issueDate) {
        res = 'Ngày có hiệu lực *';
      } else if (!licenseData?.licensingAuthorities) {
        res = 'Cơ quan cấp phép *';
      } else if (!licenseData?.licensingTypeId) {
        res = 'Loại giấy phép *';
      }

      if (res) {
        enqueueSnackbar(`${res} không được để trống`, { variant: 'warning' });
      }

      return;
    }

    console.log(constructionData)

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
            licenseName: null,
            licenseNumber: null,
            signDate: null,
            issueDate: null,
            expriteDate: null,
            duration: null,
            licensingAuthorities: null,
            relatedDocumentFile: null,
            licenseRequestFile: null,
          });

          licenseFeeDataRemove?.map(async (e: any) => {
            const licFee = await post('LicenseFee/delete', e)
            if (licFee) {
              await post('LicenseLicenseFee/delete', { id: 0, licenseId: res.id, licenseFeeId: e.id });
            }
          })

          licenseFeeData?.map(async (e: any) => {
            e.licensingAuthorities = newLic.licensingAuthorities;
            const licFee = await post('LicenseFee/save', e);
            if (licFee.id) {
              await post('LicenseLicenseFee/save', { id: 0, licenseId: res.id, licenseFeeId: licFee.id });
            }
          })

          typeof (setPostSuccess) === 'function' ? setPostSuccess(true) : '';
        }
      } catch (error) {
      } finally {
        setSaving(false)
        setFetching(false)
        closeDialogs();
      }
    };

    // Call the function
    handleApiCall();
  };

  useEffect(() => {
    let isMounted = true; // Flag to track component mount status

    const getData = async () => {
      setFetching(true)
      try {
        const data = await fetchData('Business/list');
        if (licenseData?.businessId > 0) {
          const singleBusiness = await fetchData(`Business/${licenseData?.businessId}`)
          setBusiness(singleBusiness)
        }
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
  }, [licenseData?.businessId, saveBusinessSuccess]);

  const handleClose = () => {
    closeDialogs();
  };

  return (
    <Paper>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <fieldset>
            <legend>
              <Typography variant={'subtitle1'} className="legend__title">THÔNG TIN TỔ CHỨC/CÁ NHÂN</Typography>
            </legend>
            {fetching ? <CircularProgress size={20} /> : (
              <Grid container spacing={4} alignContent={'center'}>
                <Grid item xs={12} md={4} sm={12}>
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
                <Grid item xs={12} md={6} sm={12}>
                  <TextField
                    label='Địa chỉ'
                    size='small'
                    type='text'
                    fullWidth
                    placeholder=''
                    value={business?.address || ''} />
                </Grid>
                <Grid item xs={12} md={2} sm={12} alignContent={'center'}>
                  <FormBusiness isEdit={false} setPostSuccess={handleSaveBusinessSuccess} />
                </Grid>
              </Grid>
            )}
          </fieldset>
        </Grid>
        <Grid item xs={12}>
          <LicenseFieldset data={data} onChange={handleLicenseChange} />
        </Grid>
        <Grid item xs={12}>
          <LicenseFeeFeild data={data?.licenseFees} onChange={handleLicenseFeeChange} />
        </Grid>
        <Grid item xs={12}>
          <ConstructionField data={data?.consData} onChange={handleConstructionChange} />
        </Grid>
      </Grid>

      <DialogActions sx={{ p: 0, mt: 5 }}>
        <Button size='small' onClick={handleClose} className='btn cancleBtn'>
          Hủy
        </Button>
        <Button disabled={saving} className='btn saveBtn' onClick={handleSubmit}> {saving ? <CircularProgress color='inherit' size={20} /> : <Save />} &nbsp; Lưu </Button>
      </DialogActions>
    </Paper>
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
            <Tooltip title="Chỉnh sửa giấy phép">
              <IconButton onClick={() =>
                openDialogs(<FormLicense data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
              }>
                <Edit
                  className='tableActionBtn'

                />
              </IconButton>
            </Tooltip>

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
