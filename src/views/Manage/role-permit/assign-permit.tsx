import { Tv } from '@mui/icons-material'
import { Checkbox, Grid } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'

import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import TableComponent from 'src/@core/components/table'
import { useLoadingContext } from 'src/@core/theme/loading-provider'
import fetchData from 'src/api/fetch'
import postData from 'src/api/post'

const Form = ({ data }: any) => {

  const roleData = [data]; // Use the updated `values` state here
  const [resData, setResData] = useState([]);
  const [postSuccess, setPostSuccess] = useState(false);
  const { showLoading, hideLoading } = useLoadingContext();
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        showLoading();
        const resData = await fetchData(`Dashboard/listbyrole/${data.name}`);
        setResData(resData);
      } catch (error) {
        setResData([]);
      }
      hideLoading();
    };

    getData();
  }, [postSuccess]);

  const handleCheckPermit = (row: any, roleData: any) => async (event: ChangeEvent<HTMLInputElement>) => {
    const permitAccess = row.permitAccess;

    const item = {
      id: row.id ? row.id : 0,
      roleId: roleData.id,
      roleName: roleData.name,
      dashboardId: row.dashboardId,
      fileControl: row.fileControl,
      permitAccess: row.permitAccess == true ? false : true,
    };
    console.log(row)
    showLoading();
    if (permitAccess === true) {
      console.log("delete",item)
      await postData('RoleDashboard/delete', item);
      setPostSuccess(true);
    } else {
      console.log("save",item)
      await postData('RoleDashboard/save', item);
      setPostSuccess(true);
    }
    hideLoading();
    handlePostSuccess();
  };


  const roleInfoColumn = [
    { id: 'name', label: 'Tên' },
    { id: 'description', label: 'Mô tả' },
  ];

  const permitColumn = [
    { id: 'dashboardName', label: 'Màn hình chức năng', },
    { id: 'fileControl', label: 'URL' },
    {
      id: 'permitAccess',
      label: 'Được phép truy cập',
      elm: (row: any) => (
        <Checkbox
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
          <TableComponent columns={roleInfoColumn} data={roleData} />
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
