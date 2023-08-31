import React, { useState } from 'react'
import { Add, Edit, Save  } from '@mui/icons-material'
import { Button, CircularProgress,DialogActions, Grid, IconButton, Tooltip } from '@mui/material'

import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'

import postData from 'src/api/post'
import ConstructionItem from './cons-item'
import { useRouter } from 'next/router'
import GroundWaterField from './cons-ground'
import ExploitItem from './exploit-item'
import SurfaceWaterField from './cons-suface'
import DischargeWaterField from './cons-discharge'

interface FormConstructionProps {
  data: any
  closeDialogs: () => void
  setPostSuccess?: (value: boolean) => void
}

const FormConstruction: React.FC<FormConstructionProps> = ({ data, closeDialogs, setPostSuccess }) => {

  //Business
  const [consSFData, setConsSFData] = useState<any>(data)
  const [saving, setSaving] = useState(false);
  const handleConsSFChange = (data: any) => {
    setConsSFData(data)
  }

  //Construction
  const [consItemData, setConsItemData] = useState<any>(data?.constructionItems)
  const [consItemDataDetele, setConsItemDataDelete] = useState<any>()

  //Hooks
  const route = useRouter()

  const handleconsItemChange = (dataSave: any, dataDelete: any) => {
    setConsItemDataDelete(dataDelete)
    setConsItemData(dataSave)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
        try{
            setSaving(true)
            const res = await postData('Construction/save', consSFData)

            if (res) {
              // Reset form fields
              setConsSFData({})
      
              consItemDataDetele.map(async (e: any) => {
                await postData('ConstructionDetail/delete', e)
              })
      
              consItemData.map(async (e: any) => {
                e.constructionId = res.id
                await postData('ConstructionDetail/save', e)
              })
      
              typeof setPostSuccess === 'function' ? setPostSuccess(true) : ''
              closeDialogs()
            }
        }
        catch (error) {
        } finally {
            setSaving(false)
            closeDialogs();
        }
    };
     

    // Call the function
    handleApiCall()
  }

  const handleClose = () => {
    setConsSFData({
      consData: consSFData,
      consItem: consItemData
    })

    closeDialogs()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={3}>
        <Grid item xs={12}>
          {route.pathname.split('/')[2] == 'nuoc-mat' ? (
            <SurfaceWaterField data={consSFData} onChange={handleConsSFChange} />
          ) : route.pathname.split('/')[2] == 'nuoc-duoi-dat' ? (
            <GroundWaterField data={consSFData} onChange={handleConsSFChange} />
          ) : route.pathname.split('/')[2] == 'xa-thai' ? (
            <DischargeWaterField data={consSFData} onChange={handleConsSFChange} />
          ) : (
            ''
          )}
        </Grid>
        {consSFData?.constructionTypeId === 7 ? (
          <Grid item xs={12}>
            <ExploitItem data={consItemData} onChange={handleconsItemChange} />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <ConstructionItem data={consItemData} onChange={handleconsItemChange} />
          </Grid>
        )}
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
