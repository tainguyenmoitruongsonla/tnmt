import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import { getData } from 'src/api/axios'
import CreateReport8 from 'src/views/report-form/Bieumau8/CreateForm8'
import Report8Table from 'src/views/report-form/Bieumau8/Report8Table'
import { Report8State } from 'src/views/report-form/Bieumau8/Reportt8InterFace'

const GRInformation = () => {
  const [data, setData] = useState<Report8State[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoTam/danhsach')
        .then(data => {
          setData(data)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    getDataReport1()
  }, [postSuccess])

  return (
    <Grid>
      <Grid className='_text_center'>
        <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>
          BẢNG TỔNG HỢP CÁC ĐẶC TRƯNG NƯỚC DƯỚI ĐẤT{' '}
        </Typography>
      </Grid>
      <CreateReport8 isEdit={false} setPostSuccess={handlePostSuccess} />
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <Report8Table data={data} setPostSuccess={handlePostSuccess} />
        </Grid>
      )}
    </Grid>
  )
}

export default GRInformation
