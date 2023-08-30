import React, { FC, FormEvent, ReactNode, useEffect, useState } from 'react';

// MUI Imports
import { Add, Edit, Save } from '@mui/icons-material';
import { Autocomplete, Button, CircularProgress, DialogActions, Grid, TextField, Typography, Paper, Tooltip, IconButton } from '@mui/material';
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen';

//Form Imports
import LicenseFieldset from 'src/views/license/form/license-fieldset';
import ConstructionField from 'src/views/construction/form/sufacewater/cons-suface';
import LicenseFeeFeild from 'src/views/license-fee/form/licensefee-feild';
import FormBusiness from 'src/views/business/form';
import ConstructionItem from 'src/views/construction/form/sufacewater/cons-item';

// API Imports
import post from 'src/api/post';
import fetchData from 'src/api/fetch';

//Notistack Imports
import { enqueueSnackbar } from 'notistack';

//Interface Imports
import { ConstructionItemState, ConstructionState, emptyConstructionData } from 'src/views/construction/form/construction-interface';
import { LicenseFeeState } from 'src/views/license-fee/form/license-fee-interface';
import { FormLicenseProps, LicenseState, emptyLicenseData } from './license-interface';

const FormLicense: FC<FormLicenseProps> = ({ data, closeDialogs, setPostSuccess }) => {

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
  const [constructionData, setConstructionData] = useState<ConstructionState>(data?.construction || {});

  const handleConstructionChange = (data: any) => {
    setConstructionData(data);
  };

  //Construction
  const [consItemData, setConsItemData] = useState<ConstructionItemState[]>(data?.construction?.constructionItems || []);
  const [consItemDataDetele, setConsItemDataDelete] = useState<any>();

  const handleconsItemChange = (dataSave: any, dataDelete: any) => {
    setConsItemDataDelete(dataDelete)
    setConsItemData(dataSave);
  };

  //licenseFee
  const [licenseFeeData, setLicenseFeeData] = useState<LicenseFeeState[]>(data?.licenseFees || []);
  const [licenseFeeDataRemove, setLicenseFeeDataRemove] = useState<LicenseFeeState[]>([]);


  const handleLicenseFeeChange = (dataSave: any, dataDelete: any) => {
    // Handle the updated license data here
    setLicenseFeeData(dataSave);
    setLicenseFeeDataRemove(dataDelete)
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (
      !licenseData?.businessId && licenseData?.businessId > 0 ||
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

    const handleApiCall = async () => {
      setSaving(true)
      setFetching(true)
      try {

        const saveCons = await post('Construction/save', constructionData);

        if (saveCons) {

          consItemDataDetele.map(async (e: any) => {
            await post('ConstructionDetail/delete', e);
          })

          consItemData.map(async (e: any) => {
            await post('ConstructionDetail/save', e);
          })

          const newLic = {
            ...licenseData,
            businessId: business.id,
            constructionId: saveCons.id,
          }

          const saveLic = await post('License/save', newLic);

          if (saveLic) {
            licenseFeeDataRemove?.map(async (e: any) => {
              const saveLicFee = await post('LicenseFee/delete', e)
              if (saveLicFee) {
                await post('LicenseLicenseFee/delete', { id: 0, licenseId: saveLic.id, licenseFeeId: e.id });
              }
            })

            licenseFeeData?.map(async (e: any) => {
              e.licensingAuthorities = newLic.licensingAuthorities;
              const saveLicFee = await post('LicenseFee/save', e);
              if (saveLicFee.id) {
                await post('LicenseLicenseFee/save', { id: 0, licenseId: saveLic.id, licenseFeeId: saveLicFee.id });
              }
            })
          }

          // Reset form fields
          setConstructionData(emptyConstructionData);
          setLicenseData(emptyLicenseData);
          setLicenseFeeData([]);
          setLicenseFeeDataRemove([])

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
          <LicenseFeeFeild data={licenseFeeData} onChange={handleLicenseFeeChange} />
        </Grid>
        <Grid item xs={12}>
          <ConstructionField data={constructionData} onChange={handleConstructionChange} />
          <ConstructionItem data={consItemData} onChange={handleconsItemChange} />
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

const CreateLicense: FC<CreateLicenseProps> = ({ isEdit, data, setPostSuccess }) => {
  const formTitle = isEdit ? 'Sửa giấy phép' : 'Thêm mới giấy phép';

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: ReactNode, title: ReactNode) => void, closeDialogs: () => void) => (
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
