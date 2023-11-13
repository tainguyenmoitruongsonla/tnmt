import React, { FC, FormEvent, ReactNode, useEffect, useState } from 'react';

// MUI Imports
import { Add, Edit, Save } from '@mui/icons-material';
import { Autocomplete, Button, CircularProgress, DialogActions, Grid, TextField, Typography, Paper, Tooltip, IconButton } from '@mui/material';
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen';

//Form Imports
import LicenseFieldset from 'src/views/license/form/license-fieldset';

import LicenseFeeFeild from 'src/views/license-fee/form/licensefee-feild';
import FormBusiness from 'src/views/business/form';


// API Imports
import { getData, saveData, uploadFile } from 'src/api/axios';

//Notistack Imports
import { enqueueSnackbar } from 'notistack';

//Interface Imports
import { ConstructionItemState, ConstructionSpecState, ConstructionState, emptyConstructionData } from 'src/views/construction/form/construction-interface';
import { LicenseFeeState } from 'src/views/license-fee/form/license-fee-interface';
import { FormLicenseProps, LicenseState, emptyLicenseData } from './license-interface';
import ConstructionItem from 'src/views/construction/form/cons-item';
import { useRouter } from 'next/router';
import SurfaceWaterField from 'src/views/construction/form/cons-suface';
import GroundWaterField from 'src/views/construction/form/cons-ground';
import DischargeWaterField from 'src/views/construction/form/cons-discharge';
import dayjs from 'dayjs';

