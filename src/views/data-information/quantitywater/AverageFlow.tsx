import {
    Grid,
    Typography
  } from '@mui/material'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import { getData } from 'src/api/axios'
import CreateReport5 from 'src/views/report-form/Bieumau5/CreateForm5'
import { Report5State } from 'src/views/report-form/Bieumau5/Report5Interface'
import Report5Table from 'src/views/report-form/Bieumau5/Report5Table'
  
  const AverageFlowSF = () => { 
    const [data, setData] = useState<Report5State[]>([])
    const [loading, setLoading] = useState(false)
    const [postSuccess, setPostSuccess] = useState(false)
    const handlePostSuccess = () => {
      setPostSuccess(prevState => !prevState)
    }
    useEffect(() => {
      async function getDataReport1() {
        setLoading(true)
        await getData('BieuMauSoNam/danhsach')
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
 <Grid className='_text_center' >
        <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>BẢNG DÒNG CHẢY TRUNG BÌNH THÁNG, NĂM CÁC TRẠM THỦY VĂN TRÊN ĐỊA BÀN TỈNH </Typography>
      </Grid>
      <CreateReport5 isEdit={false} setPostSuccess={handlePostSuccess} />
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <Report5Table data={data} setPostSuccess={handlePostSuccess} />
        </Grid>
      )}
      </Grid>
     
    )
  }
  
  export default AverageFlowSF
  