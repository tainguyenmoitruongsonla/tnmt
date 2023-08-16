import { Add, EditNote } from '@mui/icons-material'
import {
  Grid,
  Button,
  DialogActions,
} from '@mui/material'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import ConstructionField from './cons-suface'


const FormContruction = ({ onSubmit, closeDialogs }: any) => {
  const handleSubmit = (event: any) => {
    event.preventDefault()
    onSubmit()
    closeDialogs()
  }
  const handleClose = () => {
    closeDialogs()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={3}>
        <Grid item xs={12}>
          <ConstructionField />
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
              openDialogs(<FormContruction data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
            }
          />
        ) : (
          <Button
            size="small" startIcon={<Add />}
            onClick={() =>
              openDialogs(<FormContruction data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
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