const FormLicense: FC<FormLicenseProps> = ({ data, closeDialogs, setPostSuccess }) => {

  const [fetching, setFetching] = useState(true)
  const [saving, setSaving] = useState(false);

  //Business
  const [listBusiness, setListBusiness] = useState<any>([]);
  const [business, setBusiness] = useState<any>(data?.tochuc_canhan || {});
  const [fileUpload, setFileUpload] = useState<any>({})
  const [saveBusinessSuccess, setBusinessSuccess] = useState<boolean>(false)
  const handleSaveBusinessSuccess = () => {
    setBusinessSuccess(prevState => !prevState);
  };

  //License
  const [giayphep, setgiayphep] = useState<LicenseState>(data);

  const handleLicenseChange = (data: any, fileupload: any) => {
    setFileUpload(fileupload)
    setgiayphep(data);
  };

  //Construction
  const [congtrinh, setCongTrinh] = useState<ConstructionState>(data?.congtrinh || {});
  const [thongso_congtrinh, setThongSoCongTrinh] = useState<ConstructionSpecState>(data?.congtrinh || {});
  const handleConstructionChange = (data: any) => {
    setCongTrinh(data.consData);
    setThongSoCongTrinh(data.consSpec)
  };

  //Construction
  const [consItemData, setConsItemData] = useState<ConstructionItemState[]>(data?.congtrinh?.hangmuc || []);
  const [consItemDataDetele, setConsItemDataDelete] = useState<any>();

  const handleconsItemChange = (dataSave: any, dataDelete: any) => {
    setConsItemDataDelete(dataDelete)
    setConsItemData(dataSave);
  };

  //licenseFee
  const [tiencp, settiencp] = useState<LicenseFeeState[]>(data?.tiencq || []);
  const [tiencpRemove, settiencpRemove] = useState<LicenseFeeState[]>([]);

  //Hooks
  const router = useRouter()


  const handleLicenseFeeChange = (dataSave: any, dataDelete: any) => {
    // Handle the updated license data here
    settiencp(dataSave);
    settiencpRemove(dataDelete)
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (
      !business?.id ||
      !giayphep?.soGP ||
      !giayphep?.ngayKy ||
      !giayphep?.ngayCoHieuLuc ||
      !giayphep?.coQuanCapPhep ||
      !giayphep?.idLoaiGP ||
      !fileUpload.fileGiayPhep && fileUpload.fileGiayPhep
    ) {
      let res: string | undefined = undefined;

      if (!business?.id) {
        res = 'Chủ giấy phép*';
      } else if (!giayphep?.soGP) {
        res = 'Số giấy phép*';
      } else if (!giayphep?.ngayKy) {
        res = 'Ngày ký giấy phép*';
      } else if (!giayphep?.ngayCoHieuLuc) {
        res = 'Ngày có hiệu lực *';
      } else if (!giayphep?.coQuanCapPhep) {
        res = 'Cơ quan cấp phép *';
      } else if (!giayphep?.idLoaiGP) {
        res = 'Loại giấy phép *';
      } else if (!giayphep?.fileGiayPhep && !giayphep?.fileGiayPhep) {
        res = 'File giấy phép *';
      }

      if (res) {
        enqueueSnackbar(`${res} không được để trống`, { variant: 'warning' });
      }

      return;
    }

    // Call the function
    handleApiCall();
  };

  const handleApiCall = async () => {
    setSaving(true)
    setFetching(true)
    try {

      const saveCons = await saveData('cong-trinh/luu', congtrinh);

      if (saveCons) {

        await saveData('thong-so-ct/luu', { ...thongso_congtrinh, idCT: saveCons.id, idHangMucCT: null })

        consItemDataDetele.map(async (e: any) => {
          await saveData('hang-muc-ct/xoa', e);
        })

        consItemData.map(async (e: any) => {
          await saveData('hang-muc-ct/luu', e);
        })

        const filePath = `pdf/giay-phep/${giayphep?.coQuanCapPhep?.toLowerCase()}/${router.pathname.split('/')[2]}/${dayjs(giayphep?.ngayKy).year()}/${giayphep?.soGP?.replace(/\//g, "_").toLowerCase()}`;

        const newfileGiayPhep = {
          filePath: filePath,
          fileName: giayphep?.fileGiayPhep,
          file: fileUpload.fileGiayPhep
        }

        const newfileDonXinCP = {
          filePath: filePath,
          fileName: giayphep?.fileDonXinCP,
          file: fileUpload.fileDonXinCP
        }

        const newfileGiayToLienQuan = {
          filePath: filePath,
          fileName: giayphep?.fileGiayToLienQuan,
          file: fileUpload.fileGiayToLienQuan
        }

        const newLic: LicenseState = {
          ...giayphep,
          idTCCN: business.id,
          idCT: saveCons.id,
          fileGiayPhep: `${filePath}/${giayphep?.soGP?.replace(/\//g, "_").toLowerCase()}.pdf`
        }

        const saveLic = await saveData('giay-phep/luu', newLic);

        if (saveLic) {
          if (newfileGiayPhep?.fileName && newfileGiayPhep?.fileName !== null && newfileGiayPhep?.file && newfileGiayPhep?.file !== null) {
            await uploadFile(newfileGiayPhep)
          }
          if (newfileDonXinCP.fileName && newfileDonXinCP.fileName !== null && newfileDonXinCP.file && newfileDonXinCP.file !== null) {
            await uploadFile(newfileDonXinCP)
          }
          if (newfileGiayToLienQuan.fileName && newfileGiayToLienQuan.fileName !== null && newfileGiayToLienQuan.file && newfileGiayToLienQuan.file !== null) {
            await uploadFile(newfileGiayToLienQuan)
          }

          tiencpRemove?.map(async (e: any) => {
            const saveLicFee = await saveData('tien-cap-quyen/xoa', e)
            if (saveLicFee) {
              await saveData('GP_TCQ/xoa', { id: 0, idGP: saveLic.id, idTCQ: e.id });
            }
          })

          tiencp?.map(async (e: any) => {
            e.coQuanCapPhep = giayphep?.coQuanCapPhep;
            const saveLicFee = await saveData('tien-cap-quyen/luu', e);
            if (saveLicFee.id) {
              const fileTCQ = {
                filePath: `pdf/tien-cap-quyen/${e.coQuanCapPhep.toLowerCase()}/${dayjs(e.ngayKy)?.year()}`,
                fileName: e?.filePDF,
                file: e.fileUpload
              }
              if (fileTCQ.fileName && fileTCQ.fileName !== null && fileTCQ.file && fileTCQ.file !== null) {
                await uploadFile(fileTCQ)
              }

              await saveData('GP_TCQ/luu', { id: 0, idGP: saveLic.id, idTCQ: saveLicFee.id });
            }
          })

        }

        // Reset form fields
        setCongTrinh(emptyConstructionData);
        setgiayphep(emptyLicenseData);
        settiencp([]);
        settiencpRemove([])

        typeof (setPostSuccess) === 'function' ? setPostSuccess(true) : '';
      }
    } catch (error) {
    } finally {
      setSaving(false)
      setFetching(false)
      closeDialogs();
    }
  };

  useEffect(() => {
    let isMounted = true; // Flag to track component mount status

    const getDataBusiness = async () => {
      setFetching(true)
      try {
        const data = await getData('to-chuc-ca-nhan/danh-sach');
        if (giayphep?.idTCCN && giayphep?.idTCCN > 0) {
          const singleBusiness = await getData(`to-chuc-ca-nhan/${giayphep?.idTCCN}`)
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

    getDataBusiness();

    return () => {
      isMounted = false; // Set the flag to false when unmounting
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveBusinessSuccess]);

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
                    getOptionLabel={(option: any) => option.tenTCCN}
                    defaultValue={listBusiness?.find((option: any) => option.id === business?.id) || null}
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
                    value={business?.diaChi || ''} />
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
          <LicenseFeeFeild data={tiencp} onChange={handleLicenseFeeChange} />
        </Grid>
        <Grid item xs={12}>
          {
            router.pathname.split('/')[2] == 'nuoc-mat' ?
              <SurfaceWaterField data={congtrinh} onChange={handleConstructionChange} />
              :
              router.pathname.split('/')[2] == 'nuoc-duoi-dat' ?
                <GroundWaterField data={congtrinh} onChange={handleConstructionChange} />
                :
                router.pathname.split('/')[2] == 'xa-thai' ?
                  <DischargeWaterField data={congtrinh} onChange={handleConstructionChange} />
                  : ''
          }

        </Grid>
        <Grid item xs={12}>
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
              variant='outlined' size='small' fullWidth sx={{ borderRadius: 0 }}
              startIcon={<Add />}
              onClick={() =>
                openDialogs(<FormLicense data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
              }
            >
              Thêm
            </Button>
          )}
        </>
      )}
    </DialogsControlFullScreen>
  );
};

export default CreateLicense;
