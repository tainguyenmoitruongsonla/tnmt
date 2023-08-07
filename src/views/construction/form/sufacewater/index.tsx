import { EditNote } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
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
        <Button onClick={() => handleClose()} className='btn closeBtn'>
          Hủy
        </Button>
        <Button type='submit' className='btn saveBtn'>
          Lưu
        </Button>
      </DialogActions>
    </form>
  )
}

const CreateConstruction = ({ isEdit }: { isEdit: boolean }) => {
  const formTitle = isEdit ? 'Thay đổi thông tin trang truy cập' : 'THÔNG TIN CÔNG TRÌNH KHAI THÁC, SỬ DỤNG NƯỚC MẶT'
  const handleSubmit = () => {
    // handle form submission logic here
  }

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {isEdit ? (
            <EditNote
              onClick={() =>
                openDialogs(<FormContruction onSubmit={handleSubmit} closeDialogs={closeDialogs} />, formTitle)
              }
            />
          ) : (
            <Button
              fullWidth
              size='small'
              startIcon={<AddIcon />}
              variant='outlined'
              onClick={() =>
                openDialogs(<FormContruction onSubmit={handleSubmit} closeDialogs={closeDialogs} />, formTitle)
              }
            >
              Thêm mới
            </Button>
          )}
        </>
      )}
    </DialogsControlFullScreen>
  )
}

export default CreateConstruction
