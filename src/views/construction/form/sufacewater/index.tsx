import React, { useState } from 'react';
import { Add, Edit } from '@mui/icons-material';
import { Button, DialogActions, Grid, IconButton, Tooltip } from '@mui/material';

import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen';
import ConstructionField from './cons-suface';
import ConstructionItem from './cons-item';
import postData from 'src/api/post';


interface FormConstructionProps {
  data: any;
  closeDialogs: () => void;
  setPostSuccess?: (value: boolean) => void;
}

const FormConstruction: React.FC<FormConstructionProps> = ({ data, closeDialogs, setPostSuccess }) => {

  //Business
  const [consSFData, setConsSFData] = useState<any>(data);

  const handleConsSFChange = (data: any) => {
    setConsSFData(data);
  };

  //Construction
  const [consItemData, setConsItemData] = useState<any>(data?.constructionItems);
  const [consItemDataDetele, setConsItemDataDelete] = useState<any>();

  const handleconsItemChange = (dataSave: any, dataDelete: any) => {
    setConsItemDataDelete(dataDelete)
    setConsItemData(dataSave);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const handleApiCall = async () => {

      const res = await postData('Construction/save', consSFData);

      if (res) {
        // Reset form fields
        setConsSFData({});

        consItemDataDetele.map(async (e: any) => {
          await postData('ConstructionDetail/delete', e);
        })

        consItemData.map(async (e: any) => {
          e.constructionId = res.id;
          await postData('ConstructionDetail/save', e);
        })

        typeof (setPostSuccess) === 'function' ? setPostSuccess(true) : '';
        closeDialogs();
      }
    };

    // Call the function
    handleApiCall();
  };

  const handleClose = () => {
    setConsSFData({
      consData: consSFData,
      consItem: consItemData,
    });

    closeDialogs();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <ConstructionField data={consSFData} onChange={handleConsSFChange} />
        </Grid>
        <Grid item xs={12}>
          <ConstructionItem data={consItemData} onChange={handleconsItemChange} />
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

interface CreateConstructionProps {
  isEdit: boolean;
  data?: any;
  setPostSuccess?: (value: boolean) => void;
}

const CreateConstruction: React.FC<CreateConstructionProps> = ({ isEdit, data, setPostSuccess }) => {
  const formTitle = isEdit ? 'Sửa thông tin công trình' : 'Thêm công trình mới';

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {isEdit ? (
            <Tooltip title='Chỉnh sửa thông tin công trình'>
              <IconButton onClick={() =>
                openDialogs(<FormConstruction data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
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
                openDialogs(<FormConstruction data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
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

export default CreateConstruction;
