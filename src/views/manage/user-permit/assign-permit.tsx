import { Tv } from '@mui/icons-material'
import { Switch, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import TableComponent from 'src/@core/components/table'
import { useLoadingContext } from 'src/@core/theme/loading-provider'
import fetchData from 'src/api/fetch'
import postData from 'src/api/post'

const Form = ({ data }: any) => {

  const userData = [data]; // Use the updated `values` state here
  const [resData, setResData] = useState([]);
  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };

  const { showLoading, hideLoading } = useLoadingContext();
  const [loading, setLoading] = useState(false)
  if (loading == true) {
    showLoading();
  } else {
    hideLoading();
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const resData = await fetchData(`Dashboard/listbyuser/${data.userName}`);
        setResData(resData);
      } catch (error) {
        setResData([]);
      }
      setLoading(false);
    };

    getData();
  }, [data.userName, postSuccess]);

  const handleCheckPermit = (row: any, userData: any) => async () => {
    const permitAccess = row.permitAccess;

    const item = {
      id: row.id ? row.id : 0,
      userId: userData.id,
      userName: userData.userName,
      dashboardId: row.dashboardId,
      fileControl: row.fileControl,
      permitAccess: row.permitAccess == true ? false : true,
    };
    setLoading(true);
    if (permitAccess === true) {
      await postData('UserDashboard/delete', item);
    } else {
      await postData('UserDashboard/save', item);
    }
    setPostSuccess(true);
    setLoading(false);
    handlePostSuccess();
  };
 
  const userInfoColumn = [
    { id: 'userName', label: 'Tên', elm: (row:any) => (<Typography py={2}>{row.userName}</Typography>)},
    { id: 'fullName', label: 'Mô tả' },
  ];

  const permitColumn = [
    { id: 'dashboardName', label: 'Màn hình chức năng', },
    { id: 'fileControl', label: 'URL' },
    {
      id: 'permitAccess',
      label: 'Được phép truy cập',
      elm: (row: any) => (
        <Switch
          name={row.path}
          checked={!!row?.permitAccess}
          onChange={handleCheckPermit(row, data)}
        />
      ),
    },
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={12} pb={10}>
          <TableComponent columns={userInfoColumn} data={userData} />
        </Grid>
      </Grid>

      <TableComponent columns={permitColumn} data={resData} pagination />
    </>
  );
}

const AssignPermit = ({ data }: any) => {
  const formTitle = 'Cấp phép người dùng'

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <Tv
          className='tableActionBtn'
          onClick={() => openDialogs(<Form data={data} closeDialogs={closeDialogs} />, formTitle)}
        />
      )}
    </DialogsControlFullScreen>
  )
}

export default AssignPermit
