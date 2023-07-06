import { Tv } from '@mui/icons-material'
import { Checkbox, Grid } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'

import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import TableComponent from 'src/@core/components/table'
import { useLoadingContext } from 'src/@core/theme/loading-provider'
import fetchData from 'src/api/fetch'

interface State {
  id?: number,
  name?: string,
  path?: string,
  description?: string,
  permitAccess?: boolean,
}

const Form = ({ data }: any) => {
  const userData = [
    data
  ]

  const [values, setValues] = useState<State>({
    id: data?.id || 0,
    name: data?.name || '',
    path: data?.path || '',
    description: data?.description || '',
    permitAccess: data?.permitAccess,
  });

  console.log(values)

  const [resData, setResData] = useState([]);
  const { showLoading, hideLoading } = useLoadingContext();

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setValues({ ...values, [prop]: value });
  };  

  useEffect(() => {
    const getData = async () => {
      try {
        showLoading();
        const data = await fetchData('Dashboard/list');
        setResData(data);
      } catch (error) {
        setResData([]);
      }
      hideLoading();
    };

    getData();
  }, []);

  const userInfoColumn = [
    { id: 'fullName', label: 'Tên', },
    { id: 'email', label: 'Email', },
  ]

  const permitColumn = [
    { id: 'name', label: 'Màn hình chức năng', },
    { id: 'path', label: 'URL', },
    { id: 'permitAccess', label: 'Được phép truy cập', elm: (row: any) => (<Checkbox name={row.path} checked={!!values?.permitAccess} onChange={handleChange('permitAccess')} />) },
  ]

  return (
    <>
      <Grid container>
        <Grid item xs={12} pb={10}>
          <TableComponent columns={userInfoColumn} data={userData} />
        </Grid>
      </Grid>

      <TableComponent columns={permitColumn} data={resData} pagination />
    </>
  )
}

const AssignPermit = ( {data}:any ) => {
  const formTitle =  'Cấp phép người dùng'

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <Tv className='tableActionBtn' onClick={() => openDialogs(<Form data={data} closeDialogs={closeDialogs} />, formTitle)} />
      )}
    </DialogsControlFullScreen>
  )
}

export default AssignPermit
