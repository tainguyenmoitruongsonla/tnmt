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
import { deleteData, getData, saveData, uploadFile } from 'src/api/axios';

//Notistack Imports
import { enqueueSnackbar } from 'notistack';

//Interface Imports
import { ConstructionItemState, ConstructionSpecState, ConstructionState, MiningPurposeState, emptyConstructionData, propConsDataState } from 'src/views/construction/form/construction-interface';
import { LicenseFeeState } from 'src/views/license-fee/form/license-fee-interface';
import { FormLicenseProps, LicenseState, emptyLicenseData } from './license-interface';
import { useRouter } from 'next/router';
import SurfaceWaterField from 'src/views/construction/form/cons-suface';
import GroundWaterField from 'src/views/construction/form/cons-ground';
import DischargeWaterField from 'src/views/construction/form/cons-discharge';
import dayjs from 'dayjs';

const FormLicense: FC<FormLicenseProps> = ({ data, closeDialogs, setPostSuccess }) => {

  //Hooks
  const router = useRouter()

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
  const [congtrinh, setCongTrinh] = useState<ConstructionState | null>(data?.congtrinh || null);
  const [thongso_congtrinh, setThongSoCongTrinh] = useState<ConstructionSpecState | null>(data?.congtrinh?.thongso || null);
  const [hangmuc_ct, setHangMucCT] = useState<ConstructionItemState[]>(data?.hangmuc || null);
  const [hangmucct_xoa, setHangMucCTXoa] = useState<any>(null);
  const [luuluongtheo_mucdich, setLuuLuongTheoMucDich] = useState<MiningPurposeState[]>(data?.congtrinh?.luuluongtheo_mucdich || null);
  const [luuluongtheo_mucdich_xoa, setLuuLuongTheoMucDichXoa] = useState<any>(null);
  const propConsData: propConsDataState = { congtrinh: data?.congtrinh, thongso_ct: data?.congtrinh?.thongso, hangmuc_ct: data?.congtrinh?.hangmuc, luuluongtheo_mucdich: data?.congtrinh?.luuluongtheo_mucdich }

  const handleConstructionChange = (data: any) => {
    data.congtrinh ? setCongTrinh(data?.congtrinh) : setCongTrinh(null);
    data.thongso_ct ? setThongSoCongTrinh(data.thongso_ct) : setThongSoCongTrinh(null);
    data.hangmuc_ct ? setHangMucCT(data.hangmuc_ct) : setHangMucCT([]);
    data.hangmuc_ct_xoa ? setHangMucCTXoa(data.hangmuc_ct_xoa) : setHangMucCTXoa([]);
    data.luuluongtheo_mucdich ? setLuuLuongTheoMucDich(data.luuluongtheo_mucdich) : setLuuLuongTheoMucDich([]);
    data.luuluongtheo_mucdich_xoa ? setLuuLuongTheoMucDichXoa(data.luuluongtheo_mucdich_xoa) : setLuuLuongTheoMucDichXoa([]);
  };

  //licenseFee
  const [tiencp, settiencq] = useState<LicenseFeeState[] | null>(data?.tiencq || null);
  const [tiencpRemove, settiencqRemove] = useState<LicenseFeeState[] | null>(null);

  const handleLicenseFeeChange = (dataSave: any, dataDelete: any) => {
    // Handle the updated license data here
    settiencq(dataSave);
    settiencqRemove(dataDelete)
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

        if (thongso_congtrinh !== null) {
          await saveData('thong-so-ct/luu', { ...thongso_congtrinh, idCT: saveCons.id, idHangMucCT: null })
        }

        hangmucct_xoa !== null ? hangmucct_xoa?.map(async (e: any) => {
          console.log(e.id);

          await deleteData('hang-muc-ct/xoa', e.id);
        }) : ""

        hangmuc_ct !== null ? hangmuc_ct?.map(async (e: any) => {
          e.idCT = saveCons.id;
          await saveData('hang-muc-ct/luu', e);

          const saveConsItem = await saveData('hang-muc-ct/luu', e);
          if (saveConsItem && e.thongso !== null) {
            {
              console.log({ ...e.thongso, idCT: null, idHangMucCT: saveConsItem.id })
              
              // await saveData('thong-so-ct/luu', { ...e.thongso, idCT: null, idHangMucCT: saveConsItem.id })
            }
          }
        }) : ""

        luuluongtheo_mucdich_xoa !== null ? luuluongtheo_mucdich_xoa?.map(async (e: any) => {
          await saveData('luu-luong-theo-muc-dich/xoa', e.id);
        }) : ""

        luuluongtheo_mucdich !== null ? luuluongtheo_mucdich?.map(async (e: any) => {
          e.idCT = saveCons.id;
          await saveData('luu-luong-theo-muc-dich/luu', e);
        }) : ""

        const filePath = `pdf/giay-phep/${giayphep?.coQuanCapPhep?.toLowerCase()}/${router.pathname.split('/')[2]}/${dayjs(giayphep?.ngayKy).year()}/${giayphep?.soGP?.replace(/\//g, "_").toLowerCase()}`;

        const newfileGiayPhep = {
          filePath: filePath,
          fileName: `${giayphep?.soGP?.replace(/\//g, "_").toLowerCase()}.pdf`,
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
            // console.log(newfileGiayPhep)

            await uploadFile(newfileGiayPhep)
          }
          if (newfileDonXinCP.fileName && newfileDonXinCP.fileName !== null && newfileDonXinCP.file && newfileDonXinCP.file !== null) {
            await uploadFile(newfileDonXinCP)
          }
          if (newfileGiayToLienQuan.fileName && newfileGiayToLienQuan.fileName !== null && newfileGiayToLienQuan.file && newfileGiayToLienQuan.file !== null) {
            await uploadFile(newfileGiayToLienQuan)
          }

          tiencpRemove !== null ? tiencpRemove?.map(async (e: any) => {
            const saveLicFee = await saveData('tien-cap-quyen/xoa', e)
            if (saveLicFee) {
              await saveData('GP_TCQ/xoa', { id: 0, idGP: saveLic.id, idTCQ: e.id });
            }
          }) : ""

          tiencp !== null ? tiencp?.map(async (e: any) => {
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

              const gp_tcq = { id: 0, idGP: saveLic.id, idTCQ: saveLicFee.id }
              await saveData('GP_TCQ/luu', gp_tcq);
            }
          }) : ""
        }

        // Reset form fields
        setCongTrinh(emptyConstructionData);
        setgiayphep(emptyLicenseData);
        settiencq(null);
        settiencqRemove(null)

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
                    value={listBusiness?.find((option: any) => option.id === business?.id) || null}
                    isOptionEqualToValue={(option: any, value: any) => option.id === value?.id}
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
              <SurfaceWaterField data={propConsData} onChange={handleConstructionChange} />
              :
              router.pathname.split('/')[2] == 'nuoc-duoi-dat' ?
                <GroundWaterField data={propConsData} onChange={handleConstructionChange} />
                :
                router.pathname.split('/')[2] == 'xa-thai' ?
                  <DischargeWaterField data={propConsData} onChange={handleConstructionChange} />
                  : ''
          }

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
