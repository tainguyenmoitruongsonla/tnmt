import React, { useState } from 'react'
import { Add, Edit, Save } from '@mui/icons-material'
import { Button, CircularProgress, DialogActions, Grid, IconButton, Tooltip } from '@mui/material'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import { useRouter } from 'next/router'
import GroundWaterField from './cons-ground'
import SurfaceWaterField from './cons-suface'
import DischargeWaterField from './cons-discharge'
import { saveData } from 'src/api/axios'
import { ConstructionSpecState, ConstructionState, emptyConstructionData } from './construction-interface'

interface FormConstructionProps {
  data: any
  closeDialogs: () => void
  setPostSuccess?: (value: boolean) => void
}

const FormConstruction: React.FC<FormConstructionProps> = ({ data, closeDialogs, setPostSuccess }) => {
  //Construction
  const [consData, setConsData] = useState<ConstructionState>(data)
  const [consSpec, setConsSpec] = useState<ConstructionSpecState>(data)

  //ConstructionItem
  // const [consItemData, setConsItemData] = useState<ConstructionItemState[]>(data?.hangmuc)
  // const [consItemDataDetele, setConsItemDataDelete] = useState<any>()
  const [saving, setSaving] = useState(false)
  const handleConsChange = (data: any) => {
    setConsData(data.consData)
    setConsSpec(data.consSpec)
  }

  //Hooks
  const route = useRouter()

  // const handleconsItemChange = (dataSave: any, dataDelete: any) => {
  //   setConsItemDataDelete(dataDelete)
  //   setConsItemData(dataSave)
  // }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      try {
        setSaving(true)
        const res = await saveData('cong-trinh/luu', consData)

        if (res) {
          await saveData('thong-so-ct/luu', { ...consSpec, idCT: res.id, idHangMucCT: null })

          // consItemDataDetele.map(async (e: any) => {
          //   await deleteData('hang-muc-ct/xoa', e)
          // })

          // consItemData.map(async (e: any) => {
          //   e.idCT = res.id
          //   await saveData('hang-muc-ct/luu', e)
          // })

          typeof setPostSuccess === 'function' ? setPostSuccess(true) : ''

          setConsData(emptyConstructionData)
          closeDialogs()
        }
      } catch (error) {
      } finally {
        setSaving(false)
        closeDialogs()
      }
    }

    // Call the function
    handleApiCall()
  }

  const handleClose = () => {
    setConsData(emptyConstructionData)

    closeDialogs()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={3}>
        <Grid item xs={12}>
          {route.pathname.split('/')[2] == 'nuoc-mat' ? (
            <SurfaceWaterField data={consData} onChange={handleConsChange} />
          ) : route.pathname.split('/')[2] == 'nuoc-duoi-dat' ? (
            <GroundWaterField data={consData} onChange={handleConsChange} />
          ) : route.pathname.split('/')[2] == 'xa-thai' ? (
            <DischargeWaterField data={consData} onChange={handleConsChange} />
          ) : (
            ''
          )}
        </Grid>
      </Grid>

      <DialogActions sx={{ p: 0, mt: 5 }}>
        <Button size='small' onClick={handleClose} className='btn cancleBtn'>
          Hủy
        </Button>
        <Button onClick={handleSubmit} disabled={saving} className='btn saveBtn'>
          {' '}
          {saving ? <CircularProgress color='inherit' size={20} /> : <Save />} &nbsp; Lưu{' '}
        </Button>
      </DialogActions>
    </form>
  )
}

interface CreateConstructionProps {
  isEdit: boolean
  data?: any
  setPostSuccess?: (value: boolean) => void
}

const CreateConstruction: React.FC<CreateConstructionProps> = ({ isEdit, data, setPostSuccess }) => {
  const formTitle = isEdit ? 'Sửa thông tin công trình' : 'Thêm công trình mới'

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {isEdit ? (
            <Tooltip title='Chỉnh sửa thông tin công trình'>
              <IconButton
                onClick={() =>
                  openDialogs(
                    <FormConstruction data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />,
                    formTitle
                  )
                }
              >
                <Edit className='tableActionBtn' />
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              variant='outlined'
              size='small'
              startIcon={<Add />}
              onClick={() =>
                openDialogs(
                  <FormConstruction data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />,
                  formTitle
                )
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
