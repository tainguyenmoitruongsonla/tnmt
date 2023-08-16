import { Add, EditNote } from '@mui/icons-material'
import {
  Grid,
  Button,
  DialogActions,
} from '@mui/material'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import ConstructionField from './cons-suface'
import { useState } from 'react';

interface FormConsProps {
  data: any;
  closeDialogs: () => void;
  setPostSuccess?: (value: boolean) => void;
}
const FormConstruction: React.FC<FormConsProps>  = ({ data, closeDialogs, setPostSuccess}: any) => {

  //Construcsion
  const [consData, setConsData] = useState<any>({});
  const handleConstructionChange = (data: any) => {
    setConsData(data);
  };


    
  //TypeConstruction
  // const [typeConsData, setTypeConsData] = useState<any>({});
  // const handleTypeConsChange = (data: any) => {
  //   setTypeConsData(data);
  // };

  //Details
  // const [consDetailsData, setConsDetailsData,] = useState<any>({});
  // const handleConsDetailsChange = (data: any) => {
  //   setConsDetailsData(data);
  // };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    //format data type = date(Dayjs) to new Date() 
    // licenseData.signDate = licenseData.signDate?.toDate();
    // licenseData.issueDate = licenseData.issueDate?.toDate();
    // licenseData.expriteDate = licenseData.expriteDate?.toDate();

    const newVal = {
      license: consData,

      // typeCons: typeConsData,
      // details: consDetailsData
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
          <ConstructionField  data={data?.consData} onChange={handleConstructionChange} />
        </Grid>
      </Grid>

      <DialogActions sx={{ p: 0, mt: 5 }}>
        <Button onClick={() => handleClose()} className='btn cancleBtn'>
          Hủy
        </Button>
        <Button type='submit' className='btn saveBtn'>
          Lưu
        </Button>
      </DialogActions>
    </form>
  )
}

interface CreateConstructionProps {
  isEdit: boolean;
  data?: any;
  setPostSuccess? :any;
}


const CreateConstruction = ({ isEdit, data, setPostSuccess }: CreateConstructionProps) => {
  const formTitle = isEdit ? 'Thay đổi thông tin trang truy cập' : 'THÔNG TIN CÔNG TRÌNH KHAI THÁC, SỬ DỤNG NƯỚC MẶT'

  return (
    <DialogsControlFullScreen>
    {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
      <>
        {isEdit ? (
          <EditNote
            className='tableActionBtn'
            onClick={() =>
              openDialogs(<FormConstruction data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
            }
          />
        ) : (
          <Button
            size="small" startIcon={<Add />}
            onClick={() =>
              openDialogs(<FormConstruction data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
            }
          >Thêm mới
          </Button>
        )}
      </>
    )}
  </DialogsControlFullScreen>
  )
}

export default CreateConstruction
