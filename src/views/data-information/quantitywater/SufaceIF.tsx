import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import { getData } from 'src/api/axios'
import CreateReport4 from 'src/views/report-form/Bieumau4/CreateForm4'
import { Report4State } from 'src/views/report-form/Bieumau4/Report4Interface'
import Report4Table from 'src/views/report-form/Bieumau4/Report4Table'

const SFInformation = () => {
  const [data, setData] = useState<Report4State[]>([])
  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoBon/danhsach')
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
          BẢNG TỔNG HỢP LƯỢNG NƯỚC MẶT TRÊN CÁC LƯU VỰC SÔNG THUỘC TỈNH QUẢNG NGÃI
        </Typography>
      </Grid>
      <CreateReport4 isEdit={false} handlePostSuccess={handlePostSuccess} />
      {loading ? (
        <BoxLoading />
      ) : (
       <Report4Table data={data} setPostSuccess={handlePostSuccess}/>
      )}
    </Grid>
  )
}

export default SFInformation
